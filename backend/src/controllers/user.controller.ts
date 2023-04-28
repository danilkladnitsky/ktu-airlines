import { SIGN_IN_TEXT } from '@common/bot.phrases';
import { UserDto } from '@dtos/user.dto';
import { BadRequestException, Body, ConflictException, Controller, Get, Inject, MaxFileSizeValidator, Param, ParseFilePipe, Post,  UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BotService } from '@services/bot.service';
import { generateRandomIntId } from '@utils/generateRandomIntId';
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
      console.warn("sign-in vk invalid", form);
      throw new BadRequestException("Невалидный ВК профиль");
    }

    const profile = await this.botService.getVkProfile({ user_ids: [vkDisplayName] });

    const dublicate = await this.userRepository.getBy("isuNumber", form.isuNumber);

    if (dublicate) {
      console.warn("sign-in dublicate", form);
      throw new ConflictException("Этот пользователь уже был зарегистрирован");
    }

    console.info("sign-in", form);
    
    const result = await this.userRepository.save({ ...form, vkId: profile.id.toString() });

    try {
      await this.botService.sendMessage({
        user: profile.id, message: SIGN_IN_TEXT
      })
      console.info("sign-in send message", form);
    } catch (err) {
      console.warn(err);
    }
    return result.id;
  }
}
