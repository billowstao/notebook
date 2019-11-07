# 错误处理

- [错误处理](#%e9%94%99%e8%af%af%e5%a4%84%e7%90%86)
  - [`Error`](#error)
    - [语法](#%e8%af%ad%e6%b3%95)
    - [抛出一个基本错误](#%e6%8a%9b%e5%87%ba%e4%b8%80%e4%b8%aa%e5%9f%ba%e6%9c%ac%e9%94%99%e8%af%af)
  - [`Error` 类型](#error-%e7%b1%bb%e5%9e%8b)
    - [`EvalError`](#evalerror)
    - [`InternalError`](#internalerror)
    - [`RangeError`](#rangeerror)
    - [`ReferenceError`](#referenceerror)
    - [`SyntaxError`](#syntaxerror)
    - [`TypeError`](#typeerror)
    - [`URIError`](#urierror)
    - [总结](#%e6%80%bb%e7%bb%93)
  - [`throw`](#throw)
  - [`try...catch`](#trycatch)
  - [`finally`](#finally)
  - [参考链接](#%e5%8f%82%e8%80%83%e9%93%be%e6%8e%a5)

## `Error`

> [MSDN Reference](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error)

通过 `Error` 的构造器可以创建一个错误对象。当运行时错误产生时，`Error` 的实例对象会被抛出。`Error` 对象也可用于用户自定义的异常的基础对象。

### 语法

```javascript
new Error([message[, fileName[,lineNumber]]])
```

参数

`message`

  可选。人类可阅读的错误描述信息。

`fileName`

  可选。被创建的`Error`对象的`fileName`属性值。默认是调用`Error`构造器代码所在的文件 的名字。

`lineNumber`

  可选。被创建的`Error`对象的`lineNumber`属性值。默认是调用`Error`构造器代码所在的文件的行号。

### 抛出一个基本错误

使用`throw`关键字来抛出创建的Error对象。可以使用 `try...catch` 结构来处理异常:

```javascript
try {
    throw new Error("Whoops!");
} catch (e) {
    alert(e.name + ": " + e.message);
}
```

## `Error` 类型

除了通用的`Error`构造函数外，JavaScript 还有6个其他类型的错误构造函数。

### `EvalError`

创建一个`error`实例，表示错误的原因：与 eval() 有关。

### `InternalError`

创建一个代表Javascript引擎内部错误的异常抛出的实例。 如: "递归太多".

### `RangeError`

创建一个`error`实例，表示错误的原因：数值变量或参数超出其有效范围。

### `ReferenceError`

创建一个`error`实例，表示错误的原因：无效引用。

### `SyntaxError`

创建一个`error`实例，表示错误的原因：`eval()`在解析代码的过程中发生的语法错误。

### `TypeError`

创建一个`error`实例，表示错误的原因：变量或参数不属于有效类型。

### `URIError`

创建一个`error`实例，表示错误的原因：给 `encodeURI()`或`decodeURl()`传递的参数无效。

### 总结

以上这6种派生错误，连同原始的`Error`对象，都是构造函数。可以使用它们手动生成错误对象的实例。这些构造函数都接受一个参数，代表错误提示信息（message）。

```javascript
var err1 = new Error('出错了！');
var err2 = new RangeError('出错了，变量超出有效范围！');
var err3 = new TypeError('出错了，变量类型无效！');

err1.message // "出错了！"
err2.message // "出错了，变量超出有效范围！"
err3.message // "出错了，变量类型无效！"
```

## `throw`

`throw`语句的作用是手动中断程序执行，抛出一个错误。

```javascript
if (x <= 0) {
  throw new Error('x 必须为正数');
}
// Uncaught ReferenceError: x is not defined
```

上面代码中，如果变量`x`小于等于`0`，就手动抛出一个错误，告诉用户`x`的值不正确，整个程序就会在这里中断执行。可以看到，`throw`抛出的错误就是它的参数，这里是一个`Error`实例。

`throw`也可以抛出自定义错误。

```javascript
// 自定义错误 UserError
function UserError(message) {
  this.message = message || '默认信息';
  this.name = 'UserError';
}

UserError.prototype = new Error();
UserError.prototype.constructor = UserError;

// 抛出自定义错误
function UserError(message) {
  this.message = message || '默认信息';
  this.name = 'UserError';
}

throw new UserError('出错了！');
// Uncaught UserError {message: "出错了！", name: "UserError"}
```

上面代码中，`throw`抛出的是一个`UserError`实例。

`throw`可以抛出任何类型的值。也就是说，它的参数可以是任何值。

```javascript
// 抛出一个字符串
throw 'Error！';
// Uncaught Error！

// 抛出一个数值
throw 42;
// Uncaught 42

// 抛出一个布尔值
throw true;
// Uncaught true

// 抛出一个对象
throw {
  toString: function () {
    return 'Error!';
  }
};
// Uncaught {toString: ƒ}
```

对于 JavaScript 引擎来说，遇到`throw`语句，程序就中止了。引擎会接收到`throw`抛出的信息，可能是一个错误实例，也可能是其他类型的值。

## `try...catch`

一旦发生错误，程序就中止执行了。JavaScript 提供了`try...catch`结构，允许对错误进行处理，选择是否往下执行。

```javascript
try {
  throw new Error('出错了!');
} catch (e) {
  console.log(e.name + ": " + e.message);
  console.log(e.stack);
}
// Error: 出错了!
//   at <anonymous>:3:9
//   ...
```

上面代码中，`try`代码块抛出错误（上例用的是`throw`语句），JavaScript 引擎就立即把代码的执行，转到`catch`代码块，或者说错误被`catch`代码块捕获了。`catch`接受一个参数，表示`try`代码块抛出的值。

如果你不确定某些代码是否会报错，就可以把它们放在`try...catch`代码块之中，便于进一步对错误进行处理。

```javascript
try {
  f();
} catch(e) {
  // 处理错误
}
```

上面代码中，如果函数f执行报错，就会进行`catch`代码块，接着对错误进行处理。

`catch`代码块捕获错误之后，程序不会中断，会按照正常流程继续执行下去。

```javascript
try {
  throw "出错了";
} catch (e) {
  console.log(111);
}
console.log(222);
// 111
// 222
```

上面代码中，`try`代码块抛出的错误，被`catch`代码块捕获后，程序会继续向下执行。

`catch`代码块之中，还可以再抛出错误，甚至使用嵌套的`try...catch`结构。

```javascript
var n = 100;

try {
  throw n;
} catch (e) {
  if (e <= 50) {
    // ...
  } else {
    throw e;
  }
}
// Uncaught 100
```

上面代码中，`catch`代码之中又抛出了一个错误。

为了捕捉不同类型的错误，`catch`代码块之中可以加入判断语句。

```javascript
try {
  foo.bar();
} catch (e) {
  if (e instanceof EvalError) {
    console.log(e.name + ": " + e.message);
  } else if (e instanceof RangeError) {
    console.log(e.name + ": " + e.message);
  }
  // ...
}
```

上面代码中，`catch`捕获错误之后，会判断错误类型（`EvalError`还是`RangeError`），进行不同的处理。

## `finally`

`try...catch`结构允许在最后添加一个`finally`代码块，表示不管是否出现错误，都必需在最后运行的语句。

```javascript
function cleansUp() {
  try {
    throw new Error('出错了……');
    console.log('此行不会执行');
  } finally {
    console.log('完成清理工作');
  }
}

cleansUp()
// 完成清理工作
// Uncaught Error: 出错了……
//    at cleansUp (<anonymous>:3:11)
//    at <anonymous>:10:1
```

上面代码中，由于没有`catch`语句块，一旦发生错误，代码就会中断执行。中断执行之前，会先执行`finally`代码块，然后再向用户提示报错信息。

```javascript
function idle(x) {
  try {
    console.log(x);
    return 'result';
  } finally {
    console.log('FINALLY');
  }
}

idle('hello')
// hello
// FINALLY
```

上面代码中，`try`代码块没有发生错误，而且里面还包括`return`语句，但是`finally`代码块依然会执行。而且，这个函数的返回值还是`result`。

下面的例子说明，`return`语句的执行是排在`finally`代码之前，只是等`finally`代码执行完毕后才返回。

```javascript
var count = 0;
function countUp() {
  try {
    return count;
  } finally {
    count++;
  }
}

countUp()
// 0
count
// 1
```

上面代码说明，`return`语句里面的`count`的值，是在`finally`代码块运行之前就获取了。

下面是`finally`代码块用法的典型场景。

```javascript
openFile();

try {
  writeFile(Data);
} catch(e) {
  handleError(e);
} finally {
  closeFile();
}
```

上面代码首先打开一个文件，然后在`try`代码块中写入文件，如果没有发生错误，则运行`finally`代码块关闭文件；一旦发生错误，则先使用`catch`代码块处理错误，再使用`finally`代码块关闭文件。

下面的例子充分反映了`try...catch...finally`这三者之间的执行顺序。

```javascript
function f() {
  try {
    console.log(0);
    throw 'bug';
  } catch(e) {
    console.log(1);
    return true; // 这句原本会延迟到 finally 代码块结束再执行
    console.log(2); // 不会运行
  } finally {
    console.log(3);
    return false; // 这句会覆盖掉前面那句 return
    console.log(4); // 不会运行
  }

  console.log(5); // 不会运行
}

var result = f();
// 0
// 1
// 3

result
// false
```

上面代码中，`catch`代码块结束执行之前，会先执行`finally`代码块。

`catch`代码块之中，触发转入`finally`代码快的标志，不仅有`return`语句，还有`throw`语句。

```javascript
function f() {
  try {
    throw '出错了！';
  } catch(e) {
    console.log('捕捉到内部错误');
    throw e; // 这句原本会等到finally结束再执行
  } finally {
    return false; // 直接返回
  }
}

try {
  f();
} catch(e) {
  // 此处不会执行
  console.log('caught outer "bogus"');
}

//  捕捉到内部错误
```

上面代码中，进入`catch`代码块之后，一遇到`throw`语句，就会去执行`finally`代码块，其中有`return false`语句，因此就直接返回了，不再会回去执行`catch`代码块剩下的部分了。

`try`代码块内部，还可以再使用`try`代码块。

```javascript
try {
  try {
    consle.log('Hello world!'); // 报错
  }
  finally {
    console.log('Finally');
  }
  console.log('Will I run?');
} catch(error) {
  console.error(error.message);
}
// Finally
// consle is not defined
```

上面代码中，`try`里面还有一个`try`。内层的`try`报错（`console`拼错了），这时会执行内层的`finally`代码块，然后抛出错误，被外层的`catch`捕获。

## 参考链接

- [Error](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error)
- [错误处理机制](https://wangdoc.com/javascript/features/error.html)
- [JavaScript Errors and How to Fix Them](https://davidwalsh.name/fix-javascript-errors)
