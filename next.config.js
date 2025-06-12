/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
    unoptimized: false,
  },
  async generateBuildId() {
    return 'my-blog-' + Date.now();
  },
  // 빌드 최적화
  swcMinify: true,
  // 실험적 기능
  experimental: {
    esmExternals: true,
  },
  // 캐싱 개선
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};

module.exports = nextConfig;
