// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';

export class Run extends APIResource {
  /**
   * Create a new evaluation run
   */
  create(body: RunCreateParams, options?: Core.RequestOptions): Core.APIPromise<RunCreateResponse> {
    return this._client.post('/v1/evaluation-run', { body, ...options });
  }
}

export interface RunCreateResponse {
  evaluation_id: string;

  id?: string;

  completed_time?: string;

  creation_time?: string;

  metadata?: unknown;

  metrics_config?: unknown;

  metrics_path?: string;

  model_output_path?: string;

  run_number?: number;
}

export interface RunCreateParams {
  evaluation_id: string;

  id?: string;

  completed_time?: string;

  creation_time?: string;

  metadata?: unknown;

  metrics_config?: unknown;

  metrics_path?: string;

  model_output_path?: string;

  run_number?: number;
}

export declare namespace Run {
  export { type RunCreateResponse as RunCreateResponse, type RunCreateParams as RunCreateParams };
}
