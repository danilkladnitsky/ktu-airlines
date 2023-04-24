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
    <SimpleGrid
      className={styles.ticket}
      cols={4}
      spacing="sm"
      breakpoints={[
        { maxWidth: 'md', cols: 1, spacing: 'sm' },
      ]}
    >
      <Stack className={styles.tourOperator}>
        <TicketOperator name={tourOperator} url={ticket.thumbnail} />
        {active ? <Badge variant={'light'} color={'lime'}>
          {ticket.feature}
        </Badge> : <Badge variant={'light'} color="red">{ticket.feature}</Badge>}
      </Stack>
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
    </SimpleGrid>
  );
};
