/** @type {import('next').NextConfig} */
const nextConfig = {
  crossOrigin: "anonymous",
  poweredByHeader: false,
  headers: async () => {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "/:path*",
      },
    ];
  },
};

export default nextConfig;
