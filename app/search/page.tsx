import { Suspense } from 'react';
import SearchResults from '@/components/SearchResults';
import SearchInput from '@/components/SearchInput';

export const metadata = {
  title: '검색',
  description: '블로그 포스트를 검색해보세요.',
};

interface SearchPageProps {
  searchParams: { q?: string };
}

function SearchSkeleton() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse mb-4"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/3 animate-pulse"></div>
      </div>
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl p-6 animate-pulse">
            <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded mb-3"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || '';

  return (
    <div className="max-w-4xl mx-auto">
      {/* 검색 헤더 */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          검색
        </h1>
        
        <SearchInput defaultValue={query} />
        
        {query && (
          <div className="mt-4">
            <p className="text-gray-600 dark:text-gray-400">
              '<span className="font-medium text-gray-900 dark:text-white">{query}</span>' 검색 결과
            </p>
          </div>
        )}
      </header>

      {/* 검색 결과 */}
      <Suspense fallback={<SearchSkeleton />}>
        <SearchResults query={query} />
      </Suspense>
    </div>
  );
}