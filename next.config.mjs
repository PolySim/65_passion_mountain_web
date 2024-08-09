/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "localhost:3210",
      "127.0.0.1",
      "127.0.0.1:3210",
      "13.37.217.215:3210",
      "13.37.217.215",
    ],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3210",
      },
    ],
  },
};

export default nextConfig;
