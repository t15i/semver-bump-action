import { type BumpRules, type BumpParams } from "@/domain/bump.js";
import { type SemVer } from "@/domain/semver.js";

import {
  InvalidBaseHeadFormatError,
  InvalidLabelsFormatError,
  InvalidVersionFormatError,
  type BumpParamsModel,
  type VersionModel,
} from "./model.js";

export function versionFromVersionModel(version: VersionModel): SemVer {
  if (!version.match(/[0-9]+\.[0-9]+\.[0-9]+/)) {
    throw new InvalidVersionFormatError(
      `Expected semantic version format "x.x.x", received ${version}`,
    );
  }

  const splitted = version.split(".");
  const versions = splitted.map((value) => Number.parseInt(value));

  versions.forEach((num, i) => {
    if (Number.isNaN(num)) {
      const versionName = i === 0 ? "major" : i === 1 ? "minor" : "patch";
      throw new InvalidVersionFormatError(
        `Expected ${versionName} version to be parsable number, received ${splitted[i]}`,
      );
    }
  });

  return { major: versions[0], minor: versions[1], patch: versions[2] };
}

export function versionModelFromVersion(version: SemVer): VersionModel {
  return `${version.major}.${version.minor}.${version.patch}`;
}

export function baseHeadFromBaseHeadModel(basehead: string): {
  baseRef: string;
  headRef: string;
} {
  const splitted = basehead.split("...");

  if (splitted.length != 2) {
    throw new InvalidBaseHeadFormatError(
      `Expected basehead format "BASE...HEAD", received ${basehead}`,
    );
  }

  return {
    baseRef: splitted[0],
    headRef: splitted[1],
  };
}

export function rulesFromLabelsModel(labels: string): BumpRules {
  const splitted = labels.split(".");

  if (splitted.length > 3) {
    throw new InvalidLabelsFormatError(
      `Expected labels format "majorLabel.minorLabel.patchLabel", received ${labels}`,
    );
  }

  return {
    major: (label) => label === splitted[0],
    minor: (label) => label === splitted[1],
    patch: (label) => label === splitted[2],
  };
}

export function bumpParamsFromBumpParamsModel(
  model: BumpParamsModel,
): BumpParams {
  return {
    version: versionFromVersionModel(model.version),
    comparison: {
      owner: model.owner,
      repo: model.repo,
      ...baseHeadFromBaseHeadModel(model.basehead),
    },
    rules: rulesFromLabelsModel(model.labels),
  };
}
