import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/lib/posts';
import { highlightText } from '@/lib/search';
import DefaultThumbnail from './DefaultThumbnail';

interface PostCardProps {
  post: Post;
  searchQuery?: string;
  priority?: boolean;
}

export default function PostCard({ post, searchQuery, priority = false }: PostCardProps) {
  const highlightedTitle = searchQuery 
    ? highlightText(post.title, searchQuery)
    : post.title;
  
  const highlightedDescription = searchQuery 
    ? highlightText(post.description, searchQuery)
    : post.description;

  return (
    <article className="bg-white dark:bg-gray-900 rounded-2xl hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <Link href={`/blog/${post.slug}`} className="flex flex-col md:flex-row">
        {/* 썸네일 */}
        <div className="relative w-full md:w-64 h-48 md:h-auto md:min-h-[180px] flex-shrink-0 overflow-hidden">
          {post.thumbnailUrl ? (
            <Image
              src={post.thumbnailUrl}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 256px"
              priority={priority}
              quality={100}
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="absolute inset-0">
              <DefaultThumbnail title={post.title} category={post.category} />
            </div>
          )}
        </div>
        {/* 포스트 내용 */}
        <div className="flex-1 p-6">
          {/* 제목 */}
          <h2 
            className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors"
            dangerouslySetInnerHTML={{ __html: highlightedTitle }}
          />
          
          {/* 설명 */}
          {post.description && (
            <p 
              className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: highlightedDescription }}
            />
          )}
          
          {/* 메타 정보 */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <time className="text-gray-500 dark:text-gray-500">
                {new Date(post.date).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              <span className="text-gray-400 dark:text-gray-600">·</span>
              <span className="text-gray-500 dark:text-gray-500">
                {post.category}
              </span>
            </div>
          </div>
          
          {/* 태그 */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-gray-600 dark:text-gray-400"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}