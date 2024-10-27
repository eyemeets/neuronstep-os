import { defineConfig } from 'tsup'

export default defineConfig({
  entryPoints: ['tsup.config.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: false,
  outDir: 'dist',
  external: ['esbuild'],
  splitting: false
})
