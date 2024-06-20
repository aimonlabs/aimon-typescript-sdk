import axios, { AxiosInstance } from "axios";
import FormData from "form-data";
import fs from "fs";
import { User, Dataset, Model, Application, Evaluation, Run } from "./types";

export class AimonClient {
  private apiKey: string;
  private baseUrl: string;
  private httpClient: AxiosInstance;
  public user: User | null = null;

  constructor(
    apiKey: string,
    email: string,
    baseUrl: string = "https://pbe-api.aimon.ai"
  ) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.httpClient = axios.create({
      baseURL: baseUrl,
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    this.initializeUser(email).catch(console.error);
  }

  private createAuthHeader(): object {
    return { Authorization: `Bearer ${this.apiKey}` };
  }

  private async initializeUser(email: string): Promise<void> {
    this.user = await this.getUser(email);
  }

  public async getUser(email: string): Promise<User> {
    const headers = this.createAuthHeader();
    const response = await this.httpClient.get<User>("/v1/user", {
      headers,
      params: { email },
    });
    return response.data;
  }

  public async createDataset(
    name: string,
    filePath: string,
    description: string
  ): Promise<Dataset> {
    const headers = this.createAuthHeader();
    if (!filePath) {
      throw new Error("File path is required to create a new dataset.");
    }

    const data = new FormData();
    data.append("name", name);
    data.append("description", description);
    if (this.user === null) {
      throw new Error("User is not initialized.");
    }
    data.append("user_id", this.user.id);
    data.append("file", fs.createReadStream(filePath));

    const response = await this.httpClient.post<Dataset>(`/v1/dataset`, data, {
      headers: { ...headers, ...data.getHeaders() },
    });

    return response.data;
  }

  public async getDataset(name: string): Promise<Dataset> {
    const headers = this.createAuthHeader();
    const response = await this.httpClient.get<Dataset>(`/v1/dataset`, {
      headers,
      params: { name },
    });

    return response.data;
  }

  public async listModelTypes(): Promise<string[]> {
    const headers = this.createAuthHeader();
    const response = await this.httpClient.get<string[]>(
      `/v1/list-model-types`,
      {
        headers,
      }
    );
    return response.data;
  }

  public async createModel(
    name: string,
    modelType: string,
    description: string = "",
    metadata: object = {}
  ): Promise<Model> {
    const headers = this.createAuthHeader();
    const data = { name, type: modelType, description, metadata };

    const response = await this.httpClient.post<Model>(`/v1/model`, data, {
      headers,
    });

    return response.data;
  }

  public async createApplication(
    name: string,
    model: Model,
    stage: string,
    appType: string,
    metadata: object = {}
  ): Promise<Application> {
    const headers = this.createAuthHeader();

    if (this.user === null) {
      throw new Error("User must be initialized.");
    }
    const data = {
      name,
      model_name: model.name,
      stage,
      type: appType,
      user_id: this.user.id,
      metadata,
    };

    const response = await this.httpClient.post<Application>(
      `/v1/application`,
      data,
      {
        headers,
      }
    );

    return response.data;
  }

  public async createEvaluation(
    name: string,
    application: Application,
    datasetCollectionId: string,
    description: string = ""
  ): Promise<Evaluation> {
    const headers = this.createAuthHeader();
    const data = {
      name,
      application_id: application.id,
      dataset_collection_id: datasetCollectionId,
      description,
    };

    const response = await this.httpClient.post<Evaluation>(
      `/v1/evaluation`,
      data,
      {
        headers,
      }
    );

    return response.data;
  }

  public async startEvaluationRun(
    evaluationId: string,
    metricsConfig: object,
    tags: string[] = []
  ): Promise<Run> {
    const headers = this.createAuthHeader();
    const data = {
      evaluation_id: evaluationId,
      metrics_config: metricsConfig,
      tags,
    };

    const response = await this.httpClient.post<Run>(
      `/v1/evaluation-run`,
      data,
      {
        headers,
      }
    );

    return response.data;
  }
}
