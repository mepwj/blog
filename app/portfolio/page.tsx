import ProjectCard from '@/components/ProjectCard';
import { getAllProjects } from '@/lib/mdx';

export const metadata = {
  title: 'Portfolio',
  description: '프로젝트 포트폴리오입니다.',
};

export default function PortfolioPage() {
  const projects = getAllProjects();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Portfolio</h1>
        <p className="text-gray-600 dark:text-gray-400">
          진행한 프로젝트들입니다.
        </p>
      </div>

      {projects.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              slug={project.slug}
              frontmatter={project.frontmatter}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">
          아직 등록된 프로젝트가 없습니다.
        </p>
      )}
    </div>
  );
}
