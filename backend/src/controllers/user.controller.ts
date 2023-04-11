import { ShareableUserDto, UserDto } from '@dtos/user.dto';
import { BadRequestException, Body, ConflictException, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { BotService } from '@services/bot.service';
import { getVkDisplayName } from '@utils/validateVkName';
import { UserRepository } from 'repositories/user.repository';

@Controller('users')
export class UserController {
  constructor(private botService: BotService, private userRepository: UserRepository) {
  }

  @Get()
  getUsers(): ShareableUserDto[] {
    return [
      {
        id: 0,
        vkId: 1,
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
      vkId: 0,
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

    const dublicate = await this.userRepository.getBy("isuNumber", form.isuNumber);
     
    if (dublicate) {
      throw new ConflictException("Этот пользователь уже был зарегистрирован");
    }

    const result = await this.userRepository.save({ ...form, vkId: profile.id });

    try {
      await this.botService.sendMessage({
        user: profile.id, message: "Вы успешно зарегистрировались на выезд!"})
    } catch (err) {
      console.log(err);
    }
    return result.id;
  }
}
