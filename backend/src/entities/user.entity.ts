import { Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

export type UserSelectedServices = 'needs_bed_sheets' | 'is_vegan';

@Entity()
export class UserEntity extends BaseEntity {
  firstName: string;
  lastName: string;
  isuNumber: number;
  groupName: string;
  phoneNumber: string;
  vkId: string;
  motivationLetter: string;
  selectedServices: [UserSelectedServices];
  password: string;
}
