// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Aimon from 'aimon';
import { Response } from 'node-fetch';

const aimon = new Aimon({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource evaluations', () => {
  test('create: only required params', async () => {
    const responsePromise = aimon.evaluations.create({
      application_id: 'string',
      dataset_collection_id: 'string',
      model_id: 'string',
      name: 'string',
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
    const response = await aimon.evaluations.create({
      application_id: 'string',
      dataset_collection_id: 'string',
      model_id: 'string',
      name: 'string',
      created_at: '2019-12-27T18:11:19.117Z',
    });
  });

  test('retrieve: only required params', async () => {
    const responsePromise = aimon.evaluations.retrieve({ name: 'string' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve: required and optional params', async () => {
    const response = await aimon.evaluations.retrieve({ name: 'string' });
  });

  test('computeMetrics: only required params', async () => {
    const responsePromise = aimon.evaluations.computeMetrics([
      { application_id: 'string', output: 'string' },
      { application_id: 'string', output: 'string' },
      { application_id: 'string', output: 'string' },
    ]);
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('computeMetrics: required and optional params', async () => {
    const response = await aimon.evaluations.computeMetrics([
      {
        application_id: 'string',
        output: 'string',
        additionalProperty1: 'string',
        additionalProperty2: 'string',
      },
      {
        application_id: 'string',
        output: 'string',
        additionalProperty1: 'string',
        additionalProperty2: 'string',
      },
      {
        application_id: 'string',
        output: 'string',
        additionalProperty1: 'string',
        additionalProperty2: 'string',
      },
    ]);
  });
});
