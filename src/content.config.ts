import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 日期严格校验：必须是 "YYYY-MM-DD" 格式的字符串
// 不能用 z.coerce.date()，因为 YAML 会把未加引号的 2026-13-45 溢出解析成 2027-02-14
// 这里用严格字符串 + 正则 + 日历回验，最终 transform 到东八区零点
const dateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'date 必须是 "YYYY-MM-DD" 格式（带引号）')
  .transform((s) => {
    const [y, m, d] = s.split('-').map(Number);
    // 日历回验：防止 2026-02-30 这种假日期
    const date = new Date(y, m - 1, d);
    if (
      date.getFullYear() !== y ||
      date.getMonth() !== m - 1 ||
      date.getDate() !== d
    ) {
      throw new Error(`无效日期: ${s}`);
    }
    // 东八区零点
    return new Date(`${s}T00:00:00+08:00`);
  });

const posts = defineCollection({
  loader: glob({
    pattern: '**/index.md',
    base: './src/content/posts',
    generateId: ({ entry }) => entry.replace(/\/?index\.md$/, ''),
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: dateSchema,
      description: z.string().optional(),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
      cover: image().optional(),
      coverAlt: z.string().optional(),
    }),
});

const pages = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/pages',
  }),
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = { posts, pages };
