import React from 'react';
import { Button, Card, Center, Container, Space, Stack, TextInput, Title } from '@mantine/core';

import { HeaderBar } from 'shared/ui/HeaderBar';

import styles from './LoginPage.module.scss';

export const LoginPage = () => {
  return (
    <div className={styles.page}>
      <HeaderBar theme="dark" />
      <Container>
        <Center>
          <Stack>
            <Title>Войти в профиль</Title>
            <Space h={'lg'} />
            <Card radius={'lg'} padding="lg">
              <Stack spacing={'lg'}>
                <TextInput label="Логин" required />
                <TextInput label="Пароль" type={'password'} required />
                <Space h={'xs'} />
                <Button disabled>Войти</Button>
              </Stack>
            </Card>
          </Stack>
        </Center>
      </Container>
    </div>
  );
};
