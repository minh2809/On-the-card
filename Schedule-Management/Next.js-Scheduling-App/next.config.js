const path = require("path");

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  trailingSlash: true,
  webpack(config) {
    // Alias
    config.resolve.alias["@"] = path.join(__dirname, "");

    return config;
  },
};

module.exports = nextConfig;
