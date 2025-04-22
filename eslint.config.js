import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";

/**
 * @see https://eslint.org/docs/latest/use/configure
 * @see https://typescript-eslint.io/users/configs
 * @type {import('typescript-eslint').ConfigArray}
 */
const config = [
  eslint.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
];

export default config;
