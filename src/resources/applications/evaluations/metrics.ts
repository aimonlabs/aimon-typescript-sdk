// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import * as Core from '../../../core';
import * as MetricsAPI from './metrics';

export class Metrics extends APIResource {
  /**
   * Fetch metrics for a specific evaluation of an application
   */
  retrieve(
    evaluationId: string,
    query: MetricRetrieveParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<MetricRetrieveResponse> {
    return this._client.get(`/v1/application/evaluations/${evaluationId}/metrics`, { query, ...options });
  }

  /**
   * Fetch metrics for all evaluations of an application
   */
  list(query: MetricListParams, options?: Core.RequestOptions): Core.APIPromise<MetricListResponse> {
    return this._client.get('/v1/application/evaluations/metrics', { query, ...options });
  }

  /**
   * Fetch metrics for a specific run of a specific evaluation
   */
  listRunMetrics(
    evaluationId: string,
    evaluationRunId: string,
    query: MetricListRunMetricsParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<MetricListRunMetricsResponse> {
    return this._client.get(`/v1/application/evaluations/${evaluationId}/run/${evaluationRunId}/metrics`, {
      query,
      ...options,
    });
  }
}

export interface MetricRetrieveResponse {
  evaluations?: Array<unknown>;
}

export interface MetricListResponse {
  evaluations?: Array<unknown>;
}

export interface MetricListRunMetricsResponse {
  evaluations?: Array<MetricListRunMetricsResponse.Evaluation>;
}

export namespace MetricListRunMetricsResponse {
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
  /**
   * The name of the application for which metrics are being fetched
   */
  application_name: string;

  /**
   * The end timestamp for filtering metrics data
   */
  end_timestamp?: string;

  /**
   * The start timestamp for filtering metrics data
   */
  start_timestamp?: string;

  /**
   * The version of the application
   */
  version?: string;
}

export interface MetricListParams {
  application_name: string;

  end_timestamp?: string;

  start_timestamp?: string;

  version?: string;
}

export interface MetricListRunMetricsParams {
  /**
   * The name of the application for which metrics are being fetched
   */
  application_name: string;

  /**
   * The end timestamp for filtering metrics data
   */
  end_timestamp?: string;

  /**
   * The start timestamp for filtering metrics data
   */
  start_timestamp?: string;

  /**
   * The version of the application
   */
  version?: string;
}

export namespace Metrics {
  export import MetricRetrieveResponse = MetricsAPI.MetricRetrieveResponse;
  export import MetricListResponse = MetricsAPI.MetricListResponse;
  export import MetricListRunMetricsResponse = MetricsAPI.MetricListRunMetricsResponse;
  export import MetricRetrieveParams = MetricsAPI.MetricRetrieveParams;
  export import MetricListParams = MetricsAPI.MetricListParams;
  export import MetricListRunMetricsParams = MetricsAPI.MetricListRunMetricsParams;
}
