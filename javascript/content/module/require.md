# `require`

- [`require`](#require)
  - [API 规格](#api-规格)
    - [局部 `require` vs 全局 `require`](#局部-require-vs-全局-require)

`require` 是一个基于 [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) 规范实现的函数，它区别于传统的 CommonJS `require` 规范。因为它能够异步地加载动态的依赖，所以，我们对基于 `require` 的回调方式有了更多的需求。

## API 规格

### 局部 `require` vs 全局 `require`
