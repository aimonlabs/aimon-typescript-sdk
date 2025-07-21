// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Client } from './index';

export abstract class APIResource {
  protected _client: Client;

  constructor(client: Client) {
    this._client = client;
  }
}
