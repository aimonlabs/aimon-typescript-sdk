// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Aimon from 'aimon';
import { Response } from 'node-fetch';

const aimon = new Aimon({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource users', () => {
  test('create: only required params', async () => {
    const responsePromise = aimon.users.create({
      id: 'string',
      email: 'string',
      phone: 'string',
      username: 'string',
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
    const response = await aimon.users.create({
      id: 'string',
      email: 'string',
      phone: 'string',
      username: 'string',
      firstName: 'string',
      lastName: 'string',
      userStatus: 0,
    });
  });

  test('retrieve: only required params', async () => {
    const responsePromise = aimon.users.retrieve({ email: 'string' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve: required and optional params', async () => {
    const response = await aimon.users.retrieve({ email: 'string' });
  });

  test('validate', async () => {
    const responsePromise = aimon.users.validate('string');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('validate: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(aimon.users.validate('string', { path: '/_stainless_unknown_path' })).rejects.toThrow(
      Aimon.NotFoundError,
    );
  });
});
