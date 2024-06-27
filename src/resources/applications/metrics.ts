// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import * as MetricsAPI from './metrics';

export class Metrics extends APIResource {
  /**
   * Fetch metrics for all evaluations of an application
   */
  list(
    applicationName: string,
    query?: MetricListParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<MetricListResponse>;
  list(applicationName: string, options?: Core.RequestOptions): Core.APIPromise<MetricListResponse>;
  list(
    applicationName: string,
    query: MetricListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<MetricListResponse> {
    if (isRequestOptions(query)) {
      return this.list(applicationName, {}, query);
    }
    return this._client.get(`/v1/application/${applicationName}/evaluations/metrics`, { query, ...options });
  }

  /**
   * Fetch metrics for a specific evaluation of an application
   */
  listOne(
    applicationName: string,
    evaluationId: string,
    query?: MetricListOneParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<MetricListOneResponse>;
  listOne(
    applicationName: string,
    evaluationId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<MetricListOneResponse>;
  listOne(
    applicationName: string,
    evaluationId: string,
    query: MetricListOneParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<MetricListOneResponse> {
    if (isRequestOptions(query)) {
      return this.listOne(applicationName, evaluationId, {}, query);
    }
    return this._client.get(`/v1/application/${applicationName}/evaluations/${evaluationId}/metrics`, {
      query,
      ...options,
    });
  }

  /**
   * Fetch metrics for a specific run of a specific evaluation
   */
  listRunMetrics(
    applicationName: string,
    evaluationId: string,
    evaluationRunId: string,
    query?: MetricListRunMetricsParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<MetricListRunMetricsResponse>;
  listRunMetrics(
    applicationName: string,
    evaluationId: string,
    evaluationRunId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<MetricListRunMetricsResponse>;
  listRunMetrics(
    applicationName: string,
    evaluationId: string,
    evaluationRunId: string,
    query: MetricListRunMetricsParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<MetricListRunMetricsResponse> {
    if (isRequestOptions(query)) {
      return this.listRunMetrics(applicationName, evaluationId, evaluationRunId, {}, query);
    }
    return this._client.get(
      `/v1/application/${applicationName}/evaluations/${evaluationId}/run/${evaluationRunId}/metrics`,
      { query, ...options },
    );
  }
}

export interface MetricListResponse {
  evaluations?: Array<unknown>;
}

export interface MetricListOneResponse {
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

export interface MetricListParams {
  end_timestamp?: string;

  start_timestamp?: string;

  version?: string;
}

export interface MetricListOneParams {
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

export interface MetricListRunMetricsParams {
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
  export import MetricListResponse = MetricsAPI.MetricListResponse;
  export import MetricListOneResponse = MetricsAPI.MetricListOneResponse;
  export import MetricListRunMetricsResponse = MetricsAPI.MetricListRunMetricsResponse;
  export import MetricListParams = MetricsAPI.MetricListParams;
  export import MetricListOneParams = MetricsAPI.MetricListOneParams;
  export import MetricListRunMetricsParams = MetricsAPI.MetricListRunMetricsParams;
}
