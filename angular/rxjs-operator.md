# RxJS 操作符

## Marble diagrams(弹珠图)

要解释操作符是如何工作的，文字描述通常是不足以描述清楚的。许多操作符都是跟时间相关的，它们可能会以不同的方式延迟(delay)、取样(sample)、节流(throttle)或去抖动值(debounce)。图表通常是更适合的工具。弹珠图是操作符运行方式的视觉表示，其中包含输入 Observable(s) (输入可能是多个 Observable)、操作符及其参数和输出 Observable 。

> 在弹珠图中，时间流向右边，图描述了在 Observable 执行中值(“弹珠”)是如何发出的。

在下图中可以看到解剖过的弹珠图。

![Marble diagram anatomy](./resource/marble-diagram-anatomy.svg)

在整个文档站中，我们广泛地使用弹珠图来解释操作符的工作方式。它们在其他环境中也可能非常有用，例如在白板上，甚至在我们的单元测试中(如 ASCII 图)。

## 操作符分类

操作符有着不同的用途，它们可作如下分类：创建、转换、过滤、链接、多播、错误处理、工具，等等。在下面的列表中，你可以按分类组织好的所有操作符。

### 创建操作符

- ajax
- bindCallback
- bindNodeCallback
- defer
- empty
- from
- fromEvent
- fromEventPattern
- generate
- interval
- of
- range
- throwError
- timer
- iif

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
