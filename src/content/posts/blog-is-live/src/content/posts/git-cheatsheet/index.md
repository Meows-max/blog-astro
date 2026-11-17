---
title: Git 常用命令速查
date: "2026-11-17"
description: 把最常用的 Git 命令整理成一张随时能翻的表
tags: [笔记, 工具]
draft: false
---

# Git 常用命令速查

每次要用 Git 都得重新搜一遍，干脆自己整理一张表，只放真的会用到的。

## 最常用的一条龙

```bash
git status                  # 看看改了什么
git add .                   # 暂存全部改动
git commit -m "说清楚改了什么"
git push                    # 推到远程仓库
```

## 分类速查

| 场景 | 命令 | 说明 |
|------|------|------|
| 拿别人的仓库 | `git clone 仓库地址` | 第一次下载到本地 |
| 同步最新内容 | `git pull` | 动手改之前先拉一次 |
| 看历史 | `git log --oneline` | 一行一条，比较清爽 |
| 看某个文件改了啥 | `git diff 文件名` | 提交前检查 |
| 建分支 | `git switch -c 分支名` | 新功能单独开一条 |
| 切分支 | `git switch main` | 回到主分支 |
| 撤销暂存 | `git restore --staged 文件名` | add 错了用这个 |

## 容易踩的坑

- 提交信息别只写 `update`，过一周自己也看不懂改了什么
- `push` 之前先 `pull`，多人协作时尤其容易冲突
- 删文件前先确认路径，Git 恢复起来比想象中麻烦
- 密码、令牌、`.env` 之类的文件千万别提交到公开仓库

## 本站相关

这个博客的仓库是 `blog-astro`，推到 `main` 分支后 GitHub Actions 会自动构建，等一两分钟刷新页面就能看到新文章。
