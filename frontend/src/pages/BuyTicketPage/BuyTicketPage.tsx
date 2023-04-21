import React, { useState } from 'react';
import { Button, Container, Grid, Stepper, Title } from '@mantine/core';

import { HeaderBar } from 'shared/ui/HeaderBar';

import { PassenderData } from './components/PassenderData';

import styles from './BuyTicketPage.module.scss';

export const BuyTicketPage = () => {
  const [activeStep, setActiveStep] = useState(0);

  const nextStep = () => setActiveStep((current) => (current < 4
    ? current + 1 : current));

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
            active={activeStep}
            onStepClick={setActiveStep}
            allowNextStepsSelect={false}
            classNames={{ content: styles.step }}
            color="lime"
          >
            <Stepper.Step>
              <Title order={2} className={styles.title}>
                Данные пассажира
              </Title>
              <PassenderData />
            </Stepper.Step>
            <Stepper.Step>
              2
            </Stepper.Step>
            <Stepper.Step>
              3
            </Stepper.Step>
            <Stepper.Step>
              4
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
