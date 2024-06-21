export interface User {
  id: string;
}

export interface Dataset {
  name: string;
  description: string;
  creationTime: string;
  lastUpdatedTime: string;
  s3Location: string;
  sha: string;
  userId: string;
}

export interface Model {
  companyId: string;
  name: string;
  type: string;
  description: string;
  metadata: any;
}

export interface Application {
  id: string;
  companyId: string;
  name: string;
  modelId: string;
  stage: "evaluation" | "production";
  type: string;
  userId: string;
  version: number;
  metadata: any;
}

export interface Evaluation {
  id: string;
  name: string;
  applicationId: string;
  datasetCollectionId: string;
  startTime: string;
  description?: string;
}

export interface Run {
  id: string;
  evaluationId: string;
  runNumber: number;
  creationTime: string;
  completedTime: string;
  metadata: any;
}
