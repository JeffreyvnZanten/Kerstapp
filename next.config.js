/** @type {import('next').NextConfig} */
const nextConfig = {
  serverRuntimeConfig: {
      USERS: process.env.USERS,
  },
  publicRuntimeConfig: {
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  }
}

module.exports = nextConfig