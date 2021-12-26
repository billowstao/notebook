# pnpm - 快速的，节省磁盘空间的包管理工具

> Node.js 的包管理工具经历了从 npm, yarn 到 pnpm 的发展过程。截止目前 (2021.12)，pnpm 为最新一代的包管理工具。pnpm 相较于其他包管理工具的优势有哪些，为何要选择 pnpm，本文为大家逐一介绍。

## 为什么不是 npm, Yarn

pnpm 是一个 Node.js 的另一种包管理工具，它是 npm, Yarn 的替代，但是更快、更高效。下面概述一下 npm, Yarn 的原理和问题，以及 Yarn 相对于 npm 的改进。

### pnpm 不是扁平化 `node_modules`

在 npm v3 之前的版本，`node_modules` 的结构是可预测的和干净的，每个依赖在 `node_modules` 目录中，并且有它自己的 `node_modules` 目录，其中所有的依赖都在 `package.json` 中指定。

```bash
node_modules
└─ foo
   ├─ index.js
   ├─ package.json
   └─ node_modules
      └─ bar
         ├─ index.js
         └─ package.json
```

这种方法存在 2 个严重的问题：

- 软件包经常创建太深的依赖树，这导致了 Windows 上的长目录路径问题
- 当不同的依赖关系需要包时，会对包进行多次复制粘贴

为了解决这些问题，npm 重新思考了 `node_modules` 的结构，并提出了扁平化。使用 `npm@3`, `node_modules` 结构现在看起来是这样的：

```bash
node_modules
├─ foo
|  ├─ index.js
|  └─ package.json
└─ bar
   ├─ index.js
   └─ package.json
```

有关 npm 依赖解析的更多信息，可以参考：

- [npm install - Algorithm](https://docs.npmjs.com/cli/v8/commands/npm-install#algorithm)
- [npm folders - Cycles, Conflicts, and Folder Parsimony](https://docs.npmjs.com/cli/v8/configuring-npm/folders#cycles-conflicts-and-folder-parsimony)

Yarn 只是对 npm 的一个小小的改进。尽管它使安装速度更快，也有一些不错的新特性，但它使用了与 npm 相同的扁平 `node_modules` 结构（从 v3 开始）。

扁平化依赖树产生了一系列的问题：

- 模块可以访问他们未依赖的包
- 依赖扁平化算法相当的复杂
- 有些包必须复制到项目的 `node_modules` 目录中（而不是通过缓存）

此外，还有一些问题是 Yarn 不打算解决的，比如磁盘空间使用问题。为了解决上述的一系列问题，pnpm 诞生了，而且取得了巨大的成功。pnpm 拥有 Yarn 在 npm 之上的所有附加特性：

- **安全**。和 Yarn 一样，pnpm 也有一个特殊的文件，里面有所有已安装包的校验和，用来在执行代码之前验证每个已安装包的完整性。
- **离线模式**。pnpm 将所有下载的包的压缩文件保存在本地注册的镜像中。当包在本地可用时，它从不发出请求。使用`--offline` 参数，完全可以禁止 HTTP 请求。
- **速度**。pnpm 不仅比 npm 快，还比 Yarn 快。无论使用冷缓存还是热缓存，它都比 Yarn 快。Yarn 从缓存中复制文件，而 pnpm 只从全局存储中链接文件。

### 安装方式差异

pnpm 不允许安装没有保存到 package.json 的包。如果没有参数传递给 `pnpm add`，包会被保存为常规依赖项。像 npm 一样，`--save-dev` 和`--save-optional` 可以用来将包安装为 `dev` 或 `optional` 的依赖项。

由于这个限制，项目在使用 pnpm 时不会有任何额外的包，除非它们删除了一个依赖并使其孤立。这就是为什么 pnpm 的 [`prune` 命令](https://pnpm.io/cli/prune)的实现不允许你指定要修剪的包 —— 它总是删除所有无关的和孤立的包。

### 严格

相较于 npm, Yarn 能够访问 `node_modules` 中的任意包。在 pnpm 中，一个包只能访问 `package.json` 中指定的依赖项。

## pnpm 概述

![pnpm logo](./resource/pnpm-logo.svg)

pnpm 意为 performant npm, 官网地址: [http://pnpm.io](http://pnpm.io)

优点：

- 快速: pnpm 比替代方案快 2 倍
- 高效: `node_modules` 中的文件是从一个单一的可内容寻址的存储中链接过来的
- 支持 monorepos: pnpm 内置支持了单仓多包
- 严格: pnpm 创建了一个非平铺的 `node_modules`，因此代码无法访问任意包

## 快速

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

![pnpm benchmark](./resource/pnpm-benchmark.png)

## 高效

![Saving disk space and boosting installation speed](./resource/pnpm-saving-disk-space.png)

内容可寻址存储：

当使用 npm 或 Yarn 时，如果你有 100 个项目使用了某个依赖，就会有 100 份该依赖的副本保存在硬盘上。对于 pnpm，依赖项将存储在一个内容可寻址的仓库中，因此：

1. 如果你用到了某依赖项的不同版本，那么只会将有差异的文件添加到仓库。例如，如果某个包有 100 个文件，而它的新版本只改变了其中 1 个文件。那么 pnpm update 时只会向存储中心额外添加 1 个新文件，而不会因为仅仅一个文件的改变复制整新版本包的内容。
2. 所有文件都会存储在硬盘上的某一位置。当软件包被被安装时，包里的文件会硬链接到这一位置，而不会占用额外的磁盘空间。这允许你跨项目地共享同一版本的依赖。

因此，你在磁盘上节省了大量空间，这与项目和依赖项的数量成正比，并且安装速度要快得多！

### 这是如何做到的？

![Creating a non-flat node_modules directory](./resource/pnpm-non-flat-node-modules.png)

正如之前提到的，pnpm 不扁平化依赖树。因此，pnpm 使用的算法会简单很多！这就是为什么 pnpm 早期只有一个开发人员可以跟上 Yarn 的几十个贡献者的步伐。

那么，如果不是扁平化的话，pnpm 如何构造 `node_modules` 目录呢？

与 npm@3 不同的是，pnpm 试图解决 npm@2 所存在的问题，而不是扁平化依赖树。在由 pnpm 创建的 `node_modules` 文件夹中，所有的包都有自己的依赖组在一起，但是目录树不会像 npm@2 那样深。pnpm 使所有依赖关系保持扁平，但使用符号链接将它们组合在一起。

pnpm 的 `node_modules` 布局使用符号链接来创建依赖项的嵌套结构。

`node_modules` 中每个包的每个文件都是来自内容可寻址存储的硬链接。假设你安装了依赖于 `bar@1.0.0` 的 `foo@1.0.0`。 pnpm 会将两个包硬链接到 `node_modules` 如下所示：

```bash
# -> - 符号连接 (或者是 Windows 上的 Junction)

node_modules
└── .pnpm
    ├── bar@1.0.0
    │   └── node_modules
    │       └── bar -> <store>/bar
    │           ├── index.js
    │           └── package.json
    └── foo@1.0.0
        └── node_modules
            └── foo -> <store>/foo
                ├── index.js
                └── package.json
```

这是 `node_modules` 中的唯一的“真实”文件。一旦所有包都硬链接到 `node_modules`，就会创建符号链接来构建嵌套的依赖关系图结构。

你可能已经注意到，这两个包都硬链接到一个 `node_modules` 文件夹（`foo@1.0.0/node_modules/foo`）内的子文件夹中。这是必要的：

1. 允许包自行导入自己。`foo` 应该能够 `require('foo/package.json')` 或者 `import * as package from "foo/package.json"`。
2. 避免循环符号链接。依赖以及需要依赖的包被放置在一个文件夹下。对于 Node.js 来说，依赖是在包的内部 `node_modules` 中或在任何其它在父目录 `node_modules` 中是没有区别的。

安装的下一阶段是符号链接依赖项。`bar` 将被符号链接到 `foo@1.0.0/node_modules` 文件夹：

```shell
node_modules
└── .pnpm
    ├── bar@1.0.0
    │   └── node_modules
    │       └── bar -> <store>/bar
    └── foo@1.0.0
        └── node_modules
            ├── foo -> <store>/foo
            └── bar -> ../../bar@1.0.0/node_modules/bar
```

接下来，处理直接依赖关系。`foo` 将被符号链接至根目录的 `node_modules` 文件夹，因为 `foo` 是项目的依赖项：

```shell
node_modules
├── foo -> ./.pnpm/foo@1.0.0/node_modules/foo
└── .pnpm
    ├── bar@1.0.0
    │   └── node_modules
    │       └── bar -> <store>/bar
    └── foo@1.0.0
        └── node_modules
            ├── foo -> <store>/foo
            └── bar -> ../../bar@1.0.0/node_modules/bar
```

这是一个非常简单的例子。但是，无论依赖项的数量和依赖关系图的深度如何，布局都会保持这种结构。

让我们添加 `qar@2.0.0` 作为 `bar` 和 `foo` 的依赖项。这是新的结构的样子：

```shell
node_modules
├── foo -> ./.pnpm/foo@1.0.0/node_modules/foo
└── .pnpm
    ├── bar@1.0.0
    │   └── node_modules
    │       ├── bar -> <store>/bar
    │       └── qar -> ../../qar@2.0.0/node_modules/qar
    ├── foo@1.0.0
    │   └── node_modules
    │       ├── foo -> <store>/foo
    │       ├── bar -> ../../bar@1.0.0/node_modules/bar
    │       └── qar -> ../../qar@2.0.0/node_modules/qar
    └── qar@2.0.0
        └── node_modules
            └── qar -> <store>/qar
```

如你所见，即使图形现在更深（`foo > bar > qar`），但目录深度仍然相同。

这种布局乍一看可能很奇怪，但它与 Node 的模块解析算法完全兼容！解析模块时，Node 会忽略符号链接，因此当 `foo@1.0.0/node_modules/foo/index.js` 需要 `bar` 时，Node 不会使用在 `foo@1.0.0/node_modules/bar` 的 `bar`，相反，`bar` 是被解析到其实际位置（`bar@1.0.0/node_modules/bar`）。因此，bar 也可以解析其在 `bar@1.0.0/node_modules` 中的依赖项。

这种布局的一大好处是只有真正在依赖项中的包才能访问。使用平铺的 `node_modules` 结构，所有被提升的包都可以访问。要了解更多关于为什么这是一个优势，见 [pnpm's strictness helps to avoid silly bugs](https://www.kochan.io/nodejs/pnpms-strictness-helps-to-avoid-silly-bugs.html)。

## 其他特性

- [Filtering](https://pnpm.io/filtering): 限定命令在指定的 package 子集运行；
- [pnpm link](https://pnpm.io/cli/link): 将本地 package 变为系统级或其他路径下可访问；
- [pnpm exec](https://pnpm.io/cli/exec): 运行项目作用域下的依赖指令；
- [pnpm env <cmd>](https://pnpm.io/cli/env): 管理 Node.js 环境；
- [Workspace](https://pnpm.io/workspaces): Monorepo 支持。

## 参考

- [pnpm - Motivation](https://pnpm.io/motivation)
- [Flat node_modules is not the only way](https://pnpm.io/blog/2020/05/27/flat-node-modules-is-not-the-only-way)
- [Why should we use pnpm?](https://www.kochan.io/nodejs/why-should-we-use-pnpm.html)
- [pnpm vs npm](https://pnpm.io/pnpm-vs-npm)
