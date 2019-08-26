require('dotenv').config();
const path = require('path');
const Dotenv = require('dotenv-webpack');
const withPlugins = require('next-compose-plugins');
const images = require('next-images');
const typescript = require('@zeit/next-typescript');
const CSS = require('@zeit/next-css');
const fonts = require('next-fonts');
const sourceMaps = require('@zeit/next-source-maps');
const withOffline = require('next-offline');

if (typeof require !== 'undefined') {
  require.extensions['.less'] = () => {};
  require.extensions['.css'] = file => {};
}

// next.js configuration
const nextConfig = {
  // useFileSystemPublicRoutes: false,
  // distDir: 'build',
  webpack: config => {
    config.plugins = config.plugins || [];

    config.plugins = [
      ...config.plugins,

      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true
      })
    ];

    return config;
  }
};

module.exports = withPlugins(
  [withOffline, sourceMaps, images, typescript, CSS, fonts],
  nextConfig
);
