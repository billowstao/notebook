# Angular 状态管理 - NgRx 最佳实践

> Angular 为我们带来了组件开发的模式，但随着应用规模的变大，组件数量不断地增加，也带来了一系列问题 -- 比如组件之间、多层级组件之间的如何进行数据共享，全局变量的如何管理等等问题。如何优雅的解决这些问题呢？状态管理工具应运而生。当前最热门的状态管理工具便是 Redux，而 Angular 也有独具特色的 Redux 衍生版本 -- NgRx。本文将带领大家了解 Angular NgRx 的最佳实践，以便于更好的使用 NgRx 管理 Angular 状态。

- [Angular 状态管理 - NgRx 最佳实践](#angular-状态管理---ngrx-最佳实践)
  - [NgRx 简介](#ngrx-简介)
    - [NgRx 全局状态管理](#ngrx-全局状态管理)
    - [NgRx 本地状态管理](#ngrx-本地状态管理)
  - [安装](#安装)

## NgRx 简介

NgRx 具有如下的功能

- 管理全局和本地状态 - `@ngrx/store` 和 `@ngrx/component-store`
- 隔离副作用以促进更洁净的组件架构 - `@ngrx/effects`
- 实体集合管理 - `@ngrx/entity`
- 与 Angular 路由器集成 - `@ngrx/router-store`
- 在构建许多不同类型的应用程序时增强开发人员体验的开发人员工具 - `@ngrx/store-devtools`

NgRx 还有许多实现各种功能的库，这里不一一列举，比较常用的库是 `@ngrx/store`, `@ngrx/component-store`, `@ngrx/effects`, `@ngrx/entity`, `@ngrx/router-store`, `@ngrx/store-devtools`，本文将使用这几种库作为示例。

### NgRx 全局状态管理

### NgRx 本地状态管理

更多关于 NgRx 的技术文档可以访问 [NgRx 官网](https://www.ngrx.dev)

## 安装
