import { getPostsByCategory, getAllCategories } from '@/lib/posts';
import PostCard from '@/components/PostCard';
import Pagination from '@/components/Pagination';
import Link from 'next/link';

const POSTS_PER_PAGE = 5;

interface CategoryPageProps {
  params: { category: string };
  searchParams: { page?: string };
}

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((cat) => ({
    category: encodeURIComponent(cat.category),
  }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const decodedCategory = decodeURIComponent(params.category);
  
  return {
    title: `${decodedCategory} 카테고리 | My Tech Blog`,
    description: `${decodedCategory} 카테고리의 모든 포스트를 확인하세요.`,
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const decodedCategory = decodeURIComponent(params.category);
  const posts = await getPostsByCategory(decodedCategory);
  const currentPage = parseInt(searchParams.page || '1', 10);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, endIndex);

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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          {decodedCategory}
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          {posts.length}개의 포스트가 있습니다.
        </p>
      </div>

      {/* 포스트 목록 */}
      {currentPosts.length > 0 ? (
        <>
          <div className="space-y-6">
            {currentPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                basePath={`/category/${encodeURIComponent(decodedCategory)}`}
              />
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            이 카테고리에는 아직 포스트가 없습니다.
          </p>
        </div>
      )}
    </div>
  );
}
