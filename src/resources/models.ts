// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Models extends APIResource {
  /**
   * Create a new model
   */
  create(body: ModelCreateParams, options?: Core.RequestOptions): Core.APIPromise<ModelCreateResponse> {
    return this._client.post('/v1/model', { body, ...options });
  }

  /**
   * Retrieve a model by name
   */
  retrieve(
    query: ModelRetrieveParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ModelRetrieveResponse> {
    return this._client.get('/v1/model', { query, ...options });
  }

  /**
   * List model types
   */
  list(options?: Core.RequestOptions): Core.APIPromise<ModelListResponse> {
    return this._client.get('/v1/list-model-types', options);
  }
}

export interface ModelCreateResponse {
  description: string;

  name: string;

  type: string;

  id?: string;

  company_id?: string;

  metadata?: unknown;
}

export interface ModelRetrieveResponse {
  description: string;

  name: string;

  type: string;

  id?: string;

  company_id?: string;

  metadata?: unknown;
}

export type ModelListResponse = Array<string>;

export interface ModelCreateParams {
  description: string;

  name: string;

  type: string;

  id?: string;

  company_id?: string;

  metadata?: unknown;
}

export interface ModelRetrieveParams {
  name: string;

  type: string;
}

export declare namespace Models {
  export {
    type ModelCreateResponse as ModelCreateResponse,
    type ModelRetrieveResponse as ModelRetrieveResponse,
    type ModelListResponse as ModelListResponse,
    type ModelCreateParams as ModelCreateParams,
    type ModelRetrieveParams as ModelRetrieveParams,
  };
}
