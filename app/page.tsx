import { getAllPosts } from '@/lib/posts';
import PostCard from '@/components/PostCard';
import Pagination from '@/components/Pagination';

const POSTS_PER_PAGE = 5;

interface HomePageProps {
  searchParams: { page?: string };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const posts = await getAllPosts();
  const currentPage = parseInt(searchParams.page || '1', 10);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, endIndex);

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          내 기술 블로그에 오신 것을 환영합니다! 🎉
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          아직 작성된 글이 없습니다. 첫 번째 포스트를 작성해보세요!
        </p>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">첫 포스트 작성 방법:</h2>
          <ol className="text-left space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>1.</strong> <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">posts/</code> 폴더에 <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">.md</code> 파일을 생성하세요</li>
            <li><strong>2.</strong> 파일명 형식: <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">yyyy-mm-dd-제목.md</code></li>
            <li><strong>3.</strong> frontmatter를 추가하여 메타데이터를 설정하세요</li>
            <li><strong>4.</strong> 마크다운으로 내용을 작성하세요</li>
          </ol>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
          최신 포스트
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          총 {posts.length}개의 글이 있습니다.
        </p>
      </div>

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
            basePath="/"
          />
        </div>
      )}
    </div>
  );
}
