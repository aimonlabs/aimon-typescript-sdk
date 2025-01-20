// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Users extends APIResource {
  /**
   * Create a new user
   */
  create(body: UserCreateParams, options?: Core.RequestOptions): Core.APIPromise<User> {
    return this._client.post('/v1/user', { body, ...options });
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
  validate(apiKey: string, options?: Core.RequestOptions): Core.APIPromise<UserValidateResponse> {
    return this._client.get(`/v1/api-key/${apiKey}/validate`, options);
  }
}

export interface User {
  id: string;

  email: string;

  phone: string;

  username: string;

  auth0_id?: string;

  bio?: string;

  company_id?: string;

  date_joined?: string;

  firstName?: string;

  is_active?: boolean;

  is_staff?: boolean;

  is_superuser?: boolean;

  last_login?: string;

  lastName?: string;

  userStatus?: number;
}

export interface UserValidateResponse {
  company_id?: string;
}

export interface UserCreateParams {
  id: string;

  email: string;

  phone: string;

  username: string;

  auth0_id?: string;

  bio?: string;

  company_id?: string;

  date_joined?: string;

  firstName?: string;

  is_active?: boolean;

  is_staff?: boolean;

  is_superuser?: boolean;

  last_login?: string;

  lastName?: string;

  userStatus?: number;
}

export interface UserRetrieveParams {
  email: string;
}

export declare namespace Users {
  export {
    type User as User,
    type UserValidateResponse as UserValidateResponse,
    type UserCreateParams as UserCreateParams,
    type UserRetrieveParams as UserRetrieveParams,
  };
}
