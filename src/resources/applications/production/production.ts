// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import * as MetricsAPI from './metrics';

export class Production extends APIResource {
  metrics: MetricsAPI.Metrics = new MetricsAPI.Metrics(this._client);
}

export namespace Production {
  export import Metrics = MetricsAPI.Metrics;
  export import MetricRetriveResponse = MetricsAPI.MetricRetriveResponse;
  export import MetricRetriveParams = MetricsAPI.MetricRetriveParams;
}
