import { Container } from '@mantine/core';
import React, { ReactNode } from 'react';

import styles from './Banner.module.scss';

type Props = {
    children: ReactNode;
}

export const Banner = ({ children }: Props) => {
  return (
    <div className={styles.bannerWrapper}>
      <Container className={styles.banner}>{children}</Container>
    </div>
  );
};
