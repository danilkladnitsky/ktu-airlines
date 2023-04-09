import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  UseFilters,
} from '@nestjs/common';

import { generateRandomIntId } from '@utils/generateRandomIntId';
import { BotSendMessageDto } from '@dtos/bot.dto';
import { BotService } from '@services/bot.service';
import { HttpExceptionFilter } from 'filters/http-exception.filter';
import { SocketGateway } from '@gateway/socket-gateway';

@Controller('bot')
@UseFilters(new HttpExceptionFilter())
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

    const profiles = await this.botService.getVkProfile(payload);

    if (profiles.length === 0) {
      throw new NotFoundException(`Пользователя ${username} не существует`);
    }

    return profiles[0];
  }

  @Post('send_message/:user')
  async sendMessage(
    @Query('message') message: string,
    @Param('user') user: Id | string,
  ): Promise<BotSendMessageDto> {
    const message_id = await this.botService.sendMessage({
      message,
      user,
      random_id: generateRandomIntId(),
    });
    this.socketGateway.sendToAll(message);
    return { message_id };
  }

  @Get('get_user_membership/:username')
  async getUserMembership(@Param('username') username: string) {
    const profiles = await this.botService.getVkProfile({
      user_ids: [username],
      random_id: generateRandomIntId(),
    });

    if (profiles.length === 0) {
      throw new NotFoundException(`Пользователя ${username} не существует`);
    }

    const currentUser = profiles[0];

    const groups = await this.botService.getCurrentGroup();
    const currentGroup = groups[0];

    return await this.botService.userIsMember({
      user_id: currentUser.id,
      group_id: currentGroup.id,
    });
  }
}
