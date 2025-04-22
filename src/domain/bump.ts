import { type Comparison } from "./comparison.js";
import { type SemVer } from "./semver.js";

export type BumpRule = (label: string) => boolean;

export type BumpRules = Record<keyof SemVer, BumpRule>;

export interface BumpParams {
  version: SemVer;
  comparison: Comparison;
  rules: BumpRules;
}
