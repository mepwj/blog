/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
    unoptimized: false,
  },
  async generateBuildId() {
    return 'my-blog-' + Date.now();
  },
  // 빌드 최적화 (Turbopack 호환)
  swcMinify: true,
  // 캐싱 개선
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};

module.exports = nextConfig;
