import React from 'react';

import { Banner, Header } from 'shared/ui';
import { LoadingStatus } from 'shared/ui/LoadingStatus';

import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <Banner>
        <Header />
      </Banner>
      <div className={styles.loader}>
        <LoadingStatus title="Ищем авиабилеты..." description="Уже можно собирать чемоданы!" />
      </div>
    </div>
  );
};
