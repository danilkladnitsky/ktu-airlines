import { RegistrationStatus } from '@entities/ticket.entity';

export type TicketDto = {
  userId: Id;
  status: RegistrationStatus;
};
