import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  thumbnail?: string;
  category: string;
  tags: string[];
  content: string;
  draft: boolean;
}

const postsDirectory = path.join(process.cwd(), 'posts');

export async function getAllPosts(): Promise<Post[]> {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const filenames = fs.readdirSync(postsDirectory);
  
  const posts = await Promise.all(
    filenames
      .filter(name => name.endsWith('.md'))
      .map(async name => {
        const fullPath = path.join(postsDirectory, name);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        
        const processedContent = await remark()
          .use(html)
          .process(content);
        
        // Remove date prefix if exists (e.g., 2025-06-08-title -> title)
        const slug = name.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
        
        return {
          slug,
          title: data.title || '제목 없음',
          date: data.date || new Date().toISOString().split('T')[0],
          description: data.description || '',
          thumbnail: data.thumbnail || null,
          category: data.category || '기타',
          tags: data.tags || [],
          content: processedContent.toString(),
          draft: data.draft || false,
        } as Post;
      })
  );
  
  return posts
    .filter(post => !post.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    // First try direct match
    let fullPath = path.join(postsDirectory, `${slug}.md`);
    
    // If not found, try to find file with date prefix
    if (!fs.existsSync(fullPath)) {
      const filenames = fs.readdirSync(postsDirectory);
      const matchingFile = filenames.find(filename => 
        filename.endsWith('.md') && 
        filename.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '') === slug
      );
      
      if (matchingFile) {
        fullPath = path.join(postsDirectory, matchingFile);
      } else {
        return null;
      }
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    const processedContent = await remark()
      .use(html)
      .process(content);
    
    // Generate slug from filename (remove date prefix if exists)
    const fileSlug = path.basename(fullPath, '.md').replace(/^\d{4}-\d{2}-\d{2}-/, '');
    
    return {
      slug: fileSlug,
      title: data.title || '제목 없음',
      date: data.date || new Date().toISOString().split('T')[0],
      description: data.description || '',
      thumbnail: data.thumbnail || null,
      category: data.category || '기타',
      tags: data.tags || [],
      content: processedContent.toString(),
      draft: data.draft || false,
    } as Post;
  } catch (error) {
    console.error('포스트를 불러오는 중 오류 발생:', error);
    return null;
  }
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter(post => post.category === category);
}

export async function getAllCategories(): Promise<{category: string, count: number}[]> {
  const posts = await getAllPosts();
  const categoryMap = new Map<string, number>();
  
  posts.forEach(post => {
    const count = categoryMap.get(post.category) || 0;
    categoryMap.set(post.category, count + 1);
  });
  
  return Array.from(categoryMap.entries()).map(([category, count]) => ({
    category,
    count
  })).sort((a, b) => b.count - a.count);
}

export async function getAllTags(): Promise<{tag: string, count: number}[]> {
  const posts = await getAllPosts();
  const tagMap = new Map<string, number>();
  
  posts.forEach(post => {
    post.tags.forEach(tag => {
      const count = tagMap.get(tag) || 0;
      tagMap.set(tag, count + 1);
    });
  });
  
  return Array.from(tagMap.entries()).map(([tag, count]) => ({
    tag,
    count
  })).sort((a, b) => b.count - a.count);
}

export async function getAdjacentPosts(currentSlug: string): Promise<{
  prevPost: Post | null;
  nextPost: Post | null;
}> {
  const posts = await getAllPosts();
  const currentIndex = posts.findIndex(post => post.slug === currentSlug);
  
  if (currentIndex === -1) {
    return { prevPost: null, nextPost: null };
  }
  
  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
  
  return { prevPost, nextPost };
}
