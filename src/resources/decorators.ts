// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from "../resource";
import { EvaluationCreateResponse, Evaluations } from "./evaluations";
import { InferenceDetectParams } from "./inference";

export class Decorators extends APIResource {
  /**
   * Simplified method to create and analyze metrics by setting up the application and model.
   */
  async detect(
    generatedText: string,
    context: string[],
    userQuery?: string,
    config: any = {
      hallucination: { detector_name: "default" },
    },
    instructions?: string,
    asyncMode?: boolean,
    publish?: boolean,
    applicationName?: string,
    modelName?: string
  ): Promise<any> {
    try {
      // Validate required values
      if (!generatedText) {
        throw new Error("The method must contain 'generated_text'");
      }
      if (!context || !Array.isArray(context)) {
        throw new Error("The method must contain 'context'");
      }

      // Conditionally validate 'instructions' if 'instruction_adherence' is specified in config
      if (config.instruction_adherence && !instructions) {
        throw new Error(
          "When instruction_adherence is specified in the config, 'instructions' must be provided"
        );
      }

      // Check if publishing is enabled, and call the publish method if so
      if (asyncMode) {
        return await this.publishMetrics(
          generatedText,
          context,
          config,
          userQuery,
          instructions,
          applicationName,
          modelName
        );
      } else {
        // Prepare the payload for detect API
        const inferenceBody: any = {
          context: context,
          generated_text: generatedText,
          user_query: userQuery || "No User Query Specified",
          config: config,
          ...(instructions ? { instructions } : {}), // Only include instructions if provided
        };
        const detectResponse = await this._client.inference.detect([
          inferenceBody,
        ]);

        if (publish) {
          this.publishMetrics(
            generatedText,
            context,
            config,
            userQuery,
            instructions,
            applicationName,
            modelName
          ).catch((error) => console.error("Error in publishMetrics:", error)); // Handle errors gracefully
        }
        return detectResponse;
      }
    } catch (error) {
      console.error("Error in detect:", error);
      throw error;
    }
  }

  /**
   * Handles the logic for publishing metrics by setting up the application and model.
   */
  private async publishMetrics(
    generatedText: string,
    context: string[],
    config: any,
    userQuery?: string,
    instructions?: string,
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
        output: generatedText,
        context_docs: context,
        user_query: userQuery || "No User Query Specified",
        config: config,
        ...(instructions ? { instructions } : {}), // Only include instructions if provided
      };

      // Send the payload for analysis
      return await this._client.analyze.create([completePayload]);
    } catch (error) {
      console.error("Error in publishMetrics:", error);
      throw error;
    }
  }

  async evaluate(
    applicationName: string,
    modelName: string,
    datasetCollectionName: string,
    evaluationName: string,
    headers: string[],
    config: any = { hallucination: { detector_name: "default" } }
  ): Promise<any> {
    try {
      // Validate  values
      if (!headers || headers.length === 0) {
        throw new Error("Headers must be a non-empty list");
      }
      if (!headers.includes("context_docs")) {
        throw new Error("Headers must contain the column 'context_docs'");
      }

      if (!modelName) {
        throw new Error("modelNamemust be provided");
      }

      if (!applicationName) {
        throw new Error("applicationName must be provided");
      }

      if (!datasetCollectionName) {
        throw new Error("datasetCollectionName must be provided");
      }

      if (!evaluationName) {
        throw new Error("evaluationName must be provided");
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
        stage: "evaluation",
        type: "text",
      });

      const datasetCollection = await this._client.datasets.collection.retrieve(
        {
          name: datasetCollectionName,
        }
      );

      // Creates evaluation
      let evaluation: EvaluationCreateResponse;

      if (
        datasetCollection &&
        datasetCollection.id &&
        model.id &&
        application.id
      ) {
        evaluation = await this._client.evaluations.create({
          name: "my_evaluation",
          dataset_collection_id: datasetCollection.id,
          model_id: model.id,
          application_id: application.id,
        });
      } else {
        throw new Error("Error creating evaluation");
      }

      // Creates evaluation run
      let evaluationRun: Evaluations.RunCreateParams;
      if (evaluation && evaluation.id) {
        evaluationRun = await this._client.evaluations.run.create({
          evaluation_id: evaluation.id,
        });
      } else {
        throw new Error("Error creating evaluation run");
      }

      // Get all records from the datasets
      let datasetCollectionRecords: any[] = [];
      for (const datasetId of datasetCollection.dataset_ids) {
        const datasetRecords = await this._client.datasets.records.list({
          sha: datasetId,
        });
        datasetCollectionRecords.push(...datasetRecords); // Spread operator to merge records
      }

      const results: any[] = [];

      for (const record of datasetCollectionRecords) {
        // Validate the record for required fields
        for (const header of headers) {
          if (!(header in record)) {
            throw new Error(
              `Dataset record must contain the column '${header}' as specified in the 'headers'`
            );
          }
        }
        if (!("context_docs" in record)) {
          throw new Error(
            "Dataset record must contain the column 'context_docs'"
          );
        }

        // Ensure context_docs is an array
        const contextDocs = Array.isArray(record.context_docs)
          ? record.context_docs
          : [record.context_docs];

        // Construct the payload for analysis
        const payload: any = {
          application_id: application.id,
          version: application.version,
          context_docs: contextDocs,
          evaluation_id: evaluation.id,
          evaluation_run_id: evaluationRun.id,
          config: config,
        };

        // Optionally include fields in the payload if they exist
        if (record.prompt) payload.prompt = record.prompt;
        if (record.user_query) payload.user_query = record.user_query;
        if (record.output) payload.output = record.output;

        // Validate and include instructions if required by config
        if (config.instruction_adherence && !record.instructions) {
          throw new Error(
            "When instruction_adherence is specified in the config, 'instructions' must be present in the dataset"
          );
        }
        if (record.instructions && config.instruction_adherence) {
          payload.instructions = record.instructions || "";
        }

        // Perform analysis and store the result
        const analysis = await this._client.analyze.create([payload]);
        results.push({ output: record.output, analysis });
      }

      return results;

      // You can add further logic for non-publish flow here, if needed
    } catch (error) {
      console.error("Error in evaluate:", error);
      throw error;
    }
  }
}

export namespace Decorators {}