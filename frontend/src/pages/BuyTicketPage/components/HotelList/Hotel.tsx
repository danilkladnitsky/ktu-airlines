import React from 'react';
import { Button, Card, Group, Image, List, Rating, Stack, Text, Title } from '@mantine/core';
import { useAppStore } from 'store';

import { Hotel as HotelType } from 'domain/hotel';

import styles from './Hotel.module.scss';

type Props = {
  hotel: HotelType;
}

export const Hotel = ({ hotel }: Props) => {
  const { incrementFormId } = useAppStore();

  const { description, name, stars, thumbnailUrl, active } = hotel;

  return (
    <Card shadow={'sm'} padding="xl" radius={'lg'}>
      <Card.Section>
        <Image
          src={thumbnailUrl}
          height={160}
          alt="Norway"
        />
      </Card.Section>
      <Group position="apart" mt="md" mb="xs">
        <Title order={4}>{name}</Title>
      </Group>
      <Stack className={styles.hotelContent}>
        <Rating value={stars} readOnly size={'xs'} />
        <Text size="sm">
          <Title order={5}>
            Про отель
          </Title>
          {description}
        </Text>
        <Title order={5}>
            Удобства и услуги
        </Title>
        <List size={16}>
          <List.Item>Трансфер</List.Item>
          <List.Item>Питание</List.Item>
          <List.Item>SPA</List.Item>
        </List>
        <Button className={styles.selectBtn} variant="light" color="blue" mt="md" radius="md" onClick={incrementFormId} disabled={!active}>
            Выбрать
        </Button>
      </Stack>
    </Card>
  );
};
