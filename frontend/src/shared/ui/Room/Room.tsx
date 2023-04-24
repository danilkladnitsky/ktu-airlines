import React from 'react';
import { Badge, Button, Card, Checkbox, Group, Image, Space, Stack, Text, Title } from '@mantine/core';
import classNames from 'classnames';
import { useAppStore } from 'store';

import { Room as RoomType } from 'domain/room';
import { UserServices } from 'domain/user';

import styles from './Room.module.scss';

type Props = {
  room: RoomType;
  minified?: boolean;
  className?:string;
}

export const Room = ({ room, className, minified = false }: Props) => {
  const {
    incrementFormId,
    selectRoom,
    selectedRoom,
  } = useAppStore();

  const selectedServices = selectedRoom?.roomName === room.name
    ? selectedRoom.services
    : [];

  const { description, feature, name, pic, available } = room;

  const submit = () => {
    selectRoom({ roomName: room.name, services: selectedServices });
    incrementFormId();
  };

  const handleService = (
    service: UserServices,
  ) => {
    return ( { target }: React.ChangeEvent<HTMLInputElement>) => {

      let services = [...selectedRoom?.services] || [];
      const selected = target.checked;

      if (!selected) {
        services = services.filter((s) => s !== service);
      } else {
        services.push(service);
      }

      const updated = Array.from(new Set(services));

      selectRoom({ roomName: room.name, services: updated });

    };
  };

  return (
    <Card shadow={'sm'} padding="xl" radius={'lg'} className={classNames(styles.room, className)}>
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
      {!minified && <Stack className={styles.info}>
        <Text size="sm">
          {description}
        </Text>
        {<Text size="sm">
          * Если хотите приобрести доп. услуги,
          отметьте ниже соответствующие пункты:
        </Text>}
        <Stack>
          <Checkbox
            label="Постельное бельё – 300 руб."
            radius={'sm'}
            color="lime"
            defaultChecked={selectedServices.includes('bed_sheets')}
            onChange={handleService('bed_sheets')}
            disabled={!available}
          />
          <Checkbox
            label="Вегетарианское меню - 0 руб."
            radius={'sm'}
            color="lime"
            defaultChecked={selectedServices.includes('vegan_menu')}
            onChange={handleService('vegan_menu')}
            disabled={!available}
          />
          <Space h={'sm'} />
        </Stack>
        <Button
          onClick={submit}
          className={styles.bookButton}
          disabled={!available}
        >
          {room.available ? 'Забронировать' : 'Свободных номеров нет'}
        </Button>
      </Stack>}

    </Card>
  );
};
