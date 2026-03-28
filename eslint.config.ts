import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        ignores: ['dist', 'node_modules', 'src/static'],
    },
    {
        files: ['**/*.{ts,mts,cts}'],
        languageOptions: {
            parser: tseslint.parser,
            globals: globals.node,
        },
    },
]);
