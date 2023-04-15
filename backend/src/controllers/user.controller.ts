import { UserDto } from '@dtos/user.dto';
import { BadRequestException, Body, ConflictException, Controller, Get, Inject, Param, Post, Query, UseGuards } from '@nestjs/common';
import { BotService } from '@services/bot.service';
import { getVkDisplayName } from '@utils/validateVkName';
import { AdminGuard } from 'guards/admin.guard';
import { RolesGuard } from 'guards/role.guard';
import { Roles } from 'guards/roles';
import { Role } from 'guards/roles.enum';
import { UserRepository } from 'repositories/user.repository';

@Controller('users')
export class UserController {
  @Inject(BotService)
  private botService: BotService;

  @Inject(UserRepository)
  private userRepository: UserRepository;

  @Get()
  @Roles([Role.Admin])
  @UseGuards(RolesGuard)
  async getUsers() {
    return await this.userRepository.getAll();
  }

  @Get(':id')
  @Roles([Role.Admin, Role.User])
  @UseGuards(RolesGuard)
  async getUsersById(@Param('id') id: number) {
    return await this.userRepository.get(id);
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
