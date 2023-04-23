import React from 'react';
import { Avatar, Title } from '@mantine/core';

import styles from './TicketOperator.module.scss';

type Props = {
  name: string;
}

export const TicketOperator = ({ name }: Props) => {
  return (
    <div className={styles.tourAvatar}>
      <Avatar size={'sm'} radius={'lg'} src="/logo.jpg" />
      <Title order={6} className={styles.tourName}>
        {name}
      </Title>
    </div>
  );
};
