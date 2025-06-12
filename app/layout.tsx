import './globals.css';
import { Inter } from 'next/font/google';
import Sidebar from '@/components/Sidebar';
import MobileHeader from '@/components/MobileHeader';
import { getAllCategories } from '@/lib/posts';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: '커피 한 잔, 코드 한 줄 | Coffeenuts.dev',
  description: '코딩이 아닌 개발을 하는 커피넛의 기술 블로그입니다.',
  keywords: ['개발', '프로그래밍', '기술', '블로그', '커피넛', 'coffeenuts'],
  authors: [{ name: '커피넛' }],
  creator: '커피넛',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://coffeenuts.dev',
    title: '커피 한 잔, 코드 한 줄 | Coffeenuts.dev',
    description: '코딩이 아닌 개발을 하는 커피넛의 기술 블로그입니다.',
    siteName: 'Coffeenuts.dev',
  },
  twitter: {
    card: 'summary_large_image',
    title: '커피 한 잔, 코드 한 줄 | Coffeenuts.dev',
    description: '코딩이 아닌 개발을 하는 커피넛의 기술 블로그입니다.',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getAllCategories();

  return (
    <html lang="ko" className="h-full">
      <body className={`${inter.className} h-full`}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          {/* 모바일 헤더 */}
          <MobileHeader categories={categories} />
          
          <div className="flex">
            {/* 데스크톱 사이드바 */}
            <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
              <div className="flex min-h-0 flex-1 flex-col bg-white dark:bg-gray-800 shadow-lg">
                <Sidebar />
              </div>
            </div>
            
            {/* 메인 컨텐츠 */}
            <div className="flex-1 md:ml-64">
              <main className="min-h-screen pt-[120px] md:pt-0">
                <div className="py-4 md:py-6">
                  <div className="px-4 md:mx-auto md:max-w-4xl md:px-8">
                    {children}
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
