# AngularJS - Components

- [AngularJS - Components](#angularjs---components)
  - [Creating and configuring a Components](#creating-and-configuring-a-components)
  - [Creating and configuring a Component](#creating-and-configuring-a-component)

## Creating and configuring a Components

In AngularJS, a Component is a special kind of directive that uses a simpler configuration which is suitable for a component-based application structure.

This makes it easier to write an app in a way that's similar to using Web Components or using the new Angular's style of application architecture.

Advantages of Components:

- simpler configuration than plain directives
- promote sane defaults and best practices
- optimized for component-based architecture
- writing component directives will make it easier to upgrade to Angular

When not to use Components:

- for directives that need to perform actions in compile and pre-link functions, because they aren't available
- when you need advanced directive definition options like priority, terminal, multi-element
- when you want a directive that is triggered by an attribute or CSS class, rather than an element

## Creating and configuring a Component

Components can be registered using the `.component()` method of an AngularJS module (returned by `angular.module()`). The method takes two arguments:

- The name of the Component (as string).
- The Component config object. (Note that, unlike the `.directive()` method, this method does not take a factory function.)

`index.js`

```js
angular.module('heroApp', []).controller('MainCtrl', function MainCtrl() {
  this.hero = {
    name: 'Spawn'
  };
});
```

`index.html`

```html
<!-- components match only elements -->
<div ng-controller="MainCtrl as ctrl">
  <b>Hero</b><br>
  <hero-detail hero="ctrl.hero"></hero-detail>
</div>
```

`heroDetail.js`

```js
angular.module('heroApp').component('heroDetail', {
  templateUrl: 'heroDetail.html',
  bindings: {
    hero: '='
  }
});
```

`heroDetail.html`

```html
<span>Name: {{$ctrl.hero.name}}</span>
```

It's also possible to add components via `$compileProvider` in a module's config phase.

