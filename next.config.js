/** @type {import('next').NextConfig} */

module.exports = {
  images: {
    domains: ["cdn.discordapp.com"],
  },
};

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  webpack: (config, { dev }) => {
    if (dev && Array.isArray(config.target) && config.target.includes("web")) {
      config.optimization.minimize = false;
      delete config.optimization.minimizer;
      config.target = ["web", "es2020"];
    }
    return config;
  },
};

if (!isProd) {
  nextConfig.experimental = {
    legacyBrowsers: false,
  };
}
