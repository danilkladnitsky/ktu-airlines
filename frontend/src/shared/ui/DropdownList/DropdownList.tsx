import React from 'react';
import { Select, SelectProps } from '@mantine/core';

import styles from './DropdownList.module.scss';

export const DropdownList = (props:SelectProps) => {
  return (
    <Select {...props} classNames={{
      root: styles.root,
      wrapper: styles.list,
      input: styles.input,
      description: styles.description,
    }} />
  );
};
