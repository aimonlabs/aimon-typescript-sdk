// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as EvaluationsAPI from './evaluations/evaluations';
import { Evaluations } from './evaluations/evaluations';
import * as ProductionAPI from './production/production';
import { Production } from './production/production';

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

Applications.Evaluations = Evaluations;
Applications.Production = Production;

export declare namespace Applications {
  export {
    type ApplicationCreateResponse as ApplicationCreateResponse,
    type ApplicationRetrieveResponse as ApplicationRetrieveResponse,
    type ApplicationDeleteResponse as ApplicationDeleteResponse,
    type ApplicationCreateParams as ApplicationCreateParams,
    type ApplicationRetrieveParams as ApplicationRetrieveParams,
    type ApplicationDeleteParams as ApplicationDeleteParams,
  };

  export { Evaluations as Evaluations };

  export { Production as Production };
}
