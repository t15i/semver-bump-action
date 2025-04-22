/**
 * @see https://the-guild.dev/graphql/codegen/docs/config-reference/codegen-config
 * @type {import('@graphql-codegen/cli').CodegenConfig}
 */
const config = {
  overwrite: true,
  schema: "./node_modules/@octokit/graphql-schema/schema.json",
  documents: ["src/repository/**/graphql/query/*.graphql"],
  generates: {
    "src/repository/.generated/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-resolvers",
        "typescript-document-nodes",
        "typescript-operations",
      ],
    },
  },
};

export default config;
