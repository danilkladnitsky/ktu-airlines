import React from 'react';

import { Banner, Header } from 'shared/ui';
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
    </div>
  );
};
