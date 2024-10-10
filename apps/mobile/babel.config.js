module.exports = (api) => {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Required for expo-router
      //r'expo-router/babel',
      'nativewind/babel',
      ['module-resolver', {
        'root': ['./'],
        'alias': {
          '~': './src'
        }
      }]
    ]
  }
}