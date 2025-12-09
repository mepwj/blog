import { notFound } from 'next/navigation';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getProjectBySlug, getProjectSlugs } from '@/lib/mdx';
import type { Metadata } from 'next';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getProjectSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx$/, ''),
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: '프로젝트를 찾을 수 없습니다',
    };
  }

  return {
    title: project.frontmatter.title,
    description: project.frontmatter.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <article>
      {/* 헤더 */}
      <header className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
        {project.frontmatter.thumbnail && (
          <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden">
            <Image
              src={project.frontmatter.thumbnail}
              alt={project.frontmatter.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <h1 className="text-3xl font-bold mb-4">{project.frontmatter.title}</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {project.frontmatter.description}
        </p>

        {/* 기술 스택 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.frontmatter.techStack.map((tech) => (
            <span
              key={tech}
              className="text-sm px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* 링크들 */}
        <div className="flex flex-wrap gap-4">
          {project.frontmatter.github && (
            <a
              href={project.frontmatter.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              GitHub
            </a>
          )}
          {project.frontmatter.demo && (
            <a
              href={project.frontmatter.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
              Demo
            </a>
          )}
          {project.frontmatter.presentation && (
            <a
              href={project.frontmatter.presentation}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
                />
              </svg>
              Presentation
            </a>
          )}
        </div>
      </header>

      {/* 본문 */}
      <div className="prose dark:prose-invert">
        <MDXRemote source={project.content} />
      </div>
    </article>
  );
}
