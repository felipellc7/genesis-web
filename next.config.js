/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    BASE_API_URL: process.env.BASE_API_URL,
    BASE_API_URL_DEV: process.env.BASE_API_URL_DEV,
    URL_API_USERS: process.env.URL_API_USERS,
  }
}
