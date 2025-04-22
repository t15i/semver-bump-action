import { getInput, setFailed, setOutput } from "@actions/core";
import { context } from "@actions/github";

import { BumperService } from "@/domain/bumper/index.js";

import {
  bumpParamsFromBumpParamsModel,
  versionModelFromVersion,
} from "./mapper.js";

export class ActionsController {
  constructor(private bumperService: BumperService) {}

  async action() {
    try {
      setOutput(
        "bumped_version",
        versionModelFromVersion(
          await this.bumperService.bump(
            bumpParamsFromBumpParamsModel({
              ...context.repo,
              labels: getInput("labels"),
              basehead: getInput("basehead"),
              version: getInput("version"),
            }),
          ),
        ),
      );
    } catch (e) {
      if (e instanceof Error) setFailed(e.message);
    }
  }
}
