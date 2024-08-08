/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost:3210", "217.160.24.233:3210", "217.160.24.233"],
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
