# Users

Types:

- <code><a href="./src/resources/users.ts">User</a></code>

Methods:

- <code title="post /v1/user">client.users.<a href="./src/resources/users.ts">create</a>({ ...params }) -> void</code>
- <code title="get /v1/user">client.users.<a href="./src/resources/users.ts">retrieve</a>({ ...params }) -> User</code>
- <code title="get /v1/api-key/{api_key}/validate">client.users.<a href="./src/resources/users.ts">validate</a>(apiKey) -> void</code>

# Models

Methods:

- <code title="post /v1/model">client.models.<a href="./src/resources/models.ts">create</a>({ ...params }) -> void</code>
- <code title="get /v1/list-model-types">client.models.<a href="./src/resources/models.ts">list</a>() -> void</code>

# Applications

Methods:

- <code title="post /v1/application">client.applications.<a href="./src/resources/applications/applications.ts">create</a>({ ...params }) -> void</code>

## Evaluations

### Metrics

Types:

- <code><a href="./src/resources/applications/evaluations/metrics.ts">MetricRetrieveResponse</a></code>
- <code><a href="./src/resources/applications/evaluations/metrics.ts">MetricListResponse</a></code>
- <code><a href="./src/resources/applications/evaluations/metrics.ts">MetricListRunMetricsResponse</a></code>

Methods:

- <code title="get /v1/application/evaluations/{evaluation_id}/metrics">client.applications.evaluations.metrics.<a href="./src/resources/applications/evaluations/metrics.ts">retrieve</a>(evaluationId, { ...params }) -> MetricRetrieveResponse</code>
- <code title="get /v1/application/evaluations/metrics">client.applications.evaluations.metrics.<a href="./src/resources/applications/evaluations/metrics.ts">list</a>({ ...params }) -> MetricListResponse</code>
- <code title="get /v1/application/evaluations/{evaluation_id}/run/{evaluation_run_id}/metrics">client.applications.evaluations.metrics.<a href="./src/resources/applications/evaluations/metrics.ts">listRunMetrics</a>(evaluationId, evaluationRunId, { ...params }) -> MetricListRunMetricsResponse</code>

## Production

### Metrics

Types:

- <code><a href="./src/resources/applications/production/metrics.ts">MetricRetriveResponse</a></code>

Methods:

- <code title="get /v1/application/production/metrics">client.applications.production.metrics.<a href="./src/resources/applications/production/metrics.ts">retrive</a>({ ...params }) -> MetricRetriveResponse</code>

# Datasets

Types:

- <code><a href="./src/resources/datasets/datasets.ts">Dataset</a></code>

Methods:

- <code title="post /v1/dataset">client.datasets.<a href="./src/resources/datasets/datasets.ts">create</a>({ ...params }) -> void</code>
- <code title="get /v1/dataset">client.datasets.<a href="./src/resources/datasets/datasets.ts">list</a>({ ...params }) -> Dataset</code>

## Records

Types:

- <code><a href="./src/resources/datasets/records.ts">RecordListResponse</a></code>

Methods:

- <code title="get /v1/dataset-records">client.datasets.records.<a href="./src/resources/datasets/records.ts">list</a>({ ...params }) -> RecordListResponse</code>

## Collection

Methods:

- <code title="post /v1/dataset-collection">client.datasets.collection.<a href="./src/resources/datasets/collection.ts">create</a>({ ...params }) -> void</code>

# Evaluations

Types:

- <code><a href="./src/resources/evaluations/evaluations.ts">EvaluationRetrieveResponse</a></code>

Methods:

- <code title="post /v1/evaluation">client.evaluations.<a href="./src/resources/evaluations/evaluations.ts">create</a>({ ...params }) -> void</code>
- <code title="get /v1/evaluations">client.evaluations.<a href="./src/resources/evaluations/evaluations.ts">retrieve</a>({ ...params }) -> EvaluationRetrieveResponse</code>
- <code title="post /v1/save-compute-metrics">client.evaluations.<a href="./src/resources/evaluations/evaluations.ts">computeMetrics</a>([ ...body ]) -> void</code>

## Run

Methods:

- <code title="post /v1/evaluation-run">client.evaluations.run.<a href="./src/resources/evaluations/run.ts">create</a>({ ...params }) -> void</code>
