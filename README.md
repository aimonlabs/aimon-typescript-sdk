# Aimon Node API Library

[![NPM version](https://img.shields.io/npm/v/aimon.svg)](https://npmjs.org/package/aimon) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/aimon)

This library provides convenient access to the Aimon REST API from server-side TypeScript or JavaScript.

The REST API documentation can be found [on docs.aimon.ai](https://docs.aimon.ai). The full API of this library can be found in [api.md](api.md).

## Installation

```sh
npm install aimon
```

## Usage

<!-- prettier-ignore -->
```js
import Client from "aimon";
import { OpenAI } from "@langchain/openai";
import { loadSummarizationChain } from "langchain/chains";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { fileFromPath } from "formdata-node/file-from-path";

// Create the AIMon client. You would need an API Key (that can be retrieved from the UI in your user profile).
const aimon = new Client({
  authHeader: 'Bearer: <AIMON_API_KEY>',
});

// Initialize OpenAI configuration
const openaiApiKey = "OPENAI_API_KEY";

const runApplication: any = async (
  applicationName: string,
  modelName: string,
  sourceText: any,
  prompt: string | null = null,
  userQuery: string | null = null,
) => {
  // Split the source text
  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
  const docs = await textSplitter.createDocuments([sourceText]);
  const contextDocs = docs.map((doc) => doc.pageContent);

  // Summarize the texts
  const llm = new OpenAI({ temperature: 0, openAIApiKey: openaiApiKey });
  const chain = loadSummarizationChain(llm, { type: "map_reduce" });
  const output = await chain.invoke({
    input_documents: docs,
  });

  const payload = {
    context_docs: contextDocs,
    output: String(output.text),
    prompt: prompt ?? "",
    user_query: userQuery ?? "",
    instructions: "These are the instructions",
    actual_request_timestamp: "2024-08-02 14:30:00", // Used as the request time if provided; defaults to current date if not set.
  };

  const config = {
    hallucination: { detector_name: "default" },
    conciseness: { detector_name: "default" },
    completeness: { detector_name: "default" },
    instruction_adherence: { detector_name: "default" },
  };

  // Analyze quality of the generated output using AIMon
  const response: Client.AnalyzeCreateResponse = await aimon.analyze.production(
    applicationName,
    modelName,
    payload,
    config
  );
};


// A synchronous API to detect quality metrics in the response of a language model.
const detectMetrics: any = async (sourceText: any) => {
  // Split the source text
  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
  const docs = await textSplitter.createDocuments([sourceText]);
  const contextDocs = docs.map((doc) => doc.pageContent);

  // Summarize the texts
  const llm = new OpenAI({ temperature: 0, openAIApiKey: openaiApiKey });
  const chain = loadSummarizationChain(llm, { type: "map_reduce" });
  const output = await chain.invoke({
    input_documents: docs,
  });

  // Detect quality of the generated output using AIMon
  const detectParams: Client.InferenceDetectParams.Body[] = [
    {
      context: contextDocs,
      generated_text: output.text,
    },
  ];

  // Call the API
  const aimonResponse: Client.InferenceDetectResponse =
    await aimon.inference.detect(detectParams);
};

async function main() {
  try {
    
    /** It is possible to check metrics in two different ways, using the async call name runApplication below or the synchronous call name detectMetrics. **/
    runApplication("application_name", "model_name", sourceText, prompt, userQuery);

    /** Synchronous call **/
    // detectMetrics();
    

  } catch (error) {
    // Error
    console.log(error);
  }
}

main();
```

## Creating Evaluations

<!-- prettier-ignore -->
```js
import Client from "aimon";
import { OpenAI } from "@langchain/openai";
import { loadSummarizationChain } from "langchain/chains";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { fileFromPath } from "formdata-node/file-from-path";

// Create the AIMon client. You would need an API Key (that can be retrieved from the UI in your user profile).
const aimon = new Client({
  authHeader: 'Bearer: <AIMON_API_KEY>',
});

// Initialize OpenAI configuration
const openaiApiKey = "OPENAI_API_KEY";

// Analyzes the dataset record and model output offline.
const runApplication: any = async (
  application: any,
  sourceText: any,
  prompt: string | null = null,
  userQuery: string | null = null,
  evaluationRun: any = null
) => {
  // Split the source text
  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
  const docs = await textSplitter.createDocuments([sourceText]);
  const contextDocs = docs.map((doc) => doc.pageContent);

  // Summarize the texts
  const llm = new OpenAI({ temperature: 0, openAIApiKey: openaiApiKey });
  const chain = loadSummarizationChain(llm, { type: "map_reduce" });
  const output = await chain.invoke({
    input_documents: docs,
  });

  // Analyze quality of the generated output using AIMon
  const aimonResponse: Client.AnalyzeCreateResponse =
    await aimon.analyze.create([
      {
        application_id: application.id,
        version: application.version,
        prompt: prompt !== null ? prompt : "",
        user_query: userQuery !== null ? userQuery : "",
        context_docs: contextDocs,
        output: output.text,
        evaluation_id: evaluationRun.evaluation_id,
        evaluation_run_id: evaluationRun.id,
      },
    ]);
};

// Creates a new dataset from the local path csv file
const createDataset = async (
  path: string,
  datasetName: string,
  description: string
): Promise<Client.Dataset> => {
  const file = await fileFromPath(path);
  const json_data = JSON.stringify({
    name: datasetName,
    description: description,
  });

  const params = {
    file: file,
    json_data: json_data,
  };

  const dataset: Client.Dataset = await aimon.datasets.create(params);
  return dataset;
};

async function main() {
  try {
    // Pick from existing model model types in the company. These are created by you or other member of your organization.
    // The AIMon client has a convenience function to easily retrieve this.
    const modelTypes = await aimon.models.list();

    // Create or get a model for a given model type.
    // This API will automatically create a new model if it does not exist.
    const myModel: Client.ModelCreateResponse = await aimon.models.create({
      name: "my_gpt4_model_fine_tuned",
      type: "GPT-4",
      description:
        "This model is a GPT4 based model and is fine tuned on the awesome_finetuning dataset",
    });

    // Create or get an existing application
    // This API will automatically create a new application if it does not exist.
    const myApplication: Client.ApplicationCreateResponse =
      await aimon.applications.create({
        name: "my_llm_summarization_app",
        model_name: myModel.name,
        type: "summarization",
        stage: "evaluation",
      });

    const dataset1 = await createDataset(
      "/path/to/file/filename_1.csv",
      "filename1.csv",
      "description"
    );

    const dataset2 = await createDataset(
      "/path/to/file/filename_2.csv",
      "filename2.csv",
      "description"
    );

    let datasetCollection: Client.Datasets.CollectionCreateResponse | undefined;

    // Ensures that dataset1.sha and dataset2.sha are defined
    if (dataset1.sha && dataset2.sha) {
      // Creates dataset collection
      datasetCollection = await aimon.datasets.collection.create({
        name: "my_first_dataset_collection",
        dataset_ids: [dataset1.sha, dataset2.sha],
        description: "This is a collection of two datasets.",
      });
    } else {
      throw new Error("Dataset sha is undefined");
    }

    // Creates evaluation
    let evaluation: Client.EvaluationCreateResponse;

    if (
      datasetCollection &&
      datasetCollection.id &&
      myModel.id &&
      myApplication.id
    ) {
      evaluation = await aimon.evaluations.create({
        name: "my_evaluation",
        dataset_collection_id: datasetCollection.id,
        model_id: myModel.id,
        application_id: myApplication.id,
      });
    } else {
      throw new Error("Dataset collection is not defined");
    }

    // Creates evaluation run
    let newEvaluationRun: Client.Evaluations.RunCreateParams;
    if (evaluation && evaluation.id) {
      newEvaluationRun = await aimon.evaluations.run.create({
        evaluation_id: evaluation.id,
      });
    } else {
      throw new Error("Error creating evaluation run");
    }

    const records: any = await aimon.datasets.records.list({
      sha: dataset1.sha,
    });

    for (const record of records) {
      await runApplication(
        myApplication,
        record.context_docs,
        record.prompt,
        record.user_query,
        newEvaluationRun
      );
    }

    // List metrics for the entire application
    const applicationMetrics = await aimon.applications.evaluations.metrics.retrieve({
      application_name: myApplication.name,
    });

    // Get metrics for an specific evaluation
    if (evaluation.id) {
      const query = { application_name: myApplication.name };
      const evalMetrics =
        await aimon.applications.evaluations.metrics.getEvaluationMetrics(
          evaluation.id,
          query
        );
    }
    // Get metrics for an specific evaluation run
    if (newEvaluationRun.id) {
      const query = { application_name: myApplication.name };
      const evalRunMetrics =
        await aimon.applications.evaluations.metrics.getEvaluationRunMetrics(
          evaluation.id,
          newEvaluationRun.id,
          query
        );
    }

  } catch (error) {
    // Error
    console.log(error);
  }
}

main();
```

### Delete an application

```js
import Client from "aimon";

// Create the AIMon client. You would need an API Key (that can be retrieved from the UI in your user profile).
const aimon = new Client({
  authHeader: "Bearer: <AIMON_API_KEY>",
});

const response = await aimon.applications.delete({
  name: "application_name",
  stage: "application_stage",
  version: "version",
});
```

### Request & Response types

This library includes TypeScript definitions for all request params and response fields. You may import and use them like so:

<!-- prettier-ignore -->
```ts
import Aimon from 'aimon';

const aimon = new Aimon({
  apiKey: 'My API Key',
});

async function main() {
  const params: Aimon.UserRetrieveParams = { email: 'REPLACE_ME' };
  const user: Aimon.User = await aimon.users.retrieve(params);
}

main();
```

Documentation for each method, request param, and response field are available in docstrings and will appear on hover in most modern editors.

## Handling errors

When the library is unable to connect to the API,
or if the API returns a non-success status code (i.e., 4xx or 5xx response),
a subclass of `APIError` will be thrown:

<!-- prettier-ignore -->
```ts
async function main() {
  const user = await aimon.users.retrieve({ email: 'REPLACE_ME' }).catch(async (err) => {
    if (err instanceof Aimon.APIError) {
      console.log(err.status); // 400
      console.log(err.name); // BadRequestError
      console.log(err.headers); // {server: 'nginx', ...}
    } else {
      throw err;
    }
  });
}

main();
```

Error codes are as followed:

| Status Code | Error Type                 |
| ----------- | -------------------------- |
| 400         | `BadRequestError`          |
| 401         | `AuthenticationError`      |
| 403         | `PermissionDeniedError`    |
| 404         | `NotFoundError`            |
| 422         | `UnprocessableEntityError` |
| 429         | `RateLimitError`           |
| >=500       | `InternalServerError`      |
| N/A         | `APIConnectionError`       |

### Retries

Certain errors will be automatically retried 2 times by default, with a short exponential backoff.
Connection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,
429 Rate Limit, and >=500 Internal errors will all be retried by default.

You can use the `maxRetries` option to configure or disable this:

<!-- prettier-ignore -->
```js
// Configure the default for all requests:
const aimon = new Aimon({
  maxRetries: 0, // default is 2
});

// Or, configure per-request:
await aimon.users.retrieve({ email: 'REPLACE_ME' }, {
  maxRetries: 5,
});
```

### Timeouts

Requests time out after 1 minute by default. You can configure this with a `timeout` option:

<!-- prettier-ignore -->
```ts
// Configure the default for all requests:
const aimon = new Aimon({
  timeout: 20 * 1000, // 20 seconds (default is 1 minute)
});

// Override per-request:
await aimon.users.retrieve({ email: 'REPLACE_ME' }, {
  timeout: 5 * 1000,
});
```

On timeout, an `APIConnectionTimeoutError` is thrown.

Note that requests which time out will be [retried twice by default](#retries).

## Advanced Usage

### Accessing raw Response data (e.g., headers)

The "raw" `Response` returned by `fetch()` can be accessed through the `.asResponse()` method on the `APIPromise` type that all methods return.

You can also use the `.withResponse()` method to get the raw `Response` along with the parsed data.

<!-- prettier-ignore -->
```ts
const aimon = new Aimon();

const response = await aimon.users.retrieve({ email: 'REPLACE_ME' }).asResponse();
console.log(response.headers.get('X-My-Header'));
console.log(response.statusText); // access the underlying Response object

const { data: user, response: raw } = await aimon.users.retrieve({ email: 'REPLACE_ME' }).withResponse();
console.log(raw.headers.get('X-My-Header'));
console.log(user.id);
```

### Making custom/undocumented requests

This library is typed for convenient access to the documented API. If you need to access undocumented
endpoints, params, or response properties, the library can still be used.

#### Undocumented endpoints

To make requests to undocumented endpoints, you can use `client.get`, `client.post`, and other HTTP verbs.
Options on the client, such as retries, will be respected when making these requests.

```ts
await client.post("/some/path", {
  body: { some_prop: "foo" },
  query: { some_query_arg: "bar" },
});
```

#### Undocumented request params

To make requests using undocumented parameters, you may use `// @ts-expect-error` on the undocumented
parameter. This library doesn't validate at runtime that the request matches the type, so any extra values you
send will be sent as-is.

```ts
client.foo.create({
  foo: "my_param",
  bar: 12,
  // @ts-expect-error baz is not yet public
  baz: "undocumented option",
});
```

For requests with the `GET` verb, any extra params will be in the query, all other requests will send the
extra param in the body.

If you want to explicitly send an extra argument, you can do so with the `query`, `body`, and `headers` request
options.

#### Undocumented response properties

To access undocumented response properties, you may access the response object with `// @ts-expect-error` on
the response object, or cast the response object to the requisite type. Like the request params, we do not
validate or strip extra properties from the response from the API.

### Customizing the fetch client

By default, this library uses `node-fetch` in Node, and expects a global `fetch` function in other environments.

If you would prefer to use a global, web-standards-compliant `fetch` function even in a Node environment,
(for example, if you are running Node with `--experimental-fetch` or using NextJS which polyfills with `undici`),
add the following import before your first import `from "Aimon"`:

```ts
// Tell TypeScript and the package to use the global web fetch instead of node-fetch.
// Note, despite the name, this does not add any polyfills, but expects them to be provided if needed.
import "aimon/shims/web";
import Aimon from "aimon";
```

### Logging and middleware

You may also provide a custom `fetch` function when instantiating the client,
which can be used to inspect or alter the `Request` or `Response` before/after each request:

```ts
import { fetch } from "undici"; // as one example
import Aimon from "aimon";

const client = new Aimon({
  fetch: async (url: RequestInfo, init?: RequestInit): Promise<Response> => {
    console.log("About to make a request", url, init);
    const response = await fetch(url, init);
    console.log("Got response", response);
    return response;
  },
});
```

Note that if given a `DEBUG=true` environment variable, this library will log all requests and responses automatically.
This is intended for debugging purposes only and may change in the future without notice.

### Configuring an HTTP(S) Agent (e.g., for proxies)

By default, this library uses a stable agent for all http/https requests to reuse TCP connections, eliminating many TCP & TLS handshakes and shaving around 100ms off most requests.

If you would like to disable or customize this behavior, for example to use the API behind a proxy, you can pass an `httpAgent` which is used for all requests (be they http or https), for example:

<!-- prettier-ignore -->
```ts
import http from 'http';
import { HttpsProxyAgent } from 'https-proxy-agent';

// Configure the default for all requests:
const aimon = new Aimon({
  httpAgent: new HttpsProxyAgent(process.env.PROXY_URL),
});

// Override per-request:
await aimon.users.retrieve(
  { email: 'REPLACE_ME' },
  {
    httpAgent: new http.Agent({ keepAlive: false }),
  },
);
```

## Semantic versioning

This package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:

1. Changes that only affect static types, without breaking runtime behavior.
2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals)_.
3. Changes that we do not expect to impact the vast majority of users in practice.

We take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.

## Requirements

TypeScript >= 4.5 is supported.

The following runtimes are supported:

- Node.js 18 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.
- Deno v1.28.0 or higher, using `import Aimon from "npm:aimon"`.
- Bun 1.0 or later.
- Cloudflare Workers.
- Vercel Edge Runtime.
- Jest 28 or greater with the `"node"` environment (`"jsdom"` is not supported at this time).
- Nitro v2.6 or greater.

Note that React Native is not supported at this time.

If you are interested in other runtime environments, please open or upvote an issue on GitHub.
