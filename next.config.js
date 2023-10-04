/** @type {import('next').NextConfig} */
require("dotenv").config()

const nextConfig = {}

module.exports = {
  ...nextConfig,
  env: {
    JWT_SECRET: process.env.JWT_SECRET,
  },
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["i.ibb.co", "localhost", "via.placeholder.com"],
  },
}
