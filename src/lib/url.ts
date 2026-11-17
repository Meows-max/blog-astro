// URL 拼接工具 —— 所有内部链接必须走 withBase()
// 因为项目部署在 /blog-astro 子路径下
export function withBase(path: string): string {
  if (path.startsWith('http')) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const p = path.startsWith('/') ? path : '/' + path;
  return base + p;
}
