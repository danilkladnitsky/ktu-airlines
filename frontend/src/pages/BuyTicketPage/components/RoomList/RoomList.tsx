import React from 'react';
import { SimpleGrid } from '@mantine/core';

import { ROOMS } from 'domain/room';

import { Room } from './Room';

export const RoomList = () => {
  return (
    <SimpleGrid cols={3}>
      {ROOMS.map(room => <Room room={room} key={room.name} />)}
    </SimpleGrid>
  );
};
