import React, { useEffect } from 'react';
import { Center, Container, Title } from '@mantine/core';
import { useAppStore } from 'store';

import { NEWS } from 'domain/news';
import { TICKETS } from 'domain/ticket';

import { Banner, Header, TicketList } from 'shared/ui';
import { LoadingStatus } from 'shared/ui';
import { NewsList } from 'shared/ui/NewsList';

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
        <Container className={styles.ticketList}>
          {ticketSelected && <TicketList tickets={TICKETS} />}
          <NewsList news={NEWS} />
        </Container>
      </div>

    </div>
  );
};
