import Link from 'next/link';
import Image from 'next/image';
import { getAllCategories, getAllPosts } from '@/lib/posts';
import SearchBar from './SearchBar';

export default async function Sidebar() {
  const categories = await getAllCategories();
  const recentPosts = (await getAllPosts()).slice(0, 5);

  return (
    <div className="flex flex-col h-full p-6">
      {/* 프로필 섹션 */}
      <div className="mb-8">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            커피넛
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            코딩이 아닌 개발을 합니다.
          </p>
        </div>
      </div>

      {/* 검색 바 */}
      <div className="mb-8">
        <SearchBar />
      </div>

      {/* 카테고리 네비게이션 */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          카테고리
        </h3>
        <nav className="space-y-2">
          <Link
            href="/"
            className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <span>전체</span>
            <span className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full">
              {categories.reduce((sum, cat) => sum + cat.count, 0)}
            </span>
          </Link>
          {categories.map((category) => (
            <Link
              key={category.category}
              href={`/category/${encodeURIComponent(category.category)}`}
              className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <span>{category.category}</span>
              <span className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full">
                {category.count}
              </span>
            </Link>
          ))}
        </nav>
      </div>

      {/* 최근 포스트 */}
      {recentPosts.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            최근 포스트
          </h3>
          <div className="space-y-3">
            {recentPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block p-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-2 mb-1">
                  {post.title}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {new Date(post.date).toLocaleDateString('ko-KR')}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 푸터 정보 */}
      <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-500 text-center">
          © 2025 Coffeenuts.dev
        </p>
      </div>
    </div>
  );
}
