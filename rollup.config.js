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
import proto from 'rollup-plugin-gproto'
import globals from 'rollup-plugin-node-globals'
import rollupTypescript from 'rollup-plugin-typescript2'  

const isProd = process.env.NODE_ENV === 'production'

export default {
  input: 'src/index.ts',
  output: {
    file: isProd ? 'dist/bundle.min.js' : 'dist/bundle.js',
    format: 'umd',
    exports: 'default',
    name: 'mfNode',
  },
  plugins: [
    proto(),
    eslint({
      throwOnError: true,
      throwOnWarning: true,
      include: ['src/**'],
      exclude: ['node_modules/**','src/*.proto'],
    }),
    nodePolyfills(),
    resolve({
      browser:true,
      skipSelf: true,
      only:[/^((?!@microflows\/nodevm).)*$/]
    }),
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
    globals(),
    builtins(),

    rollupTypescript(),
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**',
      plugins: [],
    }),
    json(),
    cjs({ nested: true }),
    isProd && filesize(),
    isProd && uglify(),
  ],
}
