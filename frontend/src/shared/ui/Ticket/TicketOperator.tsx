import React from 'react';
import { Avatar, Text } from '@mantine/core';

import styles from './TicketOperator.module.scss';

type Props = {
  name: string;
}

export const TicketOperator = ({ name }: Props) => {
  return (
    <div className={styles.tourAvatar}>
      <Avatar size={'sm'} radius={'lg'} src="/logo.jpg" />
      <Text className={styles.tourName}>
        {name}
      </Text>
    </div>
  );
};
