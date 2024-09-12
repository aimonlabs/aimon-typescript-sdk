// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as EvaluationsAPI from './evaluations';
import * as RunAPI from './run';

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

export namespace Evaluations {
  export import EvaluationCreateResponse = EvaluationsAPI.EvaluationCreateResponse;
  export import EvaluationRetrieveResponse = EvaluationsAPI.EvaluationRetrieveResponse;
  export import EvaluationCreateParams = EvaluationsAPI.EvaluationCreateParams;
  export import EvaluationRetrieveParams = EvaluationsAPI.EvaluationRetrieveParams;
  export import Run = RunAPI.Run;
  export import RunCreateResponse = RunAPI.RunCreateResponse;
  export import RunCreateParams = RunAPI.RunCreateParams;
}
