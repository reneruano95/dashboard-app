/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost:3000",
        "shiny-parakeet-9gvpjvp6x9xfxx96-3000.app.github.dev",
      ],
    },
  },
};

export default nextConfig;
