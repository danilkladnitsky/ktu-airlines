import React from 'react';

import { AirTicket } from 'domain/ticket';

import { Ticket } from 'shared/ui/Ticket';

type Props = {
    tickets: AirTicket[];
}

export const TicketList = ({ tickets }: Props) => {
  return (
    <div>
      {tickets.map((ticket, key) => <Ticket ticket={ticket} key={key} />)}
    </div>
  );
};
