import React from 'react';
import { useHistory } from 'react-router';
import { Avatar, Badge, Button, Group, SimpleGrid, Stack, Title } from '@mantine/core';

import { AirTicket } from 'domain/ticket';

import { TicketOperator } from './TicketOperator';
import { TicketRoute } from './TicketRoute';

import styles from './Ticket.module.scss';

type Props = {
  ticket: AirTicket;
}

export const Ticket = ({ ticket }: Props) => {
  const history = useHistory();

  const { active,tourOperator,tripEnd,tripStart } = ticket;

  return (
    <div
      className={styles.ticket}
    >
      <div className={styles.tourOperator}>
        <TicketOperator name={tourOperator} url={ticket.thumbnail} />
        <Badge variant={'light'} color={active ? 'lime' : 'red'} className={styles.badge}>
          {ticket.feature}
        </Badge>
      </div>
      <TicketRoute
        date={tripStart.day}
        endTime={tripStart.placeToDate}
        startTime={tripStart.placeFromDate}
        startPlace="GK"
        endPlace="YAG"
      />
      <TicketRoute
        date={tripEnd.day}
        endTime={tripEnd.placeToDate}
        startTime={tripEnd.placeFromDate}
        startPlace="YAG"
        endPlace="GK"
      />
      <Button disabled={!active} className={styles.ticketBtn} onClick={() => history.push('/buy-ticket')}>
        {active ? 'Выбрать' : 'Мест нет'}
      </Button>
    </div>
  );
};
