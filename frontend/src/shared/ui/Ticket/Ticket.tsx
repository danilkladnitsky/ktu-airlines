import React from 'react';

import { AirTicket } from 'domain/ticket';

type Props = {
  ticket: AirTicket;
}

export const Ticket = ({ ticket }: Props) => {
  return (
    <div>Ticket</div>
  );
};
