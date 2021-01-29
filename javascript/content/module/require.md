# `require`

- [`require`](#require)
  - [API 规格](#api-规格)
    - [局部 `require` vs 全局 `require`](#局部-require-vs-全局-require)
  - [require(String)](#requirestring)
  - [`require(Array, Function)`](#requirearray-function)
  - [`require.toUrl(String)`](#requiretourlstring)

`require` 是一个基于 [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) 规范实现的函数，它区别于传统的 CommonJS `require` 规范。因为它能够异步地加载动态的依赖，所以，我们对基于 `require` 的回调方式有了更多的需求。

## API 规格

### 局部 `require` vs 全局 `require`

局部 `require` 可以被解析成一个符合 [AMD 工厂函数规范的](https://github.com/amdjs/amdjs-api/wiki/AMD#wiki-define) `require` 函数。

例如：

```js
define(["require"], function (require) {
  //the require in here is a local require.
});

define(function (require, exports, module) {
  //the require in here is a local require.
});
```

局部 `require` 也支持其他标准实现的 API。

全局 `require` 函数作用于全局，和 `define()` 类似。 全局 `require` 和局部 `require` 有着相同的行为，包含以下特征：

- 模块 ID 应该认为是一个绝对的模块名称，而不是相对另一个模块的 ID。
- 只有在异步的时候，才可以使用 `require(id, callback?)` 的回调形式。因为异步加载模块的方式是先发出一个异步请求，然后等主线程代码段执行完毕才能进行异步回调来处理加载好的模块。

实际中，我们经常会遇到一些阻塞模块加载的依赖，如果交互次数很多，需要大量的模块加载，应该采用全局依赖的形式去加载顶层模块。

## require(String)

基于以下规范 [CommonJS Modules 1.1.1 require.](http://wiki.commonjs.org/wiki/Modules/1.1.1#Require) 根据参数，同步地返回模块 ID 所代表的模块。

如果模块没有加载或者执行完成，就会抛出错误。特别需要指出的是，在同步加载的回调中，如果模块没有加载完成，禁止动态的获取模块，否则，就会抛出异常。

使用 `define()` 定义模块时，依赖项中可以找到一个 AMD 模块：

```js
define(function (require) {
  var a = require("a");
});
```

工厂方法可以被解析成 `require('')` 的调用形式（例如，使用语法解析器或者使用 `Function.prototype.toString()` 或者正则表达式）去找到依赖，加载并且执行依赖，然后执行工厂方法内部代码，通过这样的方式，就可以获取到模块。

## `require(Array, Function)`

参数 `Array` 是一个由模块 ID 组成的数组。当模块 ID 所以代表的模块加载完成且可用时，回调函数 Function 才开始执行，并且只被执行一次。各个模块按照依赖数组中的位置顺序以参数的形式传入到 Function 里。

例如：

```js
define(function (require) {
  require(["a", "b"], function (a, b) {
    //modules a and b are now available for use.
  });
});
```

## `require.toUrl(String)`

将形如 `[module ID] + '.extension'` 这种字符串形式转化成 URL 路径。

`require.toUrl()` 方法采用通用的模块 ID 路径转化规则，将模块 ID 字符解析成 URL 路径，但它不支持以 `.js` 这种扩展形式。所以我们必须将 `.extension` 添加到解析路径里。

例如：

```js
//cart.js contents:
define(function (require) {
  // 模块ID名 './templates/a'
  // 扩展名 '.html'
  // 模板路径大致以这样的形式结尾 'modules/cart/templates/a.html'
  var templatePath = require.toUrl("./templates/a.html");
});
```
