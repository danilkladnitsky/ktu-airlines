import React from 'react';
import { Card, Center, Container, Stack, Text, Title } from '@mantine/core';
import { useAppStore } from 'store';

import { ROOMS } from 'domain/room';
import { TICKETS } from 'domain/ticket';

import { Room } from 'shared/ui';
import { HeaderBar } from 'shared/ui/HeaderBar';
import { TicketRoute } from 'shared/ui/Ticket/TicketRoute';

import styles from './BookedPage.module.scss';

export const BookedPage = () => {
  const { selectedRoom } = useAppStore();

  const room = ROOMS.find(r => r.name === selectedRoom?.roomName);

  const ticket = TICKETS[0];

  return (
    <div className={styles.page}>
      <Container>
        <HeaderBar />
        <Center>
          <Stack className={styles.popup}>
            <Title className={styles.title}>
                Спасибо за регистрацию!
            </Title>
            <Card>
              <Text size={'sm'}>
                Ваша заявка успешно отправлена!
                <br />
                Наш менеджер свяжется с вами в ближайшее время для того, чтобы подтвердить бронирование.
                Мы будем рады увидеть вас в КТУрции и сделаем все возможное, чтобы ваш отдых был незабываемым!
              </Text>
            </Card>
            <Title className={styles.title} order={3}>
                Данные бронирования
            </Title>
            <Card>
              <Stack>
                <TicketRoute
                  date={ticket.tripStart.day}
                  endTime={ticket.tripStart.placeFromDate}
                  startTime={ticket.tripStart.placeToDate}
                  startPlace="GK"
                  endPlace="YAG"
                />
                <TicketRoute
                  date={ticket.tripStart.day}
                  endTime={ticket.tripEnd.placeToDate}
                  startTime={ticket.tripEnd.placeFromDate}
                  startPlace="YAG"
                  endPlace="GK"
                />
              </Stack>
            </Card>
            {room && <Room room={room} minified />}
          </Stack>
        </Center>
      </Container>
    </div>
  );
};
