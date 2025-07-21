// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Inference extends APIResource {
  /**
   * Perform detection using the AIMon inference API
   */
  detect(
    body: InferenceDetectParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<InferenceDetectResponse> {
    return this._client.post('/v2/detect', { body, ...options });
  }
}

export type InferenceDetectResponse = Array<InferenceDetectResponse.InferenceDetectResponseItem>;

export namespace InferenceDetectResponse {
  export interface InferenceDetectResponseItem {
    /**
     * Result of the detection
     */
    result?: unknown;
  }
}

export type InferenceDetectParams = Array<InferenceDetectParams.Body>;

export namespace InferenceDetectParams {
  export interface Body {
    /**
     * The application name for publishing metrics.
     */
    application_name?: string;

    /**
     * Indicates whether to run the application in async mode.
     */
    async_mode?: boolean;

    /**
     * Configuration for the detection
     */
    config?: Body.Config;

    /**
     * Context as an array of strings or a single string
     */
    context?: Array<string> | string;

    /**
     * The generated text based on context and user query
     */
    generated_text?: string;

    /**
     * The model name for publishing metrics for an application.
     */
    model_name?: string;

    /**
     * Indicates the computation strategy. Must be either 'all_or_none' or
     * 'ignore_failures'.
     */
    must_compute?: 'all_or_none' | 'ignore_failures';

    /**
     * Indicates whether to publish metrics.
     */
    publish?: boolean;

    /**
     * Optional tool trace for analysis
     */
    tool_trace?: Array<unknown>;

    /**
     * The user's query
     */
    user_query?: string;
  }

  export namespace Body {
    /**
     * Configuration for the detection
     */
    export interface Config {
      completeness?: Config.Completeness;

      conciseness?: Config.Conciseness;

      hallucination?: Config.Hallucination;

      'hallucination_v0.2'?: Config.HallucinationV0_2;

      instruction_adherence?: Config.InstructionAdherence;

      toxicity?: Config.Toxicity;
    }

    export namespace Config {
      export interface Completeness {
        detector_name?: 'default';
      }

      export interface Conciseness {
        detector_name?: 'default';
      }

      export interface Hallucination {
        detector_name?: 'default' | 'hall_v2';
      }

      export interface HallucinationV0_2 {
        detector_name?: 'default';
      }

      export interface InstructionAdherence {
        detector_name?: 'default';
      }

      export interface Toxicity {
        detector_name?: 'default';
      }
    }
  }
}

export declare namespace Inference {
  export {
    type InferenceDetectResponse as InferenceDetectResponse,
    type InferenceDetectParams as InferenceDetectParams,
  };
}
