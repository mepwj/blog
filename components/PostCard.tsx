import Image from 'next/image';
import Link from 'next/link';
import { PostFrontmatter } from '@/lib/mdx';

interface PostCardProps {
  slug: string;
  frontmatter: PostFrontmatter;
  readingTime: string;
}

export default function PostCard({ slug, frontmatter, readingTime }: PostCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="block group">
      <article className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
        {frontmatter.thumbnail && (
          <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden">
            <Image
              src={frontmatter.thumbnail}
              alt={frontmatter.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
            {frontmatter.category}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {readingTime}
          </span>
        </div>
        <h2 className="text-lg font-semibold mb-2 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
          {frontmatter.title}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
          {frontmatter.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {frontmatter.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs text-gray-500 dark:text-gray-400"
              >
                #{tag}
              </span>
            ))}
          </div>
          <time className="text-xs text-gray-400" dateTime={frontmatter.date}>
            {new Date(frontmatter.date).toLocaleDateString('ko-KR')}
          </time>
        </div>
      </article>
    </Link>
  );
}
