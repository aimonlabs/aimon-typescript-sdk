// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import * as MetricsAPI from './metrics';

export class Evaluations extends APIResource {
  metrics: MetricsAPI.Metrics = new MetricsAPI.Metrics(this._client);
}

export namespace Evaluations {
  export import Metrics = MetricsAPI.Metrics;
  export import MetricRetrieveResponse = MetricsAPI.MetricRetrieveResponse;
  export import MetricGetEvaluationMetricsResponse = MetricsAPI.MetricGetEvaluationMetricsResponse;
  export import MetricGetEvaluationRunMetricsResponse = MetricsAPI.MetricGetEvaluationRunMetricsResponse;
  export import MetricRetrieveParams = MetricsAPI.MetricRetrieveParams;
  export import MetricGetEvaluationMetricsParams = MetricsAPI.MetricGetEvaluationMetricsParams;
  export import MetricGetEvaluationRunMetricsParams = MetricsAPI.MetricGetEvaluationRunMetricsParams;
}
