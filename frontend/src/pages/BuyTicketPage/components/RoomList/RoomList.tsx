import React from 'react';
import { SimpleGrid } from '@mantine/core';

import { ROOMS } from 'domain/room';

import { Room } from 'shared/ui/Room';

export const RoomList = () => {
  return (
    <SimpleGrid cols={3} breakpoints={[
      { maxWidth: '62rem', cols: 2, spacing: 'md' },
      { maxWidth: '48rem', cols: 1, spacing: 'md' },
    ]}>
      {ROOMS.map(room => <Room room={room} key={room.name} />)}
    </SimpleGrid>
  );
};
