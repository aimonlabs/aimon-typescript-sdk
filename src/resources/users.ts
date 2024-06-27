// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as UsersAPI from './users';

export class Users extends APIResource {
  /**
   * Create a new user
   */
  create(body: UserCreateParams, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.post('/v1/user', {
      body,
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }

  /**
   * Get user details by email
   */
  retrieve(query: UserRetrieveParams, options?: Core.RequestOptions): Core.APIPromise<User> {
    return this._client.get('/v1/user', { query, ...options });
  }

  /**
   * Validate API key
   */
  validate(apiKey: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.get(`/v1/api-key/${apiKey}/validate`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }
}

export interface User {
  id: string;

  email: string;

  phone: string;

  username: string;

  firstName?: string;

  lastName?: string;

  userStatus?: number;
}

export interface UserCreateParams {
  id: string;

  email: string;

  phone: string;

  username: string;

  firstName?: string;

  lastName?: string;

  userStatus?: number;
}

export interface UserRetrieveParams {
  email: string;
}

export namespace Users {
  export import User = UsersAPI.User;
  export import UserCreateParams = UsersAPI.UserCreateParams;
  export import UserRetrieveParams = UsersAPI.UserRetrieveParams;
}
