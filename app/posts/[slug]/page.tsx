import { getPostBySlug, getAllPosts, getAdjacentPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface PostPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: '포스트를 찾을 수 없습니다',
    };
  }

  return {
    title: `${post.title} | Coffeenuts.dev`,
    description: post.description,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
      images: post.thumbnail ? [post.thumbnail] : [],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug);
  const { prevPost, nextPost } = await getAdjacentPosts(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="w-full max-w-full overflow-hidden">
      {/* 뒤로가기 링크 */}
      <div className="mb-4 sm:mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 py-2"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          목록으로 돌아가기
        </Link>
      </div>

      <article className="md:max-w-4xl md:mx-auto w-full overflow-hidden">
        {/* 포스트 헤더 */}
        <header className="mb-6 sm:mb-8">
          <div className="mb-3 sm:mb-4">
            <span className="inline-block px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              {post.category}
            </span>
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>

          {post.description && (
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-4 sm:mb-6">
              {post.description}
            </p>
          )}

          {/* 태그 */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 sm:mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* 썸네일 이미지 */}
          {post.thumbnail && (
            <div className="mb-6 sm:mb-8">
              <Image
                src={post.thumbnail}
                alt={post.title}
                width={800}
                height={400}
                className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg"
              />
            </div>
          )}
        </header>

        {/* 포스트 내용 */}
        <div 
          className="prose prose-sm sm:prose prose-blue max-w-none dark:prose-invert prose-custom w-full overflow-hidden"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* 포스트 푸터 - 네비게이션 */}
        <footer className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-700">
          {/* 포스트 네비게이션 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* 이전 글 */}
            <div className="flex justify-start">
              {prevPost ? (
                <Link
                  href={`/posts/${prevPost.slug}`}
                  className="group flex items-center px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors max-w-full"
                >
                  <svg className="w-4 h-4 mr-2 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">이전 글</div>
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {prevPost.title}
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="px-4 py-3 text-gray-400 dark:text-gray-600">
                  <div className="text-xs mb-1">이전 글</div>
                  <div className="text-sm">없음</div>
                </div>
              )}
            </div>

            {/* 목록으로 돌아가기 */}
            <div className="flex justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                목록
              </Link>
            </div>

            {/* 다음 글 */}
            <div className="flex justify-end">
              {nextPost ? (
                <Link
                  href={`/posts/${nextPost.slug}`}
                  className="group flex items-center px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors max-w-full"
                >
                  <div className="min-w-0 flex-1 text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">다음 글</div>
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {nextPost.title}
                    </div>
                  </div>
                  <svg className="w-4 h-4 ml-2 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ) : (
                <div className="px-4 py-3 text-gray-400 dark:text-gray-600 text-right">
                  <div className="text-xs mb-1">다음 글</div>
                  <div className="text-sm">없음</div>
                </div>
              )}
            </div>
          </div>

        </footer>
      </article>
    </div>
  );
}