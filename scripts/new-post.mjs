#!/usr/bin/env node
/**
 * npm run new -- "文章标题"  创建新文章
 * npm run new -- "标题" --tags 随笔,记录  指定标签
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const postsDir = resolve(__dirname, '..', 'src', 'content', 'posts');

// 解析参数
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('用法: npm run new -- "文章标题" [--tags tag1,tag2]');
  process.exit(1);
}

let title = args[0];
let tags = [];

const tagIdx = args.indexOf('--tags');
if (tagIdx !== -1 && args[tagIdx + 1]) {
  tags = args[tagIdx + 1].split(',').map((t) => t.trim()).filter(Boolean);
}

// slug: 小写 + 空格转短横线
const slug = title
  .toLowerCase()
  .replace(/[^\w\u4e00-\u9fa5\s-]/g, '')
  .trim()
  .replace(/\s+/g, '-');

const today = new Date().toISOString().slice(0, 10);
const frontmatter = [
  '---',
  `title: ${title.replace(/'/g, "\\'")}`,
  `date: "${today}"`,
  tags.length > 0 ? `tags: [${tags.map((t) => `"${t}"`).join(', ')}]` : 'tags: []',
  'draft: true',
  '---',
  '',
  `# ${title}`,
  '',
  '开始写正文吧...',
  '',
].join('\n');

const dir = resolve(postsDir, slug);
await mkdir(dir, { recursive: true });
const file = resolve(dir, 'index.md');
await writeFile(file, frontmatter, 'utf8');

console.log(`✓ 已创建: ${file}`);
console.log(`  地址: /blog-astro/posts/${slug}/`);
console.log('  默认 draft: true，发布时改成 false 即可');
