# `this`

- [this](#this)
  - [this 疑问](#this-%e7%96%91%e9%97%ae)
  - [默认调用](#%e9%bb%98%e8%ae%a4%e8%b0%83%e7%94%a8)
  - [隐式绑定](#%e9%9a%90%e5%bc%8f%e7%bb%91%e5%ae%9a)
  - [显式绑定](#%e6%98%be%e5%bc%8f%e7%bb%91%e5%ae%9a)
  - [new 绑定](#new-%e7%bb%91%e5%ae%9a)
  - [绑定优先级](#%e7%bb%91%e5%ae%9a%e4%bc%98%e5%85%88%e7%ba%a7)
  - [绑定例外情况](#%e7%bb%91%e5%ae%9a%e4%be%8b%e5%a4%96%e6%83%85%e5%86%b5)
  - [箭头函数](#%e7%ae%ad%e5%a4%b4%e5%87%bd%e6%95%b0)
    - [箭头函数中的 this 非静态](#%e7%ae%ad%e5%a4%b4%e5%87%bd%e6%95%b0%e4%b8%ad%e7%9a%84-this-%e9%9d%9e%e9%9d%99%e6%80%81)
  - [总结](#%e6%80%bb%e7%bb%93)
    - [判断 this 指向的方法](#%e5%88%a4%e6%96%ad-this-%e6%8c%87%e5%90%91%e7%9a%84%e6%96%b9%e6%b3%95)
    - [执行过程解析](#%e6%89%a7%e8%a1%8c%e8%bf%87%e7%a8%8b%e8%a7%a3%e6%9e%90)

## `this` 疑问

以下的代码在浏览器环境运行

```javascript
var number = 5;
var obj = {
  number: 3,
  fn1: (function() {
    var number;
    this.number *= 2;
    number = number * 2;
    number = 3;
    return function() {
      var num = this.number;
      this.number *= 2;
      console.log(num);
      number *= 3;
      console.log(number);
    };
  })()
};

var fn1 = obj.fn1;
fn1.call(null);
obj.fn1();

console.log(window.number);
```

请问以上代码运行的结果是什么？

## 默认调用

默认绑定，在不能应用其它绑定规则时使用的默认规则，通常是独立函数调用。

```javascript
function sayHi() {
  console.log("Hello,", this.name);
}
var name = "YvetteLau";
sayHi();
```

在调用 `Hi()` 时，应用了默认绑定，`this` 指向全局对象（非严格模式下），严格模式下，`this` 指向 `undefined`，`undefined` 上没有 `this` 对象，会抛出错误。

上面的代码，如果在浏览器环境中运行，那么结果就是 `Hello,YvetteLau`

## 隐式绑定

函数的调用是在某个对象上触发的，即调用位置上存在上下文对象。典型的形式为 `XXX.fun().` 我们来看一段代码：

```javascript
function sayHi() {
  console.log("Hello,", this.name);
}
var person = {
  name: "YvetteLau",
  sayHi: sayHi
};
var name = "Wiliam";
person.sayHi();

// Hello,YvetteLau。
```

`sayHi` 函数声明在外部，严格来说并不属于 `person`，但是在调用 `sayHi` 时, 调用位置会使用 `person` 的上下文来引用函数，隐式绑定会把函数调用中的 `this`(即此例 `sayHi` 函数中的 `this`) 绑定到这个上下文对象（即此例中的 `person`）。

需要注意的是：对象属性链中只有最后一层会影响到调用位置。

```javascript
function sayHi() {
  console.log("Hello,", this.name);
}
var person2 = {
  name: "Christina",
  sayHi: sayHi
};
var person1 = {
  name: "YvetteLau",
  friend: person2
};
person1.friend.sayHi();

// Hello, Christina
```

因为只有最后一层会确定 `this` 指向的是什么，不管有多少层，在判断 `this` 的时候，我们只关注最后一层，即此处的 `friend`。

隐式绑定有一个大陷阱，绑定很容易丢失 (或者说容易给我们造成误导，我们以为 `this` 指向的是什么，但是实际上并非如此)

```javascript
function sayHi() {
  console.log("Hello,", this.name);
}
var person = {
  name: "YvetteLau",
  sayHi: sayHi
};
var name = "Wiliam";
var Hi = person.sayHi;
Hi();

// Hello,Wiliam
```

这是为什么呢，`Hi` 直接指向了 `sayHi` 的引用，在调用的时候，跟 `person` 没有半毛钱的关系，针对此类问题，我建议大家只需牢牢继续这个格式:`XXX.fn()`;`fn()` 前如果什么都没有，那么肯定不是隐式绑定，但是也不一定就是默认绑定，这里有点小疑问，我们后来会说到。

除了上面这种丢失之外，隐式绑定的丢失是发生在回调函数中 (事件回调也是其中一种)，我们来看下面一个例子:

```javascript
function sayHi() {
  console.log("Hello,", this.name);
}
var person1 = {
  name: "YvetteLau",
  sayHi: function() {
    setTimeout(function() {
      console.log("Hello,", this.name);
    });
  }
};
var person2 = {
  name: "Christina",
  sayHi: sayHi
};
var name = "Wiliam";
person1.sayHi();
setTimeout(person2.sayHi, 100);
setTimeout(function() {
  person2.sayHi();
}, 200);

// Hello, Wiliam
// Hello, Wiliam
// Hello, Christina
```

- 第一条输出很容易理解，`setTimeout` 的回调函数中，`this` 使用的是默认绑定，非严格模式下，执行的是全局对象；

- 第二条输出是不是有点迷惑了？说好 `XXX.fun()` 的时候，`fun` 中的 `this` 指向的是 `XXX` 呢，为什么这次却不是这样了！Why?

  其实这里我们可以这样理解: `setTimeout(fn,delay){ fn(); }`, 相当于是将 `person2.sayHi` 赋值给了一个变量，最后执行了变量，这个时候，`sayHi` 中的 `this` 显然和 `person2` 就没有关系了。

- 第三条虽然也是在 `setTimeout` 的回调中，但是我们可以看出，这是执行的是 `person2.sayHi()` 使用的是隐式绑定，因此这是 `this` 指向的是 `person2`，跟当前的作用域没有任何关系。

## 显式绑定

显式绑定比较好理解，就是通过 `call,apply,bind` 的方式，显式的指定 `this` 所指向的对象

`call,apply` 和 `bind` 的第一个参数，就是对应函数的 `this` 所指向的对象。`call` 和 `apply` 的作用一样，只是传参方式不同。`call` 和 `apply` 都会执行对应的函数，而 `bind` 方法不会。

```javascript
function sayHi() {
  console.log("Hello,", this.name);
}
var person = {
  name: "YvetteLau",
  sayHi: sayHi
};
var name = "Wiliam";
var Hi = person.sayHi;
Hi.call(person); //Hi.apply(person)

// Hello, YvetteLau
```

输出的结果为: `Hello, YvetteLau` 因为使用硬绑定明确将 this 绑定在了 person 上。

那么，使用了硬绑定，是不是意味着不会出现隐式绑定所遇到的绑定丢失呢？显然不是这样的，不信，继续往下看。

```javascript
function sayHi() {
  console.log("Hello,", this.name);
}
var person = {
  name: "YvetteLau",
  sayHi: sayHi
};
var name = "Wiliam";
var Hi = function(fn) {
  fn();
};
Hi(person.sayHi);
Hi.call(person, person.sayHi);

// Hello, Wiliam
// Hello, Wiliam
```

两次输出的结果是 `Hello, Wiliam`. 原因很简单，`Hi.call(person, person.sayHi)` 的确是将 `this` 绑定到 `Hi` 中的 `this` 了。但是在执行 `fn` 的时候，相当于直接调用了 `sayHi` 方法 (记住: `person.sayHi` 已经被赋值给 `fn` 了，隐式绑定也丢了)，没有指定 `this` 的值，对应的是默认绑定。

现在，我们希望绑定不会丢失，要怎么做？很简单，调用 `fn` 的时候，也给它硬绑定。

此时，输出的结果为: `Hello, YvetteLau`，因为 `person` 被绑定到 `Hi` 函数中的 `this` 上，`fn` 又将这个对象绑定给了 `sayHi` 的函数。这时，`sayHi` 中的 `this` 指向的就是 `person` 对象。

## `new` 绑定

`javaScript` 和`Ｃ＋＋`, `Java`不一样，并没有类，在 `javaScript` 中，构造函数只是使用 `new` 操作符时被调用的函数，这些函数和普通的函数并没有什么不同，它不属于某个类，也不可能实例化出一个类。任何一个函数都可以使用 `new` 来调用，因此其实并不存在构造函数，而只有对于函数的“构造调用”。

使用 `new` 来调用函数，会自动执行下面的操作：

1. 创建一个新对象；

2. 将构造函数的作用域赋值给新对象，即 `this` 指向这个新对象；

3. 执行构造函数中的代码；

4. 返回新对象。

因此，我们使用 `new` 来调用函数的时候，就会新对象绑定到这个函数的 `this` 上。

```javascript
function sayHi(name) {
  this.name = name;
}
var Hi = new sayHi("Yevtte");
console.log("Hello,", Hi.name);

// Hello, Yevtte
```

输出结果为 `Hello, Yevtte`, 原因是因为在 `var Hi = new sayHi('Yevtte');` 这一步，会将 `sayHi` 中的 `this` 绑定到 `Hi` 对象上。

## 绑定优先级

我们知道了 `this` 有四种绑定规则，但是如果同时应用了多种规则，怎么办？

显然，我们需要了解哪一种绑定方式的优先级更高，这四种绑定的优先级为:

`new` 绑定 > 显式绑定 > 隐式绑定 > 默认绑定

这个规则时如何得到的，大家如果有兴趣，可以自己写个 `demo` 去测试，或者记住上面的结论即可。

## 绑定例外情况

凡事都有例外，`this` 的规则也是这样。

如果我们将 `null` 或者是 `undefined` 作为 `this` 的绑定对象传入 `call`、`apply` 或者是 `bind`, 这些值在调用时会被忽略，实际应用的是默认绑定规则。

```javascript
function sayHi() {
  console.log("Hello,", this.name);
}
var person = {
  name: "YvetteLau",
  sayHi: sayHi
};
var name = "Wiliam";
var Hi = function(fn) {
  fn();
};
Hi.call(null, person.sayHi);

// Hello, Wiliam
```

输出的结果是 `Hello, Wiliam`，因为这时实际应用的是默认绑定规则。

## 箭头函数

*箭头函数*是 _ES6_ 中新增的，它和普通函数有一些区别，箭头函数没有自己的 `this`，它的 `this` 继承于外层代码库中的 `this`。箭头函数在使用时，需要注意以下几点:

1. 函数体内的 `this` 对象，继承的是外层代码块的 `this`。

2. 不可以当作构造函数，也就是说，不可以使用 `new` 命令，否则会抛出一个错误。

3. 不可以使用 `arguments` 对象，该对象在函数体内不存在。如果要用，可以用 `rest` 参数代替。

4. 不可以使用 `yield` 命令，因此箭头函数不能用作 `Generator` 函数。

5. 箭头函数没有自己的 `this`，所以不能用 `call()`、`apply()`、`bind()` 这些方法去改变 `this` 的指向.

```javascript
var obj = {
  hi: function() {
    console.log(this);
    return () => {
      console.log(this);
    };
  },
  sayHi: function() {
    return function() {
      console.log(this);
      return () => {
        console.log(this);
      };
    };
  },
  say: () => {
    console.log(this);
  }
};
let hi = obj.hi(); // 输出 obj 对象
hi(); // 输出 obj 对象
let sayHi = obj.sayHi();
let fun1 = sayHi(); // 输出 window
fun1(); // 输出 window
obj.say(); // 输出 window

// {hi: ƒ, sayHi: ƒ, say: ƒ}
// {hi: ƒ, sayHi: ƒ, say: ƒ}
// Window {parent: Window, opener: null, top: Window, length: 1, frames: Window, …}
// Window {parent: Window, opener: null, top: Window, length: 1, frames: Window, …}
// Window {parent: Window, opener: null, top: Window, length: 1, frames: Window, …}
```

那么这是为什么呢？如果大家说箭头函数中的 `this` 是定义时所在的对象，这样的结果显示不是大家预期的，按照这个定义，`say` 中的 `this` 应该是 `obj` 才对。

我们来分析一下上面的执行结果：

1. `obj.hi();` 对应了 `this` 的默认绑定规则，`this` 绑定在 `obj` 上，所以输出 `obj`，很好理解。

2. `hi();` 这一步执行的就是箭头函数，箭头函数继承上一个代码库的 `this`，刚刚我们得出上一层的 `this` 是 `obj`，显然这里的 `this` 就是 `obj`。

3. 执行 `sayHi();` 这一步也很好理解，我们前面说过这种隐式绑定丢失的情况，这个时候 this 执行的是默认绑定，`this` 指向的是全局对象 `window`。

4. `fun1();` 这一步执行的是箭头函数，如果按照之前的理解，`this` 指向的是箭头函数定义时所在的对象，那么这儿显然是说不通。OK，按照箭头函数的 `this` 是继承于外层代码库的 `this` 就很好理解了。外层代码库我们刚刚分析了，`this` 指向的是 `window`，因此这儿的输出结果是 `window`。

5. `obj.say();` 执行的是箭头函数，当前的代码块 `obj` 中是不存在 `this` 的，只能往上找，就找到了全局的 `this`，指向的是 `window`。

### 箭头函数中的 `this` 非静态

```javascript
var obj = {
  hi: function() {
    console.log(this);
    return () => {
      console.log(this);
    };
  },
  sayHi: function() {
    return function() {
      console.log(this);
      return () => {
        console.log(this);
      };
    };
  },
  say: () => {
    console.log(this);
  }
};
let sayHi = obj.sayHi();
let fun1 = sayHi(); // 输出 window
fun1(); // 输出 window

let fun2 = sayHi.bind(obj)(); // 输出 obj
fun2(); // 输出 obj

// Window {parent: Window, opener: null, top: Window, length: 0, frames: Window, …}
// Window {parent: Window, opener: null, top: Window, length: 0, frames: Window, …}
// {hi: ƒ, sayHi: ƒ, say: ƒ}
// {hi: ƒ, sayHi: ƒ, say: ƒ}
```

## 总结

### 判断 `this` 指向的方法

1. 函数是否在 `new` 中调用 (`new` 绑定)，如果是，那么 `this` 绑定的是新创建的对象。

2. 函数是否通过 `call`,`apply` 调用，或者使用了 `bind`(即硬绑定)，如果是，那么 `this` 绑定的就是指定的对象。

3. 函数是否在某个上下文对象中调用 (隐式绑定)，如果是的话，`this` 绑定的是那个上下文对象。一般是 `obj.foo()`。

4. 如果以上都不是，那么使用默认绑定。如果在严格模式下，则绑定到 `undefined`，否则绑定到全局对象。

5. 如果把 `null` 或者 `undefined` 作为 `this` 的绑定对象传入 `call`、`apply` 或者 `bind`，这些值在调用时会被忽略，实际应用的是默认绑定规则。

6. 如果是箭头函数，箭头函数的 `this` 继承的是外层代码块的 `this`。

### 执行过程解析

```javascript
var number = 5;
var obj = {
  number: 3,
  fn: (function() {
    var number;
    this.number *= 2;
    number = number * 2;
    number = 3;
    return function() {
      var num = this.number;
      this.number *= 2;
      console.log(num);
      number *= 3;
      console.log(number);
    };
  })()
};
var myFun = obj.fn;
myFun.call(null);
obj.fn();
console.log(window.number);
```

我们来分析一下，这段代码的执行过程。

1. 在定义 `obj` 的时候，`fn` 对应的闭包就执行了，返回其中的函数，执行闭包中代码时，显然应用不了 `new` 绑定 (没有出现 `new` 关键字)，硬绑定也没有 (没有出现 `call`,`apply`,`bind` 关键字), 隐式绑定有没有？很显然没有，如果没有 `XX.fn()`，那么可以肯定没有应用隐式绑定，所以这里应用的就是默认绑定了，非严格模式下 `this` 绑定到了 `window` 上 (浏览器执行环境)。

   这里很容易被迷惑的就是以为 `this` 指向的是 `obj`，一定要注意，除非是箭头函数，否则 `this` 跟词法作用域是两回事，一定要牢记在心

   ```javascript
   window.number \* = 2; //window.number 的值是 10(var number 定义的全局变量是挂在 window 上的)

   number = number \* 2; //number 的值是 NaN; 注意我们这边定义了一个 number，但是没有赋值，number 的值是 undefined;Number(undefined)->NaN

   number = 3; //number 的值为 3
   ```

2. `myFun.call(null);` 我们前面说了，`call` 的第一个参数传 `null`，调用的是默认绑定；

   ```javascript
   fn: function(){
     var num = this.number;
     this.number _= 2;
     console.log(num);
     number _= 3;
     console.log(number);
   }
   ```

   执行时:

   ```javascript
   var num = this.number; //num=10; 此时 this 指向的是 window
   this.number _ = 2; //window.number = 20
   console.log(num); // 输出结果为 10
   number _= 3; //number=9; 这个 number 对应的闭包中的 number; 闭包中的 number 的是 3
   console.log(number); // 输出的结果是 9
   ```

3. `obj.fn();` 应用了隐式绑定，`fn` 中的 `this` 对应的是 `obj`;

   ```javascript
   var num = this.number;//num = 3; 此时 this 指向的是 obj
   this.number _= 2; //obj.number = 6;
   console.log(num); // 输出结果为 3;
   number _= 3; //number=27; 这个 number 对应的闭包中的 number; 闭包中的 number 的此时是 9
   console.log(number);// 输出的结果是 27
   ```

4. 最后一步 `console.log(window.number);` 输出的结果是 `20`;

   因此组中结果为:

   ```javascript
   10
   9
   3
   27
   20
   ```
