// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { type Agent } from './_shims/index';
import * as Core from './core';
import * as Errors from './error';
import * as Uploads from './uploads';
import * as API from './resources/index';
import { Analyze, AnalyzeCreateParams, AnalyzeCreateResponse } from './resources/analyze';
import { Inference, InferenceDetectParams, InferenceDetectResponse } from './resources/inference';
import {
  CustomMetric,
  MetricCreateParams,
  MetricCreateResponse,
  MetricDeleteResponse,
  MetricListResponse,
  Metrics,
} from './resources/metrics';
import {
  ModelCreateParams,
  ModelCreateResponse,
  ModelListResponse,
  ModelRetrieveParams,
  ModelRetrieveResponse,
  Models,
} from './resources/models';
import { Retrieval, RetrievalRerankParams, RetrievalRerankResponse } from './resources/retrieval';
import { User, UserCreateParams, UserRetrieveParams, UserValidateResponse, Users } from './resources/users';
import {
  ApplicationCreateParams,
  ApplicationCreateResponse,
  ApplicationDeleteParams,
  ApplicationDeleteResponse,
  ApplicationRetrieveParams,
  ApplicationRetrieveResponse,
  Applications,
} from './resources/applications/applications';
import { Dataset, DatasetCreateParams, DatasetListParams, Datasets } from './resources/datasets/datasets';
import {
  EvaluationCreateParams,
  EvaluationCreateResponse,
  EvaluationRetrieveParams,
  EvaluationRetrieveResponse,
  Evaluations,
} from './resources/evaluations/evaluations';
import { Decorators } from "./resources/decorators";

export interface ClientOptions {
  authHeader: string;

  /**
   * Override the default base URL for the API, e.g., "https://api.example.com/v2/"
   *
   * Defaults to process.env['CLIENT_BASE_URL'].
   */
  baseURL?: string | null | undefined;

  /**
   * The maximum amount of time (in milliseconds) that the client should wait for a response
   * from the server before timing out a single request.
   *
   * Note that request timeouts are retried by default, so in a worst-case scenario you may wait
   * much longer than this timeout before the promise succeeds or fails.
   *
   * @unit milliseconds
   */
  timeout?: number;

  /**
   * An HTTP agent used to manage HTTP(S) connections.
   *
   * If not provided, an agent will be constructed by default in the Node.js environment,
   * otherwise no agent is used.
   */
  httpAgent?: Agent;

  /**
   * Specify a custom `fetch` function implementation.
   *
   * If not provided, we use `node-fetch` on Node.js and otherwise expect that `fetch` is
   * defined globally.
   */
  fetch?: Core.Fetch | undefined;

  /**
   * The maximum number of times that the client will retry a request in case of a
   * temporary failure, like a network error or a 5XX error from the server.
   *
   * @default 2
   */
  maxRetries?: number;

  /**
   * Default headers to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * header to `undefined` or `null` in request options.
   */
  defaultHeaders?: Core.Headers;

  /**
   * Default query parameters to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * param to `undefined` in request options.
   */
  defaultQuery?: Core.DefaultQuery;
}

const DEFAULT_BASE_URL = 'https://sdkbe-production.aimon.ai';

/**
 * API Client for interfacing with the Client API.
 */
export class Client extends Core.APIClient {
  authHeader: string;

  private _options: ClientOptions;

  /**
   * API Client for interfacing with the Client API.
   *
   * @param {string} opts.authHeader
   * @param {string} [opts.baseURL=process.env['CLIENT_BASE_URL'] ?? https://sdkbe-production.aimon.ai] - Override the default base URL for the API.
   * @param {number} [opts.timeout=1 minute] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
   * @param {number} [opts.httpAgent] - An HTTP agent used to manage HTTP(s) connections.
   * @param {Core.Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
   * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
   * @param {Core.Headers} opts.defaultHeaders - Default headers to include with every request to the API.
   * @param {Core.DefaultQuery} opts.defaultQuery - Default query parameters to include with every request to the API.
   */
  constructor({ baseURL = Core.readEnv('CLIENT_BASE_URL'), authHeader, ...opts }: ClientOptions) {
    if (authHeader === undefined) {
      throw new Errors.ClientError(
        "Missing required client option authHeader; you need to instantiate the Client client with an authHeader option, like new Client({ authHeader: 'My Auth Header' }).",
      );
    }

    const options: ClientOptions = {
      authHeader,
      ...opts,
      baseURL: baseURL || DEFAULT_BASE_URL,
    };

    super({
      baseURL: options.baseURL!,
      baseURLOverridden: baseURL ? baseURL !== DEFAULT_BASE_URL : false,
      timeout: options.timeout ?? 60000 /* 1 minute */,
      httpAgent: options.httpAgent,
      maxRetries: options.maxRetries,
      fetch: options.fetch,
    });

    this._options = options;

    this.authHeader = authHeader;
  }

  users: API.Users = new API.Users(this);
  models: API.Models = new API.Models(this);
  applications: API.Applications = new API.Applications(this);
  datasets: API.Datasets = new API.Datasets(this);
  evaluations: API.Evaluations = new API.Evaluations(this);
  analyze: API.Analyze = new API.Analyze(this);
  decorators: API.Decorators = new API.Decorators(this);
  inference: API.Inference = new API.Inference(this);
  retrieval: API.Retrieval = new API.Retrieval(this);
  metrics: API.Metrics = new API.Metrics(this);

  /**
   * Check whether the base URL is set to its default.
   */
  #baseURLOverridden(): boolean {
    return this.baseURL !== DEFAULT_BASE_URL;
  }

  // Detect method overloads: allow both positional and object-based calls
  async detect(
    generatedText?: string,
    context?: string | string[],
    userQuery?: string,
    config?: any,
    instructions?: string[],
    taskDefinition?: string,
    asyncMode?: boolean,
    publish?: boolean,
    applicationName?: string,
    modelName?: string,
    mustCompute?: 'all_or_none' | 'ignore_failures'
  ): Promise<any>;

  // New object-style overload signature
  async detect(options: {
    generatedText?: string;
    context?: string | string[];
    userQuery?: string;
    config: any;
    instructions?: string[];
    taskDefinition?: string;
    asyncMode?: boolean;
    publish?: boolean;
    applicationName?: string;
    modelName?: string;
    mustCompute?: 'all_or_none' | 'ignore_failures';
    toolTrace?: any[];
  }): Promise<any>;

  // Unified implementation for both call styles
  async detect(
    arg1?: any,
    arg2?: any,
    arg3?: any,
    arg4?: any,
    arg5?: any,
    arg6?: any,
    arg7?: any,
    arg8?: any,
    arg9?: any,
    arg10?: any,
    arg11: any = 'all_or_none'
  ): Promise<any> {
    let opts: any;

    // Detect whether the call is object-style (recommended) or positional (legacy)
    if (typeof arg1 === 'object' && arg1 !== null && !Array.isArray(arg1)) {
      // Called using object syntax
      opts = {
        generatedText: arg1.generatedText,
        context: arg1.context,
        userQuery: arg1.userQuery,
        config: arg1.config,
        instructions: arg1.instructions,
        taskDefinition: arg1.taskDefinition,
        asyncMode: arg1.asyncMode,
        publish: arg1.publish,
        applicationName: arg1.applicationName,
        modelName: arg1.modelName,
        mustCompute: arg1.mustCompute ?? 'all_or_none',
        toolTrace: arg1.toolTrace,
      };
    } else {
      // Called using positional syntax (backward compatible)
      opts = {
        generatedText: arg1,
        context: arg2,
        userQuery: arg3,
        config: arg4,
        instructions: arg5,
        taskDefinition: arg6,
        asyncMode: arg7,
        publish: arg8,
        applicationName: arg9,
        modelName: arg10,
        mustCompute: arg11 ?? 'all_or_none',
      };
    }
    
    // Forwarding to decorators.detect with normalized arguments
    return await this.decorators.detect(
      opts.generatedText,
      opts.context,
      opts.userQuery,
      opts.config,
      opts.instructions,
      opts.taskDefinition,
      opts.asyncMode,
      opts.publish,
      opts.applicationName,
      opts.modelName,
      opts.mustCompute,
      opts.toolTrace
    );
  }

  // Assuming evaluate expects specific types for the arguments
  async evaluate(
    applicationName: string,
    modelName: string,
    datasetCollectionName: string,
    headers: string[],
    evaluationName?: string,
    config?: any
  ): Promise<any> {
    return await this.decorators.evaluate(
      applicationName,
      modelName,
      datasetCollectionName,
      headers,
      evaluationName,
      config
    );
  }

  protected override defaultQuery(): Core.DefaultQuery | undefined {
    return this._options.defaultQuery;
  }

  protected override defaultHeaders(opts: Core.FinalRequestOptions): Core.Headers {
    return {
      ...super.defaultHeaders(opts),
      ...this._options.defaultHeaders,
    };
  }

  protected override authHeaders(opts: Core.FinalRequestOptions): Core.Headers {
    return { Authorization: this.authHeader };
  }

  static Client = this;
  static DEFAULT_TIMEOUT = 60000; // 1 minute

  static ClientError = Errors.ClientError;
  static APIError = Errors.APIError;
  static APIConnectionError = Errors.APIConnectionError;
  static APIConnectionTimeoutError = Errors.APIConnectionTimeoutError;
  static APIUserAbortError = Errors.APIUserAbortError;
  static NotFoundError = Errors.NotFoundError;
  static ConflictError = Errors.ConflictError;
  static RateLimitError = Errors.RateLimitError;
  static BadRequestError = Errors.BadRequestError;
  static AuthenticationError = Errors.AuthenticationError;
  static InternalServerError = Errors.InternalServerError;
  static PermissionDeniedError = Errors.PermissionDeniedError;
  static UnprocessableEntityError = Errors.UnprocessableEntityError;

  static toFile = Uploads.toFile;
  static fileFromPath = Uploads.fileFromPath;
}

Client.Users = Users;
Client.Models = Models;
Client.Applications = Applications;
Client.Datasets = Datasets;
Client.Evaluations = Evaluations;
Client.Analyze = Analyze;
Client.Inference = Inference;
Client.Retrieval = Retrieval;
Client.Metrics = Metrics;
Client.Decorators = Decorators;
export declare namespace Client {
  export type RequestOptions = Core.RequestOptions;

  export {
    Users as Users,
    type User as User,
    type UserValidateResponse as UserValidateResponse,
    type UserCreateParams as UserCreateParams,
    type UserRetrieveParams as UserRetrieveParams,
  };

  export {
    Models as Models,
    type ModelCreateResponse as ModelCreateResponse,
    type ModelRetrieveResponse as ModelRetrieveResponse,
    type ModelListResponse as ModelListResponse,
    type ModelCreateParams as ModelCreateParams,
    type ModelRetrieveParams as ModelRetrieveParams,
  };

  export {
    Applications as Applications,
    type ApplicationCreateResponse as ApplicationCreateResponse,
    type ApplicationRetrieveResponse as ApplicationRetrieveResponse,
    type ApplicationDeleteResponse as ApplicationDeleteResponse,
    type ApplicationCreateParams as ApplicationCreateParams,
    type ApplicationRetrieveParams as ApplicationRetrieveParams,
    type ApplicationDeleteParams as ApplicationDeleteParams,
  };

  export {
    Datasets as Datasets,
    type Dataset as Dataset,
    type DatasetCreateParams as DatasetCreateParams,
    type DatasetListParams as DatasetListParams,
  };

  export {
    Evaluations as Evaluations,
    type EvaluationCreateResponse as EvaluationCreateResponse,
    type EvaluationRetrieveResponse as EvaluationRetrieveResponse,
    type EvaluationCreateParams as EvaluationCreateParams,
    type EvaluationRetrieveParams as EvaluationRetrieveParams,
  };

  export {
    Analyze as Analyze,
    type AnalyzeCreateResponse as AnalyzeCreateResponse,
    type AnalyzeCreateParams as AnalyzeCreateParams,
  };

  export {
    Inference as Inference,
    type InferenceDetectResponse as InferenceDetectResponse,
    type InferenceDetectParams as InferenceDetectParams,
  };

  export {
    Retrieval as Retrieval,
    type RetrievalRerankResponse as RetrievalRerankResponse,
    type RetrievalRerankParams as RetrievalRerankParams,
  };

  export {
    Metrics as Metrics,
    type CustomMetric as CustomMetric,
    type MetricCreateResponse as MetricCreateResponse,
    type MetricListResponse as MetricListResponse,
    type MetricDeleteResponse as MetricDeleteResponse,
    type MetricCreateParams as MetricCreateParams,
  };
  export { Decorators as Decorators };
}

export { toFile, fileFromPath } from './uploads';
export {
  ClientError,
  APIError,
  APIConnectionError,
  APIConnectionTimeoutError,
  APIUserAbortError,
  NotFoundError,
  ConflictError,
  RateLimitError,
  BadRequestError,
  AuthenticationError,
  InternalServerError,
  PermissionDeniedError,
  UnprocessableEntityError,
} from './error';

export default Client;
