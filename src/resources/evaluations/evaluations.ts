// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as RunAPI from './run';
import { Run, RunCreateParams, RunCreateResponse } from './run';

export class Evaluations extends APIResource {
  run: RunAPI.Run = new RunAPI.Run(this._client);

  /**
   * Create a new evaluation
   */
  create(
    body: EvaluationCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<EvaluationCreateResponse> {
    return this._client.post('/v1/evaluation', { body, ...options });
  }

  /**
   * Get evaluations by name across the company
   */
  retrieve(
    query: EvaluationRetrieveParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<EvaluationRetrieveResponse> {
    return this._client.get('/v1/evaluations', { query, ...options });
  }
}

export interface EvaluationCreateResponse {
  application_id: string;

  dataset_collection_id: string;

  model_id: string;

  name: string;

  id?: string;

  end_time?: string;

  metadata?: unknown;

  start_time?: string;
}

export type EvaluationRetrieveResponse = Array<EvaluationRetrieveResponse.EvaluationRetrieveResponseItem>;

export namespace EvaluationRetrieveResponse {
  export interface EvaluationRetrieveResponseItem {
    application_id?: string;

    evaluation_id?: string;

    run_ids?: Array<string>;
  }
}

export interface EvaluationCreateParams {
  application_id: string;

  dataset_collection_id: string;

  model_id: string;

  name: string;

  id?: string;

  end_time?: string;

  metadata?: unknown;

  start_time?: string;
}

export interface EvaluationRetrieveParams {
  name: string;
}

Evaluations.Run = Run;

export declare namespace Evaluations {
  export {
    type EvaluationCreateResponse as EvaluationCreateResponse,
    type EvaluationRetrieveResponse as EvaluationRetrieveResponse,
    type EvaluationCreateParams as EvaluationCreateParams,
    type EvaluationRetrieveParams as EvaluationRetrieveParams,
  };

  export { Run as Run, type RunCreateResponse as RunCreateResponse, type RunCreateParams as RunCreateParams };
}
