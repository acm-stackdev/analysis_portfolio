import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Ambient `declare global { namespace ... }` blocks are the only way
      // to augment JSX.IntrinsicElements for a custom element from a module
      // file (see app/components/resume-viewer.tsx) — allow that idiom.
      "@typescript-eslint/no-namespace": [
        "error",
        { allowDeclarations: true },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
