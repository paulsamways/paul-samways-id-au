import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
    input: [
        'src/index.ts'
    ],
    output: {
        dir: '../Site/PaulSamways/wwwroot/js',
        format: 'iife'
    },
    plugins: [
        nodeResolve(),
        typescript()
    ]
};