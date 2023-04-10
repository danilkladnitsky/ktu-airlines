import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';

import { generateRandomIntId } from '@utils/generateRandomIntId';
import { BotSendMessageDto } from '@dtos/bot.dto';
import { BotService } from '@services/bot.service';
import { SocketGateway } from '@gateway/socket-gateway';

@Controller('bot')
export class BotController {
  botService: BotService;

  constructor(botService: BotService, private socketGateway: SocketGateway) {
    this.botService = botService;
  }

  @Get('vk_profile/:username')
  async getVkProfile(
    @Param('username') username: string | number,
    @Query('fields') fields: string,
  ) {
    const payload = {
      user_ids: [username],
      fields,
      random_id: generateRandomIntId(),
    };

    const profile = await this.botService.getVkProfile(payload);

    if (profile) {
      throw new NotFoundException(`Пользователя ${username} не существует`);
    }

    return profile;
  }

  @Post('send_message/:user')
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

    if (profile) {
      throw new NotFoundException(`Пользователя ${username} не существует`);
    }

    const groups = await this.botService.getCurrentGroup();
    const currentGroup = groups[0];

    return await this.botService.userIsMember({
      user_id: profile.id,
      group_id: currentGroup.id,
    });
  }
}
