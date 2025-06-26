/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true, // 이미지 최적화 비활성화로 원본 화질 유지
    formats: ['image/avif', 'image/webp'], // 지원 형식
  },
  async generateBuildId() {
    return 'my-blog-' + Date.now();
  },
  // 빌드 최적화
  swcMinify: true,
  // 캐싱 개선
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  typescript: {
    // Vercel 빌드시 타입 체크
    ignoreBuildErrors: false,
  },
  eslint: {
    // Vercel 빌드시 린트 체크
    ignoreDuringBuilds: false,
  },
};

module.exports = nextConfig;