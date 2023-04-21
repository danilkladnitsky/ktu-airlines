import React from 'react';

import { AirTicket } from 'domain/ticket';

import { Ticket } from 'shared/ui/Ticket';

import styles from './TicketList.module.scss';

type Props = {
    tickets: AirTicket[];
}

export const TicketList = ({ tickets }: Props) => {
  return (
    <div className={styles.list}>
      {tickets.map((ticket, key) => <Ticket ticket={ticket} key={key} />,
      )}
    </div>
  );
};
