import { UserDto } from '@dtos/user.dto';
import { BadRequestException, Body, ConflictException, Controller, Get, Inject, Param, Post, Query, UseGuards } from '@nestjs/common';
import { BotService } from '@services/bot.service';
import { getVkDisplayName } from '@utils/validateVkName';
import { AdminGuard } from 'guards/admin.guard';
import { UserRepository } from 'repositories/user.repository';

@Controller('users')
export class UserController {
  @Inject(BotService)
  private botService: BotService;

  @Inject(UserRepository)
  private userRepository: UserRepository;

  @Get()
  @UseGuards(AdminGuard)
  async getUsers() {
    return await this.userRepository.getAll();
  }

  @Get(':id')
  async getUsersById(@Param('id') id: number) {
    return await this.userRepository.get(id);
  }

  @Get("vk/permissions")
  async checkUserVkRights(@Query("vk") vk: string) {
    const vkProfile = await this.botService.resolveVkResource(vk);

    if (!vkProfile || vkProfile.type !== "user") {
      throw new BadRequestException("Ссылка на ВК Профиль невалидна");
    }

    const profile = await this.botService.getVkProfile({
      user_ids: [vkProfile.id],
    });

    const isMember = await this.botService.userIsMember(profile.id);

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

    const result = await this.userRepository.save({ ...form, vkId: profile.id.toString() });

    try {
      await this.botService.sendMessage({
        user: profile.id, message: "Вы успешно зарегистрировались на выезд!"
      })
    } catch (err) {
      console.log(err);
    }
    return result.id;
  }
}
