import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { preserveShebangs } from 'rollup-plugin-preserve-shebangs';
import pkg from './package.json';

export default [
    // CommonJS (for Node) and ES module (for bundlers) build.
    // (We could have three entries in the configuration array
    // instead of two, but it's quicker to generate multiple
    // builds from a single configuration where possible, using
    // an array for the `output` option, where we can specify
    // `file` and `format` for each target)
    {
        input: 'src/index.js',
        external: ['vm', 'fs', 'path', 'os', 'tty', 'websocket', 'yargs'],
        output: [
            { file: pkg.main, format: 'cjs' },
        ],
        plugins: [
            json(),
            preserveShebangs(),
            commonjs(),
            nodeResolve(),
            babel({
                exclude: ['node_modules/**'],
            }),
        ],
    },
];
