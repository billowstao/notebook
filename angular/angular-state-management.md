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

本地状态管理使用 `ComponentStore`，`ComponentStore` 是一个独立的库，用于管理 本地/组件 状态。它的原理和 RxJS 实现的具有 `Subject` 的 `Service` 很类似。

`ComponentStore` 具有如下特点：

- 本地状态必须被初始化，但它可以惰性地初始化；
- 本地状态通常与特定组件的生命周期相关联，并在组件销毁时被清除；
- `ComponentStore` 的用户可以通过 `setState` 或 `updater` 更新状态，可以通过命令，也可以是提供一个可观察对象；
- `ComponentStore` 的用户可以通过 `select` 或顶级 `state$` 读取状态。选择器的性能非高；
- `ComponentStore` 的用户可能会同步或异步调用 `effect`，并提供命令式或响应式的数据。

应用中有多种类型的状态，状态管理库便是协助 管理/同步/更新 这些状态。开发者通常需要处理的应用程序状态的类型通常可以分为以下几种：

![Types Of State](./resource/types-of-state.png)

- 服务端/后端状态(Server/Backend State)：这是所有数据最终的来源(the ultimate source of truth)；
- 持久化状态：来自应用程序或后端数据的"快照"。例如，作为 JSON 响应传递的电影数据，或作为更新请求传递的用户对特定电影的评级；
- URL 的状态：这是 URL 本身的状态。根据用户导航到的 URL，应用程序将打开特定的页面，因此可能请求持久化状态。
- 客户端状态：应用程序中未持久化到后端的状态。例如在应用程序中打开哪个选项卡的信息；
- 本地 UI 状态：组件本身的状态。例如 Toggle Component 的 `isEnabled` 切换状态。

还有更多类型的状态，但在状态管理上下文中，这些是最重要的。

## 安装
