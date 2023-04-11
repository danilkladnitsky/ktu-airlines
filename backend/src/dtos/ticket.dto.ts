import { RegistrationStatus } from '@entities/ticket.entity';

export class TicketDto {
  id: number;
  userId: Id;
  status: RegistrationStatus;
};

export class CreateTicketDto {
  userId: Id;
  status: RegistrationStatus;
}