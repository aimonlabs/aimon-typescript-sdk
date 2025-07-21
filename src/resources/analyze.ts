// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Analyze extends APIResource {
  /**
   * Save and compute metrics
   */
  create(body: AnalyzeCreateParams, options?: Core.RequestOptions): Core.APIPromise<AnalyzeCreateResponse> {
    return this._client.post('/v1/save-compute-metrics', { body, ...options });
  }
}

export interface AnalyzeCreateResponse {
  message?: string;

  /**
   * Status code representing the outcome of the operation
   */
  status: number;
}

export type AnalyzeCreateParams = Array<AnalyzeCreateParams.Body>;

export namespace AnalyzeCreateParams {
  export interface Body {
    application_id: string;

    context_docs: Array<string>;

    output: string;

    prompt: string;

    user_query: string;

    version: string;

    /**
     * The timestamp when the actual request was made
     */
    actual_request_timestamp?: string;

    evaluation_id?: string | null;

    evaluation_run_id?: string | null;

    instructions?: string;

    config?: object;
  }
}

export declare namespace Analyze {
  export {
    type AnalyzeCreateResponse as AnalyzeCreateResponse,
    type AnalyzeCreateParams as AnalyzeCreateParams,
  };
}
