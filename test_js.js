const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

class AimonClient {
  constructor(apiKey, email, baseUrl = "https://pbe-api.aimon.ai") {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.httpClient = axios.create({
      baseURL: baseUrl,
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    this.initializeUser(email);
  }

  createAuthHeader() {
    return { Authorization: `Bearer ${this.apiKey}` };
  }

  async initializeUser(email) {
    try {
      this.user = await this.getUser(email);
    } catch (error) {
      console.error("Error initializing user:", error);
    }
  }

  async getUser(email) {
    const headers = this.createAuthHeader();

    try {
      const response = await this.httpClient.get("/v1/user", {
        headers: headers,
        params: { email: email },
      });

      if (!response.data) {
        throw new Error(
          "Invalid user email specified. Please reach out to the Aimon team for help."
        );
      }

      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  }

  async createDataset(name, filePath, description) {
    const headers = this.createAuthHeader();

    // Check if dataset exists
    try {
      const datasetResponse = await this.httpClient.get("/v1/dataset", {
        headers: headers,
        params: { name: name },
      });

      if (datasetResponse.data) {
        const dataset = datasetResponse.data;
        return new Dataset(
          dataset.name,
          dataset.description,
          dataset.creation_time,
          dataset.last_updated_time,
          dataset.s3_location,
          dataset.sha,
          dataset.user_id
        );
      }
    } catch (error) {
      console.error("Error fetching dataset:", error);
    }

    // Dataset does not exist, create a new one
    if (!filePath) {
      throw new Error("file_path is required to create a new dataset");
    }

    if (!description) {
      throw new Error(
        "The description field is required to create a new dataset"
      );
    }

    const data = new FormData();
    data.append("name", name);
    data.append("description", description);
    data.append("user_id", this.user.id);
    data.append("file", fs.createReadStream(filePath));

    try {
      const response = await axios.post(`${this.baseUrl}/v1/dataset`, data, {
        headers: {
          ...headers,
          ...data.getHeaders(),
        },
      });

      const resDs = response.data;
      return new Dataset(
        resDs.name,
        resDs.description,
        resDs.creation_time,
        resDs.last_updated_time,
        resDs.sha,
        resDs.user_id
      );
    } catch (error) {
      console.error("Error creating dataset:", error);
    }
  }

  async getDataset(name) {
    const headers = this.createAuthHeader();

    // Check if dataset exists
    try {
      const datasetResponse = await this.httpClient.get("/v1/dataset", {
        headers: headers,
        params: { name: name },
      });

      if (!datasetResponse.data) {
        throw new Error(`Dataset with name ${name} not found`);
      }

      const dataset = datasetResponse.data;
      return new Dataset(
        dataset.name,
        dataset.description,
        dataset.creation_time,
        dataset.last_updated_time,
        dataset.sha,
        dataset.user_id
      );
    } catch (error) {
      console.error("Error fetching dataset:", error);
      throw error;
    }
  }

  async listModelTypes() {
    const headers = this.createAuthHeader();
    try {
      const response = await this.httpClient.get("/v1/list-model-types", {
        headers,
      });
      return response.data;
    } catch (error) {
      console.error("Error listing model types:", error);
      throw error;
    }
  }

  async model(name, modelType, description = null, metadata = null) {
    const headers = this.createAuthHeader();
    const data = {
      name: name,
      type: modelType,
    };
    if (description) {
      data.description = description;
    }
    if (metadata) {
      data.metadata = metadata;
    }

    try {
      const response = await this.httpClient.post("/v1/model", data, {
        headers,
      });
      const mlModel = response.data;
      if (!mlModel) {
        throw new Error(
          `Error creating model with name ${name} and type ${modelType}`
        );
      }
      return new MLModel(
        mlModel.company_id,
        mlModel.name,
        mlModel.type,
        mlModel.description,
        mlModel.metadata_
      );
    } catch (error) {
      console.error("Error creating model:", error);
      throw error;
    }
  }

  async application(name, model, stage, appType, metadata = null) {
    const headers = this.createAuthHeader();
    const data = {
      name: name,
      model_name: model.name,
      stage: stage,
      type: appType,
      user_id: this.user.id,
    };
    if (metadata) {
      data.metadata = metadata;
    }

    try {
      const response = await this.httpClient.post("/v1/application", data, {
        headers,
      });
      const application = response.data;
      if (!application) {
        throw new Error(
          `Error creating or retrieving the application with name ${name} and type ${appType}`
        );
      }
      return new Application(
        application.id,
        application.company_id,
        application.name,
        application.model_id,
        application.stage,
        application.type,
        application.user_id,
        application.version,
        application.metadata_
      );
    } catch (error) {
      console.error("Error creating application:", error);
      throw error;
    }
  }

  async datasetCollection(name, datasets, description = null) {
    const headers = this.createAuthHeader();
    const dsIds = datasets.map((dataset) => dataset.sha);
    const data = {
      name: name,
      user_id: this.user.id,
      dataset_ids: dsIds,
    };
    if (description) {
      data.description = description;
    }

    try {
      const response = await this.httpClient.post(
        "/v1/dataset-collection",
        data,
        { headers }
      );
      const dsColl = response.data;
      return new DatasetCollection(
        dsColl.id,
        dsColl.name,
        dsColl.user_id,
        datasets,
        dsColl.description
      );
    } catch (error) {
      console.error("Error creating dataset collection:", error);
      throw error;
    }
  }

  async evaluation(name, application, datasetCollection, description = null) {
    const headers = this.createAuthHeader();
    const data = {
      name: name,
      dataset_collection_id: datasetCollection.id,
      model_id: application.modelId,
      application_id: application.id,
    };
    if (description) {
      data.description = description;
    }

    try {
      const response = await this.httpClient.post("/v1/evaluation", data, {
        headers,
      });
      const evalRes = response.data;
      return new Evaluation(
        evalRes.id,
        evalRes.name,
        evalRes.application_id,
        evalRes.dataset_collection_id,
        evalRes.start_time,
        evalRes.description || null
      );
    } catch (error) {
      console.error("Error creating evaluation:", error);
      throw error;
    }
  }

  async newRun(evaluation, metricsConfig, tags) {
    const headers = this.createAuthHeader();
    const data = {
      evaluation_id: evaluation.id,
      metrics_config: metricsConfig,
      tags: tags,
    };

    try {
      const response = await this.httpClient.post("/v1/evaluation-run", data, {
        headers,
      });
      const runRes = response.data;
      return new Run(
        runRes.id,
        runRes.evaluation_id,
        runRes.run_number,
        runRes.creation_time,
        runRes.completed_time,
        runRes.metadata_
      );
    } catch (error) {
      console.error("Error creating evaluation run:", error);
      throw error;
    }
  }
}

class Dataset {
  constructor(
    name,
    description,
    creationTime,
    lastUpdatedTime,
    s3Location,
    sha,
    userId
  ) {
    this.name = name;
    this.description = description;
    this.creationTime = creationTime;
    this.lastUpdatedTime = lastUpdatedTime;
    this.s3Location = s3Location;
    this.sha = sha;
    this.userId = userId;
  }
}

class DatasetCollection {
  constructor(id, name, userId, datasets, description) {
    this.id = id;
    this.name = name;
    this.userId = userId;
    this.datasets = datasets;
    this.description = description;
  }
}

class MLModel {
  constructor(companyId, name, type, description, metadata) {
    this.companyId = companyId;
    this.name = name;
    this.type = type;
    this.description = description;
    this.metadata = metadata;
  }
}

class Application {
  constructor(
    id,
    companyId,
    name,
    modelId,
    stage,
    type,
    userId,
    version,
    metadata
  ) {
    this.id = id;
    this.companyId = companyId;
    this.name = name;
    this.modelId = modelId;
    this.stage = stage;
    this.type = type;
    this.userId = userId;
    this.version = version;
    this.metadata = metadata;
  }
}

class Evaluation {
  constructor(
    id,
    name,
    applicationId,
    datasetCollectionId,
    startTime,
    description
  ) {
    this.id = id;
    this.name = name;
    this.applicationId = applicationId;
    this.datasetCollectionId = datasetCollectionId;
    this.startTime = startTime;
    this.description = description;
  }
}

class Run {
  constructor(
    id,
    evaluationId,
    runNumber,
    creationTime,
    completedTime,
    metadata
  ) {
    this.id = id;
    this.evaluationId = evaluationId;
    this.runNumber = runNumber;
    this.creationTime = creationTime;
    this.completedTime = completedTime;
    this.metadata = metadata;
  }
}

module.exports = AimonClient;

// Usage

//const AimonClient = require('./client');

// Initialize the client
const apiKey = "your-api-key";
const user = { id: "user-id" };
const client = new AimonClient(apiKey, user);

async function main() {
  try {
    // Step 1: List model types
    const modelTypes = await client.listModelTypes();
    console.log("Model types:", modelTypes);

    // Step 2: Create a new model
    const modelName = "my-model";
    const modelType = modelTypes[0]; // Assuming the first model type
    const modelDescription = "This is a model description";
    const modelMetadata = { key: "value" };
    const model = await client.model(
      modelName,
      modelType,
      modelDescription,
      modelMetadata
    );
    console.log("Model created:", model);

    // Step 3: Create a new application
    const appName = "my-app";
    const appStage = "production"; // or 'experimentation'
    const appType = "app-type-1";
    const appMetadata = { key: "value" };
    const application = await client.application(
      appName,
      model,
      appStage,
      appType,
      appMetadata
    );
    console.log("Application created:", application);

    // Step 4: Create a new dataset
    const datasetName = "my-dataset";
    const filePath = "path/to/your/file.csv";
    const description = "This is a dataset description";
    const dataset = await client.createDataset(
      datasetName,
      filePath,
      description
    );
    console.log("Dataset created:", dataset);

    // Step 5: Retrieve the dataset
    const retrievedDataset = await client.getDataset(datasetName);
    console.log("Retrieved dataset:", retrievedDataset);

    // Step 6: Create a dataset collection
    const datasets = [retrievedDataset]; // Assuming you have multiple datasets
    const datasetCollectionName = "my-dataset-collection";
    const datasetCollectionDescription =
      "This is a dataset collection description";
    const datasetCollection = await client.datasetCollection(
      datasetCollectionName,
      datasets,
      datasetCollectionDescription
    );
    console.log("Dataset collection created:", datasetCollection);

    // Step 7: Create an evaluation
    const evaluationName = "my-evaluation";
    const evaluationDescription = "This is an evaluation description";
    const evaluation = await client.evaluation(
      evaluationName,
      application,
      datasetCollection,
      evaluationDescription
    );
    console.log("Evaluation created:", evaluation);

    // Step 8: Create a new evaluation run
    const metricsConfig = { metricKey: "metricValue" }; // Your metrics configuration
    const tags = ["tag1", "tag2"];
    const run = await client.newRun(evaluation, metricsConfig, tags);
    console.log("Evaluation run created:", run);
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
