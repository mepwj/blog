import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/lib/posts';
import { highlightText } from '@/lib/search';

interface PostCardProps {
  post: Post;
  searchQuery?: string;
}

export default function PostCard({ post, searchQuery }: PostCardProps) {
  const highlightedTitle = searchQuery 
    ? highlightText(post.title, searchQuery)
    : post.title;
  
  const highlightedDescription = searchQuery 
    ? highlightText(post.description, searchQuery)
    : post.description;

  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      <div className="flex flex-col">
        {/* 썸네일 이미지 */}
        {post.thumbnail && (
          <div className="w-full">
            <Image
              src={post.thumbnail}
              alt={post.title}
              width={400}
              height={200}
              className="w-full h-48 sm:h-56 object-cover"
            />
          </div>
        )}
        
        {/* 포스트 내용 */}
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-2 mb-3">
            <span className="inline-block px-2 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded w-fit">
              {post.category}
            </span>
            <time className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(post.date).toLocaleDateString('ko-KR')}
            </time>
          </div>
          
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 leading-tight">
            <Link 
              href={`/posts/${post.slug}`}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              dangerouslySetInnerHTML={{ __html: highlightedTitle }}
            />
          </h2>
          
          {post.description && (
            <p 
              className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 text-sm sm:text-base"
              dangerouslySetInnerHTML={{ __html: highlightedDescription }}
            />
          )}
          
          {/* 태그 */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded"
                >
                  #{tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">
                  +{post.tags.length - 3}
                </span>
              )}
            </div>
          )}
          
          <Link
            href={`/posts/${post.slug}`}
            className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 py-2"
          >
            자세히 보기
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
