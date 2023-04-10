import { ShareableUserDto, UserDto } from '@dtos/user.dto';
import { BadRequestException, Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { BotService } from '@services/bot.service';
import { generateRandomPassword } from '@utils/generateRandomPassword';
import { getVkDisplayName } from '@utils/validateVkName';
import { UserRepository } from 'repositories/user.repository';

@Controller('users')
export class UserController {
  botService: BotService;
  userRepository: UserRepository;

  constructor(botService: BotService, userRepository: UserRepository) {
    this.botService = botService;
    this.userRepository = userRepository;
  }

  @Get('')
  getUsers(): ShareableUserDto[] {
    return [
      {
        id: 0,
        firstName: 'Данил',
        lastName: 'Кладницкий',
        selectedServices: ['is_vegan'],
      },
    ];
  }

  @Get(':id')
  getUsersById(@Param('id') id: number): ShareableUserDto {
    return {
      id: 0,
      firstName: 'Данил',
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
    });

    const groups = await this.botService.getCurrentGroup();
    const currentGroup = groups[0];

    const isMember = await this.botService.userIsMember({
      user_id: profile.id,
      group_id: currentGroup.id
    });

    const canReceiveMessages = await this.botService.userCanReceiveMessage({
      user_id: profile.id
    });

    return { isMember, canReceiveMessages }
  }

  @Post("sign-in")
  async saveSignIn(@Body() form: UserDto) {
    const vkDisplayName = getVkDisplayName(form.vkLink);

    if (!vkDisplayName) {
      throw new BadRequestException("Невалидный ВК профиль");
    }

    const profile = await this.botService.getVkProfile({ user_ids: [vkDisplayName] });

    const result = await this.userRepository.save({ ...form, vkId: profile.id, password: generateRandomPassword() });

    try {
      await this.botService.sendMessage({ user: profile.id, message: "Ураа вы с нами!!" })
    } catch (err) {
      console.log(err);
    }
    return result.id;
  }
}
