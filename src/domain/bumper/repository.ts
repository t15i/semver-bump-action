import { type Comparison } from "@/domain/comparison.js";

export interface GithubRepository {
  getLabelsByComparison(comp: Comparison): AsyncIterableIterator<string>;
}
