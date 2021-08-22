# RxJS 操作符

## Marble diagrams(弹珠图)

要解释操作符是如何工作的，文字描述通常是不足以描述清楚的。许多操作符都是跟时间相关的，它们可能会以不同的方式延迟(delay)、取样(sample)、节流(throttle)或去抖动值(debounce)。图表通常是更适合的工具。弹珠图是操作符运行方式的视觉表示，其中包含输入 Observable(s) (输入可能是多个 Observable)、操作符及其参数和输出 Observable 。

> 在弹珠图中，时间流向右边，图描述了在 Observable 执行中值(“弹珠”)是如何发出的。

在下图中可以看到解剖过的弹珠图。

![Marble diagram anatomy](./resource/marble-diagram-anatomy.svg)

在整个文档站中，我们广泛地使用弹珠图来解释操作符的工作方式。它们在其他环境中也可能非常有用，例如在白板上，甚至在我们的单元测试中(如 ASCII 图)。
