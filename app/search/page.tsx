import { getAllPosts } from '@/lib/posts';
import { searchPosts } from '@/lib/search';
import PostCard from '@/components/PostCard';
import SearchBar from '@/components/SearchBar';
import Link from 'next/link';

interface SearchPageProps {
  searchParams: { q?: string };
}

export function generateMetadata({ searchParams }: SearchPageProps) {
  const query = searchParams.q || '';
  
  return {
    title: query ? `"${query}" 검색 결과 | My Tech Blog` : '검색 | My Tech Blog',
    description: query ? `"${query}"에 대한 검색 결과입니다.` : '블로그 내 모든 포스트를 검색하세요.',
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || '';
  const allPosts = await getAllPosts();
  const searchResults = searchPosts(allPosts, query);

  return (
    <div>
      {/* 뒤로가기 링크 */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          전체 포스트
        </Link>
      </div>

      {/* 페이지 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          포스트 검색
        </h1>
        
        {/* 검색바 */}
        <div className="max-w-md">
          <SearchBar initialQuery={query} />
        </div>
      </div>

      {/* 검색 결과 */}
      {query ? (
        <div>
          <div className="mb-6">
            <p className="text-gray-600 dark:text-gray-400">
              "<span className="font-semibold text-gray-900 dark:text-gray-100">{query}</span>"에 대한 
              검색 결과 {searchResults.length}개
            </p>
          </div>

          {searchResults.length > 0 ? (
            <div className="space-y-6">
              {searchResults.map((result) => (
                <PostCard 
                  key={result.item.slug} 
                  post={result.item}
                  searchQuery={query}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600 dark:text-gray-400">
                검색 결과가 없습니다.
              </p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
                다른 키워드로 검색해보세요.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            검색어를 입력해주세요.
          </p>
        </div>
      )}
    </div>
  );
}
