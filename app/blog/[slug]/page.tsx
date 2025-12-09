import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { getPostBySlug, getPostSlugs } from '@/lib/mdx';
import type { Metadata } from 'next';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx$/, ''),
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: '글을 찾을 수 없습니다',
    };
  }

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: 'article',
      publishedTime: post.frontmatter.date,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article>
      {/* 헤더 */}
      <header className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
            {post.frontmatter.category}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {post.readingTime}
          </span>
        </div>
        <h1 className="text-3xl font-bold mb-4">{post.frontmatter.title}</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {post.frontmatter.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {post.frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm text-gray-500 dark:text-gray-400"
              >
                #{tag}
              </span>
            ))}
          </div>
          <time
            className="text-sm text-gray-500 dark:text-gray-400"
            dateTime={post.frontmatter.date}
          >
            {new Date(post.frontmatter.date).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>
      </header>

      {/* 본문 */}
      <div className="prose dark:prose-invert">
        <MDXRemote source={post.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
      </div>
    </article>
  );
}
