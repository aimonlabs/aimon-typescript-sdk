// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import * as MetricsAPI from './metrics';
import { MetricRetrieveParams, MetricRetrieveResponse, Metrics } from './metrics';

export class Production extends APIResource {
  metrics: MetricsAPI.Metrics = new MetricsAPI.Metrics(this._client);
}

Production.Metrics = Metrics;

export declare namespace Production {
  export {
    Metrics as Metrics,
    type MetricRetrieveResponse as MetricRetrieveResponse,
    type MetricRetrieveParams as MetricRetrieveParams,
  };
}
