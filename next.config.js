/** @type {import('next').NextConfig} */
nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    // asyn header()
    async redirects(){
      return [
        {
          source: 'https://sony-babba.vercel.app/api/:path*',
          destination: 'http://3.37.203.5:8000/:path*',
        }
      ]
    }

}

module.exports = nextConfig
