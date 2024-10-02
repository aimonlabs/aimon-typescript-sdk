// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as DatasetsAPI from './datasets';
import * as CollectionAPI from './collection';
import * as RecordsAPI from './records';

export class Datasets extends APIResource {
  records: RecordsAPI.Records = new RecordsAPI.Records(this._client);
  collection: CollectionAPI.Collection = new CollectionAPI.Collection(this._client);

  /**
   * Create a new dataset
   */
  create(body: DatasetCreateParams, options?: Core.RequestOptions): Core.APIPromise<Dataset> {
    return this._client.post('/v1/dataset', Core.multipartFormRequestOptions({ body, ...options }));
  }

  /**
   * Retrieve a dataset by name
   */
  list(query: DatasetListParams, options?: Core.RequestOptions): Core.APIPromise<Dataset> {
    return this._client.get('/v1/dataset', { query, ...options });
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
   * JSON string containing dataset metadata
   */
  json_data: string;
}

export interface DatasetListParams {
  name: string;
}

export namespace Datasets {
  export import Dataset = DatasetsAPI.Dataset;
  export import DatasetCreateParams = DatasetsAPI.DatasetCreateParams;
  export import DatasetListParams = DatasetsAPI.DatasetListParams;
  export import Records = RecordsAPI.Records;
  export import RecordListResponse = RecordsAPI.RecordListResponse;
  export import RecordListParams = RecordsAPI.RecordListParams;
  export import Collection = CollectionAPI.Collection;
  export import CollectionCreateResponse = CollectionAPI.CollectionCreateResponse;
  export import CollectionRetrieveResponse = CollectionAPI.CollectionRetrieveResponse;
  export import CollectionCreateParams = CollectionAPI.CollectionCreateParams;
  export import CollectionRetrieveParams = CollectionAPI.CollectionRetrieveParams;
}
