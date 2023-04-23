import { UserDto } from '@dtos/user.dto';
import { BadRequestException, Body, ConflictException, Controller, FileTypeValidator, Get, Inject, MaxFileSizeValidator, Param, ParseFilePipe, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BotService } from '@services/bot.service';
import { generateRandomIntId } from '@utils/generateRandomIntId';
import { getVkDisplayName } from '@utils/validateVkName';
import { AdminGuard } from 'guards/admin.guard';
import { RolesGuard } from 'guards/role.guard';
import { Roles } from 'guards/roles';
import { Role } from 'guards/roles.enum';
import { InjectS3, S3 } from 'nestjs-s3';
import { UserRepository } from 'repositories/user.repository';

@Controller('users')
export class UserController {
  @Inject(BotService)
  private botService: BotService;

  @Inject(UserRepository)
  private userRepository: UserRepository;

   constructor(
    @InjectS3() private readonly s3: S3,
  ) {}

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

  @Post('upload-photo/:isu')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPhoto( @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 8 * 1024  * 1024}),
        ],
      }),
    )
    file: Express.Multer.File,
 @Param('isu') isu: number) {
    const { mimetype } = file;
    const extension = mimetype.toLowerCase().split("/")[1];
    const fileName = `isu-${generateRandomIntId()}.${extension}`
    const res = await this.s3.upload({ Bucket: process.env.S3_BUCKET, Key: fileName, Body: file.buffer }).promise();
    return {url: res.Location};
    
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
