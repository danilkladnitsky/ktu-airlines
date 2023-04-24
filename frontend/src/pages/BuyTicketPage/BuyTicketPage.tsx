import React from 'react';
import { Container, Grid, Stepper, Title } from '@mantine/core';
import { useAppStore } from 'store/appStore';

import { HeaderBar } from 'shared/ui/HeaderBar';

import { AboutGuest } from './components/AboutGuest/AboutGuest';
import { HotelsList } from './components/HotelList/HotelsList';
import { PassenderData } from './components/PassengerData/PassengerData';
import { RoomList } from './components/RoomList/RoomList';

import styles from './BuyTicketPage.module.scss';

export const BuyTicketPage = () => {
  const { activeFormId, setFormId, loadingStep } = useAppStore();

  return (
    <Container className={styles.page} >
      <HeaderBar theme="dark" />
      <Grid className={styles.content}>
        <Grid.Col>
          <Title className={styles.title}>
        Санкт–Петербург → Ктурция
          </Title>
        </Grid.Col>
        <Grid.Col>
          <Stepper
            active={activeFormId}
            classNames={{ content: styles.step }}
            color="lime"
            onStepClick={setFormId}
            allowNextStepsSelect={false}
          >
            <Stepper.Step loading={loadingStep === 0}>
              <Title order={2} className={styles.title}>
                Данные пассажира
              </Title>
              <PassenderData />
            </Stepper.Step>
            <Stepper.Step loading={loadingStep === 1}>
              <Title order={2} className={styles.title}>
                Выбор отеля
              </Title>
              <HotelsList />
            </Stepper.Step>
            <Stepper.Step loading={loadingStep === 2}>
              <Title order={2} className={styles.title}>
                Номера на 5 – 6 мая
              </Title>
              <RoomList />
            </Stepper.Step>
            <Stepper.Step loading={loadingStep === 3}>
              <Title order={2} className={styles.title}>
                Информация о госте
              </Title>
              <AboutGuest />
            </Stepper.Step>
            <Stepper.Completed>
              Все
            </Stepper.Completed>
          </Stepper>
        </Grid.Col>
        <Grid.Col>

        </Grid.Col>
      </Grid>
    </Container>
  );
};
