import React, { useEffect, useState } from 'react';
import { Container } from '@mantine/core';
import { useAppStore } from 'store';

import { Banner, Header, TicketList } from 'shared/ui';
import { LoadingStatus } from 'shared/ui';

import styles from './HomePage.module.scss';

export const HomePage = () => {
  const { ticketSelected } = useAppStore();

  const [ticketsFound, setTicketsFound] = useState(false);

  useEffect(() => {
    ticketSelected && setTimeout(() => setTicketsFound(true), 1500);
  }, [ticketSelected]);

  const showLoader = !ticketsFound && ticketSelected;

  return (
    <div className={styles.homePage}>
      <Banner>
        <Header />
      </Banner>
      {showLoader && <LoadingStatus
        className={styles.loader}
        title="Ищем авиабилеты..."
        description="Уже можно собирать чемоданы!"
      />}
      {ticketsFound && <Container className={styles.ticketList}>
        <TicketList tickets={[{}, {}]} />
      </Container>
      }
    </div>
  );
};
