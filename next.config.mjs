/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["localhost:3210"],
        remotePatterns: [{
            protocol: "http",
            hostname: "localhost",
            port: "3210",
        }]
    },
};

export default nextConfig;
