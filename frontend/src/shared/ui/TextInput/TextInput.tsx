import React from 'react';
import {
  TextInput as MantineTextInput,
  TextInputProps as MantineTextInputProps,
} from '@mantine/core';

import styles from './TextInput.module.scss';

export const TextInput = (props: MantineTextInputProps) => {
  return (
    <MantineTextInput {...props} classNames={{
      wrapper: styles.textInput,
      input: styles.textInput,
    }} />
  );
};
