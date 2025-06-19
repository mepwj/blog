import './globals.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { getAllCategories } from '@/lib/posts';
import { getProfile } from '@/lib/profile';
import { ThemeProvider } from '@/components/ThemeProvider';
import ThemeToggle from '@/components/ThemeToggle';
import ThemeScript from '@/components/ThemeScript';

const inter = Inter({ subsets: ['latin'] });

export function generateMetadata() {
  const profile = getProfile();
  
  return {
    title: `${profile.blog.tagline} | ${profile.blog.name}`,
    description: profile.description,
    keywords: ['개발', '프로그래밍', '기술', '블로그', profile.nickname.toLowerCase()],
    authors: [{ name: profile.name }],
    creator: profile.name,
    openGraph: {
      type: 'website',
      locale: 'ko_KR',
      url: `https://${profile.blog.domain}`,
      title: `${profile.blog.tagline} | ${profile.blog.name}`,
      description: profile.description,
      siteName: profile.blog.name,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${profile.blog.tagline} | ${profile.blog.name}`,
      description: profile.description,
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getAllCategories();
  const profile = getProfile();

  return (
    <html lang="ko" className="h-full">
      <head>
        <ThemeScript />
      </head>
      <body className={`${inter.className} h-full bg-gray-50 dark:bg-gray-950`}>
        <ThemeProvider>
          {/* Velog 스타일 헤더 */}
          <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 z-50">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex items-center justify-between h-16">
                {/* 로고 */}
                <Link href="/" className="flex items-center space-x-2">
                  <div className={`w-8 h-8 bg-gradient-to-br ${profile.logo.gradient} rounded-lg flex items-center justify-center`}>
                    <span className="text-white font-bold text-lg">{profile.logo.text}</span>
                  </div>
                  <span className="font-bold text-xl text-gray-900 dark:text-white hidden sm:block">{profile.blog.domain}</span>
                </Link>
                
                {/* 네비게이션 */}
                <nav className="hidden md:flex items-center space-x-8">
                  
                </nav>
                
                {/* 검색 및 다크모드 버튼 */}
                <div className="flex items-center space-x-3">
                  <Link
                    href="/search"
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </Link>
                  <ThemeToggle />
                  
                  {/* 모바일 메뉴 버튼 */}
                  <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </header>
          
          {/* 메인 콘텐츠 */}
          <main className="pt-16 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-8">
              {children}
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}