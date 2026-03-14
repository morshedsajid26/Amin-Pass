/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "test13.fireai.agency",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "test13.fireai.agency",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "api.aminpass.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.aminpass.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
