// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';

export class Records extends APIResource {
  /**
   * Get dataset records by SHA
   */
  list(query: RecordListParams, options?: Core.RequestOptions): Core.APIPromise<RecordListResponse> {
    return this._client.get('/v1/dataset-records', { query, ...options });
  }
}

export type RecordListResponse = Array<unknown>;

export interface RecordListParams {
  sha: string;
}

export declare namespace Records {
  export { type RecordListResponse as RecordListResponse, type RecordListParams as RecordListParams };
}
