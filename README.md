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

// Create the AIMon client. You would need an API Key (that can be retrieved from the UI in your user profile).
const client = new Client({ authHeader: "Bearer <AIMON_API_KEY>" });

const generated_text = "your_generated_text";
const context = ["your_context"];
const userQuery = "your_user_query";

// Analyze quality of the generated output using AIMon
const response = await client.detect(generatedText, context, userQuery);
console.log("Response from detect:", response);
```

## Creating Evaluations

<!-- prettier-ignore -->
```js
import Client from "aimon";
const client = new Client({ authHeader: "Bearer <AIMON_API_KEY>" });
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

  const dataset: Client.Dataset = await client.datasets.create(params);
  return dataset;
};

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

// Create a dataset collection
let datasetCollection: Client.Datasets.CollectionCreateResponse | undefined;

// Ensures that dataset1.sha and dataset2.sha are defined
if (dataset1.sha && dataset2.sha) {
  // Creates dataset collection
  datasetCollection = await client.datasets.collection.create({
    name: "my_first_dataset_collection",
    dataset_ids: [dataset1.sha, dataset2.sha],
    description: "This is a collection of two datasets.",
  });
} else {
  throw new Error("Dataset sha is undefined");
}

// Run an evaluation
import Client from "aimon";
const client = new Client({ authHeader: "Bearer <AIMON_API_KEY>" });

const headers = ["context_docs", "user_query", "output"];
const config = {
  hallucination: { detector_name: "default" },
  instruction_adherence: { detector_name: "default" },
};
const results = client.evaluate(
  "my_application_name", //Application Name
  "my_model_name", // Model name
  //this dataset collection must exist in the Aimon platform
  "my_first_dataset_collection",
  "my_evaluation_name", // Evaluation name,
  headers,
  config
);
```

### Delete an application

```js
import Client from "aimon";

// Create the AIMon client. You would need an API Key (that can be retrieved from the UI in your user profile).
const client = new Client({
  authHeader: "Bearer: <AIMON_API_KEY>",
});

const response = await client.applications.delete({
  name: "application_name",
  stage: "application_stage",
  version: "version",
});
```

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
