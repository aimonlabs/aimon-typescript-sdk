// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Aimon from 'aimon';
import { Response } from 'node-fetch';

const aimon = new Aimon({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource collection', () => {
  test('create: only required params', async () => {
    const responsePromise = aimon.datasets.collection.create({
      dataset_ids: ['string', 'string', 'string'],
      name: 'string',
      user_id: 'string',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await aimon.datasets.collection.create({
      dataset_ids: ['string', 'string', 'string'],
      name: 'string',
      user_id: 'string',
      description: 'string',
    });
  });
});