import React from 'react';
import { Loader, Title } from '@mantine/core';
import classNames from 'classnames';

import styles from './LoadingStatus.module.scss';

type Props = {
  title: string;
  description: string;
  className?: string;
}

export const LoadingStatus = ({
  description,
  title,
  className,
}: Props) => {
  return (
    <div className={classNames(styles.loadingWrapper, className)}>
      <Loader size={'lg'} color="lime" />
      <div>
        <Title order={2} className={styles.title}>
          {title}
        </Title>
        <Title order={4} className={styles.description}>
          {description}
        </Title>
      </div>
    </div>
  );
};
