import { getAllPosts, getPostBySlug, getAdjacentPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

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
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: post.thumbnail ? [post.thumbnail] : [],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    notFound();
  }

  const { prevPost, nextPost } = await getAdjacentPosts(params.slug);

  return (
    <div className="max-w-4xl mx-auto">
      {/* 포스트 헤더 */}
      <header className="mb-8">
        <div className="w-4/5 mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            {post.title}
          </h1>
          
          {/* 메타 정보 */}
          <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400 mb-6">
            <time>
              {new Date(post.date).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            <span>•</span>
            <span className="text-green-600 dark:text-green-400 font-medium">
              {post.category}
            </span>
          </div>

          {/* 태그 */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* 포스트 내용 */}
      <div className="w-4/5 mx-auto">
        <article className="prose prose-lg max-w-none dark:prose-invert 
          prose-headings:text-gray-900 dark:prose-headings:text-white 
          prose-p:text-gray-700 dark:prose-p:text-gray-300 
          prose-li:text-gray-700 dark:prose-li:text-gray-300
          prose-a:text-green-600 dark:prose-a:text-green-400 prose-a:no-underline hover:prose-a:underline 
          prose-code:text-gray-100 dark:prose-code:text-gray-100 
          prose-code:bg-gray-900 dark:prose-code:bg-gray-800 
          prose-code:px-2 prose-code:py-1 prose-code:rounded 
          prose-code:text-sm prose-code:font-medium
          prose-pre:bg-gray-900 dark:prose-pre:bg-gray-800 prose-pre:rounded-xl 
          prose-pre:text-gray-100 dark:prose-pre:text-gray-300
          prose-blockquote:border-l-green-500 prose-blockquote:bg-green-50 dark:prose-blockquote:bg-green-900/20">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </div>

      {/* 이전/다음 포스트 네비게이션 */}
      {(prevPost || nextPost) && (
        <nav className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {prevPost && (
              <Link
                href={`/posts/${prevPost.slug}`}
                className="group bg-white dark:bg-gray-900 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-800"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-green-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">이전 포스트</p>
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors line-clamp-2">
                      {prevPost.title}
                    </h3>
                  </div>
                </div>
              </Link>
            )}
            
            {nextPost && (
              <Link
                href={`/posts/${nextPost.slug}`}
                className="group bg-white dark:bg-gray-900 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-800 md:text-right"
              >
                <div className="flex items-start space-x-4 md:flex-row-reverse md:space-x-0 md:space-x-reverse">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-green-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">다음 포스트</p>
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors line-clamp-2">
                      {nextPost.title}
                    </h3>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </nav>
      )}

      {/* 홈으로 돌아가기 */}
      <div className="mt-12 text-center">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>목록으로 돌아가기</span>
        </Link>
      </div>
    </div>
  );
}