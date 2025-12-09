import Link from 'next/link';
import PostCard from '@/components/PostCard';
import { getAllPosts } from '@/lib/mdx';
import { getProfile } from '@/lib/profile';

export default function Home() {
  const posts = getAllPosts().slice(0, 3);
  const profile = getProfile();

  return (
    <div>
      {/* 히어로 섹션 */}
      <section className="mb-12">
        <h1 className="text-3xl font-bold mb-4">안녕하세요, {profile.nickname}입니다</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          {profile.shortBio}
        </p>
      </section>

      {/* 최신 글 섹션 */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">최신 글</h2>
          <Link
            href="/blog"
            className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            전체 보기 &rarr;
          </Link>
        </div>
        {posts.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard
                key={post.slug}
                slug={post.slug}
                frontmatter={post.frontmatter}
                readingTime={post.readingTime}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            아직 작성된 글이 없습니다.
          </p>
        )}
      </section>
    </div>
  );
}
