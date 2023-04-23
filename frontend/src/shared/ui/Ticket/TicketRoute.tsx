import React from 'react';
import { Badge, Title } from '@mantine/core';

import { StartRouteIcon } from 'shared/icons/StartRouteIcon';

import styles from './TicketRoute.module.scss';

type Props = {
    startTime: string;
    endTime: string;
    date: string;
}
export const TicketRoute = ({ startTime, endTime, date }: Props) => {
  return (
    <div className={styles.route}>
      <div className={styles.time}>
        <Title order={2}>
          {startTime}
        </Title>
        <StartRouteIcon />
        <Title order={2}>
          {endTime}
        </Title>
      </div>
      <div className={styles.destination}>
        <Title order={4}>
              GK
        </Title>
        <Badge color={'violet'}>{date}</Badge>
        <Title order={4}>
              YAG
        </Title>
      </div>
    </div>
  );
};
