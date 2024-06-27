// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as ModelsAPI from './models';

export class Models extends APIResource {
  /**
   * Create a new model
   */
  create(body: ModelCreateParams, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.post('/v1/model', {
      body,
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }

  /**
   * List model types
   */
  list(options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.get('/v1/list-model-types', {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }
}

export interface ModelCreateParams {
  name: string;

  type: string;

  description?: string | null;
}

export namespace Models {
  export import ModelCreateParams = ModelsAPI.ModelCreateParams;
}
