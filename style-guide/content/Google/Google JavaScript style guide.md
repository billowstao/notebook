# Google JavaScript 风格指南

- [Google JavaScript 风格指南](#google-javascript-%e9%a3%8e%e6%a0%bc%e6%8c%87%e5%8d%97)
  - [引言](#%e5%bc%95%e8%a8%80)
    - [术语说明](#%e6%9c%af%e8%af%ad%e8%af%b4%e6%98%8e)
    - [向导说明](#%e5%90%91%e5%af%bc%e8%af%b4%e6%98%8e)
  - [源文件基础](#%e6%ba%90%e6%96%87%e4%bb%b6%e5%9f%ba%e7%a1%80)
    - [文件名](#%e6%96%87%e4%bb%b6%e5%90%8d)
    - [文件编码：UTF-8](#%e6%96%87%e4%bb%b6%e7%bc%96%e7%a0%81utf-8)
    - [特殊字符](#%e7%89%b9%e6%ae%8a%e5%ad%97%e7%ac%a6)
      - [空格字符](#%e7%a9%ba%e6%a0%bc%e5%ad%97%e7%ac%a6)
      - [特殊转义字符序列](#%e7%89%b9%e6%ae%8a%e8%bd%ac%e4%b9%89%e5%ad%97%e7%ac%a6%e5%ba%8f%e5%88%97)
      - [非 ASCII 字符](#%e9%9d%9e-ascii-%e5%ad%97%e7%ac%a6)
  - [源文件结构](#%e6%ba%90%e6%96%87%e4%bb%b6%e7%bb%93%e6%9e%84)
    - [许可或版权信息（如果有）](#%e8%ae%b8%e5%8f%af%e6%88%96%e7%89%88%e6%9d%83%e4%bf%a1%e6%81%af%e5%a6%82%e6%9e%9c%e6%9c%89)
    - [`@fileoverview` JSDoc（如果存在）](#fileoverview-jsdoc%e5%a6%82%e6%9e%9c%e5%ad%98%e5%9c%a8)
    - [`goog.module` 声明](#googmodule-%e5%a3%b0%e6%98%8e)
      - [层次结构](#%e5%b1%82%e6%ac%a1%e7%bb%93%e6%9e%84)
      - [`goog.module.declareLegacyNamespace`](#googmoduledeclarelegacynamespace)
      - [导出 `goog.module`](#%e5%af%bc%e5%87%ba-googmodule)
    - [ES 模块](#es-%e6%a8%a1%e5%9d%97)
      - [导入](#%e5%af%bc%e5%85%a5)
      - [导入路径](#%e5%af%bc%e5%85%a5%e8%b7%af%e5%be%84)
      - [导入路径中的文件拓展名](#%e5%af%bc%e5%85%a5%e8%b7%af%e5%be%84%e4%b8%ad%e7%9a%84%e6%96%87%e4%bb%b6%e6%8b%93%e5%b1%95%e5%90%8d)
      - [多次导入同一文件](#%e5%a4%9a%e6%ac%a1%e5%af%bc%e5%85%a5%e5%90%8c%e4%b8%80%e6%96%87%e4%bb%b6)
      - [命名导入](#%e5%91%bd%e5%90%8d%e5%af%bc%e5%85%a5)
        - [命名模块导入](#%e5%91%bd%e5%90%8d%e6%a8%a1%e5%9d%97%e5%af%bc%e5%85%a5)
        - [命名默认导入](#%e5%91%bd%e5%90%8d%e9%bb%98%e8%ae%a4%e5%af%bc%e5%85%a5)
        - [别名导入](#%e5%88%ab%e5%90%8d%e5%af%bc%e5%85%a5)
      - [导出](#%e5%af%bc%e5%87%ba)
        - [命名与默认导出](#%e5%91%bd%e5%90%8d%e4%b8%8e%e9%bb%98%e8%ae%a4%e5%af%bc%e5%87%ba)
        - [导出静态容器类和对象](#%e5%af%bc%e5%87%ba%e9%9d%99%e6%80%81%e5%ae%b9%e5%99%a8%e7%b1%bb%e5%92%8c%e5%af%b9%e8%b1%a1)
        - [导出的可变性](#%e5%af%bc%e5%87%ba%e7%9a%84%e5%8f%af%e5%8f%98%e6%80%a7)
        - [导出源](#%e5%af%bc%e5%87%ba%e6%ba%90)
      - [ES 模块中的循环依赖](#es-%e6%a8%a1%e5%9d%97%e4%b8%ad%e7%9a%84%e5%be%aa%e7%8e%af%e4%be%9d%e8%b5%96)
      - [与闭包互操作](#%e4%b8%8e%e9%97%ad%e5%8c%85%e4%ba%92%e6%93%8d%e4%bd%9c)
        - [引用 `goog`](#%e5%bc%95%e7%94%a8-goog)
        - [ES 模块中的 `goog.require`](#es-%e6%a8%a1%e5%9d%97%e4%b8%ad%e7%9a%84-googrequire)
        - [在 ES 模块中声明闭包模块的 ID](#%e5%9c%a8-es-%e6%a8%a1%e5%9d%97%e4%b8%ad%e5%a3%b0%e6%98%8e%e9%97%ad%e5%8c%85%e6%a8%a1%e5%9d%97%e7%9a%84-id)
    - [`goog.setTestOnly`](#googsettestonly)
    - [`goog.require` 和 `goog.requireType` 声明](#googrequire-%e5%92%8c-googrequiretype-%e5%a3%b0%e6%98%8e)
    - [文件的实现](#%e6%96%87%e4%bb%b6%e7%9a%84%e5%ae%9e%e7%8e%b0)
  - [格式化](#%e6%a0%bc%e5%bc%8f%e5%8c%96)
    - [括号](#%e6%8b%ac%e5%8f%b7)
      - [在控制结构中使用括号](#%e5%9c%a8%e6%8e%a7%e5%88%b6%e7%bb%93%e6%9e%84%e4%b8%ad%e4%bd%bf%e7%94%a8%e6%8b%ac%e5%8f%b7)
      - [非空块：K 与 R 风格](#%e9%9d%9e%e7%a9%ba%e5%9d%97k-%e4%b8%8e-r-%e9%a3%8e%e6%a0%bc)
      - [空代码块：可能比较简洁](#%e7%a9%ba%e4%bb%a3%e7%a0%81%e5%9d%97%e5%8f%af%e8%83%bd%e6%af%94%e8%be%83%e7%ae%80%e6%b4%81)
    - [块缩进：+2 空格](#%e5%9d%97%e7%bc%a9%e8%bf%9b2-%e7%a9%ba%e6%a0%bc)
      - [字面量数组：块状结构](#%e5%ad%97%e9%9d%a2%e9%87%8f%e6%95%b0%e7%bb%84%e5%9d%97%e7%8a%b6%e7%bb%93%e6%9e%84)
      - [字面量对象：块状结构](#%e5%ad%97%e9%9d%a2%e9%87%8f%e5%af%b9%e8%b1%a1%e5%9d%97%e7%8a%b6%e7%bb%93%e6%9e%84)
      - [字面量类](#%e5%ad%97%e9%9d%a2%e9%87%8f%e7%b1%bb)
      - [函数表达式](#%e5%87%bd%e6%95%b0%e8%a1%a8%e8%be%be%e5%bc%8f)
      - [`switch` 语句](#switch-%e8%af%ad%e5%8f%a5)
    - [语句](#%e8%af%ad%e5%8f%a5)
      - [每行一个语句](#%e6%af%8f%e8%a1%8c%e4%b8%80%e4%b8%aa%e8%af%ad%e5%8f%a5)

## 引言

本文档是 Google 的 JavaScript 编程语言源代码编码标准的完整定义。当且仅当 JavaScript 源文件遵守此处的规则时，它才被描述为 Google 风格。

像其他编程风格指南一样，这些问题不仅涵盖格式方面的美学问题，而且还涵盖其他类型的约定或编码标准。但是，本文档主要关注我们普遍遵循的一成不变的规则，并避免提供无法明确执行的建议（无论是理念还是工具）。

### 术语说明

在本文档中，除非另有说明：

术语注释始终指实施注释。我们不使用短语文档注释，而是使用通用术语"JSDoc"来表示其中的人类可读文本和机器可读注释 `/**...*/`。

本样式指南在使用短语“必须”，“不能”，“应该”，“不应该”和“可能”时使用 RFC 2119 术语。术语“首选”和“避免”分别对应于“应该”和“不应该”。祈使式和陈述式陈述是规定性的，并与”必须“相符。

其他术语注释有时会出现在整个文档中。

### 向导说明

本文档中的示例代码是非规范性的。也就是说，尽管这些示例采用的是 Google 样式，但它们可能并未说明表示代码的唯一实现方式。在示例中做出的可选格式选择不得作为规则执行。

## 源文件基础

### 文件名

文件名必须全部为小写，并且可以包含下划线（`_`）或破折号（`-`），但不能包含其他标点符号。请遵循项目使用的约定。文件名的扩展名必须为`.js`。

### 文件编码：UTF-8

源文件以 UTF-8 编码。

### 特殊字符

#### 空格字符

除了行终止符序列之外，ASCII 水平空格字符（0x20）是唯一出现在源文件中任何地方的空格字符。这意味着：

- 字符串文字中的所有其他空白字符均被转义

- 制表符不用于缩进。

#### 特殊转义字符序列

对于任何特殊的转义字符序列（`\'`，`\"`，`\\`，`\b`， `\f`，`\n`，`\r`，`\t`，`\v`），应该直接使用该序列，而不是对应的数字转义（例如`\x0a`，`\u000a`或`\u{a}`），不要使用传统八进制转义符。

#### 非 ASCII 字符

对于其他的非 ASCII 字符，使用实际的 Unicode 字符（例如`∞`）或等效的十六进制或 Unicode转义符（例如）`\u221e`，这仅取决于使代码更易于阅读和理解的方式。

> 提示：在Unicode转义符的情况下，有时甚至使用实际的Unicode字符，解释性注释也可能非常有帮助。

```js
/* 最佳：即使没有评论，也非常清晰。 */
const units = 'μs';

/* 允许：但不必要，因为 μ 是可打印字符。 */
const units = '\u03bcs'; // 'μs'

/* 很好：对带有注释的非可打印字符使用转义符，以保持清晰度。 */
return '\ufeff' + content;  // 附加一个字节顺序标记。
```

```js
/* 糟糕：读者不知道这是什么字符 */
const units = '\u03bcs';
```

> 提示：不要因为担心某些程序可能无法正确处理非 ASCII 字符而使代码的可读性降低。如果发生这种情况，这些程序将被破坏，必须对其进行修复。

## 源文件结构

所有新建的源文件应为 `goog.module` 文件（包含 `goog.module` 调用的文件 ）或 ECMAScript（ES）模块（用法 `import` 和 `export` 语句）。文件按顺序包括以下内容：

1. 许可或版权信息（如果有）
1. `@fileoverview` JSDoc（如果存在）
1. `goog.module` 声明（如果有 `goog.module` 文件）
1. ES `import` 语句（如果有 ES 模块）
1. `goog.require` 和 `goog.requireType` 声明
1. 文件的实现

除了文件的实现之外，每个块区域间只有一个空行，文件的实现之前可能有 1 或 2 个空行。

### 许可或版权信息（如果有）

如果一个文件存在许可证或者版权信息则应该添加。

### `@fileoverview` JSDoc（如果存在）

TODO: 添加锚点超链接

有关格式设置规则，请参见 [7.5 顶级/文件级注释]()。

### `goog.module` 声明

所有 `goog.module` 文件必须单独声明一行 `goog.module`：`goog.module` 声明不得换行，因此是80列限制的例外。

`goog.module` 定义名称空间。它是程序包名称（一个标识符，反映了代码所在的目录结构的片段）同时（可选）它定义的主类/枚举/接口连接到后面。

示例

```js
goog.module('search.urlHistory.UrlHistoryService');
```

#### 层次结构

模块名称空间永远不能被命名为另一个模块名称空间的直接子代。

不允许

```js
goog.module('foo.bar');   // 尽管 'foo.bar.qux' 很好
goog.module('foo.bar.baz');
```

目录层次结构反映了名称空间层次结构，因此嵌套更深的子目录是更高层的父目录的子目录。注意，这意味着“父”名称空间组的所有者必须知道所有子名称空间，因为它们存在于相同的目录中。

#### `goog.module.declareLegacyNamespace`

单个 `goog.module` 语句后可以选择调用 `goog.module.declareLegacyNamespace();`。尽可能避免调用 `goog.module.declareLegacyNamespace()`。

示例

```js
goog.module('my.test.helpers');
goog.module.declareLegacyNamespace();
goog.setTestOnly();
```

`goog.module.declareLegacyNamespace` 的存在是为了简化从传统的基于对象层次结构的名称空间的转换，但是它也有一些命名限制。由于子模块名必须在父名称空间之后创建，因此此名称不能是任何其他 `goog.module` 的子或父节点。模块(例如 `goog.module('parent')够同时安全的存在;` 和 `goog.module('parent.child');` 不能同时安全存在，也不能同时存在 `goog.module('parent');` 和 `goog.module('parent.child.grandchild');`)。

#### 导出 `goog.module`

使用 `exports` 对象导出类、枚举、函数、常量和其他符号。导出的符号可以直接在导出对象上定义，也可以在本地声明并单独导出。符号只有在用于模块外部时才会被导出。非导出模块本地符号不会声明为`@private`，它们的名称也不会以下划线结尾。对于导出和模块本地符号没有规定的顺序。

示例

```js
const /** !Array<number> */ exportedArray = [1, 2, 3];

const /** !Array<number> */ moduleLocalArray = [4, 5, 6];

/** @return {number} */
function moduleLocalFunction() {
  return moduleLocalArray.length;
}

/** @return {number} */
function exportedFunction() {
  return moduleLocalFunction() * 2;
}

exports = {exportedArray, exportedFunction};
```

```js
/** @const {number} */
exports.CONSTANT_ONE = 1;

/** @const {string} */
exports.CONSTANT_TWO = 'Another constant';
```

不要注释该 `exports` 对象为 `@const` 因为编译器已将其视为常量。

```js
// 不推荐
/** @const */
exports = {exportedFunction};
```

### ES 模块

#### 导入

导入语句不能换行，因此是 80 列限制的例外。

#### 导入路径

ES 模块文件必须使用 `import` 语句来导入其他ES模块文件。不要使用 `goog.require` 其他 ES 模块。

```js
import './sideeffects.js';

import * as goog from '../closure/goog/goog.js';
import * as parent from '../parent.js';

import {name} from './sibling.js';
```

#### 导入路径中的文件拓展名

`.js` 文件的扩展名不是可选的，拓展名必须始终被包括在内。

```js
// 错误
import '../directory/file';
```

```js
// 正确
import '../directory/file.js';
```

#### 多次导入同一文件

不要多次导入同一个文件。这可能使确定文件的聚合导入变得困难。

```js
// 导入相同的路径，但是由于没有对齐，因此很难看出来
import {short} from './long/path/to/a/file.js';
import {aLongNameThatBreaksAlignment} from './long/path/to/a/file.js';
```

#### 命名导入

##### 命名模块导入

模块导入名称（`import * as name`）是派生自导入文件名的小写驼峰名称。

```js
import * as fileOne from '../file-one.js';
import * as fileTwo from '../file_two.js';
import * as fileThree from '../filethree.js';
```

```js
import * as libString from './lib/string.js';
import * as math from './math/math.js';
import * as vectorMath from './vector/math.js';
```

##### 命名默认导入

TODO: 添加文件锚点超链接

命名默认导入派生自导入的文件名，并按照 [6.2 标识符类型遵循规则]() 中的规则。

```js
import MyClass from '../my-class.js';
import myFunction from '../my_function.js';
import SOME_CONSTANT from '../someconstant.js';
```

TODO: 添加文档锚点超链接

> 注意:一般情况下这是不应该发生的，因为默认导出是被这个风格指南禁止的，参见 [命名与默认导出]()。默认导入仅用于导入不符合此样式指南的模块

##### 别名导入

通常，通过命名的 `import`（`import {name}`）导入的符号应保持相同的名称。避免导入模块使用别名（`import {SomeThing as SomeOtherThing}`）。最好通过使用模块导入 `import`（ `import *` ）或重命名导出模块本身来解决名称冲突。

```js
import * as bigAnimals from './biganimals.js';
import * as domesticatedAnimals from './domesticatedanimals.js';

new bigAnimals.Cat();
new domesticatedAnimals.Cat();
```

如果任需要重命名名称导入的模块，则使用导入模块的文件名或路径作为别名。

```js
import {Cat as BigCat} from './biganimals.js';
import {Cat as DomesticatedCat} from './domesticatedanimals.js';

new BigCat();
new DomesticatedCat();
```

#### 导出

符号只有在用于模块外部时才会被导出。非导出模块本地符号不会声明为`@private`，它们的名称也不会以下划线结尾。对于导出和模块本地符号没有规定的顺序。

##### 命名与默认导出

在所有代码中使用命名导出。您可以将 `export` 关键字应用于声明，或者使用 `export {name};` 语法。

不要使用默认导出。导入模块必须为这些值指定一个名称，这可能导致模块之间的命名不一致。

```js
// 不要使用默认导出：
export default class Foo { ... } // 糟糕!
```

```js
// 使用名称导出：
export class Foo { ... }
```

```js
// 另一种命名导出格式:
class Foo { ... }

export {Foo};
```

##### 导出静态容器类和对象

不要为了命名空间而导出带有静态方法或属性的容器类或对象。

```js
// container.js
// 糟糕: Container 是一个导出的类，它只有静态方法和字段。
export class Container {
  /** @return {number} */
  static bar() {
    return 1;
  }
}

/** @const {number} */
Container.FOO = 1;
```

相反，导出单独的常量和函数。

```js
/** @return {number} */
export function bar() {
  return 1;
}

export const /** number */ FOO = 1;
```

##### 导出的可变性

导出的变量不能在模块初始化之外发生变化。

如果需要突变，还有其他选择，包括导出对具有可变字段的对象的常量引用或导出可变数据的访问器函数。

```js
// 糟糕：foo 和 mutateFoo 都被导出并且发生了变化。
export let /** number */ foo = 0;

/**
 * foo 变化
 */
export function mutateFoo() {
  ++foo;
}

/**
 * @param {function(number): number} newMutateFoo
 */
export function setMutateFoo(newMutateFoo) {
  // 可以修改导出的类和函数！
  mutateFoo = () => {
    foo = newMutateFoo(foo);
  };
}
```

```js
// 与其直接导出可变变量 foo 和 mutateFoo，
// 相反，将它们设置为模块作用域，并为 foo 导出一个 getter
// 为 mutateFooFunc 导出一个包装。
let /** number */ foo = 0;
let /** function(number): number */ mutateFooFunc = foo => foo + 1;

/** @return {number} */
export function getFoo() {
  return foo;
}

export function mutateFoo() {
  foo = mutateFooFunc(foo);
}

/** @param {function(number): number} mutateFoo */
export function setMutateFoo(mutateFoo) {
  mutateFooFunc = mutateFoo;
}
```

##### 导出源

导出语句不能行包装，因此是 80 列限制的例外。这适用于所有导出风格。

```js
export {specificName} from './other.js';
export * from './another.js';
```

#### ES 模块中的循环依赖

不要在 ES 模块之间创建循环，即使 ECMAScript 规范允许这样做。注意，可以使用`import`和`export`语句创建循环。

```js
// a.js
import './b.js';
```

```js
// b.js
import './a.js';

// `export from` can cause circular dependencies too!
export {x} from './c.js';
```

```js
// c.js
import './b.js';

export let x;
```

#### 与闭包互操作

##### 引用 `goog`

如果需要引用闭包 `goog` 名称空间，请导入闭包 `goog.js`。

```js
import * as goog from '../closure/goog/goog.js';

const name = goog.require('a.name');

export const CONSTANT = name.compute();
```

`goog.js` 只导出可以在 ES 模块中使用的全局 `goog` 子属性。

##### ES 模块中的 `goog.require`

ES 模块中的 `goog.require` 工作方式与 `goog.module` 文件中的一致。你可以 `require` 任何闭包命名空间中的符号（例如：`goog.provide` 或 `goog.module` 创建的符号），并且 `goog.require` 将会返回相应值。

```js
import * as goog from '../closure/goog/goog.js';
import * as anEsModule from './anEsModule.js';

const GoogPromise = goog.require('goog.Promise');
const myNamespace = goog.require('my.namespace');
```

##### 在 ES 模块中声明闭包模块的 ID

`goog.declareModuleId` 可以在 ES 模块中用来声明一个类似 `goog.module` 模块的 ID. 这意味着这个模块 ID 可以是类似 `goog.required`, `goog.module.getd`, `goog.forwardDeclare` 的模块。如果一个 `goog.module` 没有调用 `goog.module.declareLegacyNamespace`，将不会把模块 ID 创建为 JavaScript 全局符号。

调用 `goog.declareModuleId` 返回的一个 `goog.require` (或 `goog.module.get`) 模块 ID 总是会返回模块对象（就像是 `import *`）。因此，`goog.declareModuleId` 的参数应该为小写驼峰命名法。

> 注意：在 ES 模块中调用 `goog.module.declareLegacyNamespace` 是错误的，这个方法只应该在从 `goog.module` 文件中调用。没有将传统名称空间与 ES 模块关联的方法。

`goog.declareModuleId` 应该只用于将闭包文件升级到 ES 模块中，其中使用了命名导出。

```js
import * as goog from '../closure/goog.js';

goog.declareModuleId('my.esm');

export class Class {};
```

### `goog.setTestOnly`

在 `goog.module` 文件中 `goog.module` 声明语句之后可以有选择的调用 `goog.setTestOnly()`。

在 ES 模块中，`import` 语句之后可以有选择的调用 `goog.setTestOnly()`。

### `goog.require` 和 `goog.requireType` 声明

使用 `goog.require` 和 `goog.requireType` 声明进行导入操作。这意味 `goog.require` 可以同时在代码和类型注释中使用，而 `goog.requireType` 只能在类型注释中使用。

`goog.require` 和 `goog.requireType` 声明语句形成一个没有空行的连续代码块。 这个代码块位于 `goog.module` 之后并且与其隔开一行。`goog.require` 或 `goog.requireType` 的所有参数是位于一个单独存放文件中的名称空间。 `goog.require` 和 `goog.requireType` 声明语句不会出现在其他文件的任何地方。

每个 `goog.require` 或 `goog.requireType` 被分配给一个常量别名，或者分解为几个常量别名。这些别名是引用类型注释或代码中的依赖项的惟一可访问方式。除了 `goog.require` 与 `goog.requireType` 的参数之外，任何地方都不能使用完全限定的名称空间。

> 例外：在外部文件中声明的类型、变量和函数必须在类型注释和代码中使用它们的完全限定名。

别名必须与导入模块名称空间的点分隔组件名称匹配。

TODO: 添加锚点超链接

> 例外：在某些情况下，可以使用名称空间的其他组件来形成更长的别名。产生的别名必须保留原始标识符的包装，以便它仍然正确地标识其类型。较长的别名可用于消除其他相同别名的歧义，或者显著提高可读性。此外，必须使用更长的别名来防止屏蔽本地类型，如：`Element`、`Event`、`Error`、`Map` 和 `Promise`（有关更完整的列表，请参阅 MDN 上的 [标准内置对象](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects) 和 [Web APIs](https://developer.mozilla.org/en-US/docs/Web/API)）。重命名析构别名时，必须按照 [水平空格]() 的要求在冒号后面加上空格。

一个文件不应该在同时包含同一个名称空间的 `goog.require` 和 `goog.requireType` 声明语句。如果导入的名称同时在代码和类型注释中使用，则应该由单个 `goog.require` 语句声明。

如果一个模块仅仅因为其副作用而被导入，那么必须使用 `goog.require`(不是 `goog.requireType`) 并且可以省略赋值。需要添加注释来解释为什么需要这样做，并阻止编译器警告。

这些代码声明按照以下规则进行排序：所有的行都需要在左侧有一个名称，然后按照这些名称的字母顺序排列。然后需要进行析构，再次按左侧的名称排序。最后，任何 `require` 调用要是独立的（通常是为了避免模块导入的副作用）。

> 提示：没有必要记住这个顺序并手动执行它。您可以依赖您的 IDE 来报告未正确排序的导入处理。

如果一个很长的别名或模块名会导致一行超过 80 列的限制，一定不要换行。`require` 行是 80 列限制的例外。

示例

```js
// 标准别名格式
const MyClass = goog.require('some.package.MyClass');
const MyType = goog.requireType('some.package.MyType');
// 基于名称空间的别名，用于消除歧义的。
const NsMyClass = goog.require('other.ns.MyClass');
// 基于名称空间的别名，用于防止屏蔽本机类型。
const RendererElement = goog.require('web.renderer.Element');
// 基于序列名称空间的别名，用于提高可读性的。
// 要求超过 80 列的行不能换行。
const SomeDataStructureModel = goog.requireType('identical.package.identifiers.models.SomeDataStructure');
const SomeDataStructureProto = goog.require('proto.identical.package.identifiers.SomeDataStructure');
// 标准别名格式
const asserts = goog.require('goog.asserts');
// 用于消除歧义的基于名称空间的别名。
const testingAsserts = goog.require('goog.testing.asserts');
// 标准结构为别名。
const {clear, clone} = goog.require('goog.array');
const {Rgb} = goog.require('goog.color');
// 基于名称空间的解构为别名，用于消除歧义
const {SomeType: FooSomeType} = goog.requireType('foo.types');
const {clear: objectClear, clone: objectClone} = goog.require('goog.object');
// `goog.require` 为了触发副作用没有别名。
/** @suppress {extraRequire} 初始化 MyFramework. */
goog.require('my.framework.initialization');
```

不推荐

```js
// 如果需要消除歧义，最好选择使用别名 `PackageClass` 而不是 `SomeClass`，因为它更接近模块名的格式。
const SomeClass = goog.require('some.package.Class');
```

不允许

```js
// 额外的术语必须来自名称空间。
const MyClassForBizzing = goog.require('some.package.MyClass');
// 别名必须包含整个最终的名称空间组件。
const MyClass = goog.require('some.package.MyClassForBizzing');
// 别名不能覆盖本地变量 (这里原本应该为 `const JspbMap`)。
const Map = goog.require('jspb.Map');
// 不要打破 `goog.require` 行超过 80 列。
const SomeDataStructure =
    goog.require('proto.identical.package.identifiers.SomeDataStructure');
// 别名必须基于名称空间。
const randomName = goog.require('something.else');
// 冒号后面少了一个空格。
const {Foo:FooProto} = goog.require('some.package.proto.Foo');
// `goog.requireType` 没有别名。
goog.requireType('some.package.with.a.Type');


/**
 * @param {!some.unimported.Dependency} param 除非在外部声明，
 *    JSDoc 注释中使用的所有外部类型必须是 `goog.require` 中的。
 */
function someFunction(param) {
  // `goog.require` 行必须独立位于其他代码之前。
  const alias = goog.require('my.long.name.alias');
  // ...
}
```

### 文件的实现

文件的实现在所有的依赖信息之后（至少用一行空行隔开）。

这可能包括任何本地模块声明(常量、变量、类、函数等)，以及任何导出的符号。

## 格式化

TODO: 添加锚点超链接

术语注：类级块结构是指类、函数、方法或用括号分隔的代码块的主体。注意，在 [字面量数组]() 和 [字面量对象]() 中，任何数组或对象字面量都可以被选择性地当作类似块的结构。

> 提示：使用 clang-format. JavaScript 社区已经努力确保 clang-format 在 JavaScript 文件上运行良好。多个流行的编辑器集成 clang-format 与。

### 括号

#### 在控制结构中使用括号

所有控制结构（例如：`if`、`else`、`for`、`do`、`while` 以及任何其他结构）都需要大括号，即使主体只包含一条语句。非空块的第一个语句必须从它的行开始。

不允许

```js
if (someVeryLongCondition())
  doSomething();

for (let i = 0; i < foo.length; i++) bar(foo[i]);
```

例外：如果一个简单的 `if` 语句完全可以放在一行中，也没有换行(也没有 `else` 语句)，如果能提高可读性，可以放在一行中，而不加括号。这是控件结构可能省略大括号和换行的唯一情况。

```js
if (shortCondition()) foo();
```

#### 非空块：K 与 R 风格

大括号遵循 *Kernighan* 和 *Ritchie* 风格（埃及方括号），用于非空块和类似块的结构：

- 不要在左括号前换行。
- 在左括号后面换行。
- 在右括号之前换行。
- 在终止语句、函数或类结构，类申明的右括号后面换行。具体的说，如果大括号后面跟着 `else`、`catch`、`while` 或逗号、分号、右括号则不需要换行。

示例：

```js
class InnerClass {
  constructor() {}

  /** @param {number} foo */
  method(foo) {
    if (condition(foo)) {
      try {
        // 注：这里可能出错
        something();
      } catch (err) {
        recover();
      }
    }
  }
}
```

#### 空代码块：可能比较简洁

空的代码块或类似块的结构应该在右括号后立即关闭，代码块中没有字符、空格或换行（例如 `{}`），除非它是多块语句（直接包含多个块的语句：`if/else`, `try/catch/finally`）的一部分。

示例：

```js
function doNothing() {}
```

不允许：

```js
if (condition) {
  // …
} else if (otherCondition) {} else {
  // …
}

try {
  // …
} catch (e) {}
```

### 块缩进：+2 空格

每当创建一个新的块或类似块的结构时，就增加两个空格的缩进。当块结束时，缩进返回到以前的缩进级别。缩进级别适用于整个块中的代码和注释。（参见 [非空块：K 与 R 风格](#%E9%9D%9E%E7%A9%BA%E5%9D%97%EF%BC%9AK%20%E4%B8%8E%20R%20%E9%A3%8E%E6%A0%BC) 中非空块中的示例）。

#### 字面量数组：块状结构

任何字面量数组都可以随意格式化，就好像它是一个“类似块的结构”。例如，下列各项都是有效的(并非详尽无遗)：

```js
const a = [
  0,
  1,
  2,
];

const b =
    [0, 1, 2];
```

```js
const c = [0, 1, 2];

someMethod(foo, [
  0, 1, 2,
], bar);
```

允许使用其他组合，特别是在强调元素之间的语义分组时，但不应仅用于减少较大数组的垂直大小。

#### 字面量对象：块状结构

任何字面量对象都可以随意格式化，就好像它是一个“类似块的结构”。同样的例子适用于 [字面量数组：块状结构](#%E5%AD%97%E9%9D%A2%E9%87%8F%E6%95%B0%E7%BB%84%EF%BC%9A%E5%9D%97%E7%8A%B6%E7%BB%93%E6%9E%84)。例如，以下内容都是有效的(不是详尽的列表):

```js
const a = {
  a: 0,
  b: 1,
};

const b =
    {a: 0, b: 1};
const c = {a: 0, b: 1};

someMethod(foo, {
  a: 0, b: 1,
}, bar);
```

#### 字面量类

字面量类（无论是声明还是表达式）块结构需要缩进。不要在方法之后添加分号，或者在类声明的右括号之后添加分号（包含类表达式的语句，比如赋值语句，仍然以分号结尾）。使用 `extends` 关键字，但不要使用 JSDoc `@extends` 注释，除非该类继承了模板类型。

示例：

```js
class Foo {
  constructor() {
    /** @type {number} */
    this.x = 42;
  }

  /** @return {number} */
  method() {
    return this.x;
  }
}
Foo.Empty = class {};
```

```js
/** @extends {Foo<string>} */
foo.Bar = class extends Foo {
  /** @override */
  method() {
    return super.method() / 2;
  }
};

/** @interface */
class Frobnicator {
  /** @param {string} message */
  frobnicate(message) {}
}
```

#### 函数表达式

当在函数调用的参数列表中声明一个匿名函数时，函数体缩进比前一个缩进深度多两个空格。

示例：

```js
prefix.something.reallyLongFunctionName('whatever', (a1, a2) => {
  // 相比于之前语句行的缩进深度，当前函数体多缩进 2 个空格
  if (a1.equals(a2)) {
    someOtherLongFunctionName(a1);
  } else {
    andNowForSomethingCompletelyDifferent(a2.parrot);
  }
});

some.reallyLongFunctionCall(arg1, arg2, arg3)
    .thatsWrapped()
    .then((result) => {
      // 相比于调用 `.then()`的缩进深度，当前函数体多缩进 2 个空格
      if (result) {
        result.use();
      }
    });
```

#### `switch` 语句

与其他块一样，`switch` 块的内容缩进 +2 空格。

在 `switch` 标签之后，插入一个新行，缩进级别增加 +2，创建一个新块。如果词法作用域需要，可以使用明确的块。闭合的 `switch` 标签回到以前的缩进级别，关闭这个块。

可以选择在 `break` 与其后面的语句之间插入空行。

示例：

```js
switch (animal) {
  case Animal.BANDERSNATCH:
    handleBandersnatch();
    break;

  case Animal.JABBERWOCK:
    handleJabberwock();
    break;

  default:
    throw new Error('Unknown animal');
}
```

### 语句

#### 每行一个语句

每个语句后面都有一个换行符。

4.3.2 Semicolons are required
Every statement must be terminated with a semicolon. Relying on automatic semicolon insertion is forbidden.

4.4 Column limit: 80
JavaScript code has a column limit of 80 characters. Except as noted below, any line that would exceed this limit must be line-wrapped, as explained in 4.5 Line-wrapping.

Exceptions:

goog.module, goog.require and goog.requireType statements (see 3.3 goog.module statement and 3.6 goog.require and goog.requireType statements).
ES module import and export from statements (see 3.4.1 Imports and 3.4.2.4 export from).
Lines where obeying the column limit is not possible or would hinder discoverability. Examples include:
A long URL which should be clickable in source.
A shell command intended to be copied-and-pasted.
A long string literal which may need to be copied or searched for wholly (e.g., a long file path).
4.5 Line-wrapping
Terminology Note: Line wrapping is breaking a chunk of code into multiple lines to obey column limit, where the chunk could otherwise legally fit in a single line.

There is no comprehensive, deterministic formula showing exactly how to line-wrap in every situation. Very often there are several valid ways to line-wrap the same piece of code.

Note: While the typical reason for line-wrapping is to avoid overflowing the column limit, even code that would in fact fit within the column limit may be line-wrapped at the author's discretion.

Tip: Extracting a method or local variable may solve the problem without the need to line-wrap.

4.5.1 Where to break
The prime directive of line-wrapping is: prefer to break at a higher syntactic level.

Preferred:

currentEstimate =
    calc(currentEstimate + x * currentEstimate) /
        2.0;
Discouraged:

currentEstimate = calc(currentEstimate + x *
    currentEstimate) / 2.0;
In the preceding example, the syntactic levels from highest to lowest are as follows: assignment, division, function call, parameters, number constant.

Operators are wrapped as follows:

When a line is broken at an operator the break comes after the symbol. (Note that this is not the same practice used in Google style for Java.)
This does not apply to the dot (.), which is not actually an operator.
A method or constructor name stays attached to the open parenthesis (() that follows it.
A comma (,) stays attached to the token that precedes it.
Note: The primary goal for line wrapping is to have clear code, not necessarily code that fits in the smallest number of lines.

4.5.2 Indent continuation lines at least +4 spaces
When line-wrapping, each line after the first (each continuation line) is indented at least +4 from the original line, unless it falls under the rules of block indentation.

When there are multiple continuation lines, indentation may be varied beyond +4 as appropriate. In general, continuation lines at a deeper syntactic level are indented by larger multiples of 4, and two lines use the same indentation level if and only if they begin with syntactically parallel elements.

4.6.3 Horizontal alignment: discouraged addresses the discouraged practice of using a variable number of spaces to align certain tokens with previous lines.

4.6 Whitespace
4.6.1 Vertical whitespace
A single blank line appears:

Between consecutive methods in a class or object literal
Exception: A blank line between two consecutive properties definitions in an object literal (with no other code between them) is optional. Such blank lines are used as needed to create logical groupings of fields.
Within method bodies, sparingly to create logical groupings of statements. Blank lines at the start or end of a function body are not allowed.
Optionally before the first or after the last method in a class or object literal (neither encouraged nor discouraged).
As required by other sections of this document (e.g. 3.6 goog.require and goog.requireType statements).
Multiple consecutive blank lines are permitted, but never required (nor encouraged).

4.6.2 Horizontal whitespace
Use of horizontal whitespace depends on location, and falls into three broad categories: leading (at the start of a line), trailing (at the end of a line), and internal. Leading whitespace (i.e., indentation) is addressed elsewhere. Trailing whitespace is forbidden.

Beyond where required by the language or other style rules, and apart from literals, comments, and JSDoc, a single internal ASCII space also appears in the following places only.

Separating any reserved word (such as if, for, or catch) except for function and super, from an open parenthesis (() that follows it on that line.
Separating any reserved word (such as else or catch) from a closing curly brace (}) that precedes it on that line.
Before any open curly brace ({), with two exceptions:
Before an object literal that is the first argument of a function or the first element in an array literal (e.g. foo({a: [{c: d}]})).
In a template expansion, as it is forbidden by the language (e.g. valid: `ab${1 + 2}cd`, invalid: `xy$ {3}z`).
On both sides of any binary or ternary operator.
After a comma (,) or semicolon (;). Note that spaces are never allowed before these characters.
After the colon (:) in an object literal.
On both sides of the double slash (//) that begins an end-of-line comment. Here, multiple spaces are allowed, but not required.
After an open-block comment character and on both sides of close characters (e.g. for short-form type declarations, casts, and parameter name comments: this.foo = /** @type {number} */ (bar); or function(/** string */ foo) {; or baz(/* buzz= */ true)).
4.6.3 Horizontal alignment: discouraged
Terminology Note: Horizontal alignment is the practice of adding a variable number of additional spaces in your code with the goal of making certain tokens appear directly below certain other tokens on previous lines.

This practice is permitted, but it is generally discouraged by Google Style. It is not even required to maintain horizontal alignment in places where it was already used.

Here is an example without alignment, followed by one with alignment. Both are allowed, but the latter is discouraged:

{
  tiny: 42, // this is great
  longer: 435, // this too
};

{
  tiny:   42,  // permitted, but future edits
  longer: 435, // may leave it unaligned
};
Tip: Alignment can aid readability, but it creates problems for future maintenance. Consider a future change that needs to touch just one line. This change may leave the formerly-pleasing formatting mangled, and that is allowed. More often it prompts the coder (perhaps you) to adjust whitespace on nearby lines as well, possibly triggering a cascading series of reformattings. That one-line change now has a blast radius. This can at worst result in pointless busywork, but at best it still corrupts version history information, slows down reviewers and exacerbates merge conflicts.

4.6.4 Function arguments
Prefer to put all function arguments on the same line as the function name. If doing so would exceed the 80-column limit, the arguments must be line-wrapped in a readable way. To save space, you may wrap as close to 80 as possible, or put each argument on its own line to enhance readability. Indentation should be four spaces. Aligning to the parenthesis is allowed, but discouraged. Below are the most common patterns for argument wrapping:

// Arguments start on a new line, indented four spaces. Preferred when the
// arguments don't fit on the same line with the function name (or the keyword
// "function") but fit entirely on the second line. Works with very long
// function names, survives renaming without reindenting, low on space.
doSomething(
    descriptiveArgumentOne, descriptiveArgumentTwo, descriptiveArgumentThree) {
  // …
}

// If the argument list is longer, wrap at 80. Uses less vertical space,
// but violates the rectangle rule and is thus not recommended.
doSomething(veryDescriptiveArgumentNumberOne, veryDescriptiveArgumentTwo,
    tableModelEventHandlerProxy, artichokeDescriptorAdapterIterator) {
  // …
}

// Four-space, one argument per line.  Works with long function names,
// survives renaming, and emphasizes each argument.
doSomething(
    veryDescriptiveArgumentNumberOne,
    veryDescriptiveArgumentTwo,
    tableModelEventHandlerProxy,
    artichokeDescriptorAdapterIterator) {
  // …
}
4.7 Grouping parentheses: recommended
Optional grouping parentheses are omitted only when the author and reviewer agree that there is no reasonable chance that the code will be misinterpreted without them, nor would they have made the code easier to read. It is not reasonable to assume that every reader has the entire operator precedence table memorized.

Do not use unnecessary parentheses around the entire expression following delete, typeof, void, return, throw, case, in, of, or yield.

Parentheses are required for type casts: /** @type {!Foo} */ (foo).

4.8 Comments
This section addresses implementation comments. JSDoc is addressed separately in 7 JSDoc.

4.8.1 Block comment style
Block comments are indented at the same level as the surrounding code. They may be in /* … */ or //-style. For multi-line /* … */ comments, subsequent lines must start with * aligned with the * on the previous line, to make comments obvious with no extra context.

/*
 * This is
 * okay.
 */

// And so
// is this.

/* This is fine, too. */
Comments are not enclosed in boxes drawn with asterisks or other characters.

Do not use JSDoc (/** … */) for implementation comments.

4.8.2 Parameter Name Comments
“Parameter name” comments should be used whenever the value and method name do not sufficiently convey the meaning, and refactoring the method to be clearer is infeasible . Their preferred format is before the value with =:

someFunction(obviousParam, /* shouldRender= */ true, /* name= */ 'hello');
For consistency with surrounding code you may put them after the value without =:

someFunction(obviousParam, true /* shouldRender */, 'hello' /* name */);
5 Language features
JavaScript includes many dubious (and even dangerous) features. This section delineates which features may or may not be used, and any additional constraints on their use.

5.1 Local variable declarations
5.1.1 Use const and let
Declare all local variables with either const or let. Use const by default, unless a variable needs to be reassigned. The var keyword must not be used.

5.1.2 One variable per declaration
Every local variable declaration declares only one variable: declarations such as let a = 1, b = 2; are not used.

5.1.3 Declared when needed, initialized as soon as possible
Local variables are not habitually declared at the start of their containing block or block-like construct. Instead, local variables are declared close to the point they are first used (within reason), to minimize their scope.

5.1.4 Declare types as needed
JSDoc type annotations may be added either on the line above the declaration, or else inline before the variable name if no other JSDoc is present.

Example:

const /** !Array<number> */ data = [];

/**
 * Some description.
 * @type {!Array<number>}
 */
const data = [];
Mixing inline and JSDoc styles is not allowed: the compiler will only process the first JsDoc and the inline annotations will be lost.

/** Some description. */
const /** !Array<number> */ data = [];
Tip: There are many cases where the compiler can infer a templatized type but not its parameters. This is particularly the case when the initializing literal or constructor call does not include any values of the template parameter type (e.g., empty arrays, objects, Maps, or Sets), or if the variable is modified in a closure. Local variable type annotations are particularly helpful in these cases since otherwise the compiler will infer the template parameter as unknown.

5.2 Array literals
5.2.1 Use trailing commas
Include a trailing comma whenever there is a line break between the final element and the closing bracket.

Example:

const values = [
  'first value',
  'second value',
];
5.2.2 Do not use the variadic Array constructor
The constructor is error-prone if arguments are added or removed. Use a literal instead.

Disallowed:

const a1 = new Array(x1, x2, x3);
const a2 = new Array(x1, x2);
const a3 = new Array(x1);
const a4 = new Array();
This works as expected except for the third case: if x1 is a whole number then a3 is an array of size x1 where all elements are undefined. If x1 is any other number, then an exception will be thrown, and if it is anything else then it will be a single-element array.

Instead, write

const a1 = [x1, x2, x3];
const a2 = [x1, x2];
const a3 = [x1];
const a4 = [];
Explicitly allocating an array of a given length using new Array(length) is allowed when appropriate.

5.2.3 Non-numeric properties
Do not define or use non-numeric properties on an array (other than length). Use a Map (or Object) instead.

5.2.4 Destructuring
Array literals may be used on the left-hand side of an assignment to perform destructuring (such as when unpacking multiple values from a single array or iterable). A final rest element may be included (with no space between the ... and the variable name). Elements should be omitted if they are unused.

const [a, b, c, ...rest] = generateResults();
let [, b,, d] = someArray;
Destructuring may also be used for function parameters (note that a parameter name is required but ignored). Always specify [] as the default value if a destructured array parameter is optional, and provide default values on the left hand side:

/** @param {!Array<number>=} param1 */
function optionalDestructuring([a = 4, b = 2] = []) { … };
Disallowed:

function badDestructuring([a, b] = [4, 2]) { … };
Tip: For (un)packing multiple values into a function’s parameter or return, prefer object destructuring to array destructuring when possible, as it allows naming the individual elements and specifying a different type for each.

5.2.5 Spread operator
Array literals may include the spread operator (...) to flatten elements out of one or more other iterables. The spread operator should be used instead of more awkward constructs with Array.prototype. There is no space after the ....

Example:

[...foo]   // preferred over Array.prototype.slice.call(foo)
[...foo, ...bar]   // preferred over foo.concat(bar)
5.3 Object literals
5.3.1 Use trailing commas
Include a trailing comma whenever there is a line break between the final property and the closing brace.

5.3.2 Do not use the Object constructor
While Object does not have the same problems as Array, it is still disallowed for consistency. Use an object literal ({} or {a: 0, b: 1, c: 2}) instead.

5.3.3 Do not mix quoted and unquoted keys
Object literals may represent either structs (with unquoted keys and/or symbols) or dicts (with quoted and/or computed keys). Do not mix these key types in a single object literal.

Disallowed:

{
  width: 42, // struct-style unquoted key
  'maxWidth': 43, // dict-style quoted key
}
This also extends to passing the property name to functions, like hasOwnProperty. In particular, doing so will break in compiled code because the compiler cannot rename/obfuscate the string literal.

Disallowed:

/** @type {{width: number, maxWidth: (number|undefined)}} */
const o = {width: 42};
if (o.hasOwnProperty('maxWidth')) {
  ...
}
This is best implemented as:

/** @type {{width: number, maxWidth: (number|undefined)}} */
const o = {width: 42};
if (o.maxWidth != null) {
  ...
}
5.3.4 Computed property names
Computed property names (e.g., {['key' + foo()]: 42}) are allowed, and are considered dict-style (quoted) keys (i.e., must not be mixed with non-quoted keys) unless the computed property is a symbol (e.g., [Symbol.iterator]). Enum values may also be used for computed keys, but should not be mixed with non-enum keys in the same literal.

5.3.5 Method shorthand
Methods can be defined on object literals using the method shorthand ({method() {… }}) in place of a colon immediately followed by a function or arrow function literal.

Example:

return {
  stuff: 'candy',
  method() {
    return this.stuff;  // Returns 'candy'
  },
};
Note that this in a method shorthand or function refers to the object literal itself whereas this in an arrow function refers to the scope outside the object literal.

Example:

class {
  getObjectLiteral() {
    this.stuff = 'fruit';
    return {
      stuff: 'candy',
      method: () => this.stuff,  // Returns 'fruit'
    };
  }
}
5.3.6 Shorthand properties
Shorthand properties are allowed on object literals.

Example:

const foo = 1;
const bar = 2;
const obj = {
  foo,
  bar,
  method() { return this.foo + this.bar; },
};
assertEquals(3, obj.method());
5.3.7 Destructuring
Object destructuring patterns may be used on the left-hand side of an assignment to perform destructuring and unpack multiple values from a single object.

Destructured objects may also be used as function parameters, but should be kept as simple as possible: a single level of unquoted shorthand properties. Deeper levels of nesting and computed properties may not be used in parameter destructuring. Specify any default values in the left-hand-side of the destructured parameter ({str = 'some default'} = {}, rather than {str} = {str: 'some default'}), and if a destructured object is itself optional, it must default to {}. The JSDoc for the destructured parameter may be given any name (the name is unused but is required by the compiler).

Example:

/**
 * @param {string} ordinary
 * @param {{num: (number|undefined), str: (string|undefined)}=} param1
 *     num: The number of times to do something.
 *     str: A string to do stuff to.
 */
function destructured(ordinary, {num, str = 'some default'} = {})
Disallowed:

/** @param {{x: {num: (number|undefined), str: (string|undefined)}}} param1 */
function nestedTooDeeply({x: {num, str}}) {};
/** @param {{num: (number|undefined), str: (string|undefined)}=} param1 */
function nonShorthandProperty({num: a, str: b} = {}) {};
/** @param {{a: number, b: number}} param1 */
function computedKey({a, b, [a + b]: c}) {};
/** @param {{a: number, b: string}=} param1 */
function nontrivialDefault({a, b} = {a: 2, b: 4}) {};
Destructuring may also be used for goog.require statements, and in this case must not be wrapped: the entire statement occupies one line, regardless of how long it is (see 3.6 goog.require and goog.requireType statements).

5.3.8 Enums
Enumerations are defined by adding the @enum annotation to an object literal. Additional properties may not be added to an enum after it is defined. Enums must be constant, and all enum values must be deeply immutable.

/**
 * Supported temperature scales.
 * @enum {string}
 */
const TemperatureScale = {
  CELSIUS: 'celsius',
  FAHRENHEIT: 'fahrenheit',
};

/**
 * An enum with two options.
 * @enum {number}
 */
const Option = {
  /** The option used shall have been the first. */
  FIRST_OPTION: 1,
  /** The second among two options. */
  SECOND_OPTION: 2,
};
5.4 Classes
5.4.1 Constructors
Constructors are optional. Subclass constructors must call super() before setting any fields or otherwise accessing this. Interfaces should declare non-method properties in the constructor.

5.4.2 Fields
Set all of a concrete object’s fields (i.e. all properties other than methods) in the constructor. Annotate fields that are never reassigned with @const (these need not be deeply immutable). Annotate non-public fields with the proper visibility annotation (@private, @protected, @package), and end all @private fields' names with an underscore. Fields are never set on a concrete class' prototype.

Example:

class Foo {
  constructor() {
    /** @private @const {!Bar} */
    this.bar_ = computeBar();

    /** @protected @const {!Baz} */
    this.baz = computeBaz();
  }
}
Tip: Properties should never be added to or removed from an instance after the constructor is finished, since it significantly hinders VMs’ ability to optimize. If necessary, fields that are initialized later should be explicitly set to undefined in the constructor to prevent later shape changes. Adding @struct to an object will check that undeclared properties are not added/accessed. Classes have this added by default.

5.4.3 Computed properties
Computed properties may only be used in classes when the property is a symbol. Dict-style properties (that is, quoted or computed non-symbol keys, as defined in 5.3.3 Do not mix quoted and unquoted keys) are not allowed. A [Symbol.iterator] method should be defined for any classes that are logically iterable. Beyond this, Symbol should be used sparingly.

Tip: be careful of using any other built-in symbols (e.g., Symbol.isConcatSpreadable) as they are not polyfilled by the compiler and will therefore not work in older browsers.

5.4.4 Static methods
Where it does not interfere with readability, prefer module-local functions over private static methods.

Static methods should only be called on the base class itself. Static methods should not be called on variables containing a dynamic instance that may be either the constructor or a subclass constructor (and must be defined with @nocollapse if this is done), and must not be called directly on a subclass that doesn’t define the method itself.

Disallowed:

class Base { /** @nocollapse */ static foo() {} }
class Sub extends Base {}
function callFoo(cls) { cls.foo(); }  // discouraged: don't call static methods dynamically
Sub.foo();  // Disallowed: don't call static methods on subclasses that don't define it themselves
5.4.5 Old-style class declarations
While ES6 classes are preferred, there are cases where ES6 classes may not be feasible. For example:

If there exist or will exist subclasses, including frameworks that create subclasses, that cannot be immediately changed to use ES6 class syntax. If such a class were to use ES6 syntax, all downstream subclasses not using ES6 class syntax would need to be modified.

Frameworks that require a known this value before calling the superclass constructor, since constructors with ES6 super classes do not have access to the instance this value until the call to super returns.

In all other ways the style guide still applies to this code: let, const, default parameters, rest, and arrow functions should all be used when appropriate.

goog.defineClass allows for a class-like definition similar to ES6 class syntax:

let C = goog.defineClass(S, {
  /**
   * @param {string} value
   */
  constructor(value) {
    S.call(this, 2);
    /** @const */
    this.prop = value;
  },

  /**
   * @param {string} param
   * @return {number}
   */
  method(param) {
    return 0;
  },
});
Alternatively, while goog.defineClass should be preferred for all new code, more traditional syntax is also allowed.

/**
  * @constructor @extends {S}
  * @param {string} value
  */
function C(value) {
  S.call(this, 2);
  /** @const */
  this.prop = value;
}
goog.inherits(C, S);

/**
 * @param {string} param
 * @return {number}
 */
C.prototype.method = function(param) {
  return 0;
};
Per-instance properties should be defined in the constructor after the call to the super class constructor, if there is a super class. Methods should be defined on the prototype of the constructor.

Defining constructor prototype hierarchies correctly is harder than it first appears! For that reason, it is best to use goog.inherits from the Closure Library .

5.4.6 Do not manipulate prototypes directly
The class keyword allows clearer and more readable class definitions than defining prototype properties. Ordinary implementation code has no business manipulating these objects, though they are still useful for defining classes as defined in 5.4.5 Old-style class declarations. Mixins and modifying the prototypes of builtin objects are explicitly forbidden.

Exception: Framework code (such as Polymer, or Angular) may need to use prototypes, and should not resort to even-worse workarounds to avoid doing so.

5.4.7 Getters and Setters
Do not use JavaScript getter and setter properties. They are potentially surprising and difficult to reason about, and have limited support in the compiler. Provide ordinary methods instead.

Exception: there are situations where defining a getter or setter is unavoidable (e.g. data binding frameworks such as Angular and Polymer, or for compatibility with external APIs that cannot be adjusted). In these cases only, getters and setters may be used with caution, provided they are defined with the get and set shorthand method keywords or Object.defineProperties (not Object.defineProperty, which interferes with property renaming). Getters must not change observable state.

Disallowed:

class Foo {
  get next() { return this.nextId++; }
}
5.4.8 Overriding toString
The toString method may be overridden, but must always succeed and never have visible side effects.

Tip: Beware, in particular, of calling other methods from toString, since exceptional conditions could lead to infinite loops.

5.4.9 Interfaces
Interfaces may be declared with @interface or @record. Interfaces declared with @record can be explicitly (i.e. via @implements) or implicitly implemented by a class or object literal.

All non-static method bodies on an interface must be empty blocks. Fields must be declared as uninitialized members in the class constructor.

Example:

/**
 * Something that can frobnicate.
 * @record
 */
class Frobnicator {
  constructor() {
    /** @type {number} The number of attempts before giving up. */
    this.attempts;
  }

  /**
   * Performs the frobnication according to the given strategy.
   * @param {!FrobnicationStrategy} strategy
   */
  frobnicate(strategy) {}
}
5.4.10 Abstract Classes
Use abstract classes when appropriate. Abstract classes and methods must be annotated with @abstract. Do not use goog.abstractMethod. See abstract classes and methods.

5.5 Functions
5.5.1 Top-level functions
Top-level functions may be defined directly on the exports object, or else declared locally and optionally exported. See 3.3.3 goog.module Exports for more on exports.

Examples:

/** @param {string} str */
exports.processString = (str) => {
  // Process the string.
};
/** @param {string} str */
const processString = (str) => {
  // Process the string.
};

exports = {processString};
5.5.2 Nested functions and closures
Functions may contain nested function definitions. If it is useful to give the function a name, it should be assigned to a local const.

5.5.3 Arrow functions
Arrow functions provide a concise function syntax and simplify scoping this for nested functions. Prefer arrow functions over the function keyword, particularly for nested functions (but see 5.3.5 Method shorthand).

Prefer arrow functions over other this scoping approaches such as f.bind(this), goog.bind(f, this), and const self = this. Arrow functions are particularly useful for calling into callbacks as they permit explicitly specifying which parameters to pass to the callback whereas binding will blindly pass along all parameters.

The left-hand side of the arrow contains zero or more parameters. Parentheses around the parameters are optional if there is only a single non-destructured parameter. When parentheses are used, inline parameter types may be specified (see 7.8 Method and function comments).

Tip: Always using parentheses even for single-parameter arrow functions can avoid situations where adding parameters, but forgetting to add parentheses, may result in parseable code which no longer works as intended.

The right-hand side of the arrow contains the body of the function. By default the body is a block statement (zero or more statements surrounded by curly braces). The body may also be an implicitly returned single expression if either: the program logic requires returning a value, or the void operator precedes a single function or method call (using void ensures undefined is returned, prevents leaking values, and communicates intent). The single expression form is preferred if it improves readability (e.g., for short or simple expressions).

Examples:

/**
 * Arrow functions can be documented just like normal functions.
 * @param {number} numParam A number to add.
 * @param {string} strParam Another number to add that happens to be a string.
 * @return {number} The sum of the two parameters.
 */
const moduleLocalFunc = (numParam, strParam) => numParam + Number(strParam);

// Uses the single expression syntax with `void` because the program logic does
// not require returning a value.
getValue((result) => void alert(`Got ${result}`));

class CallbackExample {
  constructor() {
    /** @private {number} */
    this.cachedValue_ = 0;

    // For inline callbacks, you can use inline typing for parameters.
    // Uses a block statement because the value of the single expression should
    // not be returned and the expression is not a single function call.
    getNullableValue((/** ?number */ result) => {
      this.cachedValue_ = result == null ? 0 : result;
    });
  }
}
Disallowed:

/**
 * A function with no params and no returned value.
 * This single expression body usage is illegal because the program logic does
 * not require returning a value and we're missing the `void` operator.
 */
const moduleLocalFunc = () => anotherFunction();
5.5.4 Generators
Generators enable a number of useful abstractions and may be used as needed.

When defining generator functions, attach the * to the function keyword when present, and separate it with a space from the name of the function. When using delegating yields, attach the * to the yield keyword.

Example:

/** @return {!Iterator<number>} */
function* gen1() {
  yield 42;
}

/** @return {!Iterator<number>} */
const gen2 = function*() {
  yield* gen1();
}

class SomeClass {
  /** @return {!Iterator<number>} */
  * gen() {
    yield 42;
  }
}
5.5.5 Parameter and return types
Function parameters and return types should usually be documented with JSDoc annotations. See 7.8 Method and function comments for more information.

5.5.5.1 Default parameters
Optional parameters are permitted using the equals operator in the parameter list. Optional parameters must include spaces on both sides of the equals operator, be named exactly like required parameters (i.e., not prefixed with opt_), use the = suffix in their JSDoc type, come after required parameters, and not use initializers that produce observable side effects. All optional parameters for concrete functions must have default values, even if that value is undefined. In contrast to concrete functions, abstract and interface methods must omit default parameter values.

Example:

/**
 * @param {string} required This parameter is always needed.
 * @param {string=} optional This parameter can be omitted.
 * @param {!Node=} node Another optional parameter.
 */
function maybeDoSomething(required, optional = '', node = undefined) {}

/** @interface */
class MyInterface {
  /**
   * Interface and abstract methods must omit default parameter values.
   * @param {string=} optional
   */
  someMethod(optional) {}
}
Use default parameters sparingly. Prefer destructuring (as in 5.3.7 Destructuring) to create readable APIs when there are more than a small handful of optional parameters that do not have a natural order.

Note: Unlike Python's default parameters, it is okay to use initializers that return new mutable objects (such as {} or []) because the initializer is evaluated each time the default value is used, so a single object won't be shared across invocations.

Tip: While arbitrary expressions including function calls may be used as initializers, these should be kept as simple as possible. Avoid initializers that expose shared mutable state, as that can easily introduce unintended coupling between function calls.

5.5.5.2 Rest parameters
Use a rest parameter instead of accessing arguments. Rest parameters are typed with a ... prefix in their JSDoc. The rest parameter must be the last parameter in the list. There is no space between the ... and the parameter name. Do not name the rest parameter var_args. Never name a local variable or parameter arguments, which confusingly shadows the built-in name.

Example:

/**
 * @param {!Array<string>} array This is an ordinary parameter.
 * @param {...number} numbers The remainder of arguments are all numbers.
 */
function variadic(array, ...numbers) {}
5.5.6 Generics
Declare generic functions and methods when necessary with @template TYPE in the JSDoc above the function or method definition.

5.5.7 Spread operator
Function calls may use the spread operator (...). Prefer the spread operator to Function.prototype.apply when an array or iterable is unpacked into multiple parameters of a variadic function. There is no space after the ....

Example:

function myFunction(...elements) {}
myFunction(...array, ...iterable, ...generator());
5.6 String literals
5.6.1 Use single quotes
Ordinary string literals are delimited with single quotes ('), rather than double quotes (").

Tip: if a string contains a single quote character, consider using a template string to avoid having to escape the quote.

Ordinary string literals may not span multiple lines.

5.6.2 Template literals
Use template literals (delimited with `) over complex string concatenation, particularly if multiple string literals are involved. Template literals may span multiple lines.

If a template literal spans multiple lines, it does not need to follow the indentation of the enclosing block, though it may if the added whitespace does not matter.

Example:

function arithmetic(a, b) {
  return `Here is a table of arithmetic operations:
${a} + ${b} = ${a + b}
${a} - ${b} = ${a - b}
${a} * ${b} = ${a * b}
${a} / ${b} = ${a / b}`;
}
5.6.3 No line continuations
Do not use line continuations (that is, ending a line inside a string literal with a backslash) in either ordinary or template string literals. Even though ES5 allows this, it can lead to tricky errors if any trailing whitespace comes after the slash, and is less obvious to readers.

Disallowed:

const longString = 'This is a very long string that far exceeds the 80 \
    column limit. It unfortunately contains long stretches of spaces due \
    to how the continued lines are indented.';
Instead, write

const longString = 'This is a very long string that far exceeds the 80 ' +
    'column limit. It does not contain long stretches of spaces since ' +
    'the concatenated strings are cleaner.';
5.7 Number literals
Numbers may be specified in decimal, hex, octal, or binary. Use exactly 0x, 0o, and 0b prefixes, with lowercase letters, for hex, octal, and binary, respectively. Never include a leading zero unless it is immediately followed by x, o, or b.

5.8 Control structures
5.8.1 For loops
With ES6, the language now has three different kinds of for loops. All may be used, though for-of loops should be preferred when possible.

for-in loops may only be used on dict-style objects (see 5.3.3 Do not mix quoted and unquoted keys), and should not be used to iterate over an array. Object.prototype.hasOwnProperty should be used in for-in loops to exclude unwanted prototype properties. Prefer for-of and Object.keys over for-in when possible.

5.8.2 Exceptions
Exceptions are an important part of the language and should be used whenever exceptional cases occur. Always throw Errors or subclasses of Error: never throw string literals or other objects. Always use new when constructing an Error.

This treatment extends to Promise rejection values as Promise.reject(obj) is equivalent to throw obj; in async functions.

Custom exceptions provide a great way to convey additional error information from functions. They should be defined and used wherever the native Error type is insufficient.

Prefer throwing exceptions over ad-hoc error-handling approaches (such as passing an error container reference type, or returning an object with an error property).

5.8.2.1 Empty catch blocks
It is very rarely correct to do nothing in response to a caught exception. When it truly is appropriate to take no action whatsoever in a catch block, the reason this is justified is explained in a comment.

try {
  return handleNumericResponse(response);
} catch (ok) {
  // it's not numeric; that's fine, just continue
}
return handleTextResponse(response);
Disallowed:

  try {
    shouldFail();
    fail('expected an error');
  } catch (expected) {
  }
Tip: Unlike in some other languages, patterns like the above simply don’t work since this will catch the error thrown by fail. Use assertThrows() instead.

5.8.3 Switch statements
Terminology Note: Inside the braces of a switch block are one or more statement groups. Each statement group consists of one or more switch labels (either case FOO: or default:), followed by one or more statements.

5.8.3.1 Fall-through: commented
Within a switch block, each statement group either terminates abruptly (with a break, return or thrown exception), or is marked with a comment to indicate that execution will or might continue into the next statement group. Any comment that communicates the idea of fall-through is sufficient (typically // fall through). This special comment is not required in the last statement group of the switch block.

Example:

switch (input) {
  case 1:
  case 2:
    prepareOneOrTwo();
  // fall through
  case 3:
    handleOneTwoOrThree();
    break;
  default:
    handleLargeNumber(input);
}
5.8.3.2 The default case is present
Each switch statement includes a default statement group, even if it contains no code. The default statement group must be last.

5.9 this
Only use this in class constructors and methods, in arrow functions defined within class constructors and methods, or in functions that have an explicit @this declared in the immediately-enclosing function’s JSDoc.

Never use this to refer to the global object, the context of an eval, the target of an event, or unnecessarily call()ed or apply()ed functions.

5.10 Equality Checks
Use identity operators (===/!==) except in the cases documented below.

5.10.1 Exceptions Where Coercion is Desirable
Catching both null and undefined values:

if (someObjectOrPrimitive == null) {
  // Checking for null catches both null and undefined for objects and
  // primitives, but does not catch other falsy values like 0 or the empty
  // string.
}
5.11 Disallowed features
5.11.1 with
Do not use the with keyword. It makes your code harder to understand and has been banned in strict mode since ES5.

5.11.2 Dynamic code evaluation
Do not use eval or the Function(...string) constructor (except for code loaders). These features are potentially dangerous and simply do not work in CSP environments.

5.11.3 Automatic semicolon insertion
Always terminate statements with semicolons (except function and class declarations, as noted above).

5.11.4 Non-standard features
Do not use non-standard features. This includes old features that have been removed (e.g., WeakMap.clear), new features that are not yet standardized (e.g., the current TC39 working draft, proposals at any stage, or proposed but not-yet-complete web standards), or proprietary features that are only implemented in some browsers. Use only features defined in the current ECMA-262 or WHATWG standards. (Note that projects writing against specific APIs, such as Chrome extensions or Node.js, can obviously use those APIs). Non-standard language “extensions” (such as those provided by some external transpilers) are forbidden.

5.11.5 Wrapper objects for primitive types
Never use new on the primitive object wrappers (Boolean, Number, String, Symbol), nor include them in type annotations.

Disallowed:

const /** Boolean */ x = new Boolean(false);
if (x) alert(typeof x);  // alerts 'object' - WAT?
The wrappers may be called as functions for coercing (which is preferred over using + or concatenating the empty string) or creating symbols.

Example:

const /** boolean */ x = Boolean(0);
if (!x) alert(typeof x);  // alerts 'boolean', as expected
5.11.6 Modifying builtin objects
Never modify builtin types, either by adding methods to their constructors or to their prototypes. Avoid depending on libraries that do this. Note that the JSCompiler’s runtime library will provide standards-compliant polyfills where possible; nothing else may modify builtin objects.

Do not add symbols to the global object unless absolutely necessary (e.g. required by a third-party API).

5.11.7 Omitting () when invoking a constructor
Never invoke a constructor in a new statement without using parentheses ().

Disallowed:

new Foo;
Use instead:

new Foo();
Omitting parentheses can lead to subtle mistakes. These two lines are not equivalent:

new Foo().Bar();
new Foo.Bar();
6 Naming
6.1 Rules common to all identifiers
Identifiers use only ASCII letters and digits, and, in a small number of cases noted below, underscores and very rarely (when required by frameworks like Angular) dollar signs.

Give as descriptive a name as possible, within reason. Do not worry about saving horizontal space as it is far more important to make your code immediately understandable by a new reader. Do not use abbreviations that are ambiguous or unfamiliar to readers outside your project, and do not abbreviate by deleting letters within a word.

errorCount          // No abbreviation.
dnsConnectionIndex  // Most people know what "DNS" stands for.
referrerUrl         // Ditto for "URL".
customerId          // "Id" is both ubiquitous and unlikely to be misunderstood.
Disallowed:

n                   // Meaningless.
nErr                // Ambiguous abbreviation.
nCompConns          // Ambiguous abbreviation.
wgcConnections      // Only your group knows what this stands for.
pcReader            // Lots of things can be abbreviated "pc".
cstmrId             // Deletes internal letters.
kSecondsPerDay      // Do not use Hungarian notation.
6.2 Rules by identifier type
6.2.1 Package names
Package names are all lowerCamelCase. For example, my.exampleCode.deepSpace, but not my.examplecode.deepspace or my.example_code.deep_space.

6.2.2 Class names
Class, interface, record, and typedef names are written in UpperCamelCase. Unexported classes are simply locals: they are not marked @private and therefore are not named with a trailing underscore.

Type names are typically nouns or noun phrases. For example, Request, ImmutableList, or VisibilityMode. Additionally, interface names may sometimes be adjectives or adjective phrases instead (for example, Readable).

6.2.3 Method names
Method names are written in lowerCamelCase. Names for @private methods must end with a trailing underscore.

Method names are typically verbs or verb phrases. For example, sendMessage or stop_. Getter and setter methods for properties are never required, but if they are used they should be named getFoo (or optionally isFoo or hasFoo for booleans), or setFoo(value) for setters.

Underscores may also appear in JsUnit test method names to separate logical components of the name. One typical pattern is test<MethodUnderTest>_<state>_<expectedOutcome>, for example testPop_emptyStack_throws. There is no One Correct Way to name test methods.

6.2.4 Enum names
Enum names are written in UpperCamelCase, similar to classes, and should generally be singular nouns. Individual items within the enum are named in CONSTANT_CASE.

6.2.5 Constant names
Constant names use CONSTANT_CASE: all uppercase letters, with words separated by underscores. There is no reason for a constant to be named with a trailing underscore, since private static properties can be replaced by (implicitly private) module locals.

6.2.5.1 Definition of “constant”
Every constant is a @const static property or a module-local const declaration, but not all @const static properties and module-local consts are constants. Before choosing constant case, consider whether the field really feels like a deeply immutable constant. For example, if any of that instance's observable state can change, it is almost certainly not a constant. Merely intending to never mutate the object is generally not enough.

Examples:

// Constants
const NUMBER = 5;
/** @const */ exports.NAMES = ImmutableList.of('Ed', 'Ann');
/** @enum */ exports.SomeEnum = { ENUM_CONSTANT: 'value' };

// Not constants
let letVariable = 'non-const';
class MyClass { constructor() { /** @const {string} */ this.nonStatic = 'non-static'; } };
/** @type {string} */ MyClass.staticButMutable = 'not @const, can be reassigned';
const /** Set<string> */ mutableCollection = new Set();
const /** ImmutableSet<SomeMutableType> */ mutableElements = ImmutableSet.of(mutable);
const Foo = goog.require('my.Foo');  // mirrors imported name
const logger = log.getLogger('loggers.are.not.immutable');
Constants’ names are typically nouns or noun phrases.

6.2.5.2 Local aliases
Local aliases should be used whenever they improve readability over fully-qualified names. Follow the same rules as goog.requires (3.6 goog.require and goog.requireType statements), maintaining the last part of the aliased name. Aliases may also be used within functions. Aliases must be const.

Examples:

const staticHelper = importedNamespace.staticHelper;
const CONSTANT_NAME = ImportedClass.CONSTANT_NAME;
const {assert, assertInstanceof} = asserts;
6.2.6 Non-constant field names
Non-constant field names (static or otherwise) are written in lowerCamelCase, with a trailing underscore for private fields.

These names are typically nouns or noun phrases. For example, computedValues or index_.

6.2.7 Parameter names
Parameter names are written in lowerCamelCase. Note that this applies even if the parameter expects a constructor.

One-character parameter names should not be used in public methods.

Exception: When required by a third-party framework, parameter names may begin with a $. This exception does not apply to any other identifiers (e.g. local variables or properties).

6.2.8 Local variable names
Local variable names are written in lowerCamelCase, except for module-local (top-level) constants, as described above. Constants in function scopes are still named in lowerCamelCase. Note that lowerCamelCase is used even if the variable holds a constructor.

6.2.9 Template parameter names
Template parameter names should be concise, single-word or single-letter identifiers, and must be all-caps, such as TYPE or THIS.

6.2.10 Module-local names
Module-local names that are not exported are implicitly private. They are not marked @private and do not end in an underscore. This applies to classes, functions, variables, constants, enums, and other module-local identifiers.

6.3 Camel case: defined
Sometimes there is more than one reasonable way to convert an English phrase into camel case, such as when acronyms or unusual constructs like IPv6 or iOS are present. To improve predictability, Google Style specifies the following (nearly) deterministic scheme.

Beginning with the prose form of the name:

Convert the phrase to plain ASCII and remove any apostrophes. For example, Müller's algorithm might become Muellers algorithm.
Divide this result into words, splitting on spaces and any remaining punctuation (typically hyphens).
Recommended: if any word already has a conventional camel case appearance in common usage, split this into its constituent parts (e.g., AdWords becomes ad words). Note that a word such as iOS is not really in camel case per se; it defies any convention, so this recommendation does not apply.
Now lowercase everything (including acronyms), then uppercase only the first character of:
… each word, to yield upper camel case, or
… each word except the first, to yield lower camel case
Finally, join all the words into a single identifier.
Note that the casing of the original words is almost entirely disregarded.

Examples:

Prose form	Correct	Incorrect
XML HTTP request	XmlHttpRequest	XMLHTTPRequest
new customer ID	newCustomerId	newCustomerID
inner stopwatch	innerStopwatch	innerStopWatch
supports IPv6 on iOS?	supportsIpv6OnIos	supportsIPv6OnIOS
YouTube importer	YouTubeImporter	YoutubeImporter*
*Acceptable, but not recommended.

Note: Some words are ambiguously hyphenated in the English language: for example nonempty and non-empty are both correct, so the method names checkNonempty and checkNonEmpty are likewise both correct.

7 JSDoc
JSDoc is used on all classes, fields, and methods.

7.1 General form
The basic formatting of JSDoc blocks is as seen in this example:

/**
 * Multiple lines of JSDoc text are written here,
 * wrapped normally.
 * @param {number} arg A number to do something to.
 */
function doSomething(arg) { … }
or in this single-line example:

/** @const @private {!Foo} A short bit of JSDoc. */
this.foo_ = foo;
If a single-line comment overflows into multiple lines, it must use the multi-line style with /** and */ on their own lines.

Many tools extract metadata from JSDoc comments to perform code validation and optimization. As such, these comments must be well-formed.

7.2 Markdown
JSDoc is written in Markdown, though it may include HTML when necessary.

Note that tools that automatically extract JSDoc (e.g. JsDossier) will often ignore plain text formatting, so if you did this:

/**
 * Computes weight based on three factors:
 *   items sent
 *   items received
 *   last timestamp
 */
it would come out like this:

Computes weight based on three factors: items sent items received last timestamp
Instead, write a Markdown list:

/**
 * Computes weight based on three factors:
 *
 *  - items sent
 *  - items received
 *  - last timestamp
 */
7.3 JSDoc tags
Google style allows a subset of JSDoc tags. See 9.1 JSDoc tag reference for the complete list. Most tags must occupy their own line, with the tag at the beginning of the line.

Disallowed:

/**
 * The "param" tag must occupy its own line and may not be combined.
 * @param {number} left @param {number} right
 */
function add(left, right) { ... }
Simple tags that do not require any additional data (such as @private, @const, @final, @export) may be combined onto the same line, along with an optional type when appropriate.

/**
 * Place more complex annotations (like "implements" and "template")
 * on their own lines.  Multiple simple tags (like "export" and "final")
 * may be combined in one line.
 * @export @final
 * @implements {Iterable<TYPE>}
 * @template TYPE
 */
class MyClass {
  /**
   * @param {!ObjType} obj Some object.
   * @param {number=} num An optional number.
   */
  constructor(obj, num = 42) {
    /** @private @const {!Array<!ObjType|number>} */
    this.data_ = [obj, num];
  }
}
There is no hard rule for when to combine tags, or in which order, but be consistent.

For general information about annotating types in JavaScript see Annotating JavaScript for the Closure Compiler and Types in the Closure Type System.

7.4 Line wrapping
Line-wrapped block tags are indented four spaces. Wrapped description text may be lined up with the description on previous lines, but this horizontal alignment is discouraged.

/**
 * Illustrates line wrapping for long param/return descriptions.
 * @param {string} foo This is a param with a description too long to fit in
 *     one line.
 * @return {number} This returns something that has a description too long to
 *     fit in one line.
 */
exports.method = function(foo) {
  return 5;
};
Do not indent when wrapping a @desc or @fileoverview description.

7.5 Top/file-level comments
A file may have a top-level file overview. A copyright notice , author information, and default visibility level are optional. File overviews are generally recommended whenever a file consists of more than a single class definition. The top level comment is designed to orient readers unfamiliar with the code to what is in this file. If present, it may provide a description of the file's contents and any dependencies or compatibility information. Wrapped lines are not indented.

Example:

/**
 * @fileoverview Description of file, its uses and information
 * about its dependencies.
 * @package
 */
7.6 Class comments
Classes, interfaces and records must be documented with a description and any template parameters, implemented interfaces, visibility, or other appropriate tags. The class description should provide the reader with enough information to know how and when to use the class, as well as any additional considerations necessary to correctly use the class. Textual descriptions may be omitted on the constructor. @constructor and @extends annotations are not used with the class keyword unless the class is being used to declare an @interface or it extends a generic class.

/**
 * A fancier event target that does cool things.
 * @implements {Iterable<string>}
 */
class MyFancyTarget extends EventTarget {
  /**
   * @param {string} arg1 An argument that makes this more interesting.
   * @param {!Array<number>} arg2 List of numbers to be processed.
   */
  constructor(arg1, arg2) {
    // ...
  }
};

/**
 * Records are also helpful.
 * @extends {Iterator<TYPE>}
 * @record
 * @template TYPE
 */
class Listable {
  /** @return {TYPE} The next item in line to be returned. */
  next() {}
}
7.7 Enum and typedef comments
All enums and typedefs must be documented with appropriate JSDoc tags (@typedef or @enum) on the preceding line. Public enums and typedefs must also have a description. Individual enum items may be documented with a JSDoc comment on the preceding line.

/**
 * A useful type union, which is reused often.
 * @typedef {!Bandersnatch|!BandersnatchType}
 */
let CoolUnionType;


/**
 * Types of bandersnatches.
 * @enum {string}
 */
const BandersnatchType = {
  /** This kind is really frumious. */
  FRUMIOUS: 'frumious',
  /** The less-frumious kind. */
  MANXOME: 'manxome',
};
Typedefs are useful for defining short record types, or aliases for unions, complex functions, or generic types. Typedefs should be avoided for record types with many fields, since they do not allow documenting individual fields, nor using templates or recursive references. For large record types, prefer @record.

7.8 Method and function comments
In methods and named functions, parameter and return types must be documented, except in the case of same-signature @overrides, where all types are omitted. The this type should be documented when necessary. Return type may be omitted if the function has no non-empty return statements.

Method, parameter, and return descriptions (but not types) may be omitted if they are obvious from the rest of the method’s JSDoc or from its signature.

Method descriptions begin with a verb phrase that describes what the method does. This phrase is not an imperative sentence, but instead is written in the third person, as if there is an implied This method ... before it.

If a method overrides a superclass method, it must include an @override annotation. Overridden methods inherit all JSDoc annotations from the super class method (including visibility annotations) and they should be omitted in the overridden method. However, if any type is refined in type annotations, all @param and @return annotations must be specified explicitly.

/** A class that does something. */
class SomeClass extends SomeBaseClass {
  /**
   * Operates on an instance of MyClass and returns something.
   * @param {!MyClass} obj An object that for some reason needs detailed
   *     explanation that spans multiple lines.
   * @param {!OtherClass} obviousOtherClass
   * @return {boolean} Whether something occurred.
   */
  someMethod(obj, obviousOtherClass) { ... }

  /** @override */
  overriddenMethod(param) { ... }
}

/**
 * Demonstrates how top-level functions follow the same rules.  This one
 * makes an array.
 * @param {TYPE} arg
 * @return {!Array<TYPE>}
 * @template TYPE
 */
function makeArray(arg) { ... }
If you only need to document the param and return types of a function, you may optionally use inline JSDocs in the function's signature. These inline JSDocs specify the return and param types without tags.

function /** string */ foo(/** number */ arg) {...}
If you need descriptions or tags, use a single JSDoc comment above the method. For example, methods which return values need a @return tag.

class MyClass {
  /**
   * @param {number} arg
   * @return {string}
   */
  bar(arg) {...}
}
// Illegal inline JSDocs.

class MyClass {
  /** @return {string} */ foo() {...}
}

/** Function description. */ bar() {...}
In anonymous functions annotations are generally optional. If the automatic type inference is insufficient or explicit annotation improves readability, then annotate param and return types like this:

promise.then(
    /** @return {string} */
    (/** !Array<string> */ items) => {
      doSomethingWith(items);
      return items[0];
    });
For function type expressions, see 7.10.4 Function type expressions.

7.9 Property comments
Property types must be documented. The description may be omitted for private properties, if name and type provide enough documentation for understanding the code.

Publicly exported constants are commented the same way as properties.

/** My class. */
class MyClass {
  /** @param {string=} someString */
  constructor(someString = 'default string') {
    /** @private @const {string} */
    this.someString_ = someString;

    /** @private @const {!OtherType} */
    this.someOtherThing_ = functionThatReturnsAThing();

    /**
     * Maximum number of things per pane.
     * @type {number}
     */
    this.someProperty = 4;
  }
}

/**
 * The number of times we'll try before giving up.
 * @const {number}
 */
MyClass.RETRY_COUNT = 33;
7.10 Type annotations
Type annotations are found on @param, @return, @this, and @type tags, and optionally on @const, @export, and any visibility tags. Type annotations attached to JSDoc tags must always be enclosed in braces.

7.10.1 Nullability
The type system defines modifiers ! and ? for non-null and nullable, respectively. These modifiers must precede the type.

Nullability modifiers have different requirements for different types, which fall into two broad categories:

Type annotations for primitives (string, number, boolean, symbol, undefined, null) and literals ({function(...): ...} and {{foo: string...}}) are always non-nullable by default. Use the ? modifier to make it nullable, but omit the redundant !.
Reference types (generally, anything in UpperCamelCase, including some.namespace.ReferenceType) refer to a class, enum, record, or typedef defined elsewhere. Since these types may or may not be nullable, it is impossible to tell from the name alone whether it is nullable or not. Always use explicit ? and ! modifiers for these types to prevent ambiguity at use sites.
Bad:

const /** MyObject */ myObject = null; // Non-primitive types must be annotated.
const /** !number */ someNum = 5; // Primitives are non-nullable by default.
const /** number? */ someNullableNum = null; // ? should precede the type.
const /** !{foo: string, bar: number} */ record = ...; // Already non-nullable.
const /** MyTypeDef */ def = ...; // Not sure if MyTypeDef is nullable.

// Not sure if object (nullable), enum (non-nullable, unless otherwise
// specified), or typedef (depends on definition).
const /** SomeCamelCaseName */ n = ...;
Good:

const /** ?MyObject */ myObject = null;
const /** number */ someNum = 5;
const /** ?number */ someNullableNum = null;
const /** {foo: string, bar: number} */ record = ...;
const /** !MyTypeDef */ def = ...;
const /** ?SomeCamelCaseName */ n = ...;
7.10.2 Type Casts
In cases where the compiler doesn't accurately infer the type of an expression, and the assertion functions in goog.asserts cannot remedy it , it is possible to tighten the type by adding a type annotation comment and enclosing the expression in parentheses. Note that the parentheses are required.

/** @type {number} */ (x)
7.10.3 Template Parameter Types
Always specify template parameters. This way compiler can do a better job and it makes it easier for readers to understand what code does.

Bad:

const /** !Object */ users = {};
const /** !Array */ books = [];
const /** !Promise */ response = ...;
Good:

const /** !Object<string, !User> */ users = {};
const /** !Array<string> */ books = [];
const /** !Promise<!Response> */ response = ...;

const /** !Promise<undefined> */ thisPromiseReturnsNothingButParameterIsStillUseful = ...;
const /** !Object<string, *> */ mapOfEverything = {};
Cases when template parameters should not be used:

Object is used for type hierarchy and not as map-like structure.
7.10.4 Function type expressions
Terminology Note: function type expression refers to a type annotation for function types with the keyword function in the annotation (see examples below).

Where the function definition is given, do not use a function type expression. Specify parameter and return types with @param and @return, or with inline annotations (see 7.8 Method and function comments). This includes anonymous functions and functions defined and assigned to a const (where the function jsdoc appears above the whole assignment expression).

Function type expressions are needed, for example, inside @typedef, @param or @return. Use it also for variables or properties of function type, if they are not immediately initialized with the function definition.

  /** @private {function(string): string} */
  this.idGenerator_ = googFunctions.identity;
When using a function type expression, always specify the return type explicitly. Otherwise the default return type is unknown (?), which leads to strange and unexpected behavior, and is rarely what is actually desired.

Bad - type error, but no warning given:

/** @param {function()} generateNumber */
function foo(generateNumber) {
  const /** number */ x = generateNumber();  // No compile-time type error here.
}

foo(() => 'clearly not a number');
Good:

/**
 * @param {function(): *} inputFunction1 Can return any type.
 * @param {function(): undefined} inputFunction2 Definitely doesn't return
 *      anything.
 * NOTE: the return type of `foo` itself is safely implied to be {undefined}.
 */
function foo(inputFunction1, inputFunction2) {...}
7.10.5 Whitespace
Within a type annotation, a single space or line break is required after each comma or colon. Additional line breaks may be inserted to improve readability or avoid exceeding the column limit. These breaks should be chosen and indented following the applicable guidelines (e.g. 4.5 Line-wrapping and 4.2 Block indentation: +2 spaces). No other whitespace is allowed in type annotations.

Good:

/** @type {function(string): number} */

/** @type {{foo: number, bar: number}} */

/** @type {number|string} */

/** @type {!Object<string, string>} */

/** @type {function(this: Object<string, string>, number): string} */

/**
 * @type {function(
 *     !SuperDuperReallyReallyLongTypedefThatForcesTheLineBreak,
 *     !OtherVeryLongTypedef): string}
 */

/**
 * @type {!SuperDuperReallyReallyLongTypedefThatForcesTheLineBreak|
 *     !OtherVeryLongTypedef}
 */
Bad:

// Only put a space after the colon
/** @type {function(string) : number} */

// Put spaces after colons and commas
/** @type {{foo:number,bar:number}} */

// No space in union types
/** @type {number | string} */
7.11 Visibility annotations
Visibility annotations (@private, @package, @protected) may be specified in a @fileoverview block, or on any exported symbol or property. Do not specify visibility for local variables, whether within a function or at the top level of a module. All @private names must end with an underscore.

8 Policies
8.1 Issues unspecified by Google Style: Be Consistent!
For any style question that isn't settled definitively by this specification, prefer to do what the other code in the same file is already doing. If that doesn't resolve the question, consider emulating the other files in the same package.

8.2 Compiler warnings
8.2.1 Use a standard warning set
As far as possible projects should use --warning_level=VERBOSE.

8.2.2 How to handle a warning
Before doing anything, make sure you understand exactly what the warning is telling you. If you're not positive why a warning is appearing, ask for help .

Once you understand the warning, attempt the following solutions in order:

First, fix it or work around it. Make a strong attempt to actually address the warning, or find another way to accomplish the task that avoids the situation entirely.
Otherwise, determine if it's a false alarm. If you are convinced that the warning is invalid and that the code is actually safe and correct, add a comment to convince the reader of this fact and apply the @suppress annotation.
Otherwise, leave a TODO comment. This is a last resort. If you do this, do not suppress the warning. The warning should be visible until it can be taken care of properly.
8.2.3 Suppress a warning at the narrowest reasonable scope
Warnings are suppressed at the narrowest reasonable scope, usually that of a single local variable or very small method. Often a variable or method is extracted for that reason alone.

Example

/** @suppress {uselessCode} Unrecognized 'use asm' declaration */
function fn() {
  'use asm';
  return 0;
}
Even a large number of suppressions in a class is still better than blinding the entire class to this type of warning.

8.3 Deprecation
Mark deprecated methods, classes or interfaces with @deprecated annotations. A deprecation comment must include simple, clear directions for people to fix their call sites.

8.4 Code not in Google Style
You will occasionally encounter files in your codebase that are not in proper Google Style. These may have come from an acquisition, or may have been written before Google Style took a position on some issue, or may be in non-Google Style for any other reason.

8.4.1 Reformatting existing code
When updating the style of existing code, follow these guidelines.

It is not required to change all existing code to meet current style guidelines. Reformatting existing code is a trade-off between code churn and consistency. Style rules evolve over time and these kinds of tweaks to maintain compliance would create unnecessary churn. However, if significant changes are being made to a file it is expected that the file will be in Google Style.
Be careful not to allow opportunistic style fixes to muddle the focus of a CL. If you find yourself making a lot of style changes that aren’t critical to the central focus of a CL, promote those changes to a separate CL.
8.4.2 Newly added code: use Google Style
Brand new files use Google Style, regardless of the style choices of other files in the same package.

When adding new code to a file that is not in Google Style, reformatting the existing code first is recommended, subject to the advice in 8.4.1 Reformatting existing code.

If this reformatting is not done, then new code should be as consistent as possible with existing code in the same file, but must not violate the style guide.

8.5 Local style rules
Teams and projects may adopt additional style rules beyond those in this document, but must accept that cleanup changes may not abide by these additional rules, and must not block such cleanup changes due to violating any additional rules. Beware of excessive rules which serve no purpose. The style guide does not seek to define style in every possible scenario and neither should you.

8.6 Generated code: mostly exempt
Source code generated by the build process is not required to be in Google Style. However, any generated identifiers that will be referenced from hand-written source code must follow the naming requirements. As a special exception, such identifiers are allowed to contain underscores, which may help to avoid conflicts with hand-written identifiers.

9 Appendices
9.1 JSDoc tag reference
JSDoc serves multiple purposes in JavaScript. In addition to being used to generate documentation it is also used to control tooling. The best known are the Closure Compiler type annotations.

9.1.1 Type annotations and other Closure Compiler annotations
Documentation for JSDoc used by the Closure Compiler is described in Annotating JavaScript for the Closure Compiler and Types in the Closure Type System.

9.1.2 Documentation annotations
In addition to the JSDoc described in Annotating JavaScript for the Closure Compiler the following tags are common and well supported by various documentation generation tools (such as JsDossier) for purely documentation purposes.

You may also see other types of JSDoc annotations in third-party code. These annotations appear in the JSDoc Toolkit Tag Reference but are not considered part of valid Google style.

9.1.2.1 @author or @owner - Not recommended.
Not recommended.

Syntax: @author username@google.com (First Last)

/**
 * @fileoverview Utilities for handling textareas.
 * @author kuth@google.com (Uthur Pendragon)
 */
Documents the author of a file or the owner of a test, generally only used in the @fileoverview comment. The @owner tag is used by the unit test dashboard to determine who owns the test results.

9.1.2.2 @bug
Syntax: @bug bugnumber

/** @bug 1234567 */
function testSomething() {
  // …
}

/**
 * @bug 1234568
 * @bug 1234569
 */
function testTwoBugs() {
  // …
}
Indicates what bugs the given test function regression tests.

Multiple bugs should each have their own @bug line, to make searching for regression tests as easy as possible.

9.1.2.3 @code - Deprecated. Do not use.
Deprecated. Do not use. Use Markdown backticks instead.

Syntax: {@code ...}

Historically, `BatchItem` was written as {@code BatchItem}.

/** Processes pending `BatchItem` instances. */
function processBatchItems() {}
Indicates that a term in a JSDoc description is code so it may be correctly formatted in generated documentation.

9.1.2.4 @desc
Syntax: @desc Message description

/** @desc Notifying a user that their account has been created. */
exports.MSG_ACCOUNT_CREATED = goog.getMsg(
    'Your account has been successfully created.');
9.1.2.5 @link
Syntax: {@link ...}

This tag is used to generate cross-reference links within generated documentation.

/** Processes pending {@link BatchItem} instances. */
function processBatchItems() {}
Historical note: @link tags have also been used to create external links in generated documentation. For external links, always use Markdown's link syntax instead:

/**
 * This class implements a useful subset of the
 * [native Event interface](https://dom.spec.whatwg.org/#event).
 */
class ApplicationEvent {}
9.1.2.6 @see
Syntax: @see Link

/**
 * Adds a single item, recklessly.
 * @see #addSafely
 * @see goog.Collect
 * @see goog.RecklessAdder#add
 */
Reference a lookup to another class function or method.

9.1.2.7 @supported
Syntax: @supported Description

/**
 * @fileoverview Event Manager
 * Provides an abstracted interface to the browsers' event systems.
 * @supported IE10+, Chrome, Safari
 */
Used in a fileoverview to indicate what browsers are supported by the file.

9.1.3 Framework specific annotations
The following annotations are specific to a particular framework.

9.1.3.1 @ngInject for Angular 1
9.1.3.2 @polymerBehavior for Polymer
https://github.com/google/closure-compiler/wiki/Polymer-Pass

9.1.4 Notes about standard Closure Compiler annotations
The following tags used to be standard but are now deprecated.

9.1.4.1 @expose - Deprecated. Do not use.
Deprecated. Do not use. Use @export and/or @nocollapse instead.

9.1.4.2 @inheritDoc - Deprecated. Do not use.
Deprecated. Do not use. Use @override instead.

9.2 Commonly misunderstood style rules
Here is a collection of lesser-known or commonly misunderstood facts about Google Style for JavaScript. (The following are true statements; this is not a list of myths.)

Neither a copyright statement nor @author credit is required in a source file. (Neither is explicitly recommended, either.)
There is no hard and fast rule governing how to order the members of a class (5.4 Classes).
Empty blocks can usually be represented concisely as {}, as detailed in (4.1.3 Empty blocks: may be concise).
The prime directive of line-wrapping is: prefer to break at a higher syntactic level (4.5.1 Where to break).
Non-ASCII characters are allowed in string literals, comments and JSDoc, and in fact are recommended when they make the code easier to read than the equivalent Unicode escape would (2.3.3 Non-ASCII characters).
9.3 Style-related tools
The following tools exist to support various aspects of Google Style.

9.3.1 Closure Compiler
This program performs type checking and other checks, optimizations and other transformations (such as ECMAScript 6 to ECMAScript 5 code lowering).

9.3.2 clang-format
This program reformats JavaScript source code into Google Style, and also follows a number of non-required but frequently readability-enhancing formatting practices. The output produced by clang-format is compliant with the style guide.

clang-format is not required. Authors are allowed to change its output, and reviewers are allowed to ask for such changes; disputes are worked out in the usual way. However, subtrees may choose to opt in to such enforcement locally.

9.3.3 Closure compiler linter
This program checks for a variety of missteps and anti-patterns.

9.3.4 Conformance framework
The JS Conformance Framework is a tool that is part of the Closure Compiler that provides developers a simple means to specify a set of additional checks to be run against their code base above the standard checks. Conformance checks can, for example, forbid access to a certain property, or calls to a certain function, or missing type information (unknowns).

These rules are commonly used to enforce critical restrictions (such as defining globals, which could break the codebase) and security patterns (such as using eval or assigning to innerHTML), or more loosely to improve code quality.

For additional information see the official documentation for the JS Conformance Framework.

9.4 Exceptions for legacy platforms
9.4.1 Overview
This section describes exceptions and additional rules to be followed when modern ECMAScript 6 syntax is not available to the code authors. Exceptions to the recommended style are required when ECMAScript 6 syntax is not possible and are outlined here:

Use of var declarations is allowed
Use of arguments is allowed
Optional parameters without default values are allowed
9.4.2 Use var
9.4.2.1 var declarations are NOT block-scoped
var declarations are scoped to the beginning of the nearest enclosing function, script or module, which can cause unexpected behavior, especially with function closures that reference var declarations inside of loops. The following code gives an example:

for (var i = 0; i < 3; ++i) {
  var iteration = i;
  setTimeout(function() { console.log(iteration); }, i*1000);
}

// logs 2, 2, 2 -- NOT 0, 1, 2
// because `iteration` is function-scoped, not local to the loop.
9.4.2.2 Declare variables as close as possible to first use
Even though var declarations are scoped to the beginning of the enclosing function, var declarations should be as close as possible to their first use, for readability purposes. However, do not put a var declaration inside a block if that variable is referenced outside the block. For example:

function sillyFunction() {
  var count = 0;
  for (var x in y) {
    // "count" could be declared here, but don't do that.
    count++;
  }
  console.log(count + ' items in y');
}
9.4.2.3 Use @const for constants variables
For global declarations where the const keyword would be used, if it were available, annotate the var declaration with @const instead (this is optional for local variables).

9.4.3 Do not use block scoped functions declarations
Do not do this:

if (x) {
  function foo() {}
}
While most JavaScript VMs implemented before ECMAScript 6 support function declarations within blocks it was not standardized. Implementations were inconsistent with each other and with the now-standard ECMAScript 6 behavior for block scoped function declaration. ECMAScript 5 and prior only allow for function declarations in the root statement list of a script or function and explicitly ban them in block scopes in strict mode.

To get consistent behavior, instead use a var initialized with a function expression to define a function within a block:

if (x) {
  var foo = function() {};
}
9.4.4 Dependency management with goog.provide/goog.require
9.4.4.1 Summary
WARNING: goog.provide dependency management is deprecated. All new files, even in projects using goog.provide for older files, should use goog.module. The following rules are for pre-existing goog.provide files only.

Place all goog.provides first, goog.requires second. Separate provides from requires with an empty line.
Sort the entries alphabetically (uppercase first).
Don't wrap goog.provide and goog.require statements. Exceed 80 columns if necessary.
Only provide top-level symbols.
goog.provide statements should be grouped together and placed first. All goog.require statements should follow. The two lists should be separated with an empty line.

Similar to import statements in other languages, goog.provide and goog.require statements should be written in a single line, even if they exceed the 80 column line length limit.

The lines should be sorted alphabetically, with uppercase letters coming first:

goog.provide('namespace.MyClass');
goog.provide('namespace.helperFoo');

goog.require('an.extremelyLongNamespace.thatSomeoneThought.wouldBeNice.andNowItIsLonger.Than80Columns');
goog.require('goog.dom');
goog.require('goog.dom.TagName');
goog.require('goog.dom.classes');
goog.require('goog.dominoes');
All members defined on a class should be in the same file. Only top-level classes should be provided in a file that contains multiple members defined on the same class (e.g. enums, inner classes, etc).

Do this:

goog.provide('namespace.MyClass');
Not this:

goog.provide('namespace.MyClass');
goog.provide('namespace.MyClass.CONSTANT');
goog.provide('namespace.MyClass.Enum');
goog.provide('namespace.MyClass.InnerClass');
goog.provide('namespace.MyClass.TypeDef');
goog.provide('namespace.MyClass.staticMethod');
Members on namespaces may also be provided:

goog.provide('foo.bar');
goog.provide('foo.bar.CONSTANT');
goog.provide('foo.bar.method');
9.4.4.2 Aliasing with goog.scope
WARNING: goog.scope is deprecated. New files should not use goog.scope even in projects with existing goog.scope usage.

goog.scope may be used to shorten references to namespaced symbols in code using goog.provide/goog.require dependency management.

Only one goog.scope invocation may be added per file. Always place it in the global scope.

The opening goog.scope(function() { invocation must be preceded by exactly one blank line and follow any goog.provide statements, goog.require statements, or top-level comments. The invocation must be closed on the last line in the file. Append // goog.scope to the closing statement of the scope. Separate the comment from the semicolon by two spaces.

Similar to C++ namespaces, do not indent under goog.scope declarations. Instead, continue from the 0 column.

Only make aliases for names that will not be re-assigned to another object (e.g., most constructors, enums, and namespaces). Do not do this (see below for how to alias a constructor):

goog.scope(function() {
var Button = goog.ui.Button;

Button = function() { ... };
...
Names must be the same as the last property of the global that they are aliasing.

goog.provide('my.module.SomeType');

goog.require('goog.dom');
goog.require('goog.ui.Button');

goog.scope(function() {
var Button = goog.ui.Button;
var dom = goog.dom;

// Alias new types after the constructor declaration.
my.module.SomeType = function() { ... };
var SomeType = my.module.SomeType;

// Declare methods on the prototype as usual:
SomeType.prototype.findButton = function() {
  // Button as aliased above.
  this.button = new Button(dom.getElement('my-button'));
};
...
});  // goog.scope
9.4.4.3 goog.forwardDeclare
Prefer to use goog.requireType instead of goog.forwardDeclare to break circular dependencies between files in the same library. Unlike goog.require, a goog.requireType statement is allowed to import a namespace before it is defined.

goog.forwardDeclare may still be used in legacy code to break circular references spanning across library boundaries, but newer code should be structured to avoid it.

goog.forwardDeclare statements must follow the same style rules as goog.require and goog.requireType. The entire block of goog.forwardDeclare, goog.require and goog.requireType statements is sorted alphabetically.
