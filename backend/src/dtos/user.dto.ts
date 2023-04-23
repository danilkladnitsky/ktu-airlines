import { IsInt, IsNotEmpty,  IsString } from 'class-validator';

export class UserDto {
  id: Id;
  @IsNotEmpty()
  firstName: string;
  @IsNotEmpty()
  lastName: string;
  @IsNotEmpty()
  @IsInt()
  isuNumber: number;
  @IsNotEmpty()
  groupName: StudentGroup;
  @IsNotEmpty()
  phoneNumber: string;
  @IsString()
  vkLink: string;
  @IsString()
  motivationLetter: string;
  @IsString()
  selectedServices: string;
  thumbnail: string;
}

export class ShareableUserDto {
  id: Id;
  firstName: string;
  lastName: string;
  vkId: string;
  selectedServices: string;
}
