import React from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import { AirTicket } from 'domain/ticket';

import { Ticket } from 'shared/ui/Ticket';

import styles from './TicketList.module.scss';

type Props = {
    tickets: AirTicket[];
}

export const TicketList = ({ tickets }: Props) => {
  const [animationParent] = useAutoAnimate();

  return (
    <div className={styles.list} ref={animationParent}>
      {tickets.map((ticket, key) =>
        <Ticket
          ticket={ticket}
          key={key}
          available={key === 0}
        />,
      )}
    </div>
  );
};
