import { UserDto } from '@dtos/user.dto';
import { BadRequestException, Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { BotService } from '@services/bot.service';
import { generateRandomIntId } from '@utils/generateRandomIntId';
import { getVkDisplayName } from '@utils/validateVkName';

@Controller('users')
export class UserController {
  botService: BotService;

  constructor(botService: BotService) {
    this.botService = botService;
  }

  @Get('')
  getUsers(): UserDto[] {
    return [
      {
        id: 0,
        firstName: 'Данил',
        groupName: 'P34312',
        lastName: 'Кладницкий',
        selectedServices: ['is_vegan'],
      },
    ];
  }

  @Get(':id')
  getUsersById(@Param('id') id: number): UserDto {
    return {
      id: 0,
      firstName: 'Данил',
      groupName: 'P34312',
      lastName: 'Кладницкий',
      selectedServices: ['is_vegan'],
    };
  }

  @Get("vk/permissions")
  async checkUserVkRights(@Query("vk") vk: string) {
    const displayName = getVkDisplayName(vk);

    if (!displayName) {
      throw new BadRequestException("Ссылка на ВК Профиль невалидна");
    }

    const profile = await this.botService.getVkProfile({
      user_ids: [displayName],
      random_id: generateRandomIntId()
    });

    const groups = await this.botService.getCurrentGroup();
    const currentGroup = groups[0];

    const selectedProfile = profile[0];

    const isMember = await this.botService.userIsMember({
      user_id: selectedProfile.id,
      group_id: currentGroup.id
    });

    const canReceiveMessages = await this.botService.userCanReceiveMessage({
      group_id: currentGroup.id,
      user_id: selectedProfile.id
    });

    return { isMember, canReceiveMessages: canReceiveMessages.is_allowed }
  }
}
