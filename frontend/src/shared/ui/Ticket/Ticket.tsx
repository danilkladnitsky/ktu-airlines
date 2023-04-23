import React from 'react';
import { useHistory } from 'react-router';
import { Avatar, Badge, Button, Title } from '@mantine/core';

import { AirTicket } from 'domain/ticket';

import { TicketOperator } from './TicketOperator';
import { TicketRoute } from './TicketRoute';

import styles from './Ticket.module.scss';

type Props = {
  ticket: AirTicket;
  available: boolean;
}

export const Ticket = ({ available }: Props) => {
  const history = useHistory();

  return (
    <div className={styles.ticket}>
      <div className={styles.tourOperator}>
        <TicketOperator />
        {available ? <Badge variant={'light'} color={'lime'}>
              Самый быстрый
        </Badge> : <Badge variant={'light'} color="red">Мест нет</Badge>}
      </div>
      <TicketRoute date="5 мая" endTime="10:00" startTime="7:30" />
      <TicketRoute date="6 мая" endTime="10:30" startTime="12:10" />
      <Button disabled={!available} className={styles.ticketBtn} onClick={() => history.push('/buy-ticket')}>
            Выбрать
      </Button>
    </div>
  );
};
