// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import * as MetricsAPI from './metrics';
import {
  MetricGetEvaluationMetricsParams,
  MetricGetEvaluationMetricsResponse,
  MetricGetEvaluationRunMetricsParams,
  MetricGetEvaluationRunMetricsResponse,
  MetricRetrieveParams,
  MetricRetrieveResponse,
  Metrics,
} from './metrics';

export class Evaluations extends APIResource {
  metrics: MetricsAPI.Metrics = new MetricsAPI.Metrics(this._client);
}

Evaluations.Metrics = Metrics;

export declare namespace Evaluations {
  export {
    Metrics as Metrics,
    type MetricRetrieveResponse as MetricRetrieveResponse,
    type MetricGetEvaluationMetricsResponse as MetricGetEvaluationMetricsResponse,
    type MetricGetEvaluationRunMetricsResponse as MetricGetEvaluationRunMetricsResponse,
    type MetricRetrieveParams as MetricRetrieveParams,
    type MetricGetEvaluationMetricsParams as MetricGetEvaluationMetricsParams,
    type MetricGetEvaluationRunMetricsParams as MetricGetEvaluationRunMetricsParams,
  };
}
