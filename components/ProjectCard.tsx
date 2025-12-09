import Image from 'next/image';
import Link from 'next/link';
import { ProjectFrontmatter } from '@/lib/mdx';

interface ProjectCardProps {
  slug: string;
  frontmatter: ProjectFrontmatter;
}

export default function ProjectCard({ slug, frontmatter }: ProjectCardProps) {
  return (
    <Link href={`/portfolio/${slug}`} className="block group">
      <article className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
        {frontmatter.thumbnail && (
          <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
            <Image
              src={frontmatter.thumbnail}
              alt={frontmatter.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <h2 className="text-lg font-semibold mb-2 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
          {frontmatter.title}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
          {frontmatter.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-3">
          {frontmatter.techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {frontmatter.github && (
            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              GitHub
            </span>
          )}
          {frontmatter.demo && (
            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
              Demo
            </span>
          )}
        </div>
      </article>
    </Link>
  );
}
