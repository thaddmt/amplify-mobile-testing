/** @type {import('next').NextConfig} */

const { patchWebpackConfig } = require('next-global-css');

const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'page.ts'],

  webpack: (config, options) => {
    // allows importing of css files inside modules
    patchWebpackConfig(config, options);

    return config;
  },
};

module.exports = nextConfig;
