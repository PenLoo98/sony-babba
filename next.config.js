/** @type {import('next').NextConfig} */
nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "3.37.203.5:8000/:path*",
      },
    ];
  },

}

export default nextConfig;
