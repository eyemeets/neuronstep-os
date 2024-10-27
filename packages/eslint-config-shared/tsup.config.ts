import { defineConfig } from 'tsup';

export default defineConfig({
  entryPoints: ['src/index.ts'],
  format: ['cjs', 'esm'],  // Specify multiple formats if necessary
  outDir: 'dist',
  sourcemap: true,  // Enable or disable sourcemaps as needed
  legacyOutput: true,  // Might help in handling module.exports
  onSuccess: 'echo Build completed!',  // Optional success message
  esbuildOptions: (options) => {
    options.footer = {
      js: 'module.exports = module.exports.default;'
    }
  }
});
