import React from 'react';
import { useHistory } from 'react-router';
import { Button, Card, Stack, Text, Textarea } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useAppStore } from 'store';
import { z } from 'zod';

import { UserMotivationLetter } from 'domain/user';

import styles from './AboutGuest.module.scss';

const INIT_FORM: UserMotivationLetter = {
  about_baggage: '',
  about_cocktail: '',
  about_plane: '',
  about_vacation: '',
};

const schema = z.object({
  about_baggage: z.string().nonempty('Заполните это поле'),
  about_cocktail: z.string().nonempty('Заполните это поле'),
  about_plane: z.string().nonempty('Заполните это поле'),
  about_vacation: z.string().nonempty('Заполните это поле'),
});

export const AboutGuest = () => {
  const {
    incrementFormId,
    motivationLetter,
    setMotivationLetter,
  } = useAppStore();

  const history = useHistory();

  const form = useForm<UserMotivationLetter>({
    initialValues: motivationLetter || INIT_FORM,
    validate: zodResolver(schema),
  });

  const submit = () => {
    const { hasErrors } = form.validate();

    if (!hasErrors) {
      setMotivationLetter(form.values);
      history.push('/confirm-booking');
    }
  };

  return (
    <div className={styles.form}>
      <Card className={styles.wrapper} shadow="sm">
        <Stack spacing={'lg'}>
          <Textarea
            label="Какие вещи будут в твоём чемодане?"
            required
            placeholder="Перечисли всё, что возьмёшь с собой, и объясни зачем"
            {...form.getInputProps('about_baggage')}
          />
          <Textarea
            label="Расскажи, какой ты коктейль в мини-баре?"
            required
            placeholder="Обязательно объясни свой выбор"
            {...form.getInputProps('about_cocktail')}
          />
          <Textarea
            label="Почему отдых в КТУрции с тобой будет незабываемым?"
            required
            placeholder="Опиши, как ты умеешь отдыхать"
            {...form.getInputProps('about_vacation')}
          />
          <Textarea
            label="В самолёте осталось одно место, мы выбираем между тобой и пилотом. Почему нужно взять именно тебя?"
            required
            placeholder="Убеди нас лететь без пилота"
            {...form.getInputProps('about_plane')}
          />
          <Text>
        * Обязательно подпишитесь на группу <a href="https://vk.com/ktu.crew" target={'_blank'} rel="noreferrer">Актив КТУ</a> и разрешите отправку сообщений!
        Иначе вы не сможете подтвердить своё участие :(
          </Text>
          <Button onClick={submit}>
              Забронировать!
          </Button>
        </Stack>
      </Card>
    </div>
  );
};
