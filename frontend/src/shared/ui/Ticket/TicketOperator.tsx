import React from 'react';
import { Avatar, Title } from '@mantine/core';

import styles from './TicketOperator.module.scss';

export const TicketOperator = () => {
  return (
    <div className={styles.tourAvatar}>
      <Avatar size={'sm'} radius={'lg'} src="/logo.jpg" />
      <Title order={6} className={styles.tourName}>
            [ktu].beda
      </Title>
    </div>
  );
};
