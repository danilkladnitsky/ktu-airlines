import React, { useEffect } from 'react';
import { Avatar, Badge, Button, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useAppStore } from 'store';
import { z } from 'zod';

import { UserBioData } from 'domain/user';

import styles from './PassengerData.module.scss';

const INIT_FORM = {
  firstName: '',
  groupName: '',
  isuNumber: '',
  phoneNumber: '',
  secondName: '',
  vkLink: '',
};

// eslint-disable-next-line no-useless-escape
const PHONE_REGEX = RegExp('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$');

const schema = z.object({
  phoneNumber: z.string().nonempty({ message: 'Номер телефона должен быть указан' })
    .refine((val) => PHONE_REGEX.test(val), { message: 'Телефонный номер некорректный' }),
  firstName: z.string().nonempty({ message: 'Имя должно быть указано' }),
  secondName: z.string().nonempty({ message: 'Фамилия должна быть указана' }),
  isuNumber: z.string().length(6, 'Номер ИСУ должен состоять из шести цифр')
    .max(100000, 'Номер ИСУ должен быть между 100000 и 999999'),
  groupName: z.string().nonempty({ message: 'Учебная группа должна быть указана' }),
  vkLink: z.string().url('Ссылка на ВК невалидна'),
});

export const PassenderData = () => {
  const { incrementFormId, setUserBio, userBio } = useAppStore();

  const form = useForm<UserBioData>({
    initialValues: userBio || INIT_FORM,
    validate: zodResolver(schema),
  });

  useEffect(() => {
    setUserBio(form.values);
  }, [form.values]);

  const submit = () => {
    form.validate();
    const { hasErrors } = form.validate();

    if (!hasErrors) {
      incrementFormId();
    }
  };

  return (
    <div className={styles.passengerData}>
      <div className={styles.form}>
        <div className={styles.uploadPhoto}>
          <Avatar w={90} h={90} radius="50%">MK</Avatar>
          <Badge color={'violet'}>
            Загрузить фото
          </Badge>
        </div>
        <div className={styles.fields}>
          <div className={styles.fieldGroup}>
            <TextInput label="Имя" required {...form.getInputProps('firstName')} />
            <TextInput label="Фамилия" required {...form.getInputProps('secondName')} />
            <TextInput label="Номер ИСУ"required {...form.getInputProps('isuNumber')} />
          </div>
          <div className={styles.fieldGroup}>
            <TextInput label="Ссылка на ВК" required {...form.getInputProps('vkLink')}/>
            <TextInput label="Телефон" required {...form.getInputProps('phoneNumber')} />
            <TextInput label="Номер группы" required {...form.getInputProps('groupName')} />
          </div>
        </div>
      </div>
      <Button onClick={submit}>Далее</Button>
    </div>
  );
};
