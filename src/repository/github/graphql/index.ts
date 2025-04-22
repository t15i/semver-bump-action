import { getOctokit } from "@actions/github";

import { type Comparison } from "@/domain/comparison.js";
import {
  GetLabelsByComparison,
  type GetLabelsByComparisonQuery,
  type GetLabelsByComparisonQueryVariables,
} from "@/repository/.generated/graphql.js";

export class GraphQLGithubRepository {
  private octokit: ReturnType<typeof getOctokit>;

  constructor(token: string) {
    this.octokit = getOctokit(token);
  }

  async *getLabelsByComparison(
    comp: Comparison,
  ): AsyncIterableIterator<string> {
    const labels = new Set<string>();

    console.log(
      `Looking for pull requests merged between ${comp.baseRef} and ${comp.headRef}`,
    );

    let cursor: string | null | undefined;
    let hasNextPage: boolean = true;
    while (hasNextPage) {
      const data = await this.octokit.graphql<GetLabelsByComparisonQuery>(
        GetLabelsByComparison.loc!.source.body,
        { ...comp, cursor } as GetLabelsByComparisonQueryVariables,
      );

      const commits = data.repository?.ref?.compare?.commits;
      if (commits === undefined) break;

      cursor = commits.pageInfo.endCursor;
      hasNextPage = commits.pageInfo.hasNextPage;

      for (const commit of commits.nodes ?? []) {
        if (commit == null) continue;

        console.log(`Checking commit ${commit.abbreviatedOid}`);
        for (const pr of commit.associatedPullRequests?.nodes ?? []) {
          if (
            pr == null ||
            commit.abbreviatedOid !== pr?.mergeCommit?.abbreviatedOid
          )
            continue;

          console.log(`Pull request found #${pr.number}`);
          for (const label of pr.labels?.nodes ?? []) {
            if (label === null || labels.has(label.name)) continue;

            labels.add(label.name);
            yield label.name;
          }
        }
      }
    }

    console.log("There are no more pull requests, will stop");
  }
}
