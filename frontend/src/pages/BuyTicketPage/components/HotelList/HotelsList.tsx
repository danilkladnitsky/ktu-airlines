import React from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { SimpleGrid } from '@mantine/core';

import { Hotel } from './Hotel';

export const HotelsList = () => {
  const [animationParent] = useAutoAnimate();

  return (
    <SimpleGrid cols={3} ref={animationParent}>
      <Hotel />
      <Hotel />
      <Hotel />
    </SimpleGrid>
  );
};
