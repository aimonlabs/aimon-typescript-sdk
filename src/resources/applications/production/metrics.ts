// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import * as Core from '../../../core';
import * as MetricsAPI from './metrics';

export class Metrics extends APIResource {
  /**
   * Fetch production metrics of an application
   */
  retrive(query: MetricRetriveParams, options?: Core.RequestOptions): Core.APIPromise<MetricRetriveResponse> {
    return this._client.get('/v1/application/production/metrics', { query, ...options });
  }
}

export interface MetricRetriveResponse {
  evaluations?: Array<unknown>;
}

export interface MetricRetriveParams {
  application_name: string;

  end_timestamp?: string;

  start_timestamp?: string;

  version?: string;
}

export namespace Metrics {
  export import MetricRetriveResponse = MetricsAPI.MetricRetriveResponse;
  export import MetricRetriveParams = MetricsAPI.MetricRetriveParams;
}
