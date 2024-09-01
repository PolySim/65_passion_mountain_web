/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "localhost:3210",
      "127.0.0.1",
      "127.0.0.1:3210",
      "141.94.205.91:3210",
      "141.94.205.91",
      "api.simondesdevises.com",
    ],
    unoptimized: true,
  },
};

export default nextConfig;
