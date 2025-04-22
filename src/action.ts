import { getInput } from "@actions/core";

import { ActionsController } from "./controller/actions/index.js";
import { BumperService } from "./domain/bumper/index.js";
import { GraphQLGithubRepository } from "./repository/github/graphql/index.js";

export function getAction() {
  const token = getInput("token");

  const githubRepository = new GraphQLGithubRepository(token);
  const bumperService = new BumperService(githubRepository);
  const actionsController = new ActionsController(bumperService);

  return actionsController;
}
