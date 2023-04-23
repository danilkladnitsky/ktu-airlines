import React from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { SimpleGrid } from '@mantine/core';

import { Hotel } from './Hotel';

export const HotelsList = () => {
  const [animationParent] = useAutoAnimate();

  return (
    <SimpleGrid cols={3} breakpoints={[
      { maxWidth: '62rem', cols: 2, spacing: 'md' },
      { maxWidth: '48rem', cols: 1, spacing: 'md' },
    ]} ref={animationParent}>
      <Hotel />
      <Hotel />
      <Hotel />
    </SimpleGrid>
  );
};
