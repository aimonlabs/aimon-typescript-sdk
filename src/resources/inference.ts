// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as InferenceAPI from './inference';

export class Inference extends APIResource {
  /**
   * Perform detection using the AIMon inference API
   */
  detect(
    body: InferenceDetectParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<InferenceDetectResponse> {
    return this._client.post('/v1/detect', { body, ...options });
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
     * Context as an array of strings or a single string
     */
    context: Array<string> | string;

    /**
     * The generated text based on context and user query
     */
    generated_text: string;

    /**
     * Configuration for the detection
     */
    config?: Body.Config;

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

export namespace Inference {
  export import InferenceDetectResponse = InferenceAPI.InferenceDetectResponse;
  export import InferenceDetectParams = InferenceAPI.InferenceDetectParams;
}
