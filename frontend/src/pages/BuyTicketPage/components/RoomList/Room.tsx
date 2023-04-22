import React from 'react';
import { Badge, Button, Card, Checkbox, Group, Image, Space, Stack, Text, Title } from '@mantine/core';
import { useListState } from '@mantine/hooks';
import { useAppStore } from 'store';

import { Room as RoomType, RoomWithServices } from 'domain/room';
import { UserServices } from 'domain/user';

import styles from './Room.module.scss';

type Props = {
  room: RoomType;
}

export const Room = ({ room }: Props) => {
  const { incrementFormId, selectRoom, selectedServices } = useAppStore();

  const [values, handlers] = useListState<UserServices>(selectedServices);

  const { description, feature, name, pic, available } = room;

  const submit = () => {
    const bookedRoom: RoomWithServices = {
      roomName: name,
      services: values,
    };

    selectRoom(bookedRoom);
    incrementFormId();
  };

  const handleService = (
    service: UserServices,
  ) => {
    return ( { target }: React.ChangeEvent<HTMLInputElement>) => {
      const selected = target.checked;

      if (selected) {
        handlers.append(service);
      } else {
        handlers.filter((v) => v !== service);
      }
    };

  };

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
            checked={values.includes('bed_sheets')}
            onClick={handleService('bed_sheets')}
          />
          <Checkbox
            label="Вегетарианское меню - 0 руб."
            radius={'xs'}
            color="lime"
            checked={values.includes('vegan_menu')}
            onClick={handleService('vegan_menu')}
          />
          <Space h={'sm'} />
          <Button
            onClick={submit}
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
