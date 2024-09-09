/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
        port: "",
        pathname: "/**", // Allows all paths under this domain
      },
      // You can add more patterns for other domains if needed
    ],
  },
};

export default nextConfig;
