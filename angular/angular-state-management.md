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

> 在使用 NgRx 之前，建议掌握 [RxJS](https://rxjs.dev/) 的基本使用方法、理解其原理。

### NgRx 全局状态管理

全局状态管理使用 NgRx Store 管理。

下图展示了 NgRx 应用程序全局状态的总体流程。

![State Management Lifecycle](./resource/state-management-lifecycle.png)

- Action(动作) 描述了由组件和服务发出的独特事件；
- State(状态) 更改由称为 `reducers` 的纯函数处理，该函数根据当前状态和最新动作来计算新状态；
- Selector(选择器)是用于选择、派生和组合状态的纯函数；
- 状态是通过 Store 来访问的，Store 是状态和动作的观察者。

更多关于全局状态管理的原理和使用方法可以参照官方文档: [@ngrx/store](https://ngrx.io/guide/store)

### NgRx 本地状态管理

## 安装
