// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Retrieval extends APIResource {
  /**
   * This endpoint reranks query-context results and allows providing a task
   * definition containing domain-specific relevance information. Users can provide a
   * few-shot examples to fine-tune the model for better domain-specific
   * understanding.
   *
   * @example
   * ```ts
   * const response = await client.retrieval.rerank({
   *   context_docs: ['Document 1', 'Document 2'],
   *   queries: ['Query 1', 'Query 2'],
   *   task_definition:
   *     'Relevance ranking for domain-specific queries.',
   * });
   * ```
   */
  rerank(
    body: RetrievalRerankParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<RetrievalRerankResponse> {
    return this._client.post('/v1/rerank-icl', { body, ...options });
  }
}

export type RetrievalRerankResponse = Array<Array<number>>;

export interface RetrievalRerankParams {
  /**
   * List of context documents.
   */
  context_docs: Array<string>;

  /**
   * List of queries.
   */
  queries: Array<string>;

  /**
   * Description of the task to guide relevance ranking.
   */
  task_definition: string;

  /**
   * Optional model type to be used for reranking.
   */
  model_type?: string;
}

export declare namespace Retrieval {
  export {
    type RetrievalRerankResponse as RetrievalRerankResponse,
    type RetrievalRerankParams as RetrievalRerankParams,
  };
}
