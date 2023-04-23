import React, { useEffect } from 'react';
import { Container } from '@mantine/core';
import { useAppStore } from 'store';

import { TICKETS } from 'domain/ticket';

import { Banner, Header, TicketList } from 'shared/ui';
import { LoadingStatus } from 'shared/ui';

import styles from './HomePage.module.scss';

export const HomePage = () => {
  const { ticketSelected, ticketsAreLoading, resetTicket } = useAppStore();

  useEffect(() => {
    resetTicket();
  }, []);

  return (
    <div className={styles.wrapper}>
      <Banner>
        <Header />
      </Banner>
      <div className={styles.homePage}>
        {ticketsAreLoading && <LoadingStatus
          className={styles.loader}
          title="Ищем авиабилеты..."
          description="Уже можно собирать чемоданы!"
        />}
        {
          ticketSelected && <Container className={styles.ticketList}>
            <TicketList tickets={TICKETS} />
          </Container>
        }
      </div>

    </div>
  );
};
