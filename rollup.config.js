import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import postcss from 'rollup-plugin-postcss'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import replace from '@rollup/plugin-replace'
import sizes from 'rollup-plugin-sizes'
import terser from '@rollup/plugin-terser'
import json from '@rollup/plugin-json'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import babel from '@rollup/plugin-babel'
import nodePolyfills from 'rollup-plugin-node-polyfills'
import visualizer from 'rollup-plugin-visualizer'
import sourcemaps from 'rollup-plugin-sourcemaps'

const packageJson = require('./package.json')

export default {
  input: 'src/index.ts',
  output: {
    file: packageJson.umd,
    format: 'iife',
    sourcemap: true,
    name: 'DiuJsonForm',
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      'prop-types': 'PropTypes',
    },
  },
  external: ['react', 'react-dom'],

  plugins: [
    // peerDepsExternal(),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    commonjs({
      include: /node_modules/,
      requireReturnsDefault: 'auto',
      babelHelpers: 'bundled',
    }),
    nodePolyfills(),
    nodeResolve({
      browser: true,
    }),
    typescript({
      sourceMap: true,
      inlineSources: true,
      tsconfig: './tsconfig.json',
    }),
    postcss(),
    sourcemaps(),
    // babel({
    //     babelHelpers: 'bundled',
    //     presets: ["@babel/preset-react"],
    //     babelrc: true,
    //     exclude: 'node_modules/**',
    //     sourceMaps: true
    // }),
    json(),
    // terser({sourceMap: true}),

    // sizes(),
    // visualizer(),

    serve({
      open: false,
      verbose: true,
      contentBase: ['', 'public'],
      host: 'localhost',
      port: 3010,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }),
    livereload({ watch: 'dist' }),
  ],
}
