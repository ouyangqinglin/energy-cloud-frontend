# 技术选型

架构：采用 monorepo(pnpm) + 微前端(qiankun)

工作流：eslint + prettier + commitlint + husky + ci/cd

技术栈：vue3(推荐) + vite

# 分支管理

线上环境采用 master 分支

预发布环境采用 staging 分支

## 开发功能

从 staging 中最新的版本（tag）中拉取最新的代码，
本地切出一个开发分支并 push 到远程，
创建一个 merger request, 同事 review code 之后，可以 rebase 到 staging。
