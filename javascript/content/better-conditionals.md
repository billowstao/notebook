# 编写良好的条件表达式

- [编写良好的条件表达式](#%e7%bc%96%e5%86%99%e8%89%af%e5%a5%bd%e7%9a%84%e6%9d%a1%e4%bb%b6%e8%a1%a8%e8%be%be%e5%bc%8f)
  - [Array.includes](#arrayincludes)
  - [提前退出 / 提前返回](#%e6%8f%90%e5%89%8d%e9%80%80%e5%87%ba--%e6%8f%90%e5%89%8d%e8%bf%94%e5%9b%9e)
  - [使用字面值 Object 或 Map 而不是 Switch 语句](#%e4%bd%bf%e7%94%a8%e5%ad%97%e9%9d%a2%e5%80%bc-object-%e6%88%96-map-%e8%80%8c%e4%b8%8d%e6%98%af-switch-%e8%af%ad%e5%8f%a5)
  - [默认参数与解构](#%e9%bb%98%e8%ae%a4%e5%8f%82%e6%95%b0%e4%b8%8e%e8%a7%a3%e6%9e%84)
  - [使用 Array.every &amp; Array.some 匹配所有/部分条件](#%e4%bd%bf%e7%94%a8-arrayevery-amp-arraysome-%e5%8c%b9%e9%85%8d%e6%89%80%e6%9c%89%e9%83%a8%e5%88%86%e6%9d%a1%e4%bb%b6)
  - [使用可选链和 Nullish 合并](#%e4%bd%bf%e7%94%a8%e5%8f%af%e9%80%89%e9%93%be%e5%92%8c-nullish-%e5%90%88%e5%b9%b6)
  - [参考](#%e5%8f%82%e8%80%83)

## `Array.includes`

多条件语句使用`Array.includes`

举个例子

```javascript
function printAnimals(animal) {
  if (animal === 'dog' || animal === 'cat') {
    console.log(`I have a ${animal}`);
  }
}

console.log(printAnimals('dog')); // I have a dog
```

这种写法在条件比较少的情况下看起来没有问题，此时我们只有 2 种动物，但是如果我们有更多的条件需要判断（更多的动物）呢？如果我们继续拓展判断的条件，那么代码将会变得难以维护，而且逻辑会不清晰。

解决方法

可以使用`Array.includes`来重写条件语句

```javascript
function printAnimals(animal) {
  const animals = ['dog', 'cat', 'hamster', 'turtle'];

  if (animals.includes(animal)) {
    console.log(`I have a ${animal}`);
  }
}

console.log(printAnimals('hamster')); // I have a hamster
```

在这里，我们创建了一个动物数组，以便将条件与代码的其余部分分开提取。现在，如果我们想要检查任何其他动物，我们需要做的就是添加一个新的数组项。

我们还可以在这个函数的范围之外使用 `animals` 变量，以便在代码的其他地方重用它。这是一种编写更清晰、更容易理解和维护的代码的方法。不是吗?

## 提前退出 / 提前返回

这是一个非常好的技巧来压缩你的代码，使它看起来更简洁。让我们以前面的示例为例，添加更多的条件。如果这个动物不是一个简单的字符串，而是一个具有某些属性的对象呢?

所以现在的要求是:

- 如果没有动物，抛出一个错误
- 打印动物的类型
- 打印动物的名字
- 打印动物的性别

```javascript
const printAnimalDetails = animal => {
  let result; // declare a variable to store the final value

  // condition 1: check if animal has a value
  if (animal) {

    // condition 2: check if animal has a type property
    if (animal.type) {

      // condition 3: check if animal has a name property
      if (animal.name) {

        // condition 4: check if animal has a gender property
        if (animal.gender) {
          result = `${animal.name} is a ${animal.gender} ${animal.type};`;
        } else {
          result = "No animal gender";
        }
      } else {
        result = "No animal name";
      }
    } else {
      result = "No animal type";
    }
  } else {
    result = "No animal";
  }

  return result;
};

console.log(printAnimalDetails()); // 'No animal'

console.log(printAnimalDetails({ type: "dog", gender: "female" })); // 'No animal name'

console.log(printAnimalDetails({ type: "dog", name: "Lucy" })); // 'No animal gender'

console.log(
  printAnimalDetails({ type: "dog", name: "Lucy", gender: "female" })
); // 'Lucy is a female dog'
```

上面的代码它工作得很好，但是代码很长，很难维护。如果不使用提示工具，可能会浪费一些时间来确定右括号的位置。想象将会发生什么如果代码更复杂的逻辑。很多`if...else`的语句!

我们可以使用*三元操作符*、`&&`条件等来重构上面的函数，但是让我们使用多个返回语句来编写更精确的代码。

```javascript
const printAnimalDetails = ({type, name, gender } = {}) => {
  if(!type) return 'No animal type';
  if(!name) return 'No animal name';
  if(!gender) return 'No animal gender';

// Now in this line of code, we're sure that we have an animal with all //the three properties here.

  return `${name} is a ${gender} ${type}`;
}

console.log(printAnimalDetails()); // 'No animal type'

console.log(printAnimalDetails({ type: dog })); // 'No animal name'

console.log(printAnimalDetails({ type: dog, gender: female })); // 'No animal name'

console.log(printAnimalDetails({ type: dog, name: 'Lucy', gender: 'female' })); // 'Lucy is a female dog'
```

在重构版本中，还包括*解构*和*默认参数*。*默认参数*确保如果我们将 `undefined` 作为参数传递给方法，我们仍然有一个要解构的值，这里是一个空对象 `{}`。

通常，代码是在这两种方法之间编写的。

举个例子

```javascript
function printVegetablesWithQuantity(vegetable, quantity) {
  const vegetables = ['potato', 'cabbage', 'cauliflower', 'asparagus'];

  // condition 1: vegetable should be present
   if (vegetable) {
     // condition 2: must be one of the item from the list
     if (vegetables.includes(vegetable)) {
       console.log(`I like ${vegetable}`);

       // condition 3: must be large quantity
       if (quantity >= 10) {
         console.log('I have bought a large quantity');
       }
     }
   } else {
     throw new Error('No vegetable from the list!');
   }
 }

 printVegetablesWithQuantity(null); //  No vegetable from the list!
 printVegetablesWithQuantity('cabbage'); // I like cabbage
 printVegetablesWithQuantity('cabbage', 20);
 // 'I like cabbage`
 // 'I have bought a large quantity'
```

现在,我们有:

- 过滤无效条件的 `if/else` 语句
- 3 层嵌套的if语句(条件1、2和3)
- 一个通用的规则是当发现无效条件时尽早返回。

一个通用的规则是发现无效的条件时尽早返回

```javascript
function printVegetablesWithQuantity(vegetable, quantity) {

  const vegetables = ['potato', 'cabbage', 'cauliflower', 'asparagus'];

  // condition 1: throw error early
  if (!vegetable) throw new Error('No vegetable from the list!');

  // condition 2: must be in the list
  if (vegetables.includes(vegetable)) {
    console.log(`I like ${vegetable}`);

   // condition 3: must be a large quantity
    if (quantity >= 10) {
      console.log('I have bought a large quantity');
    }
  }
}
```

通过这样做，我们减少了一个嵌套语句的级别。

这种编码风格很好，特别是当使用长`if`语句时。

通过反转条件并提前返回，我们可以进一步减少嵌套`if`。

请看下面的条件2是怎么做的:

```javascript
function printVegetablesWithQuantity(vegetable, quantity) {

  const vegetables = ['potato', 'cabbage', 'cauliflower', 'asparagus'];

  if (!vegetable) throw new Error('No vegetable from the list!');
  // condition 1: throw error early

  if (!vegetables.includes(vegetable)) return;
  // condition 2: return from the function is the vegetable is not in
  //  the list


  console.log(`I like ${vegetable}`);

  // condition 3: must be a large quantity
  if (quantity >= 10) {
    console.log('I have bought a large quantity');
  }
}
```

通过反转条件2的条件，代码不再具有嵌套语句。

当我们有很多条件并且希望在任何特定条件不满足时停止进一步的处理时，这种技术是有用的。

因此，总是以减少嵌套和尽早返回为目标，但不要过度。

## 使用字面值 Object 或 Map 而不是 `Switch` 语句

让我们看一下下面的例子,我们想要根据颜色打印水果:

```javascript
function printFruits(color) {
  // use switch case to find fruits by color
  switch (color) {
    case 'red':
      return ['apple', 'strawberry'];
    case 'yellow':
      return ['banana', 'pineapple'];
    case 'purple':
      return ['grape', 'plum'];
    default:
      return [];
  }
}

printFruits(null); // []
printFruits('yellow'); // ['banana', 'pineapple']
```

上面的代码实现没有错误，但是很冗长，同样的结果可以使用更简洁的语法来实现。

```javascript
// use object literal to find fruits by color
const fruitColor = {
  red: ['apple', 'strawberry'],
  yellow: ['banana', 'pineapple'],
  purple: ['grape', 'plum']
};

function printFruits(color) {
  return fruitColor[color] || [];
}
```

同样的，也可以使用 `Map` 来实现：

```javascript
// use Map to find fruits by color
const fruitColor = new Map()
  .set('red', ['apple', 'strawberry'])
  .set('yellow', ['banana', 'pineapple'])
  .set('purple', ['grape', 'plum']);

function printFruits(color) {
  return fruitColor.get(color) || [];
}
```

`Map`是 ES5 以来可用的对象类型，它允许存 `key-value`。

对于上面的示例，可以使用 `Array.filter` 实现相同的结果。

```javascript
const fruits = [
  { name: 'apple', color: 'red' },
  { name: 'strawberry', color: 'red' },
  { name: 'banana', color: 'yellow' },
  { name: 'pineapple', color: 'yellow' },
  { name: 'grape', color: 'purple' },
  { name: 'plum', color: 'purple' }
];

function printFruits(color) {
  return fruits.filter(fruit => fruit.color === color);
}
```

## 默认参数与解构

在使用 JavaScript 时，我们总是需要检查 `null`/`undefined` 并分配默认值或编译中断。

```javascript
function printVegetablesWithQuantity(vegetable, quantity = 1) {
// if quantity has no value, assign 1

  if (!vegetable) return;
    console.log(`We have ${quantity} ${vegetable}!`);
  }
  //results
}

printVegetablesWithQuantity('cabbage'); // We have 1 cabbage!
printVegetablesWithQuantity('potato', 2); // We have 2 potato!
```

如果蔬菜是一个对象呢?我们可以分配一个默认参数吗?

```javascript
function printVegetableName(vegetable) {
  if (vegetable && vegetable.name) {
    console.log (vegetable.name);
  } else {
    console.log('unknown');
  }
}

printVegetableName(undefined); // unknown
printVegetableName({}); // unknown
printVegetableName({ name: 'cabbage', quantity: 2 }); // cabbage
```

在上面的示例中，我们希望打印蔬菜名(如果它可用)或打印 `unknown`。

我们可以通过使用默认参数&解构来避免条件`if (vegetable && vegetable.name){}`。

```javascript
// destructing - get name property only
// assign default empty object {}

function printVegetableName({name} = {}) {
  console.log (name || 'unknown');
}

printVegetableName(undefined); // unknown
printVegetableName({ }); // unknown
printVegetableName({ name: 'cabbage', quantity: 2 }); // cabbage
```

因为我们只需要属性名，所以我们可以使用 `{name}` 来改变参数的结构，然后我们可以在代码中使用 `name` 作为变量，而不是使用 `vegetable.name`。

我们还将一个空对象 `{}` 赋值为默认值，否则在执行 `printVegetableName(undefined)` 时，它将给出一个错误—— `Cannot destructure property name of undefined or null`，因为在 `undefined` 中没有 `name` 属性。

## 使用 `Array.every` & `Array.some` 匹配所有/部分条件

我们可以通过使用这些`Array`方法来减少代码行数。

下面的代码，我们想要检查是否所有的水果都是红色的:

```javascript
const fruits = [
  { name: 'apple', color: 'red' },
  { name: 'banana', color: 'yellow' },
  { name: 'grape', color: 'purple' }
];

function test() {
  let isAllRed = true;

  // condition: all fruits must be red
  for (let f of fruits) {
    if (!isAllRed) break;
    isAllRed = (f.color == 'red');
  }

  console.log(isAllRed); // false
}
```

上面的代码太过冗长，我们可以通过使用 `Array.every` 来减少代码行：

```javascript
const fruits = [
  { name: 'apple', color: 'red' },
  { name: 'banana', color: 'yellow' },
  { name: 'grape', color: 'purple' }
];

function test() {
  // condition: short way, all fruits must be red
  const isAllRed = fruits.every(f => f.color == 'red');

  console.log(isAllRed); // false
}
```

同样的，如果我们想要测试任何一个水果是否是红色的，我们可以使用 `Array.some`：

```javascript
const fruits = [
  { name: 'apple', color: 'red' },
  { name: 'banana', color: 'yellow' },
  { name: 'grape', color: 'purple' }
];

function test() {
  // condition: if any fruit is red
  const isAnyRed = fruits.some(f => f.color == 'red');

  console.log(isAnyRed); // true
}
```

## 使用可选链和 `Nullish` 合并

> [https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/%E5%8F%AF%E9%80%89%E9%93%BE](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/%E5%8F%AF%E9%80%89%E9%93%BE)

这两个功能对于 JavaScript 编写更简洁的条件非常有用。在编写本文时，它们还没有得到完全的支持，可能需要使用*Babel*进行编译。

可选链接能够处理类似树的结构，而不需要显式地检查中间节点是否存在，并且`Nullish`与可选链接结合使用非常有效，可以确保不存在节点的默认值。

举个例子:

```javascript
 const car = {
  model: 'Fiesta',
  manufacturer: {
  name: 'Ford',
  address: {
    street: 'Some Street Name',
    number: '5555',
    state: 'USA'
    }
  }
}

// to get the car model
const model = car && car.model || 'default model';

// to get the manufacturer street
const street = car && car.manufacturer && car.manufacturer.address &&
car.manufacturer.address.street || 'default street';

// request an un-existing property
const phoneNumber = car && car.manufacturer && car.manufacturer.address
&& car.manufacturer.phoneNumber;

console.log(model) // 'Fiesta'
console.log(street) // 'Some Street Name'
console.log(phoneNumber) // undefined
```

因此，如果我们想打印出来，如果汽车制造商来自美国，代码应该是这样的:

```javascript
const isManufacturerFromUSA = () => {
  if(car && car.manufacturer && car.manufacturer.address &&
  car.manufacturer.address.state === 'USA') {
    console.log('true');
  }
}

checkCarManufacturerState() // 'true'
```

可以清楚地看到，对于更复杂的对象结构，这会变得多么混乱。有一些第三方库，如 `lodash` 或`idx`，它们有自己的功能。例如 `lodash` 有 `_.get` 方法。但是，在 JavaScript 语言本身中引入这个特性。

以下是这些新功能的工作原理:

```javascript
// to get the car model
const model = car?.model ?? 'default model';

// to get the manufacturer street
const street = car?.manufacturer?.address?.street ?? 'default street';

// to check if the car manufacturer is from the USA
const isManufacturerFromUSA = () => {
  if(car?.manufacturer?.address?.state === 'USA') {
    console.log('true');
  }
}
```

目前在 Stage 3 阶段。

## 参考

> [Tips to write better Conditionals in JavaScript](https://dev.to/hellomeghna/tips-to-write-better-conditionals-in-javascript-2189)
