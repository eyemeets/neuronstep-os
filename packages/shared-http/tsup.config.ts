import { defineConfig } from 'tsup';

export default defineConfig({
  entryPoints: ['src/index.ts'],  // Specifies the entry point for this package
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  outDir: 'dist',
  external: ['esbuild', 'idb'],  // Exclude esbuild to suppress warnings
  splitting: false
});
