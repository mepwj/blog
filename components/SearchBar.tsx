'use client';

import dynamic from 'next/dynamic';

// SearchBar를 동적으로 임포트하고 서버 사이드 렌더링을 비활성화
const SearchBarDynamic = dynamic(() => import('./SearchBarInner'), {
  ssr: false,
  loading: () => <SearchBarFallback />
});

// 로딩 컴포넌트
function SearchBarFallback() {
  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          disabled
          placeholder="포스트 검색..."
          className="w-full pl-10 pr-10 py-2 sm:py-3 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 text-sm sm:text-base opacity-50"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

interface SearchBarProps {
  initialQuery?: string;
}

export default function SearchBar({ initialQuery = '' }: SearchBarProps) {
  return <SearchBarDynamic initialQuery={initialQuery} />;
}
