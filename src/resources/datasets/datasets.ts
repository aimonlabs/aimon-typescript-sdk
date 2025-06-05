// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from "../../resource";
import * as Core from "../../core";
import * as CollectionAPI from "./collection";
import {
  Collection,
  CollectionCreateParams,
  CollectionCreateResponse,
  CollectionRetrieveParams,
  CollectionRetrieveResponse,
} from "./collection";
import * as RecordsAPI from "./records";
import { RecordListParams, RecordListResponse, Records } from "./records";

export class Datasets extends APIResource {
  records: RecordsAPI.Records = new RecordsAPI.Records(this._client);
  collection: CollectionAPI.Collection = new CollectionAPI.Collection(
    this._client
  );

  /**
   * Create a new dataset
   */
  create(
    body: DatasetCreateParams,
    options?: Core.RequestOptions
  ): Core.APIPromise<Dataset> {
    return this._client.post(
      "/v2/dataset",
      Core.multipartFormRequestOptions({ body, ...options })
    );
  }

  /**
   * Retrieve a dataset by name
   */
  list(
    query: DatasetListParams,
    options?: Core.RequestOptions
  ): Core.APIPromise<Dataset> {
    return this._client.get("/v1/dataset", { query, ...options });
  }
}

export interface Dataset {
  description: string;

  name: string;

  id?: string;

  company_id?: string;

  creation_time?: string;

  last_updated_time?: string;

  s3_location?: string;

  sha?: string;

  user_id?: string;
}

export interface DatasetCreateParams {
  /**
   * The CSV file containing the dataset
   */
  file: Core.Uploadable;

  /**
   * Name of the dataset
   */
  name: string;

  /**
   * Optional description of the dataset
   */
  description?: string;
}

export interface DatasetListParams {
  name: string;
}

Datasets.Records = Records;
Datasets.Collection = Collection;

export declare namespace Datasets {
  export {
    type Dataset as Dataset,
    type DatasetCreateParams as DatasetCreateParams,
    type DatasetListParams as DatasetListParams,
  };

  export {
    Records as Records,
    type RecordListResponse as RecordListResponse,
    type RecordListParams as RecordListParams,
  };

  export {
    Collection as Collection,
    type CollectionCreateResponse as CollectionCreateResponse,
    type CollectionRetrieveResponse as CollectionRetrieveResponse,
    type CollectionCreateParams as CollectionCreateParams,
    type CollectionRetrieveParams as CollectionRetrieveParams,
  };
}
