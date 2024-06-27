// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as RunAPI from './run';

export class Run extends APIResource {
  /**
   * Create a new evaluation run
   */
  create(body: RunCreateParams, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.post('/v1/evaluation-run', {
      body,
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }
}

export interface RunCreateParams {
  id: string;

  created_at: string;

  evaluation_id: string;

  run_number: number;

  results?: Record<string, unknown>;

  status?: string;
}

export namespace Run {
  export import RunCreateParams = RunAPI.RunCreateParams;
}
