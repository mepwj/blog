'use client';

import { useState } from 'react';
import Link from 'next/link';
import SearchBar from './SearchBar';

interface MobileHeaderProps {
  categories: {category: string, count: number}[];
}

export default function MobileHeader({ categories }: MobileHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* 모바일 헤더 */}
      <header className="md:hidden bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            {/* 로고/제목 */}
            <Link href="/" className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10 9 10s9-4.45 9-10V7l-10-5z"/>
                </svg>
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                Coffeenuts.dev
              </span>
            </Link>

            {/* 햄버거 메뉴 버튼 */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
              aria-label="메뉴 열기"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* 검색바 (항상 표시) */}
          <div className="mt-3">
            <SearchBar />
          </div>
        </div>

        {/* 모바일 메뉴 (토글) */}
        {isMenuOpen && (
          <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <nav className="px-4 py-4 space-y-2">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-between px-3 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <span className="font-medium">전체</span>
                <span className="text-sm bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full">
                  {categories.reduce((sum, cat) => sum + cat.count, 0)}
                </span>
              </Link>
              
              {categories.map((category) => (
                <Link
                  key={category.category}
                  href={`/category/${encodeURIComponent(category.category)}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <span>{category.category}</span>
                  <span className="text-sm bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full">
                    {category.count}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* 오버레이 (메뉴가 열려있을 때) */}
      {isMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}
