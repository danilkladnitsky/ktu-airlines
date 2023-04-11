import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

export type RegistrationStatus = 'pending' | 'accepted' | 'declined';

@Entity()
export class Ticket extends BaseEntity {
  @Column()
  userId: Id;
  @Column()
  status: RegistrationStatus;
}
