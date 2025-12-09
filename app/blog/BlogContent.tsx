'use client';

import { useSearchParams } from 'next/navigation';
import PostCard from '@/components/PostCard';
import { Post } from '@/lib/mdx';

interface BlogContentProps {
  posts: Post[];
}

export default function BlogContent({ posts }: BlogContentProps) {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const search = searchParams.get('search');

  let filteredPosts = posts;

  if (category) {
    filteredPosts = filteredPosts.filter(
      (post) => post.frontmatter.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (search) {
    const lowercaseSearch = search.toLowerCase();
    filteredPosts = filteredPosts.filter(
      (post) =>
        post.frontmatter.title.toLowerCase().includes(lowercaseSearch) ||
        post.frontmatter.description.toLowerCase().includes(lowercaseSearch) ||
        post.frontmatter.tags.some((tag) =>
          tag.toLowerCase().includes(lowercaseSearch)
        )
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Blog</h1>
        {category && (
          <p className="text-gray-600 dark:text-gray-400">
            카테고리: {category}
          </p>
        )}
        {search && (
          <p className="text-gray-600 dark:text-gray-400">
            검색: &quot;{search}&quot;
          </p>
        )}
      </div>

      {filteredPosts.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredPosts.map((post) => (
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
          {search || category
            ? '검색 결과가 없습니다.'
            : '아직 작성된 글이 없습니다.'}
        </p>
      )}
    </div>
  );
}
