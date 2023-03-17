import axios from 'axios';

import { AccessToken, Article, ImageInfo, Tenant } from './openapi.types';

const apiClient = axios.create({
  baseURL: 'https://fullstack.exercise.applifting.cz/',
});

apiClient.interceptors.request.use((config) => {
  config.headers.Authorization = '';
  config.headers['X-API-KEY'] = process.env.REACT_APP_BLOG_API_KEY;

  return config;
});

export const BlogApi = {
  authentication: {
    login: (params: { username: string; password: string }) =>
      apiClient.get<AccessToken>('login', { params }).then(({ data }) => data),
  },
  articles: {
    getAll: (params?: { offset: number; limit?: number }) =>
      apiClient.get<Article[]>('articles', { params: params ?? {} }),
    get: ({ articleId }: { articleId: string }) =>
      apiClient.get<Article>(`articles/${articleId}`).then(({ data }) => data),
    create: (body: {
      title: string;
      perex: string;
      imageId: string;
      content: string;
    }) => apiClient.post<Article>('articles', body).then(({ data }) => data),
    update: (body: {
      articleId: string;
      title: string;
      perex: string;
      imageId: string;
      content: string;
    }) => apiClient.patch<Article>('articles', body).then(({ data }) => data),
    delete: ({ articleId }: { articleId: string }) =>
      apiClient.delete<never>(`articles/${articleId}`).then(({ data }) => data),
  },
  comments: {
    create: (body: { articleId: string; author: string; content: string }) =>
      apiClient.post<Article>('comments', body).then(({ data }) => data),
    voteUp: ({ commentId }: { commentId: string }) =>
      apiClient
        .post<Article>(`comments/${commentId}/vote/up`)
        .then(({ data }) => data),
    voteDown: ({ commentId }: { commentId: string }) =>
      apiClient
        .post<Article>(`comments/${commentId}/vote/down`)
        .then(({ data }) => data),
  },
  images: {
    get: ({ imageId }: { imageId: string }) =>
      apiClient.get<never>(`images/${imageId}`).then(({ data }) => data),
    upload: ({ imageFile }: { imageFile: File }) =>
      apiClient
        .post<ImageInfo>('images', imageFile, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(({ data }) => data),
    delete: ({ imageId }: { imageId: string }) =>
      apiClient.delete<never>(`images/${imageId}`).then(({ data }) => data),
  },
  multitenancy: {
    get: ({ tenantId }: { tenantId: string }) =>
      apiClient.get<Tenant>(`tenants/${tenantId}`).then(({ data }) => data),
    create: (body: { name: string; password: string }) =>
      apiClient.post<Tenant>('tenants', body).then(({ data }) => data),
  },
};
