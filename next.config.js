/** @type {import('next').NextConfig} */
nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
  async rewrites() {
    return [
      {
        source: "http://api/:path*",
        destination: "http://3.37.203.5:8000/:path*",
      },
    ];
  },

}

module.exports = nextConfig
