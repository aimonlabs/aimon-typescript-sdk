// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from "../resource";

export class Decorators extends APIResource {
  /**
   * Simplified method to create and analyze metrics by setting up the application and model.
   */
  async detect(
    valuesReturned: {
      generated_text: string;
      context: string[];
      user_query: string;
      instructions?: string;
    },
    config: any = { hallucination: { detector_name: "default" } },
    asyncMode?: boolean,
    publish?: boolean,
    applicationName?: string,
    modelName?: string
  ): Promise<any> {
    try {
      // Validate required returned values
      if (!valuesReturned.generated_text) {
        throw new Error("valuesReturned must contain 'generated_text'");
      }
      if (!valuesReturned.context || !Array.isArray(valuesReturned.context)) {
        throw new Error("valuesReturned must contain 'context'");
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

      // Check if publishing is enabled, and call the publish method if so
      if (asyncMode) {
        return await this.publishMetrics(
          valuesReturned,
          config,
          applicationName,
          modelName
        );
      } else {
        // Call the detect API
        const inferenceBody: any = {
          context: valuesReturned.context,
          generated_text: valuesReturned.generated_text,
          user_query: valuesReturned.user_query || "No User Query Specified",
          instructions: valuesReturned.instructions || "",
          config: config,
        };
        const detectResponse = await this._client.inference.detect([
          inferenceBody,
        ]);

        if (publish) {
          return await this.publishMetrics(
            valuesReturned,
            config,
            applicationName,
            modelName
          );
        }
      }

      // You can add further logic for non-publish flow here, if needed
    } catch (error) {
      console.error("Error in detect:", error);
      throw error;
    }
  }

  /**
   * Handles the logic for publishing metrics by setting up the application and model.
   */
  private async publishMetrics(
    valuesReturned: {
      generated_text: string;
      context: string[];
      user_query: string;
      instructions?: string;
    },
    config: any,
    applicationName?: string,
    modelName?: string
  ): Promise<any> {
    try {
      if (!modelName) {
        throw new Error("Model name must be provided if publish is True");
      }

      if (!applicationName) {
        throw new Error("Application name must be provided if publish is True");
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

      // Prepare the payload for analysis
      const completePayload: any = {
        application_id: application.id,
        version: application.version,
        output: valuesReturned.generated_text,
        context_docs: valuesReturned.context,
        user_query: valuesReturned.user_query || "No User Query Specified",
        instructions: valuesReturned.instructions || "",
        config: config,
      };

      // Send the payload for analysis
      return await this._client.analyze.create([completePayload]);
    } catch (error) {
      console.error("Error in publishMetrics:", error);
      throw error;
    }
  }
}
