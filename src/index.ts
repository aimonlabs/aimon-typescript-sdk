// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Errors from "./error";
import * as Uploads from "./uploads";
import { type Agent } from "./_shims/index";
import * as Core from "./core";
import * as API from "./resources/index";

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
   * @param {string} [opts.baseURL=process.env['CLIENT_BASE_URL'] ?? https://pbe-api.aimon.ai] - Override the default base URL for the API.
   * @param {number} [opts.timeout=1 minute] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
   * @param {number} [opts.httpAgent] - An HTTP agent used to manage HTTP(s) connections.
   * @param {Core.Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
   * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
   * @param {Core.Headers} opts.defaultHeaders - Default headers to include with every request to the API.
   * @param {Core.DefaultQuery} opts.defaultQuery - Default query parameters to include with every request to the API.
   */
  constructor({
    baseURL = Core.readEnv("CLIENT_BASE_URL"),
    authHeader,
    ...opts
  }: ClientOptions) {
    if (authHeader === undefined) {
      throw new Errors.ClientError(
        "Missing required client option authHeader; you need to instantiate the Client client with an authHeader option, like new Client({ authHeader: 'My Auth Header' })."
      );
    }

    const options: ClientOptions = {
      authHeader,
      ...opts,
      baseURL: baseURL || `https://pbe-api.aimon.ai`,
    };

    super({
      baseURL: options.baseURL!,
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

  // Assuming detect expects specific types for the arguments, replace these types with the correct ones
  async detect(
    generatedText: string,
    context: string[],
    userQuery?: string,
    config?: any,
    instructions?: string,
    asyncMode?: boolean,
    publish?: boolean,
    applicationName?: string,
    modelName?: string
  ): Promise<any> {
    return await this.decorators.detect(
      generatedText,
      context,
      userQuery,
      config,
      instructions,
      asyncMode,
      publish,
      applicationName,
      modelName
    );
  }

  // Assuming evaluate expects specific types for the arguments
  async evaluate(
    applicationName: string,
    modelName: string,
    datasetCollectionName: string,
    evaluationName: string,
    headers: string[],
    config?: any
  ): Promise<any> {
    return await this.decorators.evaluate(
      applicationName,
      modelName,
      datasetCollectionName,
      evaluationName,
      headers,
      config
    );
  }

  protected override defaultQuery(): Core.DefaultQuery | undefined {
    return this._options.defaultQuery;
  }

  protected override defaultHeaders(
    opts: Core.FinalRequestOptions
  ): Core.Headers {
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

export const {
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
} = Errors;

export import toFile = Uploads.toFile;
export import fileFromPath = Uploads.fileFromPath;

export namespace Client {
  export import RequestOptions = Core.RequestOptions;

  export import Users = API.Users;
  export import User = API.User;
  export import UserValidateResponse = API.UserValidateResponse;
  export import UserCreateParams = API.UserCreateParams;
  export import UserRetrieveParams = API.UserRetrieveParams;

  export import Models = API.Models;
  export import ModelCreateResponse = API.ModelCreateResponse;
  export import ModelRetrieveResponse = API.ModelRetrieveResponse;
  export import ModelListResponse = API.ModelListResponse;
  export import ModelCreateParams = API.ModelCreateParams;
  export import ModelRetrieveParams = API.ModelRetrieveParams;

  export import Applications = API.Applications;
  export import ApplicationCreateResponse = API.ApplicationCreateResponse;
  export import ApplicationRetrieveResponse = API.ApplicationRetrieveResponse;
  export import ApplicationDeleteResponse = API.ApplicationDeleteResponse;
  export import ApplicationCreateParams = API.ApplicationCreateParams;
  export import ApplicationRetrieveParams = API.ApplicationRetrieveParams;
  export import ApplicationDeleteParams = API.ApplicationDeleteParams;

  export import Datasets = API.Datasets;
  export import Dataset = API.Dataset;
  export import DatasetCreateParams = API.DatasetCreateParams;
  export import DatasetListParams = API.DatasetListParams;

  export import Evaluations = API.Evaluations;
  export import EvaluationCreateResponse = API.EvaluationCreateResponse;
  export import EvaluationRetrieveResponse = API.EvaluationRetrieveResponse;
  export import EvaluationCreateParams = API.EvaluationCreateParams;
  export import EvaluationRetrieveParams = API.EvaluationRetrieveParams;

  export import Analyze = API.Analyze;
  export import AnalyzeCreateResponse = API.AnalyzeCreateResponse;
  export import AnalyzeCreateParams = API.AnalyzeCreateParams;

  export import Inference = API.Inference;
  export import InferenceDetectResponse = API.InferenceDetectResponse;
  export import InferenceDetectParams = API.InferenceDetectParams;

  export import Decorators = API.Decorators;
}

export default Client;
