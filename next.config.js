/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // 로컬 이미지만 사용하므로 remotePatterns 제거
    formats: ['image/avif', 'image/webp'],
    // Next.js Image 최적화 활성화
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // 빌드 최적화
  swcMinify: true,
  // 정적 생성 최적화
  generateEtags: true,
  poweredByHeader: false,
  compress: true,
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