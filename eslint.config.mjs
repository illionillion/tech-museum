import { dirname } from "node:path"
import { fileURLToPath } from "node:url"
import { fixupPluginRules } from "@eslint/compat"
import eslint from "@eslint/js"
import pluginNext from "@next/eslint-plugin-next"
import pluginImport from "eslint-plugin-import"
import pluginJsxA11y from "eslint-plugin-jsx-a11y"
import pluginReact from "eslint-plugin-react"
import pluginReactHooks from "eslint-plugin-react-hooks"
import pluginTestingLibrary from "eslint-plugin-testing-library"
import pluginUnusedImports from "eslint-plugin-unused-imports"
import pluginVitest from "eslint-plugin-vitest"
import globals from "globals"
import {
  config as tseslintConfig,
  parser as tseslintParser,
  configs as tseslintConfigs,
  plugin as tseslintPlugin,
} from "typescript-eslint"

/** @typedef {import("typescript-eslint").ConfigWithExtends} TSESLintConfig */

/** @type {{js: string[], ts: string[], all: string[]}} */
const sourceFilePaths = {
  js: ["**/*.js", "**/*.cjs", "**/*.mjs", "**/*.jsx"],
  ts: ["**/*.ts", "**/*.cts", "**/*.mts", "**/*.tsx", "**/*.d.ts"],
  all: [
    "**/*.js",
    "**/*.cjs",
    "**/*.mjs",
    "**/*.jsx",
    "**/*.ts",
    "**/*.cts",
    "**/*.mts",
    "**/*.tsx",
    "**/*.d.ts",
  ],
}

/** @type {Pick<TSESLintConfig, "name" | "ignores">} */
const ignoreTSESConfig = {
  name: "@tech-museum/ignores/base",
  ignores: ["**/.next", "**/node_modules", "**/pnpm-lock.yaml"],
}

/** @type {Pick<TSESLintConfig, "name" | "languageOptions">} */
const languageOptionTSESConfig = {
  name: "@tech-museum/language-options/base",
  languageOptions: {
    parser: tseslintParser,
    parserOptions: {
      ecmaVersion: 2025,
      ecmaFeatures: {
        jsx: true,
      },
      sourceType: "module",
      project: `${dirname(fileURLToPath(import.meta.url))}/tsconfig.json`,
    },
    globals: {
      ...globals.browser,
      ...globals.node,
      ...globals.es2025,
    },
  },
}

const allSourceFileExtensions = [
  ".js",
  ".cjs",
  ".mjs",
  ".jsx",
  ".ts",
  ".cts",
  ".mts",
  ".tsx",
  ".d.ts",
]

/** @type {Pick<TSESLintConfig, "name" | "files" | "plugins" | "rules" | "settings" | "ignores">} */
const importTSESConfig = {
  name: "@tech-museum/import/base",
  files: sourceFilePaths.all,
  plugins: {
    import: fixupPluginRules(pluginImport),
    "unused-imports": pluginUnusedImports,
  },
  rules: {
    ...pluginImport.configs.recommended.rules,
    ...pluginImport.configs.typescript.rules,
    "import/order": [
      "error",
      {
        alphabetize: {
          order: "asc",
        },
      },
    ],
    // These rules existed in the `.eslintrc`.
    "unused-imports/no-unused-imports": "error",

    // Set of `import` rules that existed in `eslint-config-next`.
    "import/no-anonymous-default-export": "warn",
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": allSourceFileExtensions,
    },
    "import/resolver": {
      node: {
        extensions: allSourceFileExtensions,
      },
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
}

/** @type {Pick<TSESLintConfig, "name" | "files" | "rules">} */
const eslintTSESConfig = {
  name: "@tech-museum/eslint/base",
  files: sourceFilePaths.all,
  rules: {
    ...eslint.configs.recommended.rules,
  },
}

/** @type {Pick<TSESLintConfig, "name" | "files" | "plugins" | "rules">[]} */
const typescriptTSESConfigArray = [
  {
    name: "@tech-museum/typescript/base",
    files: sourceFilePaths.all,
    plugins: {
      "@typescript-eslint": tseslintPlugin,
    },
    rules: {
      ...tseslintConfigs.recommended
        .filter((config) => config.rules !== undefined)
        .reduce((acc, config) => ({ ...acc, ...config.rules }), {}),

      ...tseslintConfigs.stylistic
        .filter((config) => config.rules !== undefined)
        .reduce((acc, config) => ({ ...acc, ...config.rules }), {}),

      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unnecessary-type-constraint": "off",
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/array-type": "off",

      // If you want to unify the type definition method to either `type` or `interface`, you can enable this rule.
      // https://typescript-eslint.io/rules/consistent-type-definitions
      "@typescript-eslint/consistent-type-definitions": "off",

      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports" },
      ],
    },
  },

  // These rules existed in the `.eslintrc`.
  {
    name: "@tech-museum/typescript/disabled-in-js",
    files: sourceFilePaths.js,
    plugins: {
      "@typescript-eslint": tseslintPlugin,
    },
    rules: {
      "@typescript-eslint/consistent-type-imports": "off",
    },
  },
]

/** @type {Pick<TSESLintConfig, "name" | "files" | "plugins" | "rules" | "settings">} */
const reactTSESConfig = {
  name: "@tech-museum/react/base",
  files: sourceFilePaths.all,
  plugins: {
    react: pluginReact,
  },
  rules: {
    ...pluginReact.configs.recommended.rules,

    // Set of `react` rules that existed in `eslint-config-next`.
    "react/no-unknown-property": "off",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react/jsx-no-target-blank": "off",

    // These rules existed in the `.eslintrc`.
    "react/no-unescaped-entities": "off",
    "react/jsx-curly-brace-presence": "error",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
}

/** @type {Pick<TSESLintConfig, "name | "files" | "plugins" | "rules">} */
const reactHooksTSESConfig = {
  name: "@tech-museum/react-hooks/base",
  files: sourceFilePaths.all,
  plugins: {
    "react-hooks": fixupPluginRules(pluginReactHooks),
  },
  rules: {
    ...pluginReactHooks.configs.recommended.rules,
  },
}

/** @type {Pick<TSESLintConfig, "name" | "files" | "plugins" | "rules">} */
const nextTSESConfig = {
  name: "@tech-museum/next/base",
  files: sourceFilePaths.all,
  plugins: {
    "@next/next": fixupPluginRules(pluginNext),
  },
  rules: {
    ...pluginNext.configs.recommended.rules,
    ...pluginNext.configs["core-web-vitals"].rules,

    // These rules existed in the `.eslintrc`.
    "@next/next/no-assign-module-variable": "off",
    "@next/next/no-title-in-document-head": "off",
  },
}

/**
 * @type {Pick<TSESLintConfig, "name" | "files" | "plugins" | "rules">}
 * @description Set of `jsx-a11y` rules existed in `eslint-config-next`.
 */
const jsxA11yTSESConfig = {
  name: "@tech-museum/jsx-a11y/base",
  files: sourceFilePaths.all,
  plugins: {
    "jsx-a11y": pluginJsxA11y,
  },
  rules: {
    "jsx-a11y/alt-text": [
      "warn",
      {
        elements: ["img"],
        img: ["Image"],
      },
    ],
    "jsx-a11y/aria-props": "warn",
    "jsx-a11y/aria-proptypes": "warn",
    "jsx-a11y/aria-unsupported-elements": "warn",
    "jsx-a11y/role-has-required-aria-props": "warn",
    "jsx-a11y/role-supports-aria-props": "warn",
  },
}

/** @type {Pick<TSESLintConfig, "name" | "files" | "plugins" | "rules">} */
const vitestTSESConfig = {
  name: "@tech-museum/vitest/base",
  files: ["**/*.test.ts", "**/*.test.tsx"],
  plugins: {
    vitest: fixupPluginRules(pluginVitest),
  },
  rules: {
    ...pluginVitest.configs.recommended.rules,
  },
}

/** @type {Pick<TSESLintConfig, "name" | "files" | "plugins" | "rules">} */
const testingLibraryTSESConfig = {
  name: "@tech-museum/testing-library/react/base",
  files: ["**/*.test.ts", "**/*.test.tsx"],
  plugins: {
    "testing-library": fixupPluginRules(pluginTestingLibrary),
  },
  rules: {
    ...pluginTestingLibrary.configs.react.rules,
  },
}

/**
 * @type {Pick<TSESLintConfig, "name" | "files" | "plugins" | "rules">}
 */
const prettierTSESConfig = {
  name: "@tech-museum/prettier/base",
  files: sourceFilePaths.all,
  plugins: {
    react: pluginReact,
  },
  rules: {
    curly: "off",
    "no-unexpected-multiline": "off",
    "react/jsx-child-element-spacing": "off",
    "react/jsx-closing-bracket-location": "off",
    "react/jsx-closing-tag-location": "off",
    "react/jsx-curly-newline": "off",
    "react/jsx-curly-spacing": "off",
    "react/jsx-equals-spacing": "off",
    "react/jsx-first-prop-new-line": "off",
    "react/jsx-indent": "off",
    "react/jsx-indent-props": "off",
    "react/jsx-max-props-per-line": "off",
    "react/jsx-newline": "off",
    "react/jsx-one-expression-per-line": "off",
    "react/jsx-props-no-multi-spaces": "off",
    "react/jsx-tag-spacing": "off",
    "react/jsx-wrap-multilines": "off",
  },
}

export default tseslintConfig(
  ignoreTSESConfig,
  languageOptionTSESConfig,
  eslintTSESConfig,
  ...typescriptTSESConfigArray,
  importTSESConfig,
  nextTSESConfig,
  reactTSESConfig,
  reactHooksTSESConfig,
  jsxA11yTSESConfig,
  vitestTSESConfig,
  testingLibraryTSESConfig,
  prettierTSESConfig,
)
