import React from 'react';
import { Box, Image, Title } from '@mantine/core';

import styles from './Header.module.scss';

export const Header = () => {
  return (
    <div>
      <Box className={styles.header}>
        <Title className={styles.headerTitle}>ktu.airlines</Title>
        <Image className={styles.headerLogo} fit="contain" width={56} height={56} radius={56} src={'logo.jpg'} />
      </Box>
      <Box className={styles.slogan}>
        <Title className={styles.sloganText}>Летайте вместе с нами!</Title>
      </Box>
    </div>
  );
};
