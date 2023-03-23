import { Buffer } from 'buffer';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { BLOG_API_BASE_URL } from './constants';

import {
  AccessToken,
  Article,
  Comment,
  ImageInfo,
  Tenant,
} from './openapi.types';

const apiClient = axios.create({
  baseURL: BLOG_API_BASE_URL,
});

apiClient.interceptors.request.use((config) => {
  if (localStorage.getItem('auth') !== null) {
    config.headers.Authorization =
      JSON.parse(localStorage.getItem('auth') ?? '')?.token ?? '';
  }
  config.headers['X-API-KEY'] = process.env.REACT_APP_BLOG_API_KEY;

  return config;
});

export const BlogApi = {
  authentication: {
    login: (body: { username: string; password: string }) =>
      apiClient.post<AccessToken>('login', body).then(({ data }) => data),
  },
  articles: {
    getAll: (params?: { offset: number; limit?: number }) =>
      apiClient
        .get<{
          items: Article[];
          pagination: { offset: number; limit: number; total: number };
        }>('articles', { params: params ?? {} })
        .then(({ data }) => data),
    get: ({ articleId }: { articleId: string }) =>
      apiClient
        .get<Article & { content: string; comments: Comment[] }>(
          `articles/${articleId}`
        )
        .then(({ data }) => data),
    create: (body: {
      title: string;
      perex: string;
      imageId: string;
      content: string;
    }) => apiClient.post<Article>('articles', body).then(({ data }) => data),
    update: ({
      articleId,
      ...body
    }: {
      articleId: string;
      title: string;
      perex: string;
      imageId: string;
      content: string;
    }) =>
      apiClient
        .patch<Article>(`articles/${articleId}`, body)
        .then(({ data }) => data),
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
      apiClient
        .get<never>(`images/${imageId}`, {
          responseType: 'arraybuffer',
        })
        .then((response): { imageUrl: string } => {
          return {
            imageUrl: `data:${
              response.headers['content-type']
            };base64,${Buffer.from(response?.data, 'binary').toString(
              'base64'
            )}`,
          };
        }),
    upload: ({ imageFile }: { imageFile: File }) => {
      const formData = new FormData();
      formData.append('image', imageFile);
      return apiClient
        .post<ImageInfo[]>('images', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(({ data }) => data);
    },
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

export const BlogApiHooks = {
  articles: {
    useGetAll: (params?: { limit?: number; offset: number }) =>
      useQuery(
        ['articles', { limit: params?.limit, offset: params?.offset }],
        () => BlogApi.articles.getAll(params),
        {
          cacheTime: 300_000,
          staleTime: 180_000,
        }
      ),
    useGet: ({ articleId }: { articleId: string }) =>
      useQuery(
        ['articles', articleId],
        () => BlogApi.articles.get({ articleId }),
        {
          cacheTime: 180_000,
          staleTime: 60_000,
          enabled: !!articleId,
        }
      ),
    useCreate: () => {
      const queryClient = useQueryClient();
      return useMutation(BlogApi.articles.create, {
        onSuccess: () => {
          queryClient.invalidateQueries(['articles']);
        },
      });
    },
    useUpdate: () => {
      const queryClient = useQueryClient();
      return useMutation(BlogApi.articles.update, {
        onSuccess: () => {
          queryClient.invalidateQueries(['articles']);
        },
      });
    },
    useDelete: () => {
      const queryClient = useQueryClient();
      return useMutation(BlogApi.articles.delete, {
        onSuccess: () => {
          queryClient.invalidateQueries(['articles']);
        },
      });
    },
  },
  images: {
    useGet: ({ imageId }: { imageId: string }) =>
      useQuery(
        ['images', imageId],
        () => {
          if (!imageId) throw new Error();
          return BlogApi.images.get({ imageId });
        },
        {
          cacheTime: 300_000,
          staleTime: 180_000,
          retryOnMount: false,
          retry: false,
        }
      ),
    useUpload: () => useMutation(BlogApi.images.upload),
  },
};
