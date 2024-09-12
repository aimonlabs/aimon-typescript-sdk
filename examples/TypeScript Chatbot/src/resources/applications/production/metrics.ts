// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import * as Core from '../../../core';
import * as MetricsAPI from './metrics';

export class Metrics extends APIResource {
  /**
   * Fetch production metrics of an application
   */
  retrieve(
    query: MetricRetrieveParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<MetricRetrieveResponse> {
    return this._client.get('/v1/application/production/metrics', { query, ...options });
  }
}

export interface MetricRetrieveResponse {
  evaluations?: Array<MetricRetrieveResponse.Evaluation>;
}

export namespace MetricRetrieveResponse {
  export interface Evaluation {
    /**
     * The name of the metric
     */
    metricName?: string;

    /**
     * The timestamp when the metric was recorded
     */
    timestamp?: string;

    /**
     * The value of the metric
     */
    value?: number;
  }
}

export interface MetricRetrieveParams {
  application_name: string;

  end_timestamp?: string;

  start_timestamp?: string;

  version?: string;
}

export namespace Metrics {
  export import MetricRetrieveResponse = MetricsAPI.MetricRetrieveResponse;
  export import MetricRetrieveParams = MetricsAPI.MetricRetrieveParams;
}
