# AngularJS Expressions

- [AngularJS Expressions](#angularjs-expressions)
  - [AngularJS Expressions vs. JavaScript Expressions](#angularjs-expressions-vs-javascript-expressions)

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

Example
Context
Forgiving
No Control Flow Statements
No function declarations or RegExp creation with literal notation
$event
One-time binding
Reasons for using one-time binding
Value stabilization algorithm
Special case for object literals
How to benefit from one-time binding
