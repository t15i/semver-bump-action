import * as esbuild from "esbuild";

/**
 * @see https://esbuild.github.io/api
 * @type {import('esbuild').BuildOptions}
 */
const options = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  minify: true,
  platform: "node",
  target: "node20",
  format: "cjs",
  outdir: "dist",
  outExtension: {
    ".js": ".cjs",
  },
};

await esbuild.build(options);
