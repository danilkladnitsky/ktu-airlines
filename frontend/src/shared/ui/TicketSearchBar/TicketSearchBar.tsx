import React from 'react';
import { Box, Button, SelectItem } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useAppStore } from 'store';
import { z } from 'zod';

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

type TicketForm = {
  fromPlace: string;
  toPlace: string;
  fromDate: string;
  toDate: string;
}

const INIT_FORM: TicketForm = {
  fromPlace: '',
  fromDate: '',
  toDate: '',
  toPlace: '',
};

const schema = z.object({
  fromPlace: z.string().nonempty(' '),
  fromDate: z.string().nonempty(' '),
  toDate: z.string().nonempty(' '),
  toPlace: z.string().nonempty(' '),
});

export const TicketSearchBar = () => {
  const { selectTicket } = useAppStore();

  const form = useForm<TicketForm>({
    initialValues: INIT_FORM,
    validate: zodResolver(schema),
  });

  const submit = () => {
    const { hasErrors } = form.validate();

    if (!hasErrors) {
      selectTicket();
    }
  };

  return (
    <Box
      className={styles.ticketSearchBar}>
      <DropdownList
        className={styles.destInput} description="Откуда"
        data={DESTINATIONS_FROM}
        {...form.getInputProps('fromPlace')}
      />
      <DropdownList
        className={styles.destInput}
        description="Куда"
        data={DESTINATIONS_TO}
        {...form.getInputProps('toPlace')}
      />
      <DropdownList
        className={styles.dateInput}
        description="Туда"
        data={['05.05.2023']}
        {...form.getInputProps('fromDate')}
      />
      <DropdownList
        className={styles.dateInput}
        description="Обратно"
        data={['06.05.2023']}
        {...form.getInputProps('toDate')}
      />
      <Button className={styles.searchBtn} onClick={submit}>
        Найти билеты
      </Button>
    </Box>
  );
};
