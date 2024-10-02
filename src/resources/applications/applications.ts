// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as ApplicationsAPI from './applications';
import * as EvaluationsAPI from './evaluations/evaluations';
import * as ProductionAPI from './production/production';

export class Applications extends APIResource {
  evaluations: EvaluationsAPI.Evaluations = new EvaluationsAPI.Evaluations(this._client);
  production: ProductionAPI.Production = new ProductionAPI.Production(this._client);

  /**
   * Create a new application
   */
  create(
    body: ApplicationCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ApplicationCreateResponse> {
    return this._client.post('/v1/application', { body, ...options });
  }

  /**
   * Retrieve an application by name, user_id, and version
   */
  retrieve(
    query: ApplicationRetrieveParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ApplicationRetrieveResponse> {
    return this._client.get('/v1/application', { query, ...options });
  }

  /**
   * Delete an application by name, stage, and version
   */
  delete(
    params: ApplicationDeleteParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ApplicationDeleteResponse> {
    const { name, stage, version } = params;
    return this._client.delete('/v1/application', { query: { name, stage, version }, ...options });
  }
}

export interface ApplicationCreateResponse {
  model_name: string;

  name: string;

  type: string;

  id?: string;

  company_id?: string;

  context_source_id?: string;

  last_query_timestamp?: string;

  metadata?: unknown;

  model_id?: string;

  stage?: string;

  user_id?: string;

  version?: string;
}

export interface ApplicationRetrieveResponse {
  model_name: string;

  name: string;

  type: string;

  id?: string;

  company_id?: string;

  context_source_id?: string;

  last_query_timestamp?: string;

  metadata?: unknown;

  model_id?: string;

  stage?: string;

  user_id?: string;

  version?: string;
}

export interface ApplicationDeleteResponse {
  application?: ApplicationDeleteResponse.Application;

  message?: string;
}

export namespace ApplicationDeleteResponse {
  export interface Application {
    model_name: string;

    name: string;

    type: string;

    id?: string;

    company_id?: string;

    context_source_id?: string;

    last_query_timestamp?: string;

    metadata?: unknown;

    model_id?: string;

    stage?: string;

    user_id?: string;

    version?: string;
  }
}

export interface ApplicationCreateParams {
  model_name: string;

  name: string;

  type: string;

  id?: string;

  company_id?: string;

  context_source_id?: string;

  last_query_timestamp?: string;

  metadata?: unknown;

  model_id?: string;

  stage?: string;

  user_id?: string;

  version?: string;
}

export interface ApplicationRetrieveParams {
  name: string;

  stage: string;

  type: string;
}

export interface ApplicationDeleteParams {
  /**
   * The name of the application to delete
   */
  name: string;

  /**
   * The stage of the application (e.g., production, evaluation)
   */
  stage: string;

  /**
   * The version of the application to delete
   */
  version: string;
}

export namespace Applications {
  export import ApplicationCreateResponse = ApplicationsAPI.ApplicationCreateResponse;
  export import ApplicationRetrieveResponse = ApplicationsAPI.ApplicationRetrieveResponse;
  export import ApplicationDeleteResponse = ApplicationsAPI.ApplicationDeleteResponse;
  export import ApplicationCreateParams = ApplicationsAPI.ApplicationCreateParams;
  export import ApplicationRetrieveParams = ApplicationsAPI.ApplicationRetrieveParams;
  export import ApplicationDeleteParams = ApplicationsAPI.ApplicationDeleteParams;
  export import Evaluations = EvaluationsAPI.Evaluations;
  export import Production = ProductionAPI.Production;
}
