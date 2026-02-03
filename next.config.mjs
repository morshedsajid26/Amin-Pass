// /** @type {import('next').NextConfig} */
// const nextConfig = {
//    images: {
//     domains: ["test13.fireai.agency"],
//   },
// };

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "test13.fireai.agency",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

