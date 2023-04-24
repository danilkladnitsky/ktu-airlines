import React from 'react';
import { Card, CardSection, Center, Image, SimpleGrid, Space, Stack, Text, Title } from '@mantine/core';

import { NewsItem as NewsItemType } from 'domain/news';

import styles from './NewsList.module.scss';

export const NewsList = ({ news }:{news: NewsItemType[]}) => {
  return (
    <div>
      <Space h={'lg'} />
      <Center>
        <Title>Новости</Title>
      </Center>
      <SimpleGrid breakpoints={[{ maxWidth: 'sm', cols: 1 }]} className={styles.list} cols={3}>{
        news.map(item => <NewsItem {...item} key={item.title} />)
      }
      </SimpleGrid>
    </div>

  );
};

const NewsItem = ({ text,thumbnail,title }: NewsItemType) => {
  return (
    <Card shadow={'sm'} padding="xl" radius={'lg'} >
      <CardSection>
        <Image src={thumbnail} alt={title} height={140} />
      </CardSection>
      <Stack className={styles.content}>
        <Title order={4}>{title}</Title>
        <Text>{text}</Text>
      </Stack>
    </Card>
  );
};
