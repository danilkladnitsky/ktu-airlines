import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';

import { BotSendMessageDto } from '@dtos/bot.dto';
import { BotService } from '@services/bot.service';
import { SocketGateway } from '@gateway/socket-gateway';
import { UsersGetParams } from 'vk-io/lib/api/schemas/params';
import { UsersFields } from 'vk-io/lib/api/schemas/objects';
import { Response } from 'express';
import { AdminGuard } from 'guards/admin.guard';

@Controller('bot')
export class BotController {
  botService: BotService;

  constructor(botService: BotService, private socketGateway: SocketGateway) {
    this.botService = botService;
  }

  @Get('vk_profile/:username')
  async getVkProfile(
    @Param('username') username: string | number,
    @Query('fields') fields?: string,
  ) {
    const fieldsValue = fields?.split(",") as UsersFields[];

    const payload: UsersGetParams = {
      user_ids: [username],
      fields: fieldsValue,
    };

    const profile = await this.botService.getVkProfile(payload);

    if (!profile) {
      throw new NotFoundException(`Пользователя ${username} не существует`);
    }

    return profile;
  }

  @Get('resolve-link')
  async resolveUserByLink(
    @Query('link') link: string,
  ) {

    return await this.botService.resolveVkResource(link);
  }

  @Post('send_message/:user')
  @UseGuards(AdminGuard)
  async sendMessage(
    @Query('message') message: string,
    @Param('user') user: Id | string,
  ): Promise<BotSendMessageDto> {
    const message_id = await this.botService.sendMessage({
      message,
      user,
    });
    this.socketGateway.sendToAll(message);
    return { message_id };
  }


  @Get('get_user_membership/:username')
  async getUserMembership(@Param('username') username: string) {
    const profile = await this.botService.getVkProfile({
      user_ids: [username],
    });

    if (!profile) {
      throw new NotFoundException(`Пользователя ${username} не существует`);
    }

    return await this.botService.userIsMember(profile.id);
  }

  @Post("connect-webhook")
  async connectWebhook(@Res() response: Response) {
    return response.status(200).send(process.env.BOT_CONFIRMATION);
  }

}
