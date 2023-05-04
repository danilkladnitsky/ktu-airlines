import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import {
  MessageAllowedRequest,
  VkProfileResponse,
} from '@common/bot.types';
import { generateRandomIntId } from '@utils/generateRandomIntId';
import { API, ContextDefaultState, IResolvedOwnerResource, IResolvedTargetResource, MessageContext, resolveResource } from 'vk-io';
import { InvitationState } from '@common/bot.events';
import { TicketRepository } from 'repositories/ticket.repository';
import { UserRepository } from 'repositories/user.repository';
import { MessagesSendParams, UsersGetParams } from 'vk-io/lib/api/schemas/params';
import { GroupsGroupFull } from 'vk-io/lib/api/schemas/objects';
import { BotDeclineKeyboard } from '@common/bot.keyboards';
import { ACCEPT_INVITE_TEXT, DECLINE_TEXT } from '@common/bot.phrases';
import { User } from '@entities/user.entity';

@Injectable()
export class BotService {
  @Inject(TicketRepository)
  private ticketRepository: TicketRepository;

  @Inject(UserRepository)
  private userRepository: UserRepository;

  private vkApi: API;

  constructor() {
    this.vkApi = new API({
      token: process.env.BOT_TOKEN
    });
  }

  async sendMessage(payload: MessagesSendParams): Promise<number> {
    let user_id: Id | string;

    if (!Number.isInteger(payload.user)) {
      const profile = await this.getVkProfile({
        user_ids: [payload.user],
      });

      user_id = profile.id;
    } else {
      user_id = payload.user as number;
    }

    const isMember = await this.userIsMember(user_id);

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

    return this.vkApi.messages.send({ ...payload, random_id: generateRandomIntId(), user_id });

  }

  async userIsMember(user_id: number): Promise<boolean> {
    const group = await this.getCurrentGroup();

    const isMember = await this.vkApi.groups.isMember({ group_id: group.id.toString(), user_id });

    return !!isMember;
  }

  async userCanReceiveMessage(
    payload: MessageAllowedRequest,
  ): Promise<boolean> {
    const group = await this.getCurrentGroup();
    const result = await this.vkApi.messages.isMessagesFromGroupAllowed({ user_id: payload.user_id, group_id: group.id });

    return !!result.is_allowed;
  }

  async getVkProfile(payload: UsersGetParams): Promise<VkProfileResponse | undefined> {
    try {
      const result = await this.vkApi.users.get(payload);

      return result[0];
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async resolveVkResource(link: string): Promise<IResolvedTargetResource | IResolvedOwnerResource | null> {
    try {
      return await resolveResource({
        api: this.vkApi,
        resource: link,
      });
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async onInvitation(payload: InvitationState, context: MessageContext<ContextDefaultState>) {
    const user = await this.userRepository.getBy("vkId", context.senderId)
    const ticket = await this.ticketRepository.getBy("userId", user.id);

    if (!ticket) {
      this.sendMessage({ user: context.senderId, message: "Вы не регистрировались на выезд. Если это ошибка - свяжитесь с разработчиком" });
      return;
    }

    if (ticket.status === "declined") {
      this.sendMessage({ user: context.senderId, message: "Вы уже отказались от участия в выезде." });
      return;
    }

    await this.ticketRepository.update({ ...ticket, status: payload.value });

    if (payload.value === "accepted") {
      this.sendMessage({ user: context.senderId, message: ACCEPT_INVITE_TEXT, keyboard: BotDeclineKeyboard });
    } else if (payload.value === "declined") {
      this.sendMessage({ user: context.senderId, message: DECLINE_TEXT });
    }

  }

  async getCurrentGroup(): Promise<GroupsGroupFull> {
    const groupsList = await this.vkApi.groups.getById({});

    if (!groupsList.length) {
      throw new BadRequestException('Невозможно найти группу');
    }

    return groupsList[0];
  }
  
  async sendNotifications(users: Partial<User>[], message: string, attachment): Promise<{user: string, ok: boolean, error?: string}[]> { 
    const resultStatusList = [];
    const DELAY = 100;

    function delay(t) {
      return new Promise(resolve => setTimeout(resolve, t));
    }

    console.info("Отправляю сообщение: ", message);
    console.info("Количество людей: ", users.length);

    for (let user of users) {
      try {
        await this.sendMessage({ user: user.vkId, message, attachment });
        resultStatusList.push({ user: user.vkId, ok: true });
        console.info(`Отправил сообщение ${user.firstName} ${user.lastName} (${user.vkId})`);

        await delay(DELAY);
      } catch (error) {
        console.log(error);
        console.warn(`Не смог отправить сообщение ${user.firstName} ${user.lastName} (${user.vkId})`);
        
        resultStatusList.push({ user: user.vkId, ok: false, error });
        await delay(DELAY);
      }
    }
    
    console.log(resultStatusList);
    
    return resultStatusList;
  }
}
