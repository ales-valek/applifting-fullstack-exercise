import { ComponentStory, ComponentMeta } from '@storybook/react';

import Article from './';

export default {
  title: 'Article',
  component: Article,
} as ComponentMeta<typeof Article>;

export const Default: ComponentStory<typeof Article> = () => (
  <Article
    articleUrl="#"
    perex="Lorem ipsum"
    title="Super article"
    imgId="#"
    postDate="17/8/22"
  />
);
