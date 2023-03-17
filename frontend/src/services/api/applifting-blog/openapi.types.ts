/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Pagination {
  /** Number of items skipped during pagination */
  offset?: number;
  /** Number of items returned */
  limit?: number;
  /** Total number of items */
  total?: number;
}

export interface ArticleList {
  pagination?: Pagination;
  items?: Article[];
}

export interface Article {
  /** @format uuid */
  articleId?: string;
  /** @example "Lorem Ipsum" */
  title?: string;
  /** @example "Lorem Ipsum is simply dummy text of the printing and typesetting industry." */
  perex?: string;
  /** @format uuid */
  imageId?: string;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  lastUpdatedAt?: string;
}

export type ArticleDetail = Article & {
  /**
   * @format markdown
   * @example "# Lorem Ipsum **Lorem Ipsum** is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
   * "
   */
  content?: string;
  comments?: Comment[];
};

export interface Comment {
  /** @format uuid */
  commentId?: string;
  /** @format uuid */
  articleId: string;
  /** @example "Jan Novak" */
  author: string;
  /** @example "This article is on point and very inspirational." */
  content: string;
  /** @format date-time */
  postedAt?: string;
  /** @example 42 */
  score?: number;
}

export interface ImageInfo {
  /** @format uuid */
  imageId: string;
  /** @example "screenshot.png" */
  name?: string;
}

export interface Tenant {
  /** @format uuid */
  tenantId?: string;
  /**
   * API key to be used in the `api-key` header
   * @format uuid
   */
  apiKey?: string;
  /**
   * Human readable name of the tenant
   * @example "Jan Novak"
   */
  name?: string;
  /**
   * Authentication password of the tenant
   * @format password
   * @example "correct horse battery staple"
   */
  password?: string;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  lastUsedAt?: string;
}

export interface AccessToken {
  /**
   * Use this when requesting authenticated API endpoints
   * @format uuid
   */
  access_token?: string;
  /**
   * Number of seconds before the access_token expires
   * @example 3600
   */
  expires_in?: number;
  /**
   * Token type. Will always be bearer
   * @example "bearer"
   */
  token_type?: string;
}
