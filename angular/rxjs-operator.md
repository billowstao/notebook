# RxJS 操作符概览(RxJS Operators Overview)

> 作者: billowstao
>
> RxJS 的操作符太丰富了，总结这一篇 RxJS 的操作符便于快速查询。🤠

![RxJS 操作符（RxJS operators）](./resource/rxjs-operators-logo.png)

- [RxJS 操作符概览(RxJS Operators Overview)](#rxjs-操作符概览rxjs-operators-overview)
  - [Marble diagrams(弹珠图)](#marble-diagrams弹珠图)
  - [操作符分类](#操作符分类)
    - [创建操作符](#创建操作符)
    - [连接创建操作符](#连接创建操作符)
    - [转换操作符](#转换操作符)
    - [过滤操作符](#过滤操作符)
    - [连接操作符](#连接操作符)
    - [多播操作符](#多播操作符)
    - [错误处理操作符](#错误处理操作符)
    - [工具操作符](#工具操作符)
    - [条件和布尔操作符](#条件和布尔操作符)
    - [数学和集合运算符](#数学和集合运算符)
    - [参考](#参考)

## Marble diagrams(弹珠图)

要解释操作符是如何工作的，文字描述通常是不足以描述清楚的。许多操作符都是跟时间相关的，它们可能会以不同的方式延迟(delay)、取样(sample)、节流(throttle)或去抖动(debounce)。图表通常是更适合的工具。弹珠图是操作符运行方式的视觉表示，其中包含输入 Observable(s) (输入可能是多个 Observable)、操作符及其参数和输出 Observable 。

> 在弹珠图中，时间流向右边，图描述了在 Observable 执行中值(“弹珠”)是如何发出的。

在下图中可以看到解剖过的弹珠图。

![Marble diagram anatomy](./resource/marble-diagram-anatomy.svg)

在整个文档站中，我们广泛地使用弹珠图来解释操作符的工作方式。它们在其他环境中也可能非常有用，例如在白板上，甚至在我们的单元测试中(如 ASCII 图)。

## 操作符分类

操作符有着不同的用途，它们可作如下分类：创建、转换、过滤、链接、多播、错误处理、工具，等等。在下面的列表中，你可以按分类组织好的所有操作符。

### 创建操作符

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

### 连接创建操作符

这些是可观察对象的创建操作符，它们也具有连接功能 —— 发出多个源可观察对象的值。

- combineLatest
- concat
- forkJoin
- merge
- partition
- race
- zip

### 转换操作符

- buffer
- bufferCount
- bufferTime
- bufferToggle
- bufferWhen
- concatMap
- concatMapTo
- exhaust
- exhaustMap
- expand
- groupBy
- map
- mapTo
- mergeMap
- mergeMapTo
- mergeScan
- pairwise
- partition
- pluck
- scan
- switchScan
- switchMap
- switchMapTo
- window
- windowCount
- windowTime
- windowToggle
- windowWhen

### 过滤操作符

- audit
- auditTime
- debounce
- debounceTime
- distinct
- distinctUntilChanged
- distinctUntilKeyChanged
- elementAt
- filter
- first
- ignoreElements
- last
- sample
- sampleTime
- single
- skip
- skipLast
- skipUntil
- skipWhile
- take
- takeLast
- takeUntil
- takeWhile
- throttle
- throttleTime

### 连接操作符

还请参阅上面的[链接创建操作符](#连接创建操作符)

- combineLatestAll
- concatAll
- exhaustAll
- mergeAll
- switchAll
- startWith
- withLatestFrom

### 多播操作符

- multicast
- publish
- publishBehavior
- publishLast
- publishReplay
- share

### 错误处理操作符

- catchError
- retry
- retryWhen

### 工具操作符

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

### 条件和布尔操作符

- defaultIfEmpty
- every
- find
- findIndex
- isEmpty

### 数学和集合运算符

- count
- max
- min
- reduce

### 参考
