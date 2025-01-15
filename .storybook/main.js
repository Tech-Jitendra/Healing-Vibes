const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');
module.exports = {
  webpackFinal: async (config, { configType }) => {
    config.resolve.plugins = [new TsconfigPathsPlugin()];
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "./")
    }
    return config;
  },
  stories: ['../**/*.story.mdx', '../**/*.story.@(js|jsx|ts|tsx)'],
  addons: [
    'storybook-dark-mode',
    '@storybook/addon-links',
    '@storybook/addon-essentials'
  ],
  framework: '@storybook/react',

};
