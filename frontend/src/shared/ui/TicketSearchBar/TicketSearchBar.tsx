import React from 'react';
import { Box, Button } from '@mantine/core';

import { DropdownList } from '../DropdownList';

import styles from './TicketSearchBar.module.scss';

const DESTINATIONS_FROM = ['Санкт–Петербург (GK)'];
const DESTINATIONS_TO = ['Ктурция (YAG)'];

export const TicketSearchBar = () => {
  return (
    <Box
      className={styles.ticketSearchBar}>
      <DropdownList className={styles.destInput} description="Откуда" data={DESTINATIONS_FROM} />
      <DropdownList className={styles.destInput} description="Куда" data={DESTINATIONS_TO} />
      <DropdownList className={styles.dateInput} description="Туда" data={['06.05.2023']} />
      <DropdownList className={styles.dateInput} description="Обратно" data={['05.05.2023']} />
      <Button className={styles.searchBtn}>
              Найти билеты
      </Button>
    </Box>
  );
};
