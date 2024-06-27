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
  create(body: ApplicationCreateParams, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.post('/v1/application', {
      body,
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }
}

export interface ApplicationCreateParams {
  model_name: string;

  name: string;

  type: string;

  user_id: string;
}

export namespace Applications {
  export import ApplicationCreateParams = ApplicationsAPI.ApplicationCreateParams;
  export import Evaluations = EvaluationsAPI.Evaluations;
  export import Production = ProductionAPI.Production;
}
