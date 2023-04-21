import React from 'react';
import { ActionIcon, Avatar, Box, Title } from '@mantine/core';

import { COLORS } from 'shared/colors';

import styles from './HeaderBar.module.scss';

type Props = {
  theme?: 'light' | 'dark';
}

export const HeaderBar = ({ theme = 'light' }: Props) => {
  return (
    <Box className={styles.header}>
      <Title className={styles.headerTitle} style={{
        color: theme === 'light' ? COLORS.ACCENT_TEXT : COLORS.PRIMARY_TEXT,
      }}>ktu.tours</Title>
      <ActionIcon className={styles.headerLogo} radius={'50%'}>
        <Avatar radius={'50%'} color={'lime'} size="lg" />
      </ActionIcon>
    </Box>
  );
};
