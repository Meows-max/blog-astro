import { getCollection } from 'astro:content';
import { TIMEZONE } from '../consts';
import { withBase } from './url';
import type { CollectionEntry } from 'astro:content';

// 获取所有已发布文章：过滤 draft + 按日期倒序
// 首页、标签、归档、RSS、sitemap 必须统一用这个函数
export async function getPublishedPosts() {
  const all = await getCollection('posts');
  return all
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

// 格式化日期（东八区，中文）
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('zh-CN', {
    timeZone: TIMEZONE,
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

// 生成文章 URL
export function getPostUrl(post: CollectionEntry<'posts'>): string {
  return withBase(`/posts/${post.id}/`);
}

// 按年份分组
export function groupByYear(posts: CollectionEntry<'posts'>[]) {
  const groups: Record<string, CollectionEntry<'posts'>[]> = {};
  for (const post of posts) {
    const year = post.data.date.getFullYear().toString();
    if (!groups[year]) groups[year] = [];
    groups[year].push(post);
  }
  return Object.entries(groups).sort((a, b) => b[0].localeCompare(a[0]));
}

// 按标签分组
export function groupByTag(posts: CollectionEntry<'posts'>[]) {
  const map = new Map<string, CollectionEntry<'posts'>[]>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      if (!map.has(tag)) map.set(tag, []);
      map.get(tag)!.push(post);
    }
  }
  return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]));
}
