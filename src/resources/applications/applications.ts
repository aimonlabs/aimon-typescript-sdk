// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as ApplicationsAPI from './applications';
import * as MetricsAPI from './metrics';

export class Applications extends APIResource {
  metrics: MetricsAPI.Metrics = new MetricsAPI.Metrics(this._client);

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
  export import Metrics = MetricsAPI.Metrics;
  export import MetricListResponse = MetricsAPI.MetricListResponse;
  export import MetricListOneResponse = MetricsAPI.MetricListOneResponse;
  export import MetricListRunMetricsResponse = MetricsAPI.MetricListRunMetricsResponse;
  export import MetricListParams = MetricsAPI.MetricListParams;
  export import MetricListOneParams = MetricsAPI.MetricListOneParams;
  export import MetricListRunMetricsParams = MetricsAPI.MetricListRunMetricsParams;
}
