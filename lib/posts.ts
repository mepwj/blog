import { blogPosts } from '@/.velite';

export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  thumbnailUrl: string;
  category: string;
  tags?: string[];
  body: string;
  draft: boolean;
  permalink: string;
}

export async function getAllPosts(): Promise<Post[]> {
  return blogPosts
    .filter(post => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const post = blogPosts.find(p => p.slug === slug);
  return post && !post.draft ? post : null;
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  return blogPosts
    .filter(post => !post.draft && post.category === category)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getAllCategories(): Promise<{category: string, count: number}[]> {
  const categoryMap = new Map<string, number>();
  
  blogPosts
    .filter(post => !post.draft)
    .forEach(post => {
      const count = categoryMap.get(post.category) || 0;
      categoryMap.set(post.category, count + 1);
    });
  
  return Array.from(categoryMap.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
}

export async function getAllTags(): Promise<{tag: string, count: number}[]> {
  const tagMap = new Map<string, number>();
  
  blogPosts
    .filter(post => !post.draft)
    .forEach(post => {
      post.tags?.forEach(tag => {
        const count = tagMap.get(tag) || 0;
        tagMap.set(tag, count + 1);
      });
    });
  
  return Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
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