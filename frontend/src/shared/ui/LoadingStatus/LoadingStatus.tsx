import React from 'react';
import { Loader, Text, Title } from '@mantine/core';

import { COLORS } from 'shared/colors';

import styles from './LoadingStatus.module.scss';

type Props = {
    title: string;
    description: string;
}

export const LoadingStatus = ({
  description = 'Уже можно собирать чемоданы',
  title = 'Ищем авиабилеты...',
}: Props) => {
  return (
    <div className={styles.loadingWrapper}>
      <Loader size={'lg'} color="lime" />
      <div>
        <Title order={2} className={styles.title}>
          {title}
        </Title>
        <Title order={4} className={styles.description}>
          {description}
        </Title>
      </div>
    </div>
  );
};
