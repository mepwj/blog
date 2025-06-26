import PostCard from '@/components/PostCard';
import Pagination from '@/components/Pagination';
import { getAllPosts, getPostsByCategory } from '@/lib/posts';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface CategoryPageProps {
  params: { category: string };
  searchParams: { page?: string };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  const categorySet = new Set(posts.map(post => post.category));
  const categories = Array.from(categorySet);
  
  return categories.map((category) => ({
    category: encodeURIComponent(category),
  }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const decodedCategory = decodeURIComponent(params.category);
  
  return {
    title: `${decodedCategory} 카테고리`,
    description: `${decodedCategory} 카테고리의 포스트들을 확인해보세요.`,
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const decodedCategory = decodeURIComponent(params.category);
  const posts = await getPostsByCategory(decodedCategory);
  
  if (posts.length === 0) {
    notFound();
  }

  const currentPage = Number(searchParams.page) || 1;
  const postsPerPage = 5;
  const totalPages = Math.ceil(posts.length / postsPerPage);
  
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = posts.slice(startIndex, endIndex);

  return (
    <div className="max-w-4xl mx-auto">
      {/* 페이지 헤더 */}
      <header className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Link
            href="/"
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <span className="text-gray-400 dark:text-gray-600">/</span>
          <span className="text-gray-500 dark:text-gray-400">카테고리</span>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          {decodedCategory}
        </h1>
        
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {posts.length}개의 포스트
          </span>
        </div>
      </header>

      {/* 포스트 목록 */}
      <div className="space-y-4">
        {currentPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="mt-12">
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages}
            basePath={`/category/${params.category}`}
          />
        </div>
      )}
    </div>
  );
}