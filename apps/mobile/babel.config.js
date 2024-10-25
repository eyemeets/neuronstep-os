module.exports = (api) => {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'nativewind/babel',
      ['module-resolver', {
        'root': ['./'],
        'alias': {
          '~': './src'
        }
      }]
    ],
    overrides: [
      {
          test: /node_modules\/(expo-router|nativewind)/,
          presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
      },
  ],
  }
}