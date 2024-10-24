// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from "../resource";
import * as Core from "../core";
import * as AnalyzeAPI from "./analyze";

export class Decorators extends APIResource {
  /**
   * Save and compute metrics
   */
  create(
    body: AnalyzeCreateParams,
    options?: Core.RequestOptions
  ): Core.APIPromise<AnalyzeCreateResponse> {
    return this._client.post("/v1/save-compute-metrics", { body, ...options });
  }

  /**
   * Simplified method to create and analyze metrics by setting up the application and model.
   */
  async detect(
    valuesReturned: {
      context_docs: string[];
      output: string;
      prompt: string;
      user_query: string;
      instructions?: string;
      actual_request_timestamp?: string;
    },
    config: any = { hallucination: { detector_name: "default" } },
    asyncMode?: boolean,
    publish?: boolean,
    applicationName?: string,
    modelName?: string
  ): Promise<AnalyzeCreateResponse> {
    try {
      // Validate required returned values
      if (!valuesReturned.output) {
        throw new Error("values_returned must contain 'generated_text'");
      }
      if (
        !valuesReturned.context_docs ||
        !Array.isArray(valuesReturned.context_docs)
      ) {
        throw new Error("values_returned must contain 'context'");
      }
      if (config.instruction_adherence && !valuesReturned.instructions) {
        throw new Error(
          "When instruction_adherence is specified in the config, 'instructions' must be provided"
        );
      }
      if (valuesReturned.instructions && !config.instruction_adherence) {
        throw new Error(
          "instruction_adherence must be specified in the config for returning 'instructions'"
        );
      }

      if (publish) {
        if (!modelName) {
          throw new Error("Model name must be provided if publish is True");
        }

        if (!applicationName) {
          throw new Error(
            "Application name must be provided if publish is True"
          );
        }

        // Create or retrieve the model
        const modelType = "GPT-4";
        const model = await this._client.models.create({
          name: modelName,
          type: modelType,
          description: `This model is named ${modelName} and is of type ${modelType}`,
        });

        // Create or retrieve the application
        const application = await this._client.applications.create({
          name: applicationName,
          model_name: model.name,
          stage: "production",
          type: "text",
        });

        if (!application.id || application.version === undefined) {
          throw new Error("Application ID or version is undefined.");
        }

        // Prepare the payload
        const completePayload: AnalyzeCreateParams.Body = {
          application_id: application.id,
          version: application.version,
          output: valuesReturned.output,
          context_docs: valuesReturned.context_docs,
          prompt: valuesReturned.prompt || "No Prompt Specified",
          user_query: valuesReturned.user_query || "No User Query Specified",
          instructions: valuesReturned.instructions || "",
          actual_request_timestamp:
            valuesReturned.actual_request_timestamp || "",
          config: config,
        };

        return await this._client.analyze.create([completePayload]);
      }
    } catch (error) {
      console.error("Error in analyzeProd:", error);
      throw error;
    }
  }
}

export interface AnalyzeCreateResponse {
  message?: string;

  /**
   * Status code representing the outcome of the operation
   */
  status: number;
}

export type AnalyzeCreateParams = Array<AnalyzeCreateParams.Body>;

export namespace AnalyzeCreateParams {
  export interface Body {
    application_id: string;

    context_docs: Array<string>;

    output: string;

    prompt: string;

    user_query: string;

    version: string;

    /**
     * The timestamp when the actual request was made
     */
    actual_request_timestamp?: string;

    evaluation_id?: string | null;

    evaluation_run_id?: string | null;

    instructions?: string;

    config?: object;
  }
}

export namespace Analyze {
  export import AnalyzeCreateResponse = AnalyzeAPI.AnalyzeCreateResponse;
  export import AnalyzeCreateParams = AnalyzeAPI.AnalyzeCreateParams;
}
