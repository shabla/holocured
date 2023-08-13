/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";
let basePath = '';

if (isProd) {
  basePath = "/holocured";
}

const nextConfig = {
  output: 'export',
  basePath: basePath,
}

module.exports = nextConfig;
