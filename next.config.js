/** @type {import('next').NextConfig} */
export default nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "3.37.203.5:8000/:path*",
      },
    ];
  },

}

module.exports = nextConfig
