import { searchPosts } from '@/lib/search';
import PostCard from './PostCard';

interface SearchResultsProps {
  query: string;
}

export default async function SearchResults({ query }: SearchResultsProps) {
  if (!query.trim()) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
          검색어를 입력해주세요
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          제목, 내용, 태그로 포스트를 검색할 수 있습니다.
        </p>
      </div>
    );
  }

  const results = await searchPosts(query);

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
          검색 결과가 없습니다
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          다른 키워드로 검색해보세요.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* 검색 결과 수 */}
      <div className="mb-6">
        <p className="text-gray-600 dark:text-gray-400">
          총 <span className="font-medium text-green-600 dark:text-green-400">{results.length}개</span>의 포스트를 찾았습니다.
        </p>
      </div>

      {/* 검색 결과 목록 */}
      <div className="space-y-4">
        {results.map((post) => (
          <PostCard key={post.slug} post={post} searchQuery={query} />
        ))}
      </div>
    </div>
  );
}