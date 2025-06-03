// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Metrics extends APIResource {
  /**
   * Create a custom metric
   */
  create(body: MetricCreateParams, options?: Core.RequestOptions): Core.APIPromise<unknown> {
    return this._client.post('/v1/custom-metric', { body, ...options });
  }

  /**
   * List custom metrics
   */
  list(options?: Core.RequestOptions): Core.APIPromise<MetricListResponse> {
    return this._client.get('/v1/custom-metric', options);
  }
}

export interface CustomMetric {
  instructions: unknown;

  label: string;

  name: string;

  id?: number;

  company_id?: string;

  created_at?: string;

  description?: string;

  updated_at?: string;

  user_id?: number;

  uuid?: string;
}

export type MetricCreateResponse = unknown;

export type MetricListResponse = Array<unknown>;

export interface MetricCreateParams {
  instructions: string;

  label: string;

  name: string;

  description?: string;
}

export declare namespace Metrics {
  export {
    type CustomMetric as CustomMetric,
    type MetricCreateResponse as MetricCreateResponse,
    type MetricListResponse as MetricListResponse,
    type MetricCreateParams as MetricCreateParams,
  };
}
