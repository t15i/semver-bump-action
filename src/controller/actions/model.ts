export type VersionModel = string;

export interface BumpParamsModel {
  owner: string;
  repo: string;
  labels: string;
  basehead: string;
  version: string;
}

export class InvalidVersionFormatError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidVersionFormatError";
  }
}

export class InvalidLabelsFormatError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidLabelsFormatError";
  }
}

export class InvalidBaseHeadFormatError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidBaseHeadFormatError";
  }
}
