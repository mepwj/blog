import PostCard from '@/components/PostCard';
import Pagination from '@/components/Pagination';
import CategoryDropdown from '@/components/CategoryDropdown';
import ProfileSection from '@/components/ProfileSection';
import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';

interface HomeProps {
  searchParams: { page?: string; sort?: string };
}

export default async function Home({ searchParams }: HomeProps) {
  const posts = await getAllPosts();
  const currentPage = Number(searchParams.page) || 1;
  const postsPerPage = 5;
  const totalPages = Math.ceil(posts.length / postsPerPage);
  
  // 정렬 (최신순이 기본)
  const sortedPosts = [...posts].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = sortedPosts.slice(startIndex, endIndex);

  return (
    <div>
      {/* 프로필 섹션 */}
      <ProfileSection />
      
      <div className="max-w-4xl mx-auto">
        {/* 탭 네비게이션 */}
        <div className="flex items-center space-x-8 mb-8 border-b border-gray-200 dark:border-gray-800">
        <Link
          href="/"
          className="pb-4 text-lg font-medium border-b-2 text-gray-900 dark:text-white border-gray-900 dark:border-white transition-colors"
        >
          최신
        </Link>
        <CategoryDropdown />
      </div>

      {/* 포스트 목록 */}
      {currentPosts.length > 0 ? (
        <div className="space-y-6">
          {currentPosts.map((post, index) => (
            <PostCard key={post.slug} post={post} priority={index === 0} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            아직 포스트가 없습니다
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            첫 번째 포스트를 작성해보세요!
          </p>
        </div>
      )}

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="mt-12">
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages}
            basePath="/"
          />
        </div>
      )}
      </div>
    </div>
  );
}