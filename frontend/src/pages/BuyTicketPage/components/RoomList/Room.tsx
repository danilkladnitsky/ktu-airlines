import React from 'react';
import { Badge, Button, Card, Checkbox, Group, Image, Space, Stack, Text, Title } from '@mantine/core';
import { useAppStore } from 'store';

import { Room as RoomType } from 'domain/room';

import styles from './Room.module.scss';

type Props = {
  room: RoomType;
}

export const Room = ({ room }: Props) => {
  const { incrementFormId } = useAppStore();

  const { description, feature, name, pic, available } = room;

  return (
    <Card shadow={'sm'} padding="xl" radius={'lg'}>
      <Card.Section>
        <Image
          src={pic}
          height={160}
          alt={name}
        />
      </Card.Section>
      <Group position="apart" mt="md" mb="xs">
        <Title order={4}>{name}</Title>
        <Badge variant={'light'} color="violet">{feature}</Badge>
      </Group>
      <Stack justify="flex-end">
        <Text size="sm">
          <Title order={5}>
            Про отель
          </Title>
          {description}
        </Text>
        {<Text size="sm">
          * Если хотите приобрести доп. услуги,
          отметьте ниже соответствующие пункты:
        </Text>}
        <Stack>
          <Checkbox
            label="Постельное бельё – 300 руб."
            radius={'xs'}
            color="lime"
          />
          <Checkbox
            label="Вегетарианское меню - 0 руб."
            radius={'xs'}
            color="lime"
          />
          <Space h={'sm'} />
          <Button
            onClick={incrementFormId}
            className={styles.bookButton}
            disabled={!available}
          >
            {room.available ? 'Забронировать' : 'Свободных номеров нет'}
          </Button>
        </Stack>
      </Stack>

    </Card>
  );
};
