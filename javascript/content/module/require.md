# `require`

- [`require`](#require)
  - [API 规格](#api-规格)
    - [局部 `require` vs 全局 `require`](#局部-require-vs-全局-require)

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
