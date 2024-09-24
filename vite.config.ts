import { config } from 'dotenv'
import { defineConfig } from 'vite'
import { VitePluginNode } from 'vite-plugin-node'

config()

export default defineConfig({
  server: {
    // vite server configs, for details see [vite doc](https://vitejs.dev/config/#server-host)
    port: parseInt(process.env.PORT as string)
  },

  plugins: [
    ...VitePluginNode({
      adapter: 'express',
      appPath: './src/app.ts',
      exportName: 'app',

      // Optional, default: false
      // if you want to init your app on boot, set this to true
      initAppOnBoot: false,

      // Optional, default: 'esbuild'
      // The TypeScript compiler you want to use
      // by default this plugin is using vite default ts compiler which is esbuild
      // 'swc' compiler is supported to use as well for frameworks
      // like Nestjs (esbuild dont support 'emitDecoratorMetadata' yet)
      // you need to INSTALL `@swc/core` as dev dependency if you want to use swc
      tsCompiler: 'swc',

      // swc configs, see [swc doc](https://swc.rs/docs/configuration/swcrc)
      swcOptions: {
        sourceMaps: true,
        jsc: {
          target: 'es2020',
          parser: {
            syntax: 'typescript',
            decorators: true
          },
          transform: {
            legacyDecorator: true,
            decoratorMetadata: true
          }
        }
      }
    })
  ],

  optimizeDeps: {
    // Vite does not work well with optionnal dependencies,
    // you can mark them as ignored for now
    // eg: for nestjs, exlude these optional dependencies:
    exclude: [
      '@nestjs/microservices',
      '@nestjs/websockets',
      'cache-manager',
      'class-transformer',
      'class-validator',
      'fastify-swagger',
      '@sentry/profiling-node'
    ]
  }
})
