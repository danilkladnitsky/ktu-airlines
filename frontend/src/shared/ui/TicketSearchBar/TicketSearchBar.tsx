import React from 'react';
import { Box, Button, SelectItem } from '@mantine/core';
import { useAppStore } from 'store';

import { DropdownList } from 'shared/ui/DropdownList';

import styles from './TicketSearchBar.module.scss';

const DESTINATIONS_FROM: SelectItem[] = [
  {
    value: 'GK',
    label: 'Санкт–Петербург (GK)',
  },
  {
    value: 'LMO',
    label: 'Санкт–Петербург (LMO)',
    disabled: true,
  },
];

const DESTINATIONS_TO: SelectItem[] = [
  {
    value: 'YAG',
    label: 'Ктурция (YAG)',
  },
  {
    value: 'BUR',
    label: 'КТУбург (BUR)',
    disabled: true,
  },
];

export const TicketSearchBar = () => {
  const { selectTicket } = useAppStore();
  return (
    <Box
      className={styles.ticketSearchBar}>
      <DropdownList className={styles.destInput} description="Откуда" data={DESTINATIONS_FROM} />
      <DropdownList className={styles.destInput} description="Куда" data={DESTINATIONS_TO} />
      <DropdownList className={styles.dateInput} description="Туда" data={['05.05.2023']} />
      <DropdownList className={styles.dateInput} description="Обратно" data={['06.05.2023']} />
      <Button className={styles.searchBtn} onClick={selectTicket}>
        Найти билеты
      </Button>
    </Box>
  );
};
