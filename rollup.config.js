import babel from 'rollup-plugin-babel'
import re from 'rollup-plugin-re'
import cjs from 'rollup-plugin-cjs-es'
import resolve from 'rollup-plugin-node-resolve'
import builtins from 'rollup-plugin-node-builtins'
import json from 'rollup-plugin-json'
import { eslint } from 'rollup-plugin-eslint'
import nodePolyfills from 'rollup-plugin-node-polyfills'
import filesize from 'rollup-plugin-filesize'
import { uglify } from 'rollup-plugin-uglify'

const isProd = process.env.NODE_ENV === 'production'

export default {
  input: 'src/index.js',
  output: {
    file: isProd ? 'dist/bundle.min.js' : 'dist/bundle.js',
    format: 'umd',
    exports: 'default',
    name: 'mfNode',
  },
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
    filesize(),
    builtins(),

    eslint({
      throwOnError: true,
      throwOnWarning: true,
      include: ['src/**'],
      exclude: ['node_modules/**'],
    }),

    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**',
      plugins: [],
    }),

    json(),
    cjs({ nested: true }),

    isProd && uglify(),
  ],
}
