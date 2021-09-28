import builtins from 'rollup-plugin-node-builtins';
import externalDeps from 'rollup-plugin-peer-deps-external'
import styles from 'rollup-plugin-styles'

const nodeResolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const babel = require('rollup-plugin-babel')
const { uglify } = require('rollup-plugin-uglify')


const umdGlobals = {
  'react': 'React',
  'react-dom': 'ReactDOM',
  'prop-types': 'PropTypes',
  'moment': 'moment',
  'antd': 'antd'
}

module.exports = [
  {
    input: './src/index.js',
    output: {
      file: 'dist/index.js',
      format: 'umd',
      name: 'mychart',
      globals: umdGlobals,
      sourcemap: 'inline'
    },

    external: Object.keys(umdGlobals),
    plugins: [
      nodeResolve(),
      commonjs({ include: '**/node_modules/**' }),
      babel({ exclude: '**/node_modules/**' }),
      externalDeps(),
      //uglify(),
      builtins(),
      styles()
    ]
  }
]
