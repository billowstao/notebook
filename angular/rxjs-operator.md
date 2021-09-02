# RxJS 操作符概览(RxJS Operators Overview)

> 作者: billowstao
>
> RxJS 的操作符太丰富了，总结这一篇 RxJS 的操作符便于快速查询。🤠

![RxJS 操作符（RxJS operators）](./resource/rxjs-operators-logo.png)

- [RxJS 操作符概览(RxJS Operators Overview)](#rxjs-操作符概览rxjs-operators-overview)
  - [弹珠图(Marble Diagrams)](#弹珠图marble-diagrams)
  - [操作符分类(Category Of Operators)](#操作符分类category-of-operators)
    - [创建操作符(Creation Operators)](#创建操作符creation-operators)
    - [连接创建操作符(Join Creation Operators)](#连接创建操作符join-creation-operators)
    - [转换操作符(Transformation Operators)](#转换操作符transformation-operators)
    - [过滤操作符(Filtering Operators)](#过滤操作符filtering-operators)
    - [连接操作符(Join Operators, 高阶 Observable 操作符)](#连接操作符join-operators-高阶-observable-操作符)
    - [多播操作符(Multicasting Operators)](#多播操作符multicasting-operators)
    - [错误处理操作符(Error Handing Operators)](#错误处理操作符error-handing-operators)
    - [工具操作符(Utility Operators)](#工具操作符utility-operators)
    - [条件和布尔操作符(Conditional And Boolean Operators)](#条件和布尔操作符conditional-and-boolean-operators)
    - [数学和集合运算符(Mathematical and Aggregate Operators)](#数学和集合运算符mathematical-and-aggregate-operators)
    - [参考(Reference)](#参考reference)

## 弹珠图(Marble Diagrams)

要解释操作符是如何工作的，文字描述通常是不足以描述清楚的。许多操作符都是跟时间相关的，它们可能会以不同的方式延迟(delay)、取样(sample)、节流(throttle)或去抖动(debounce)。图表通常是更适合的工具。弹珠图是操作符运行方式的视觉表示，其中包含输入 Observable(s) (输入可能是多个 Observable)、操作符及其参数和输出 Observable 。

> 在弹珠图中，时间流向右边，图描述了在 Observable 执行中值(“弹珠”)是如何发出的。

在下图中可以看到解剖过的弹珠图。

![Marble diagram anatomy](./resource/marble-diagram-anatomy.svg)

在整个文档站中，我们广泛地使用弹珠图来解释操作符的工作方式。它们在其他环境中也可能非常有用，例如在白板上，甚至在我们的单元测试中(如 ASCII 图)。

## 操作符分类(Category Of Operators)

操作符有着不同的用途，它们可作如下分类：创建、转换、过滤、连接、多播、错误处理、工具，等等。在下面的列表中，你可以按分类组织好的所有操作符。

### 创建操作符(Creation Operators)

- [ajax](https://rxjs.dev/api/ajax/ajax): 创建 ajax 的 Observable。
- [bindCallback](https://rxjs.dev/api/index/function/bindCallback): 将回调函数转换为 Observable。
- [bindNodeCallback](https://rxjs.dev/api/index/function/bindNodeCallback): 将 Node.js 回调函数转换为 Observable(Node.js 的回调函数为 `callback(error, result)`)
- [defer](https://rxjs.dev/api/index/function/defer): Observable 工厂函数(factory)
- ~~[empty](https://rxjs.dev/api/index/function/empty): RxJS v8 将要移除。~~使用 [`EMPTY`](https://rxjs.dev/api/index/const/EMPTY) 或者 [`scheduled`](https://rxjs.dev/api/index/function/scheduled)(例如 `schedule([], scheduler)`) 替换
- [from](https://rxjs.dev/api/index/function/from): 从 Array, 类数组对象, Promise, 字面量对象, 类 Observable 对象创建 Observable
- [fromEvent](https://rxjs.dev/api/index/function/fromEvent): 事件绑定
- [fromEventPattern](https://rxjs.dev/api/index/function/fromEventPattern): 事件绑定，事件销毁
- [generate](https://rxjs.dev/api/index/function/generate): 类似于 `for` 循环
- [interval](https://rxjs.dev/api/index/function/interval): 创建指定时间间隔的连续数列
- [of](https://rxjs.dev/api/index/function/of): 将参数转换为 Observable 序列
- [range](https://rxjs.dev/api/index/function/range): 创建一个 Observable，它会在指定的范围内发出连续的数字
- [throwError](https://rxjs.dev/api/index/function/throwError): 创建返回错误的 Observable (`concatMap`, `mergeMap`, `defer` 不需要调用该方法, 直接 `throw` 错误对象)
- [timer](https://rxjs.dev/api/index/function/timer): 延时定时器
- [iif](https://rxjs.dev/api/index/function/iif): 相当于三元表达式 (断言 ? true : false) 的 Observable

### 连接创建操作符(Join Creation Operators)

这些是 Observable 的创建操作符，它们也具有连接功能 —— 发出多个源 Observable 的值。

- [combineLatest](https://rxjs.dev/api/index/function/combineLatest): 连接多个 Observable，并且发出所有输入 Observable 的最近值的结合数组
- [concat](https://rxjs.dev/api/index/function/concat): 连接不同的 Observable 流(按照 Observable 输入的先后顺序连接)，然后依次发出连接后的每个值
- [forkJoin](https://rxjs.dev/api/index/function/forkJoin): 按照输入顺序连接不同的 Observable，等待所有输入 Observable 都成功后按照输入顺序发出数组包裹的结果(当且仅当所有输入 Observable 都**成功返回值**后才返回相应的结果数组)
- ~~[merge](https://rxjs.dev/api/index/function/merge): RxJS v8 将要移除。~~使用 `mergeWith` 替代
- [mergeWith](https://rxjs.dev/api/operators/mergeWith): 按照输入 Observable 的各自顺序合并所有值为一个新的 Observable
- [partition](https://rxjs.dev/api/index/function/partition): 按照条件拆分 1 个 Observable 为 2 个 Observable，满足条件的值加入第 1 个返回的 Observable，不满足条件的值加入第 2 个返回的 Observable
- [race](https://rxjs.dev/api/index/function/race): 竞赛，输入多个 Observable, 发出最先触发的 Observable
- [zip](https://rxjs.dev/api/index/function/zip): 组合(打包)多个 Observable，依次发出每个 Observable 值的组合(数组包裹输出的所有输入值；当输入的 Observable 长度不一致，仅输出长度一致的共同部分)

### 转换操作符(Transformation Operators)

- [buffer](https://rxjs.dev/api/operators/buffer): 缓冲源 Observable，直到输入 Observable 发出
- [bufferCount](https://rxjs.dev/api/operators/bufferCount): 缓冲源 Observable，直到限定数量的源发出
- [bufferTime](https://rxjs.dev/api/operators/bufferTime): 缓冲源 Observable，直到限定的时间间隔
- [bufferToggle](https://rxjs.dev/api/operators/bufferToggle): 从触发 `openings` 到触发 `closingSelector` 缓冲源 Observable，并发出缓冲的源 Observable
- [bufferWhen](https://rxjs.dev/api/operators/bufferWhen): 缓冲源 Observable，直到输入 Observable 触发
- [concatMap](https://rxjs.dev/api/operators/concatMap): 将每个源值映射到一个 Observable 中，并在输出的 Observable 中合并，以序列化的方式等待每个源值都完成，然后再合并下一个(先 `map` 再 `concat`，源 Observable 的值保留)
- [concatMapTo](https://rxjs.dev/api/operators/concatMapTo): 将每个源值映射到同一个 Observable 上，并在输出的 Observable 上以序列化的方式合并多次(源 Observable 的值被丢弃)
- ~~[exhaust](https://rxjs.dev/api/operators/exhaust): 将在 RxJS v8 中移除。~~重命名为 `exhaustAll`
- [exhaustAll](https://rxjs.dev/api/operators/exhaustAll): 将一个高阶 Observable 转换为一阶 Observable ，当源内部的前一个 Observable 未完成时丢弃当前的 Observable
- [exhaustMap](https://rxjs.dev/api/operators/exhaustMap): 将每个源值映射到一个 Observable 中，只有当之前映射的 Observable 完成时，才会合并到输出的 Observable 中
- [expand](https://rxjs.dev/api/operators/expand): 递归的将每个值映射到一个被合并到输出 Observable 中的 Observable 中
- [groupBy](https://rxjs.dev/api/operators/groupBy): 将一阶的源 Observable 通过 `keySelector` 分组成高阶的 Observable 并输出
- [map](https://rxjs.dev/api/operators/map): 将给定的映射函数应用到由源 Observable 发出的每个值上，并将结果值作为 Observable 发出
- [mapTo](https://rxjs.dev/api/operators/mapTo): 每当源 Observable 发出一个值时，就在输出 Observable 上发出给定的常量值
- [mergeMap](https://rxjs.dev/api/operators/mergeMap): 将每个源值映射到一个 Observable 中，并合并到输出的 Observable 中
- [mergeMapTo](https://rxjs.dev/api/operators/mergeMapTo): 将每个源值映射到同一个 Observable 中，并在输出 Observable 中多次合并
- [mergeScan](https://rxjs.dev/api/operators/mergeScan): 在源 Observable 上应用累加器函数，累加器函数本身返回一个 Observable，然后每个返回的中间 Observable 合并到输出 Observable 中
- [pairwise](https://rxjs.dev/api/operators/pairwise): 将一对对连续的发出组合在一起，并将它们作为两个数组发出
- [partition](https://rxjs.dev/api/operators/partition): 按照条件拆分 1 个 Observable 为 2 个 Observable，满足条件的值加入第 1 个返回的 Observable，不满足条件的值加入第 2 个返回的 Observable
- ~~[pluck](https://rxjs.dev/api/operators/pluck): 将在 RxJS v8 中移除。~~使用 `map` 替代
- [scan](https://rxjs.dev/api/operators/scan): 用于封装和管理状态。在初始状态建立后，对于来自源的每个值应用累加器(或 `reducer` 函数) -- 通过 `seed` 值(第二个参数)或来自源的第 1 个值
- [switchScan](https://rxjs.dev/api/operators/switchScan): 在源 Observable 上应用累加器函数，累加器函数本身返回一个 Observable，只从最新返回的 Observable 发出值(重叠发出的源 Observable 的值会被最新的值替代)
- [switchMap](https://rxjs.dev/api/operators/switchMap): 将每个源值都映射到一个 Observable，它只从最新映射的 Observable 发出
- [switchMapTo](https://rxjs.dev/api/operators/switchMapTo): 将每个源值都映射到同一个 Observable，这个 Observable 中使用 `switchMap` 多次扁平化
- [window](https://rxjs.dev/api/operators/window): 当 `windowBoundaries` 发出时，分支出源 Observable 的值作为一个被嵌套的 Observable
- [windowCount](https://rxjs.dev/api/operators/windowCount): 分支出源 Observable 的值作为一个嵌套的 Observable，每个嵌套的 Observable 最多发出 `windowSize` 次数的值
- [windowTime](https://rxjs.dev/api/operators/windowTime): 定时将源 Observable 的值分支出来，作为一个嵌套的 Observable
- [windowToggle](https://rxjs.dev/api/operators/windowToggle): 分支出源 Observable 的值作为一个嵌套的 Observable，从 `openings` 发出开始，到 `closingSelector` 发出结束
- [windowWhen](https://rxjs.dev/api/operators/windowWhen): 分支出源 Observable 的值作为一个嵌套的 Observable，使用用来关闭 Observable 的工厂函数来决定何时启动一个新的窗口

### 过滤操作符(Filtering Operators)

- [audit](https://rxjs.dev/api/operators/audit): 在一段时间内忽略由另一个 Observable 决定的源值，然后从源 Observable 发出最近的值(发出静默时间窗口内的最后一个值)，然后重复这个过程
- [auditTime](https://rxjs.dev/api/operators/auditTime): 忽略 `duration` 毫秒的源值，然后从源 Observable 发出最近的值，然后重复这个过程
- [debounce](https://rxjs.dev/api/operators/debounce): 只有由一个由另一个 Observable 决定的特定时间跨度过去而没有另一个 Observable 发出时，才会从源 Observable 发出值
- [debounceTime](https://rxjs.dev/api/operators/debounceTime): 只有在一个特定的时间跨度过去之后，没有其他源发出，才会从 Observable 发出
- [distinct](https://rxjs.dev/api/operators/distinct): 返回一个 Observable，它会发出源 Observable 所发出的所有与之前(发出)的项不同的项
- [distinctUntilChanged](https://rxjs.dev/api/operators/distinctUntilChanged): 返回一个 Observable，使用 `comparator` 判断当前项与其他项是否不同而发出
- [distinctUntilKeyChanged](https://rxjs.dev/api/operators/distinctUntilKeyChanged): 返回一个 Observable，该 Observable 发出源 Observable 发出的所有与前一项不同的项，并使用提供的键(`key`)访问属性来检查两个项是否不同
- [elementAt](https://rxjs.dev/api/operators/elementAt): 在源 Observable 的一系列发出中，在指定的索引处发出单个值
- [filter](https://rxjs.dev/api/operators/filter): 发出源 Observable 满足特定条件的值
- [first](https://rxjs.dev/api/operators/first): 只发出由源 Observable 发出的第一个值(或满足某些条件的第一个值)
- [ignoreElements](https://rxjs.dev/api/operators/ignoreElements): 忽略由源 Observable 发出的所有项，只传递 `complete` 或 `error` 的调用
- [last](https://rxjs.dev/api/operators/last): 返回一个只触发源 Observable 所触发的最后一项的 Observable(可以选择使用一个断言函数作为参数，在这种情况下，生成的 Observable 不会从源 Observable 中发出最后一项，而是从源 Observable 中发出满足断言的最后一项)。
- [sample](https://rxjs.dev/api/operators/sample): 当另一个 Observable 发出时，发出源 Observable 中最近发出的值(采样)
- [sampleTime](https://rxjs.dev/api/operators/sampleTime): 在周期的时间间隔内从源 Observable 发出最近发出的值
- [single](https://rxjs.dev/api/operators/single): 返回一个 Observable，它判断源 Observable 是否只发出一个与断言匹配的值。如果没有提供断言，那么它将判断 Observable 是否只发出一个值
- [skip](https://rxjs.dev/api/operators/skip): 返回一个 Observable，它跳过源 Observable 发出的 `count` 数量项
- [skipLast](https://rxjs.dev/api/operators/skipLast): 返回源 Observable 跳过完成前 `skipCount` 数量项
- [skipUntil](https://rxjs.dev/api/operators/skipUntil): 发出源 Observable 发出的值，知道 `notifier` Observable 发出一个值
- [skipWhile](https://rxjs.dev/api/operators/skipWhile): 返回一个 Observable，只要指定的条件为 `true`，它就跳过发出源 Observable 的项，一旦条件变成 `false`，它就会发出源 Observable 的项
- [take](https://rxjs.dev/api/operators/take): 只发出源 Observable 发出的前 `count` 数量个值
- [takeLast](https://rxjs.dev/api/operators/takeLast): 只发出源 Observable 发出的最后 `count` 个值
- [takeUntil](https://rxjs.dev/api/operators/takeUntil): 发出源 Observable 发出的值，直到 `notifier` Observable 发出一个值
- [takeWhile](https://rxjs.dev/api/operators/takeWhile): 发出源 Observable 发出的值，只要每个值满足给定的 `predicate`，然后在这个 `predicate` 不满足时完成
- [throttle](https://rxjs.dev/api/operators/throttle): 从源 Observable 发出一个值，然后在由另一个 Observable 决定的持续时间内忽略后续的源值，然后重复这个过程
- [throttleTime](https://rxjs.dev/api/operators/throttleTime): 从源 Observable 中发出一个值，然后在持续时间(毫秒)内忽略后续的源值，然后重复这个过程

### 连接操作符(Join Operators, 高阶 Observable 操作符)

还请参阅上面的[链接创建操作符](#连接创建操作符)

- combineLatestAll
- concatAll
- exhaustAll
- mergeAll
- switchAll
- startWith
- withLatestFrom

### 多播操作符(Multicasting Operators)

- multicast
- publish
- publishBehavior
- publishLast
- publishReplay
- share

### 错误处理操作符(Error Handing Operators)

- catchError
- retry
- retryWhen

### 工具操作符(Utility Operators)

- tap
- delay
- delayWhen
- dematerialize
- materialize
- observeOn
- subscribeOn
- timeInterval
- timestamp
- timeout
- timeoutWith
- toArray

### 条件和布尔操作符(Conditional And Boolean Operators)

- defaultIfEmpty
- every
- find
- findIndex
- isEmpty

### 数学和集合运算符(Mathematical and Aggregate Operators)

- count
- max
- min
- reduce

### 参考(Reference)
