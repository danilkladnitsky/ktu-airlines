import { UserDto } from '@dtos/user.dto';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('users')
export class UserController {
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
}
