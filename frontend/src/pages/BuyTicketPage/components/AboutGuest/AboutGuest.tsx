import React from 'react';
import { Button, Card, Stack, Text, Textarea } from '@mantine/core';
import { useAppStore } from 'store';

import styles from './AboutGuest.module.scss';

export const AboutGuest = () => {
  const { incrementFormId } = useAppStore();

  return (
    <div className={styles.form}>
      <Card className={styles.wrapper} shadow="sm">
        <Stack spacing={'lg'}>
          <Textarea
            label="Какие вещи будут в твоём чемодане?"
            required
            placeholder="Перечисли всё, что возьмёшь с собой, и объясни зачем"
          />
          <Textarea
            label="Расскажи, какой ты коктейль в мини-баре?"
            required
            placeholder="Перечисли всё, что возьмёшь с собой, и объясни зачем"
          />
          <Textarea
            label="Почему отдых в КТУрции с тобой будет незабываемым?"
            required
            placeholder="Перечисли всё, что возьмёшь с собой, и объясни зачем"
          />
          <Textarea
            label="В самолёте осталось одно место, мы выбираем между тобой и пилотом. Почему нужно взять именно тебя?"
            required
            placeholder="Перечисли всё, что возьмёшь с собой, и объясни зачем"
          />
          <Text>
        * Обязательно подпишитесь на группу Актив КТУ
        и разрешите отправку сообщений!
        Иначе вы не сможете подтвердить своё участие :(
          </Text>
          <Button onClick={incrementFormId}>
              Забронировать!
          </Button>
        </Stack>
      </Card>
    </div>
  );
};
