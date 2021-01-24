# AMD(Asynchronous Module Definition)

- [AMD(Asynchronous Module Definition)](#amdasynchronous-module-definition)
  - [API 说明](#api-说明)
    - [`define()` 函数](#define-函数)
      - [`id`](#id)
        - [模块 `id` 格式](#模块-id-格式)
      - [`dependencies`(依赖)](#dependencies依赖)
      - [`factory`](#factory)
        - [简化 CommonJS 包装](#简化-commonjs-包装)
    - [`define.amd` 属性](#defineamd-属性)
    - [一次输出多个模块](#一次输出多个模块)
  - [例子](#例子)
    - [使用 `require` 和 `export`](#使用-require-和-export)
  - [全局变量](#全局变量)
  - [使用注意](#使用注意)
  - [与 CommonJS 的关系](#与-commonjs-的关系)
  - [参考](#参考)

异步模块定义规范（AMD）制定了定义模块的规则，这样模块和模块的依赖可以被异步加载。这和浏览器的异步加载模块的环境刚好适应（浏览器同步加载模块会导致性能、可用性、调试和跨域访问等问题）。

## API 说明

### `define()` 函数

本规则值定义了一个函数 `define`，它是全局变量。函数的描述为：

```js
define(id?, dependencies?, factory)
```

#### `id`

第 1 个参数，`id`，是个字符串。它指的是定义中模块的名字，这个参数是可选的。如果没有提供该参数，模块的名字应该默认为模块加载器请求的指定脚本的名字。如果提供了该参数，模块名必须是“顶级”的和绝对的（不允许相对名字）。

##### 模块 `id` 格式

模块 id 可以用来标识所定义的模块，他们同样也可以用在数组参数中。AMD 的模块 id 是 [CommonJS 模块标识](http://wiki.commonjs.org/wiki/Modules/1.1.1#Module_Identifiers) 的超集。从此定义中的引用如下：

- 模块名是由一个或多个单词以正斜杠(`/`)为分隔符拼接成的字符串。
- 单词必须是小写驼峰命名的标识符、`.` 或 `..`。
- 模块标识符可能没有像 ".js" 这样的文件扩展名。
- 模块标识符可以是 "相对的" 或 "顶级的"，如果首字符是 `.` 或 `..` 则为 "相对的" 模块名。
- 顶级标识符是从概念模块根名称空间解析的。
- 相对模块名的解析是从 `require` 书写和调用的模块解析

上面引用的 CommonJS 模块 id 属性通常用于 JavaScript 模块。

相对模块 ID 属性解析示例：

- 如果模块 `a/b/c` 请求 `../d`, 解析为 `a/d`
- 如果模块 `a/b/c` 请求 `./e`, 解析为 `a/b/e`

如果 AMD 的实现支持加载器插件[Loader-Plugins](https://github.com/amdjs/amdjs-api/blob/master/LoaderPlugins.md),则 `!` 符号用于分隔加载器插件模块名和插件资源名。由于插件资源名可以非常自由地命名，大多数字符都允许在插件资源名使用。

#### `dependencies`(依赖)

第 2 个参数，`dependencies` 是由模块 id 组成的字面量数组, 这些模块 id 是正在定义的模块所需要的依赖项。必须在模块工厂函数(`factory`)执行之前解析依赖项，解析后的值应该作为参数传递给 `factory` 函数，参数的位置与 `dependencies` 数组中的索引对应。

依赖项的 id 可以是相对 id, 并且应该相对于所定义的模块进行解析。换句话说，相对 id 是相对模块 id 解析的，而不是用于查找模块 id 的路径。

该规范定义了 3 个具有不同解析的特殊依赖项名称。如果 `require`, `exports` 或 `module` 的值出现在依赖列表中，参数应该解析为 CommonJS 模块规范中定义的相应的自由变量。

`dependencies` 参数是可选的，如果省略，默认值应该为 `['require', 'exports', 'module']`。但是，如果 `factory` 函数的参数数量（参数长度属性）小于 3，那么加载器可以选择只调用与函数的参数数量或长度相对应的参数数量的 `factory`。

#### `factory`

第 3 个参数, `factory` 是用来进行实例化模块或对象的函数。如果 `factory` 参数是一个函数，它应该只执行一次。如果 `factory` 参数是一个对西那个，则这个对象应该将该对象赋值为模块的导出值。

如果 `factory` 函数返回一个值（对象，函数或任何强制类型转换为 `true` 的值），则该值应被指定为模块的导出值。

##### 简化 CommonJS 包装

如果忽略了 `dependencies` 参数，模块加载器可能会选择以 `require` 语句的形式扫描 `factory` 函数来寻找依赖项(字面上就是 `require('module-id')`)。第一个参数必须按照字面意思命名为 `require` 才能正常工作。

在某些情况下，模块加载器可能会因为代码大小的限制或缺少对 `toString` 函数支持而选择不扫描依赖项（总所周知，Opera Mobile）缺少对 `toString` 函数的支持）。

如果 `dependencies` 参数存在，模块加载器不应该扫描 `factory` 函数中的依赖项。

### `define.amd` 属性

为了让全局定义函数（在浏览器中加载脚本 `src`）符合 AMD API 的定义，任何全局定义函数都应该有一个名为 `amd` 的属性，它的值是一个对象。这样有助于避免和任何其他现有的 JavaScript 代码发生冲突，这些 JavaScript 代码可能定义了一个不符合 AMD API 规范的 `define` 函数。

当前，`define.amd` 对象的属性没有包含在本规范中。实现本规范的作者，可以用它通知超出本规范编程接口基本实现的额外能力。

`define.amd` 的存在表明函数遵循本规范。如果有另外一个版本的编程接口，那么应该定义另外一个属性，如 `define.amd2`，表明实现只遵循该版本的编程接口。

一个如何定义同一个环境中允许多次加载同一个版本的模块的实现：

```js
define.amd = {
  multiversion: true,
};
```

最简短的定义：

```js
define.amd = {};
```

### 一次输出多个模块

在一个脚本中可以使用多次 `define` 调用。这些 `define` 调用的顺序不应该是重要的。早一些的模块定义中所指定的依赖，可以在同一脚本中晚一些定义。模块加载器负责延迟加载未解决的依赖，直到全部脚本加载完毕，防止没必要的请求。

## 例子

### 使用 `require` 和 `export`

创建一个名为 `alpha` 的模块，使用 `require`, `export` 和名为 `beta` 的模块：

```js
define("alpha", ["require", "exports", "beta"], function (
  require,
  exports,
  beta
) {
  exports.verb = function () {
    return beta.verb();
    //Or:
    return require("beta").verb();
  };
});
```

一个返回对象的匿名模块：

```js
define(["alpha"], function (alpha) {
  return {
    verb: function () {
      return alpha.verb() + 2;
    },
  };
});
```

一个没有依赖性的模块可以直接定义对象：

```js
define({
  add: function (x, y) {
    return x + y;
  },
});
```

一个使用了简单 CommonJS 转换的模块定义：

```js
define(function (require, exports, module) {
  let a = require("a");
  let b = require("b");

  exports.action = function () {};
});
```

## 全局变量

本规范保留全局变量 `define` 以用来实现本规范。包额外信息异步定义编程接口是为将来的 CommonJS API 保留的。模块加载器不应在此函数添加额外的方法或属性。

本规范保留全局变量 `require` 被模块加载器使用。模块加载器可以在合适的情况下自由地使用该全局变量。它可以使用这个变量或添加任何属性以完成模块加载器的特定功能。它同样也可以选择完全不使用 `require`。

## 使用注意

为了使静态分析工具（如 build 工具）可以正常工作，推荐使用字面上形如的 `define(...)`。

## 与 CommonJS 的关系

一个关于本 API 的 wiki 开始在 CommonJS wiki 中创建了，作为中转的格式，模块中转。但是为了包含模块定义接口，随着时间而不断改变。在 CommonJS 列表中关于推荐本 API 作为模块定义API尚未达成一致。本 API 被转移到它自己的 wiki 和讨论组中。

AMD 可以作为 CommonJS 模块一个中转的版本只要 CommonJS 没有被用来同步的 `require` 调用。使用同步 `require` 调用的 CommonJS 代码可以被转换为使用回调风格的AMD模块加载器。

## 参考

- AMD(The Asynchronous Module Definition): [https://github.com/amdjs/amdjs-api/wiki/AMD](https://github.com/amdjs/amdjs-api/wiki/AMD)
