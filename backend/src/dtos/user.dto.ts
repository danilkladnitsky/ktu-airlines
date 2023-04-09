import { UserSelectedServices } from '@entities/user.entity';

export type UserDto = {
  id: Id;
  firstName: string;
  lastName: string;
  groupName: StudentGroup;
  selectedServices: [UserSelectedServices];
};
