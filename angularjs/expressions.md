# AngularJS Expressions

- [AngularJS Expressions](#angularjs-expressions)
  - [AngularJS Expressions vs. JavaScript Expressions](#angularjs-expressions-vs-javascript-expressions)
  - [Example](#example)
  - [Context](#context)
  - [Forgiving](#forgiving)
  - [No Control Flow Statements](#no-control-flow-statements)
  - [No function declarations or RegExp creation with literal notation](#no-function-declarations-or-regexp-creation-with-literal-notation)
  - [`$event`](#event)
  - [One-time binding](#one-time-binding)

AngularJS expressions are JavaScript-like code snippets that are mainly placed in interpolation bindings such as `<span title="{{ attrBinding }}">{{ textBinding }}</span>`, but also used directly in directive attributes such as `ng-click="functionExpression()"`.

For example, these are valid expressions in AngularJS:

- `1+2`
- `a+b`
- `user.name`
- `items[index]`

## AngularJS Expressions vs. JavaScript Expressions

AngularJS expressions are like JavaScript expressions with the following differences:

- **Context:** JavaScript expressions are evaluated against the global `window`. In AngularJS, expressions are evaluated against a `scope` object.
- **Forgiving:** In JavaScript, trying to evaluate `undefined` properties generates `ReferenceError` or `TypeError`. In AngularJS, expression evaluation is forgiving to `undefined` and `null`.
- **Filters:** You can use filters within expressions to format data before displaying it.
- **No Control Flow Statements:** You cannot use the following in an AngularJS expression: conditionals, loops, or exceptions.
- **No Function Declarations:** You cannot declare functions in an AngularJS expression, even inside `ng-init` directive.
- **No RegExp Creation With Literal Notation:** You cannot create regular expressions in an AngularJS expression. An exception to this rule `is ng-pattern` which accepts valid RegExp.
- **No Object Creation With New Operator:** You cannot use `new` operator in an AngularJS expression.
- **No Bitwise, Comma, And Void Operators:** You cannot use `Bitwise`, `,` or `void` operators in an AngularJS expression.

## Example

`index.html`

```html
<span>
  1+2={{1+2}}
</span>
```

You can try evaluating different expressions here:

`index.html`

```html
<div ng-controller="ExampleController" class="expressions">
  Expression:
  <input type='text' ng-model="expr" size="80"/>
  <button ng-click="addExp(expr)">Evaluate</button>
  <ul>
   <li ng-repeat="expr in exprs track by $index">
     [ <a href="" ng-click="removeExp($index)">X</a> ]
     <code>{{expr}}</code> => <span ng-bind="$parent.$eval(expr)"></span>
    </li>
  </ul>
</div>
```

`script.js`

```js
angular.module('expressionExample', [])
.controller('ExampleController', ['$scope', function($scope) {
  var exprs = $scope.exprs = [];
  $scope.expr = '3*10|currency';
  $scope.addExp = function(expr) {
    exprs.push(expr);
  };

  $scope.removeExp = function(index) {
    exprs.splice(index, 1);
  };
}]);
```

## Context

AngularJS does not use JavaScript's `eval()` to evaluate expressions. Instead AngularJS's `$parse` service processes these expressions.

AngularJS expressions do not have direct access to global variables like `window`, `document` or `location`. This restriction is intentional. It prevents accidental access to the global state – a common source of subtle bugs.

Instead use services like `$window` and `$location` in functions on controllers, which are then called from expressions. Such services provide mockable access to globals.

It is possible to access the context object using the identifier `this` and the locals object using the identifier `$locals`.

`index.html`

```html
<div class="example2" ng-controller="ExampleController">
  Name: <input ng-model="name" type="text"/>
  <button ng-click="greet()">Greet</button>
  <button ng-click="window.alert('Should not see me')">Won't greet</button>
</div>
```

`script.js`

```js
angular.module('expressionExample', [])
.controller('ExampleController', ['$window', '$scope', function($window, $scope) {
  $scope.name = 'World';

  $scope.greet = function() {
    $window.alert('Hello ' + $scope.name);
  };
}]);
```

## Forgiving

Expression evaluation is forgiving to `undefined` and `null`. In JavaScript, evaluating `a.b.c` throws an exception if `a` is not an object. While this makes sense for a general purpose language, the expression evaluations are primarily used for data binding, which often look like this:

`{{a.b.c}}`

It makes more sense to show nothing than to throw an exception if a is `undefined` (perhaps we are waiting for the server response, and it will become defined soon). If expression evaluation wasn't forgiving we'd have to write bindings that clutter the code, for example: `{{((a||{}).b||{}).c}}`

Similarly, invoking a function `a.b.c()` on `undefined` or `null` simply returns `undefined`.

## No Control Flow Statements

Apart from the ternary operator (`a ? b : c`), you cannot write a control flow statement in an expression. The reason behind this is core to the AngularJS philosophy that application logic should be in controllers, not the views. If you need a real conditional, loop, or to throw from a view expression, delegate to a JavaScript method instead.

## No function declarations or RegExp creation with literal notation

You can't declare functions or create regular expressions from within AngularJS expressions. This is to avoid complex model transformation logic inside templates. Such logic is better placed in a controller or in a dedicated filter where it can be tested properly.

## `$event`

Directives like `ngClick` and `ngFocus` expose a `$event` object within the scope of that expression. The object is an instance of a jQuery Event Object when jQuery is present or a similar jqLite object.

`index.html`

```html
<div ng-controller="EventController">
  <button ng-click="clickMe($event)">Event</button>
  <p><code>$event</code>: <pre> {{$event | json}}</pre></p>
  <p><code>clickEvent</code>: <pre>{{clickEvent | json}}</pre></p>
</div>
```

`script.js`

```js
angular.module('eventExampleApp', []).
controller('EventController', ['$scope', function($scope) {
  /*
   * expose the event object to the scope
   */
  $scope.clickMe = function(clickEvent) {
    $scope.clickEvent = simpleKeys(clickEvent);
    console.log(clickEvent);
  };

  /*
   * return a copy of an object with only non-object keys
   * we need this to avoid circular references
   */
  function simpleKeys(original) {
    return Object.keys(original).reduce(function(obj, key) {
      obj[key] = typeof original[key] === 'object' ? '{ ... }' : original[key];
      return obj;
    }, {});
  }
}]);
```

Note in the example above how we can pass in `$event` to `clickMe`, but how it does not show up in `{{$event}}`. This is because `$event` is outside the scope of that binding.

## One-time binding

An expression that starts with `::` is considered a one-time expression. One-time expressions will stop recalculating once they are stable, which happens after the first digest if the expression result is a non-undefined value (see value stabilization algorithm below).

`index.html`

```html
<div ng-controller="EventController">
  <button ng-click="clickMe($event)">Click Me</button>
  <p id="one-time-binding-example">One time binding: {{::name}}</p>
  <p id="normal-binding-example">Normal binding: {{name}}</p>
</div>
```

`script.js`

```js
angular.module('oneTimeBindingExampleApp', []).
controller('EventController', ['$scope', function($scope) {
  var counter = 0;
  var names = ['Igor', 'Misko', 'Chirayu', 'Lucas'];
  /*
   * expose the event object to the scope
   */
  $scope.clickMe = function(clickEvent) {
    $scope.name = names[counter % names.length];
    counter++;
  };
}]);
```

Reasons for using one-time binding
Value stabilization algorithm
Special case for object literals
How to benefit from one-time binding
