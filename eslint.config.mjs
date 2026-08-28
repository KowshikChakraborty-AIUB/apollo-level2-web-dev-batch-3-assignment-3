import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from "globals";
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        languageOptions: {
            globals: {
                ...globals.node,
            }
        }
    },
    {
        rules: {
            "no-unused-vars": "error",
            "no-undef": "error",
            "prefer-const": "error",
            "no-console": "warn"
        }
    },
    {
        ignores: ["**/node_modules/", "**/dist/"],
    }
);
