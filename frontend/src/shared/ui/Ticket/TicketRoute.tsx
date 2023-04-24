import React from 'react';
import { Badge, Title } from '@mantine/core';

import { StartRouteIcon } from 'shared/icons/StartRouteIcon';

import styles from './TicketRoute.module.scss';

type Props = {
    startTime: string;
    endTime: string;
  date: string;
  startPlace: string;
    endPlace: string;
}
export const TicketRoute = ({ startTime, endTime, date, startPlace, endPlace }: Props) => {
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
              {startPlace}
        </Title>
        <Badge color={'violet'}>{date}</Badge>
        <Title order={4}>
              {endPlace}
        </Title>
      </div>
    </div>
  );
};
