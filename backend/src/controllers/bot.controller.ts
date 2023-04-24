import {
  BadRequestException,
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
import { RolesGuard } from 'guards/role.guard';
import { Roles } from 'guards/roles';
import { Role } from 'guards/roles.enum';

@Controller('bot')
export class BotController {
  botService: BotService;

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
  @Roles([Role.Admin])
  @UseGuards(RolesGuard)
  async sendMessage(
    @Query('message') message: string,
    @Param('user') user: Id | string,
  ): Promise<BotSendMessageDto> {
    const message_id = await this.botService.sendMessage({
      message,
      user,
    });
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

  @Get("permissions")
  async checkUserVkRights(@Query("vk") vk: string) {
    const vkProfile = await this.botService.resolveVkResource(vk);

    if (!vkProfile || vkProfile.type !== "user") {
      console.warn("permissions vk invalid", vk);
      throw new BadRequestException("Ссылка на ВК Профиль невалидна");
    }

    const profile = await this.botService.getVkProfile({
      user_ids: [vkProfile.id],
    });

    const isMember = await this.botService.userIsMember(profile.id);

    const canReceiveMessages = await this.botService.userCanReceiveMessage({
      user_id: profile.id
    });

    console.info("permissions", vk, { isMember, canReceiveMessages });

    return { isMember, canReceiveMessages };
  }

  @Post("connect-webhook")
  async connectWebhook(@Res() response: Response) {
    return response.status(200).send(process.env.BOT_CONFIRMATION);
  }

}
