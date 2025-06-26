import Fuse from 'fuse.js';
import { blogPosts } from '@/.velite';

export interface SearchResult {
  item: typeof blogPosts[0];
  score?: number;
}

export async function searchPosts(query: string): Promise<typeof blogPosts> {
  const posts = blogPosts.filter(post => !post.draft);
  
  if (!query || !query.trim()) {
    return [];
  }

  const fuse = new Fuse(posts, {
    keys: [
      { name: 'title', weight: 0.4 },
      { name: 'description', weight: 0.3 },
      { name: 'body', weight: 0.2 },
      { name: 'tags', weight: 0.05 },
      { name: 'category', weight: 0.05 }
    ],
    threshold: 0.4,
    includeScore: true,
    minMatchCharLength: 2,
  });
  
  const results = fuse.search(query);
  return results.map(result => result.item);
}

export function highlightText(text: string, query: string): string {
  if (!query || !query.trim()) {
    return text;
  }
  
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-800">$1</mark>');
}