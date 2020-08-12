# `localStorage`, `sessionStorage`

Web 存储对象 `localStorage` 和 `sessionStorage` 允许我们在浏览器上保存键/值对。

它们有趣的是，在页面刷新后（对于 `sessionStorage`）甚至浏览器完全重启（对于 `localStorage`）后，数据仍然保留在浏览器中。我们很快就会看到。

我们已经有了 cookie。为什么还要其他存储对象呢？

- 与 cookie 不同，Web 存储对象不会随每个请求被发送到服务器。因此，我们可以保存更多数据。大多数浏览器都允许保存至少 2MB 的数据（或更多），并且具有用于配置数据的设置。
- 还有一点和 cookie 不同，服务器无法通过 HTTP header 操纵存储对象。一切都是在 JavaScript 中完成的。
- 存储绑定到源（域/协议/端口三者）。也就是说，不同协议或子域对应不同的存储对象，它们之间无法访问彼此数据。

两个存储对象都提供相同的方法和属性：

- `setItem(key, value)` —— 存储键/值对。
- `getItem(key)` —— 按照键获取值。
- `removeItem(key)` —— 删除键及其对应的值。
- `clear()` —— 删除所有数据。
- `key(index)` —— 获取该索引下的键名。
- `length` —— 存储的内容的长度。

正如你所看到的，它就像一个 Map 集合（`setItem`/`getItem`/`removeItem`），但也允许通过 key(`index`) 来按索引访问。

让我们看看它是如何工作的吧。

## `localStorage` 示例

`localStorage` 最主要的特点是：

- 在同源的所有标签页和窗口之间共享数据。
- 数据不会过期。它在浏览器重启甚至系统重启后仍然存在。

例如，如果你运行此代码……

```js
localStorage.setItem('test', 1);
```

……然后关闭/重新打开浏览器，或者只是在不同的窗口打开同一页面，然后你可以这样获取它：

```js
alert( localStorage.getItem('test') ); // 1
```

我们只需要在同一个源（域/端口/协议），URL 路径可以不同。

在所有同源的窗口之间，`localStorage` 数据可以共享。因此，如果我们在一个窗口中设置了数据，则在另一个窗口中也可以看到数据变化。

## 类对象形式访问

我们还可以像使用一个普通对象那样，读取/设置键，像这样：

```js
// 设置 key
localStorage.test = 2;

// 获取 key
alert( localStorage.test ); // 2

// 删除 key
delete localStorage.test;
```

这是历史原因造成的，并且大多数情况下都可行，但通常不建议这样做，因为：

1. 如果键是由用户生成的，那么它可以是任何内容，例如 `length` 或 `toString`，也可以是 `localStorage` 的另一种内建方法。在这种情况下，`getItem`/`setItem` 可以正常工作，而类对象访问的方式则会失败：

    ```js
    let key = 'length';
    localStorage[key] = 5; // Error，无法对 length 进行赋值
    ```

2. 有一个 storage 事件，在我们更改数据时会触发。但以类对象方式访问时，不会触发该事件。我们将在本章的后面看到。

## 遍历键

正如我们所看到的，这些方法提供了“按照键获取/设置/删除”的功能。但我们如何获取所有保存的值或键呢？

不幸的是，存储对象是不可迭代的。

一种方法是像遍历数组那样遍历它们：

```js
for(let i = 0; i < localStorage.length; i++) {
  let key = localStorage.key(i);
  alert(`${key}: ${localStorage.getItem(key)}`);
}
```

另一个方式是使用 `for key in localStorage` 循环，就像处理常规对象一样。

它会遍历所有的键，但也会输出一些我们不需要的内建字段。

```js
// 不好的尝试
for(let key in localStorage) {
  alert(key); // 显示 getItem，setItem 和其他内建的东西
}
``
