import { Exclude } from 'class-transformer';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

export type UserSelectedServices = 'needs_bed_sheets' | 'vegan_menu';

@Entity()
export class User extends BaseEntity {
  @Column()
  firstName: string;
  @Column({nullable: true})
  thumbnail?: string;
  @Column()
  lastName: string;
  @Column()
  isuNumber: number;
  @Column()
  vkId: string;
  @Column()
  phoneNumber: string;
  @Column()
  groupName: string;
  @Column()
  motivationLetter: string;
  @Column()
  selectedServices: string;
  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  password?: string;
}
