// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Analyze extends APIResource {
  /**
   * Save and compute metrics
   */
  create(body: AnalyzeCreateParams, options?: Core.RequestOptions): Core.APIPromise<AnalyzeCreateResponse> {
    return this._client.post('/v1/save-compute-metrics', { body, ...options });
  }

  /**
   * Simplified method to create and analyze metrics by setting up the application and model.
   */
  async production(
    appName: string,
    modelName: string,
    payload: {
      context_docs: string[];
      output: string;
      prompt: string;
      user_query: string;
      instructions?: string;
      actual_request_timestamp?: string;
    },
    config: any = { hallucination: { detector_name: 'default' } },
    modelType: string = 'GPT-4',
    modelDescription: string = `This model is named ${modelName} and is of type ${modelType}`,
    stage: string = 'production',
    appType: string = 'text',
  ): Promise<AnalyzeCreateResponse> {
    try {
      // Validate required returned values
      if (!payload.output) {
        throw new Error("values_returned must contain 'generated_text'");
      }
      if (!payload.context_docs || !Array.isArray(payload.context_docs)) {
        throw new Error("values_returned must contain 'context'");
      }
      if (config.instruction_adherence && !payload.instructions) {
        throw new Error(
          "When instruction_adherence is specified in the config, 'instructions' must be provided",
        );
      }
      if (payload.instructions && !config.instruction_adherence) {
        throw new Error("instruction_adherence must be specified in the config for returning 'instructions'");
      }

      // Create or retrieve the model
      const model = await this._client.models.create({
        name: modelName,
        type: modelType,
        description: modelDescription,
      });

      // Create or retrieve the application
      const application = await this._client.applications.create({
        name: appName,
        model_name: model.name,
        stage,
        type: appType,
      });

      if (!application.id || application.version === undefined) {
        throw new Error('Application ID or version is undefined.');
      }

      // Prepare the payload
      const completePayload: AnalyzeCreateParams.Body = {
        application_id: application.id,
        version: application.version,
        output: payload.output,
        context_docs: payload.context_docs,
        prompt: payload.prompt || 'No Prompt Specified',
        user_query: payload.user_query || 'No User Query Specified',
        instructions: payload.instructions || '',
        actual_request_timestamp: payload.actual_request_timestamp || '',
        config: config,
      };

      return await this._client.analyze.create([completePayload]);
    } catch (error) {
      console.error('Error in analyzeProd:', error);
      throw error;
    }
  }

  async analyzeEval(
    appName: string,
    modelName: string,
    evaluationName: string,
    datasetCollectionName: string,
    func: (context_docs: string[], user_query: string, prompt: string, ...args: any[]) => string,
    modelType: string = 'GPT-4',
    stage: string = 'evaluation',
    appType: string = 'text',
    config: any = { hallucination: { detector_name: 'default' } },
    modelDescription: string = `This model is named ${modelName} and is of type ${modelType}`,
  ): Promise<any> {
    try {
      // Create or retrieve the model
      const model = await this._client.models.create({
        name: modelName,
        type: modelType,
        description: modelDescription,
      });

      // Create or retrieve the application
      const application = await this._client.applications.create({
        name: appName,
        model_name: model.name,
        stage,
        type: appType,
      });

      if (!application.id || !application.version) {
        throw new Error('Application ID or version is undefined.');
      }

      if (!model.id) {
        throw new Error('Model ID is undefined.');
      }

      // Create or retrieve the dataset collection
      const datasetCollection = await this._client.datasets.collection.retrieve({
        name: datasetCollectionName,
      });

      if (!datasetCollection.id) {
        throw new Error('Dataset collection ID is undefined.');
      }

      const sha = datasetCollection.dataset_ids[0];
      if (!sha) {
        throw new Error('Dataset sha is undefined.');
      }

      // Create or retrieve the evaluation
      const evaluation = await this._client.evaluations.create({
        name: evaluationName,
        application_id: application.id,
        model_id: model.id,
        dataset_collection_id: datasetCollection.id,
      });

      if (!evaluation.id) {
        throw new Error('Evaluation ID is undefined.');
      }

      // Create an evaluation run
      const evalRun = await this._client.evaluations.run.create({
        evaluation_id: evaluation.id,
        metrics_config: config,
      });

      if (!evalRun.id) {
        throw new Error('Evaluation run ID is undefined.');
      }

      // Get all records from the datasets
      const records = await this._client.datasets.records.list({ sha: sha });

      const results = [];

      interface RecordType {
        context_docs: string[];
        user_query: string;
        prompt: string;
        instructions?: string;
        [key: string]: any;
      }

      for (const record of records as RecordType[]) {
        const result = func(record.context_docs, record.user_query, record.prompt);

        const completePayload: AnalyzeCreateParams.Body = {
          application_id: application.id,
          version: application.version,
          context_docs: record.context_docs,
          output: result,
          prompt: record.prompt || '',
          user_query: record.user_query || '',
          evaluation_id: evaluation.id,
          evaluation_run_id: evalRun.id,
        };

        if ('instructions' in record && 'instruction_adherence' in config) {
          completePayload.instructions = record.instructions || '';
        }

        results.push(await this.create([completePayload]));
      }

      return results;
    } catch (error) {
      console.error('Error in analyzeEval:', error);
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

export declare namespace Analyze {
  export {
    type AnalyzeCreateResponse as AnalyzeCreateResponse,
    type AnalyzeCreateParams as AnalyzeCreateParams,
  };
}
