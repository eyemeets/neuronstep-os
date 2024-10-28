/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { getDefaultConfig } = require('expo/metro-config')
const path = require('path')

const projectRoot = __dirname
const monorepoRoot = path.resolve(projectRoot, '../..')

const config = getDefaultConfig(projectRoot)

// Ensure Metro watches all packages in your monorepo
config.watchFolders = [ monorepoRoot ]

config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules')
]

// Specify all extra Node modules for each package in your monorepo
config.resolver.extraNodeModules = {
  '@repo/shared-constants': path.resolve(monorepoRoot, 'packages/shared-constants'),
  '@repo/shared-utils': path.resolve(monorepoRoot, 'packages/shared-utils'),
  '@repo/shared-http': path.resolve(monorepoRoot, 'packages/shared-http'),
  '@repo/shared-enums': path.resolve(monorepoRoot, 'packages/shared-enums'),
  '@repo/shared-ui': path.resolve(monorepoRoot, 'packages/shared-ui'),
  '@repo/shared-tsconfig': path.resolve(monorepoRoot, 'packages/shared-tsconfig'),
  '@repo/shared-types': path.resolve(monorepoRoot, 'packages/shared-types'),
  '@repo/shared-mockups': path.resolve(monorepoRoot, 'packages/shared-mockups')
}

// Add babel transformer and source extensions to handle custom files
config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer')
config.resolver.sourceExts = [ 'ts', 'tsx', 'js', 'jsx', 'json', 'svg', 'cjs' ]

module.exports = config
