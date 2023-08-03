/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',

  async redirects() {
    return [
      {
        source: '/',
        destination: '/build',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
