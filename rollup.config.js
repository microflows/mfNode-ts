import babel from 'rollup-plugin-babel'
import re from 'rollup-plugin-re'
import cjs from 'rollup-plugin-cjs-es'
import resolve from 'rollup-plugin-node-resolve'
import builtins from 'rollup-plugin-node-builtins'
import json from 'rollup-plugin-json'
import size from 'rollup-plugin-size'
import { eslint } from 'rollup-plugin-eslint'
import nodePolyfills from 'rollup-plugin-node-polyfills'

export default {
  input: './index.js',
  output: { file: './dist/bundle.js', format: 'cjs' },
  plugins: [
    nodePolyfills(),
    resolve(),
    re({
      patterns: [
        {
          match: /types\.js$/,
          test: /util\.emptyArray/,
          replace: 'Object.freeze ? Object.freeze([]) : []',
        },
        {
          match: /root\.js/,
          test: /util\.path\.resolve/,
          replace: "require('@protobufjs/path').resolve",
        },
      ],
    }),

    builtins(),

    eslint({
      throwOnError: true,
      throwOnWarning: true,
      include: ['src/**'],
      exclude: ['node_modules/**'],
    }),

    babel({
      exclude: 'node_modules/**',
      plugins: [],
    }),

    json(),
    cjs({ nested: true }),

    size(),
  ],
}
