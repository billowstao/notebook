# pnpm - 快速的，节省磁盘空间的包管理工具

> Node.js 的包管理工具经历了从 npm, yarn 到 pnpm 的发展过程。截止目前 (2021.12)，pnpm 为最新一代的包管理工具。pnpm 相较于其他包管理工具的优势有哪些，为何要选择 pnpm，本文为大家逐一介绍。

## pnpm 概述

pnpm 意为 performant npm, 官网地址: [http://pnpm.io](http://pnpm.io)

优点：

- 快速: pnpm 比替代方案快 2 倍
- 高效: `node_modules` 中的文件是从一个单一的可内容寻址的存储中链接过来的
- 支持 monorepos: pnpm 内置支持了单仓多包
- 严格: pnpm 创建了一个非平铺的 `node_modules`，因此代码无法访问任意包

### 快速

参照官方提供的[JavaScript 包管理工具基准测试](https://pnpm.io/benchmarks)：

| action  | cache | lockfile | `node_modules` | npm   | pnpm  | Yarn  | Yarn PnP |
| ------- | ----- | -------- | -------------- | ----- | ----- | ----- | -------- |
| install |       |          |                | 8.6s  | 16.3s | 22.1s | 27.5s    |
| install | ✔     | ✔        | ✔              | 2.1s  | 1.4s  | 2.6s  | n/a      |
| install | ✔     | ✔        |                | 13.5s | 4.1s  | 8.6s  | 1.9s     |
| install | ✔     |          |                | 19.8s | 7.6s  | 14.2s | 7.4s     |
| install |       | ✔        |                | 31.8s | 13.4s | 15.3s | 21.1s    |
| install | ✔     |          | ✔              | 2.7s  | 1.8s  | 8.3s  | n/a      |
| install |       | ✔        | ✔              | 2.1s  | 1.3s  | 9.4s  | n/a      |
| install |       |          | ✔              | 2.7s  | 5.9s  | 15s   | n/a      |
| update  | n/a   | n/a      | n/a            | 2.2s  | 11.8s | 18.7s | 32.4s    |

![pnpm bechmark](./resource/pnpm-benchmark.png)

### 高效

内容可寻址存储：

当使用 npm 或 Yarn 时，如果你有 100 个项目使用了某个依赖，就会有 100 份该依赖的副本保存在硬盘上。对于 pnpm，依赖项将存储在一个内容可寻址的仓库中，因此：

1. 如果你用到了某依赖项的不同版本，那么只会将有差异的文件添加到仓库。例如，如果某个包有 100 个文件，而它的新版本只改变了其中 1 个文件。那么 pnpm update 时只会向存储中心额外添加 1 个新文件，而不会因为仅仅一个文件的改变复制整新版本包的内容。
2. 所有文件都会存储在硬盘上的某一位置。当软件包被被安装时，包里的文件会硬链接到这一位置，而不会占用额外的磁盘空间。这允许你跨项目地共享同一版本的依赖。

因此，您在磁盘上节省了大量空间，这与项目和依赖项的数量成正比，并且安装速度要快得多！

### 严格

相较于 npm, Yarn 能够访问 `node_moduels` 中的任意包。在 pnpm 中，一个包只能访问 `package.json` 中指定的依赖项。
