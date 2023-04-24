import React from 'react';
import { Avatar, Text } from '@mantine/core';

import styles from './TicketOperator.module.scss';

type Props = {
  name: string;
  url: string
}

export const TicketOperator = ({ name, url }: Props) => {
  return (
    <div className={styles.tourAvatar}>
      <Avatar size={'sm'} radius={'lg'} src={url} />
      <Text className={styles.tourName}>
        {name}
      </Text>
    </div>
  );
};
