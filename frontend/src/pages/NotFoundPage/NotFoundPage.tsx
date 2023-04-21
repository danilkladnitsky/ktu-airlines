import React from 'react';
import { Box, Container, Title } from '@mantine/core';

import { HeaderBar } from 'shared/ui/HeaderBar';

import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={styles.page}>
      <HeaderBar />
      <Box className={styles.wrapper}>
        <Title order={1}>404</Title>
        <Title order={2}>Упс! А тут ничего нет...</Title>
      </Box>
    </div>
  );
};
