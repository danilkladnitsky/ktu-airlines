import React from 'react';
import { useHistory } from 'react-router';
import { Avatar, Badge, Button, Title } from '@mantine/core';
import { useAppStore } from 'store';

import { AirTicket } from 'domain/ticket';

import { EndRouteIcon } from 'shared/icons/EndRouteIcon';
import { StartRouteIcon } from 'shared/icons/StartRouteIcon';

import styles from './Ticket.module.scss';

type Props = {
  ticket: AirTicket;
  available: boolean;
}

export const Ticket = ({ ticket, available }: Props) => {
  const history = useHistory();

  return (
    <div className={styles.ticket}>
      <div className={styles.tourOperator}>
        <div className={styles.tourAvatar}>
          <Avatar size={'sm'} radius={'lg'} src="/logo.jpg" />
          <Title order={6} className={styles.tourName}>
            [ktu].beda
          </Title>
        </div>
        {available ? <Badge variant={'light'} color={'lime'}>
              Самый быстрый
        </Badge> : <Badge variant={'light'} color="red">Мест нет</Badge>}
      </div>
      <div className={styles.route}>
        <div className={styles.time}>
          <Title order={2}>
              07:30
          </Title>
          <StartRouteIcon />
          <Title order={2}>
              10:00
          </Title>
        </div>
        <div className={styles.destination}>
          <Title order={4}>
              GK
          </Title>
          <Badge color={'violet'}>5 мая</Badge>
          <Title order={4}>
              YAG
          </Title>
        </div>
      </div>
      <div className={styles.route}>
        <div className={styles.time}>
          <Title order={2}>
              07:30
          </Title>
          <EndRouteIcon />
          <Title order={2}>
              10:00
          </Title>
        </div>
        <div className={styles.destination}>
          <Title order={4}>
              GK
          </Title>
          <Badge color={'violet'}>6 мая</Badge>
          <Title order={4}>
              YAG
          </Title>
        </div>
      </div>
      <Button disabled={!available} className={styles.ticketBtn} onClick={() => history.push('/buy-ticket')}>
            Выбрать
      </Button>
    </div>
  );
};
