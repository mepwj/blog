import { Suspense } from 'react';
import { getAllPosts } from '@/lib/mdx';
import BlogContent from './BlogContent';

export const metadata = {
  title: 'Blog',
  description: '개발 관련 글과 일상을 기록합니다.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <BlogContent posts={posts} />
    </Suspense>
  );
}
