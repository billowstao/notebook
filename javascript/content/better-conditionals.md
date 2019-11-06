# 编写良好的条件表达式

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

在重构版本中，还包括*析构*和*默认参数*。*默认参数*确保如果我们将 `undefined` 作为参数传递给方法，我们仍然有一个要析构的值，这里是一个空对象 `{}`。

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

## Default Parameters and Destructuring

## Match all/partial criteria using Array.every & Array.some

## Use Optional Chaining and Nullish Coalescing
