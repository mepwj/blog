'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Category {
  category: string;
  count: number;
}

export default function CategoryDropdown() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  
  // 현재 카테고리 확인
  const currentCategory = pathname.includes('/category/') 
    ? decodeURIComponent(pathname.split('/category/')[1])
    : null;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('카테고리 로딩 실패:', error);
      }
    };
    
    fetchCategories();
  }, []);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="pb-4 text-lg font-medium border-b-2 transition-colors flex items-center space-x-1 text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-700 dark:hover:text-gray-300"
      >
        <span>{currentCategory || '카테고리'}</span>
        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 z-10">
          <div className="py-2">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                !currentCategory 
                  ? 'text-green-600 dark:text-green-400 font-medium' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              전체
            </Link>
            {categories.map((category) => (
              <Link
                key={category.category}
                href={`/category/${encodeURIComponent(category.category)}`}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                  currentCategory === category.category
                    ? 'text-green-600 dark:text-green-400 font-medium'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {category.category} ({category.count})
              </Link>
            ))}
          </div>
        </div>
      )}
      
      {/* 배경 클릭 시 닫기 */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-5" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}