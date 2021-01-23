# AMD(Asynchronous Module Definition)

- [AMD(Asynchronous Module Definition)](#amdasynchronous-module-definition)
  - [API 说明](#api-说明)
    - [`define()` 函数](#define-函数)
      - [`id`](#id)
      - [模块 `id` 格式](#模块-id-格式)

异步模块定义规范（AMD）制定了定义模块的规则，这样模块和模块的依赖可以被异步加载。这和浏览器的异步加载模块的环境刚好适应（浏览器同步加载模块会导致性能、可用性、调试和跨域访问等问题）。

## API 说明

### `define()` 函数

本规则值定义了一个函数 `define`，它是全局变量。函数的描述为：

```js
define(id?, dependencies?, factory)
```

#### `id`

第一个参数，`id`，是个字符串。它指的是定义中模块的名字，这个参数是可选的。如果没有提供该参数，模块的名字应该默认为模块加载器请求的指定脚本的名字。如果提供了该参数，模块名必须是“顶级”的和绝对的（不允许相对名字）。

#### 模块 `id` 格式

模块 id 可以用来标识所定义的模块，他们同样也可以用在数组参数中。AMD 的模块 id 是 [CommonJS 模块标识](http://wiki.commonjs.org/wiki/Modules/1.1.1#Module_Identifiers) 的超集。从此定义中的引用如下：

- 模块标识符使用斜杠（`/`）分隔的 “术语” 字符串。
- 术语必须是小写驼峰命名的标识符、`.` 或 `..`。
- 模块标识符可能没有像 ".js" 这样的文件扩展名。
- 模块标识符可以是“相对的”或“顶级的”，如果第一个术语是 `.` 或 `..`。
- 顶级标识符是从概念模块根名称空间解析的。
- 相对标识符是相对于编写和调用 `require` 的模块标识符进行解析的。

上面引用的 CommonJS 模块 id 属性通常用于 JavaScript 模块。

相对模块 ID 属性解析示例：

- 如果模块 `a/b/c` 请求 `../d`, 解析为 `a/d`
- 如果模块 `a/b/c` 请求 `./e`, 解析为 `a/b/e`

如果[加载器插件](https://github.com/amdjs/amdjs-api/blob/master/LoaderPlugins.md)在 AMD 的实现中被支持，那么 `!`将被用来将加载器插件的模块 id 和插件的资源 id 分开。因为插件资源 id 可以是非常自由的形式，大多数字符应该被允许作为插件资源 id。
