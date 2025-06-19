import Fuse from 'fuse.js';
import { Post, getAllPosts } from './posts';

export interface SearchResult {
  item: Post;
  score?: number;
}

export async function searchPosts(query: string): Promise<Post[]> {
  const posts = await getAllPosts();
  
  if (!query || !query.trim()) {
    return [];
  }

  const fuse = new Fuse(posts, {
    keys: [
      { name: 'title', weight: 0.4 },
      { name: 'description', weight: 0.3 },
      { name: 'content', weight: 0.2 },
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
