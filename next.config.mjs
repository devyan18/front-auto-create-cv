/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'avatars.githubusercontent.com'
      },
      {
        hostname: 'unavatar.io'
      }
    ]
  }
}

export default nextConfig
