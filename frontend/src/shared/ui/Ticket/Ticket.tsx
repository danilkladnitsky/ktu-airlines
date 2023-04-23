import React from 'react';
import { useHistory } from 'react-router';
import { Avatar, Badge, Button, SimpleGrid, Title } from '@mantine/core';

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
      <div className={styles.tourOperator}>
        <TicketOperator name={tourOperator} />
        {active ? <Badge variant={'light'} color={'lime'}>
              Самый быстрый
        </Badge> : <Badge variant={'light'} color="red">Мест нет</Badge>}
      </div>
      <TicketRoute
        date={tripStart.day}
        endTime={tripStart.placeFromDate}
        startTime={tripStart.placeToDate}
        startPlace="GK"
        endPlace='YAG'
      />
      <TicketRoute
        date={tripEnd.day}
        endTime={tripEnd.placeFromDate}
        startTime={tripEnd.placeToDate}
        startPlace="YAG"
        endPlace='GK'
      />
      <Button disabled={!active} className={styles.ticketBtn} onClick={() => history.push('/buy-ticket')}>
            Выбрать
      </Button>
    </SimpleGrid>
  );
};
