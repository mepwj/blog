import Fuse from 'fuse.js';
import { Post } from './posts';

export interface SearchResult {
  item: Post;
  score?: number;
}

export function searchPosts(posts: Post[], query: string): SearchResult[] {
  if (!query.trim()) {
    return posts.map(post => ({ item: post }));
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
  
  return fuse.search(query);
}

export function highlightText(text: string, query: string): string {
  if (!query.trim()) {
    return text;
  }
  
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-800">$1</mark>');
}
