const api = require('node-vk-bot-api/lib/api');

import {
  BadRequestException,
  ForbiddenException,
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
  MessagesAllowedResponse,
  VkGroupResponse,
  PinMessageResponse,
  VkProfileResponse,
} from '@common/bot.types';
import { generateRandomIntId } from '@utils/generateRandomIntId';

@Injectable()
export class BotService {
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
