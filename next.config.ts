/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // Or 'http' if applicable
        hostname: "lh3.googleusercontent.com", // Replace with your image hostname
      },
    ],
  },
};

module.exports = nextConfig;
