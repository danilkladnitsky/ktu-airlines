import React from 'react';
import { Button, Card, Group, Image, List, Rating, Space, Stack, Text, Title } from '@mantine/core';
import { useAppStore } from 'store';

export const Hotel = () => {
  const { incrementFormId } = useAppStore();

  return (
    <Card shadow={'sm'} padding="xl" radius={'lg'}>
      <Card.Section>
        <Image
          src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
          height={160}
          alt="Norway"
        />
      </Card.Section>
      <Group position="apart" mt="md" mb="xs">
        <Title order={4}>KTU Resort Hotel 5</Title>
        <Rating value={4.5} readOnly size={'xs'} />
      </Group>
      <Stack>
        <Text size="sm">
          <Title order={5}>
            Про отель
          </Title>
        Это идеальное место для тех, кто хочет насладиться природой и отдохнуть от городской суеты.
        Расположенный на берегу озера, отель предлагает своим гостям комфортабельные домики с прекрасным видом на природу.
        </Text>
        <Title order={5}>
            Удобства и услуги
        </Title>
        <List size={16}>
          <List.Item>Трансфер</List.Item>
          <List.Item>Питание</List.Item>
          <List.Item>SPA</List.Item>
        </List>
        <Button variant="light" color="blue" fullWidth mt="md" radius="md" onClick={incrementFormId}>
            Выбрать
        </Button>
      </Stack>
    </Card>
  );
};
