// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Aimon from 'aimon';
import { Response } from 'node-fetch';

const aimon = new Aimon({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource metrics', () => {
  test('list', async () => {
    const responsePromise = aimon.applications.metrics.list('string');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      aimon.applications.metrics.list('string', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Aimon.NotFoundError);
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      aimon.applications.metrics.list(
        'string',
        {
          end_timestamp: '2019-12-27T18:11:19.117Z',
          start_timestamp: '2019-12-27T18:11:19.117Z',
          version: 'string',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Aimon.NotFoundError);
  });

  test('listOne', async () => {
    const responsePromise = aimon.applications.metrics.listOne('string', 'string');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('listOne: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      aimon.applications.metrics.listOne('string', 'string', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Aimon.NotFoundError);
  });

  test('listOne: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      aimon.applications.metrics.listOne(
        'string',
        'string',
        {
          end_timestamp: '2019-12-27T18:11:19.117Z',
          start_timestamp: '2019-12-27T18:11:19.117Z',
          version: 'string',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Aimon.NotFoundError);
  });

  test('listRunMetrics', async () => {
    const responsePromise = aimon.applications.metrics.listRunMetrics('string', 'string', 'string');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('listRunMetrics: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      aimon.applications.metrics.listRunMetrics('string', 'string', 'string', {
        path: '/_stainless_unknown_path',
      }),
    ).rejects.toThrow(Aimon.NotFoundError);
  });

  test('listRunMetrics: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      aimon.applications.metrics.listRunMetrics(
        'string',
        'string',
        'string',
        {
          end_timestamp: '2019-12-27T18:11:19.117Z',
          start_timestamp: '2019-12-27T18:11:19.117Z',
          version: 'string',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Aimon.NotFoundError);
  });
});
