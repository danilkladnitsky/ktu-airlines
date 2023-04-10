import { UserSelectedServices } from '@entities/user.entity';
import { IsInt, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class UserDto {
  id: Id;
  @IsNotEmpty()
  firstName: string;
  lastName: string;
  // @IsNotEmpty()
  // @IsInt()
  isuNumber: number;
  // @IsNotEmpty()
  groupName: StudentGroup;
  // @IsPhoneNumber()
  phoneNumber: string;
  // @IsString()
  vkLink: string;
  @IsString()
  motivationLetter: string;
  selectedServices: [UserSelectedServices];
}