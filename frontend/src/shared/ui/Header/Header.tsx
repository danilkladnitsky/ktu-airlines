import React from 'react';
import { Box, Title } from '@mantine/core';

import { HeaderBar } from 'shared/ui/HeaderBar';
import { TicketSearchBar } from 'shared/ui/TicketSearchBar';

import styles from './Header.module.scss';

export const Header = () => {
  return (
    <div>
      <HeaderBar />
      <Box className={styles.slogan}>
        <Title className={styles.sloganText}>Летайте вместе с нами!</Title>
      </Box>
      <Box className={styles.searchBar}>
        <TicketSearchBar />
      </Box>

    </div>
  );
};
