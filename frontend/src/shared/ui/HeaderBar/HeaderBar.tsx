import React from 'react';
import { Link } from 'react-router-dom';
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
      }}>
        <Link to={'/'} style={{ textDecoration: 'none', color: 'unset' }}>
          ktu.tour
        </Link>
      </Title>
      <ActionIcon className={styles.headerLogo} radius={'50%'}>
        <Avatar component={Link} radius={'50%'} color={'lime'} size="lg" to="/login" />
      </ActionIcon>
    </Box>
  );
};
