import React from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Flex } from '@mantine/core';

import { HOTELS } from 'domain/hotel';

import { Hotel } from './Hotel';

import styles from './HotelsList.module.scss';

export const HotelsList = () => {
  const [animationParent] = useAutoAnimate();

  return (
    <Flex className={styles.list} ref={animationParent}>
      {HOTELS.map((hotel) => <Hotel hotel={hotel} />)}
    </Flex>
  );
};
