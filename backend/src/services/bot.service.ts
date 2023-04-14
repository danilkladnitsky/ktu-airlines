const api = require('node-vk-bot-api/lib/api');

import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  BotEvents,
  UserMembershipRequest,
  PinMessageRequest,
  BotSendMessage,
  VkProfileRequest,
  MessageAllowedRequest,
  VkGroupResponse,
  PinMessageResponse,
  VkProfileResponse,
} from '@common/bot.types';
import { generateRandomIntId } from '@utils/generateRandomIntId';
import { ContextDefaultState, MessageContext } from 'vk-io';
import { InvitationState } from '@common/bot.events';
import { TicketRepository } from 'repositories/ticket.repository';
import { UserRepository } from 'repositories/user.repository';

@Injectable()
export class BotService {
  @Inject(TicketRepository)
  private ticketRepository: TicketRepository;

  @Inject(UserRepository)
  private userRepository: UserRepository;

  async sendMessage(payload: BotSendMessage): Promise<number> {
    let user_id: Id | string;

    if (!Number.isInteger(payload.user)) {
      const profile = await this.getVkProfile({
        user_ids: [payload.user],
      });

      user_id = profile.id;
    } else {
      user_id = payload.user as number;
    }

    const group = await this.getCurrentGroup();

    const isMember = await this.userIsMember({
      user_id,
      group_id: group.id,
    });

    const messagesAreAllowed = await this.userCanReceiveMessage(
      {
        user_id,
      },
    );

    if (!isMember) {
      throw new ForbiddenException('Пользователь не состоит в группе');
    }

    if (!messagesAreAllowed) {
      throw new ForbiddenException('Пользователь не может получать сообщения');
    }

    return await this.execute(BotEvents.SEND_MESSAGE, {
      ...payload,
      user_id,
      message: payload.message,
      random_id: generateRandomIntId(),
      keyboard: JSON.stringify(payload.keyboard)
    });
  }

  async pinMessage(payload: PinMessageRequest): Promise<PinMessageResponse> {
    return await this.execute(BotEvents.PIN_MESSAGE, payload);
  }

  async userIsMember(payload: UserMembershipRequest): Promise<boolean> {
    return await this.execute(BotEvents.CHECK_IF_USER_IS_MEMBER, payload);
  }

  async userCanReceiveMessage(
    payload: MessageAllowedRequest,
  ): Promise<boolean> {
    const group = await this.getCurrentGroup();
    const result = await this.execute(BotEvents.MESSAGES_ARE_ALLOWED, { ...payload, group_id: group.id });
    return result.is_allowed;
  }

  async getVkProfile(payload: VkProfileRequest): Promise<VkProfileResponse> {
    const randomId = generateRandomIntId();
    const profiles = await this.execute(BotEvents.GET_VK_PROFILE, { ...payload, randomId });
    return profiles[0];
  }

  async onInvitation(payload: InvitationState, context: MessageContext<ContextDefaultState>) {
    const user = await this.userRepository.getBy("vkId", context.senderId)
    const ticket = await this.ticketRepository.getBy("userId", user.id);

    if (!ticket) {
      this.sendMessage({ user: context.senderId, message: "Вы не регистрировались на выезд. Если это ошибка - свяжитесь с разработчиком" });
      return;
    }


    await this.ticketRepository.update({ ...ticket, status: payload.value });

    if (payload.value === "accepted") {
      this.sendMessage({ user: context.senderId, message: "Вы успешно зарегистрировались на выезд!" });
    } else if (payload.value === "declined") {
      this.sendMessage({ user: context.senderId, message: "Вы отказались от участия в выезде" });
    }

  }

  async getCurrentGroup(): Promise<VkGroupResponse> {
    const groups = await this.execute(BotEvents.GET_CURRENT_GROUP);

    if (!groups) {
      throw new BadRequestException('Невозможно найти группу');
    }

    return groups[0];
  }

  private async execute<T>(event: BotEvents, payload?: T) {
    try {
      const result = await api(event, {
        ...payload,
        access_token: process.env.BOT_TOKEN,
      });

      return result.response;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'Запрос к API Вконтакте не удался',
        { description: err },
      );
    }
  }
}
