import React from 'react';
import { ActionIcon, Avatar, Box, Title } from '@mantine/core';

import styles from './HeaderBar.module.scss';

export const HeaderBar = () => {
  return (
    <Box className={styles.header}>
      <Title className={styles.headerTitle}>ktu.airlines</Title>
      <ActionIcon className={styles.headerLogo} radius={'50%'}>
        <Avatar radius={'50%'} size="lg" />
      </ActionIcon>
    </Box>
  );
};
