// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import * as Core from '../../../core';

export class Metrics extends APIResource {
  /**
   * Fetch metrics for all evaluations of an application
   */
  retrieve(
    query: MetricRetrieveParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<MetricRetrieveResponse> {
    return this._client.get('/v1/application/evaluations/metrics', { query, ...options });
  }

  /**
   * Fetch metrics for a specific evaluation of an application
   */
  getEvaluationMetrics(
    evaluationId: string,
    query: MetricGetEvaluationMetricsParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<MetricGetEvaluationMetricsResponse> {
    return this._client.get(`/v1/application/evaluations/${evaluationId}/metrics`, { query, ...options });
  }

  /**
   * Fetch metrics for a specific run of a specific evaluation
   */
  getEvaluationRunMetrics(
    evaluationId: string,
    evaluationRunId: string,
    query: MetricGetEvaluationRunMetricsParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<MetricGetEvaluationRunMetricsResponse> {
    return this._client.get(`/v1/application/evaluations/${evaluationId}/run/${evaluationRunId}/metrics`, {
      query,
      ...options,
    });
  }
}

export interface MetricRetrieveResponse {
  evaluations?: Array<MetricRetrieveResponse.Evaluation>;
}

export namespace MetricRetrieveResponse {
  export interface Evaluation {
    metricName?: string;

    timestamp?: string;

    value?: number;
  }
}

export interface MetricGetEvaluationMetricsResponse {
  evaluations?: Array<MetricGetEvaluationMetricsResponse.Evaluation>;
}

export namespace MetricGetEvaluationMetricsResponse {
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

export interface MetricGetEvaluationRunMetricsResponse {
  evaluations?: Array<MetricGetEvaluationRunMetricsResponse.Evaluation>;
}

export namespace MetricGetEvaluationRunMetricsResponse {
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

export interface MetricGetEvaluationMetricsParams {
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

export interface MetricGetEvaluationRunMetricsParams {
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

export declare namespace Metrics {
  export {
    type MetricRetrieveResponse as MetricRetrieveResponse,
    type MetricGetEvaluationMetricsResponse as MetricGetEvaluationMetricsResponse,
    type MetricGetEvaluationRunMetricsResponse as MetricGetEvaluationRunMetricsResponse,
    type MetricRetrieveParams as MetricRetrieveParams,
    type MetricGetEvaluationMetricsParams as MetricGetEvaluationMetricsParams,
    type MetricGetEvaluationRunMetricsParams as MetricGetEvaluationRunMetricsParams,
  };
}
