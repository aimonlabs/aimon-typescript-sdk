// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as RecordsAPI from './records';

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

export namespace Records {
  export import RecordListResponse = RecordsAPI.RecordListResponse;
  export import RecordListParams = RecordsAPI.RecordListParams;
}
