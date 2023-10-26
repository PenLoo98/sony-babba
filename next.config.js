/** @type {import('next').NextConfig} */
nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    async rewrites() {
      return [
        {
          // `/user-service/signup/check/nickname?nickname=${nickname}`
          source: '/user-service/signup/check/nickname/:nickname*',
          destination: 'http://3.37.203.5:8000/user-service/signup/check/nickname?nickname=:nickname*',
        },
      ]
    },

}

module.exports = nextConfig
