module.exports = function babelConfig(api) {
  api.cache(true)

  /**
   * Babel presets
   */
  const presets = [
    '@babel/preset-env',
    '@babel/preset-react',
  ]

  /**
   * Babel plugins
   */
  const plugins = [
    '@babel/plugin-proposal-class-properties',
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: false,
        helpers: false,
        regenerator: true,
        useESModules: false,
      },
    ],
    '@babel/plugin-proposal-export-default-from',
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          'objects': './src/app/objects',
          'engine': './src/app/engine',
          'components': './src/app/components',
          'utils': './src/app/utils',
          'config': './src/app/config',
          'modules': './src/app/modules',
          'webworkers': './src/app/webworkers',
          'assets': './src/assets',
        },
      },
    ],
  ]

  return {
    presets,
    plugins,
  }
}
