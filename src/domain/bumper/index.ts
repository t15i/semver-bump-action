import { type BumpParams } from "@/domain/bump.js";
import { type SemVer } from "@/domain/semver.js";

import { type GithubRepository } from "./repository.js";

const next = {
  null: ["patch", "minor", "major"],
  patch: ["minor", "major"],
  minor: ["major"],
  major: [],
} as const;

const prev = {
  patch: [],
  minor: ["patch"],
  major: ["minor", "patch"],
} as const;

export class BumperService {
  constructor(private githubRepo: GithubRepository) {}

  async bump(params: BumpParams): Promise<SemVer> {
    let bumpType: keyof SemVer | "null" = "null";

    const labels = this.githubRepo.getLabelsByComparison(params.comparison);

    labelsLoop: for await (const label of labels) {
      for (const part of next[bumpType]) {
        if (params.rules[part](label)) {
          bumpType = part as keyof SemVer;
          console.log(
            `${bumpType.toUpperCase()} change found, label is ${label}`,
          );

          if (bumpType === "major") {
            console.log("Remaining labels are useless, will skip them");
            break labelsLoop;
          }
        }
      }
    }
    console.log(`VERDICT: ${bumpType.toUpperCase()} change`);

    const version = { ...params.version };

    if (bumpType !== "null") {
      version[bumpType] += 1;
      for (const part of prev[bumpType]) {
        version[part] = 0;
      }
    }

    return version;
  }
}
