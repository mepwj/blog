import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const contentDirectory = path.join(process.cwd(), 'content');

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  thumbnail?: string;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
  readingTime: string;
}

export interface ProjectFrontmatter {
  title: string;
  description: string;
  thumbnail?: string;
  techStack: string[];
  github?: string;
  demo?: string;
  presentation?: string;
}

export interface Project {
  slug: string;
  frontmatter: ProjectFrontmatter;
  content: string;
}

export function getPostSlugs(): string[] {
  const postsDir = path.join(contentDirectory, 'blog');
  if (!fs.existsSync(postsDir)) return [];
  return fs.readdirSync(postsDir).filter((file) => file.endsWith('.mdx'));
}

export function getProjectSlugs(): string[] {
  const projectsDir = path.join(contentDirectory, 'portfolio');
  if (!fs.existsSync(projectsDir)) return [];
  return fs.readdirSync(projectsDir).filter((file) => file.endsWith('.mdx'));
}

export function getPostBySlug(slug: string): Post | null {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = path.join(contentDirectory, 'blog', `${realSlug}.mdx`);

  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);

  return {
    slug: realSlug,
    frontmatter: data as PostFrontmatter,
    content,
    readingTime: stats.text,
  };
}

export function getProjectBySlug(slug: string): Project | null {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = path.join(contentDirectory, 'portfolio', `${realSlug}.mdx`);

  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    frontmatter: data as ProjectFrontmatter,
    content,
  };
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== null)
    .sort((a, b) =>
      new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
    );
  return posts;
}

export function getAllProjects(): Project[] {
  const slugs = getProjectSlugs();
  const projects = slugs
    .map((slug) => getProjectBySlug(slug))
    .filter((project): project is Project => project !== null);
  return projects;
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set(posts.map((post) => post.frontmatter.category));
  return Array.from(categories);
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set(posts.flatMap((post) => post.frontmatter.tags));
  return Array.from(tags);
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter(
    (post) => post.frontmatter.category.toLowerCase() === category.toLowerCase()
  );
}

export function searchPosts(query: string): Post[] {
  const lowercaseQuery = query.toLowerCase();
  return getAllPosts().filter(
    (post) =>
      post.frontmatter.title.toLowerCase().includes(lowercaseQuery) ||
      post.frontmatter.description.toLowerCase().includes(lowercaseQuery) ||
      post.frontmatter.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
  );
}
