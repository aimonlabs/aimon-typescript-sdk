// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as CollectionAPI from './collection';

export class Collection extends APIResource {
  /**
   * Create a new dataset collection
   */
  create(body: CollectionCreateParams, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.post('/v1/dataset-collection', {
      body,
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }
}

export interface CollectionCreateParams {
  /**
   * A list of dataset IDs included in this collection.
   */
  dataset_ids: Array<string>;

  name: string;

  user_id: string;

  description?: string;
}

export namespace Collection {
  export import CollectionCreateParams = CollectionAPI.CollectionCreateParams;
}
