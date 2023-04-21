import React from 'react';
import { Container } from '@mantine/core';

import { Banner, Header, TicketList } from 'shared/ui';
import { LoadingStatus } from 'shared/ui';

import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <Banner>
        <Header />
      </Banner>
      {false && <LoadingStatus
        className={styles.loader}
        title="Ищем авиабилеты..."
        description="Уже можно собирать чемоданы!"
      />}
      <Container className={styles.ticketList}>
        <TicketList tickets={[{},{}]} />
      </Container>
    </div>
  );
};
