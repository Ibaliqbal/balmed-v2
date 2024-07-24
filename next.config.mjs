/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "phtftpjuazktjjpqmkwu.supabase.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
        port: "",
        pathname: "/**",
      },
    ],
    domains: [
      "lh3.googleusercontent.com",
      "phtftpjuazktjjpqmkwu.supabase.co",
      "ui-avatars.com",
    ],
  },
};

export default nextConfig;
