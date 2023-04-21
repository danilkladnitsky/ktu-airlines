import React from 'react';
import { Avatar, Badge, Button, TextInput } from '@mantine/core';

import styles from './PassenderData.module.scss';

export const PassenderData = () => {
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
            <TextInput label="Имя" required />
            <TextInput label="Фамилия" required />
            <TextInput label="Номер ИСУ" required />
          </div>
          <div className={styles.fieldGroup}>
            <TextInput label="Ссылка на ВК" required />
            <TextInput label="Телефон" required />
            <TextInput label="Номер группы" required />
          </div>
        </div>
      </div>
      <Button>Далее</Button>
    </div>
  );
};
