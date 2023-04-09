import { Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

export type RegistrationStatus = 'pending' | 'accepted' | 'declined';

@Entity()
export class Ticket extends BaseEntity {
  userId: Id;
  status: RegistrationStatus;
}
