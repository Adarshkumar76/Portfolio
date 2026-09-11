/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'build',
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_ADMIN_PIN:
      process.env.NEXT_PUBLIC_ADMIN_PIN ||
      process.env.ADMIN_SECRET_PIN ||
      process.env.ADMIN_PIN ||
      process.env.ADMIN_PASSWORD ||
      process.env.NEXT_PUBLIC_ADMIN_SECRET_PIN ||
      process.env.NEXT_PUBLIC_ADMIN_PASSWORD ||
      "",
  },
};

export default nextConfig;
