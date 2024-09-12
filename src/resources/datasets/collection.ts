// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as CollectionAPI from './collection';

export class Collection extends APIResource {
  /**
   * Create a new dataset collection
   */
  create(
    body: CollectionCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<CollectionCreateResponse> {
    return this._client.post('/v1/dataset-collection', { body, ...options });
  }

  /**
   * Retrieve a dataset collection by name
   */
  retrieve(
    query: CollectionRetrieveParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<CollectionRetrieveResponse> {
    return this._client.get('/v1/dataset-collection', { query, ...options });
  }
}

export interface CollectionCreateResponse {
  /**
   * A list of dataset IDs included in this collection.
   */
  dataset_ids: Array<string>;

  name: string;

  id?: string;

  company_id?: string;

  creation_time?: string;

  description?: string;

  last_updated_time?: string;

  user_id?: string;
}

export interface CollectionRetrieveResponse {
  /**
   * A list of dataset IDs included in this collection.
   */
  dataset_ids: Array<string>;

  name: string;

  id?: string;

  company_id?: string;

  creation_time?: string;

  description?: string;

  last_updated_time?: string;

  user_id?: string;
}

export interface CollectionCreateParams {
  /**
   * A list of dataset IDs included in this collection.
   */
  dataset_ids: Array<string>;

  name: string;

  id?: string;

  company_id?: string;

  creation_time?: string;

  description?: string;

  last_updated_time?: string;

  user_id?: string;
}

export interface CollectionRetrieveParams {
  name: string;
}

export namespace Collection {
  export import CollectionCreateResponse = CollectionAPI.CollectionCreateResponse;
  export import CollectionRetrieveResponse = CollectionAPI.CollectionRetrieveResponse;
  export import CollectionCreateParams = CollectionAPI.CollectionCreateParams;
  export import CollectionRetrieveParams = CollectionAPI.CollectionRetrieveParams;
}
