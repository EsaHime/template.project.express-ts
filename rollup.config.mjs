import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import ignore from 'rollup-plugin-ignore'

export default {
  input: './src/app.ts',

  output: {
    // 使用 CommonJS 的原因是某些库会使用 __dirname.
    file: './dist/app.cjs',
    format: 'cjs',
    inlineDynamicImports: true
  },

  plugins: [
    nodeResolve({
      preferBuiltins: true
    }),
    commonjs(),
    ignore([
      '@fastify/static',
      '@nestjs/microservices',
      '@nestjs/microservices/microservices-module',
      '@nestjs/websockets',
      '@nestjs/websockets/socket-module',
      'class-validator',
      'class-transformer',
      'class-transformer/storage',
      'proxy-agent'
    ]),
    json(),
    typescript({
      compilerOptions: {
        sourceMap: false
      }
    })
  ]
}
