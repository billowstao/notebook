# AngularJS - Components

- [AngularJS - Components](#angularjs---components)
  - [Creating and configuring a Components](#creating-and-configuring-a-components)
  - [Creating and configuring a Component](#creating-and-configuring-a-component)
  - [Comparison between Directive definition and Component definition](#comparison-between-directive-definition-and-component-definition)
  - [Component-based application architecture](#component-based-application-architecture)

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

## Comparison between Directive definition and Component definition

|                    | Directive              | Component                        |
| ------------------ | ---------------------- | -------------------------------- |
| `bindings`         | No                     | Yes (binds to `controller`)      |
| `bindToController` | Yes (default: `false`) | No (use `bindings` instead)      |
| compile function   | Yes                    | No                               |
| controller         | Yes                    | Yes (default `function() {}`)    |
| controllerAs       | Yes (default: `false`) | Yes (default: `$ctrl`)           |
| link functions     | Yes                    | No                               |
| multiElement       | Yes                    | No                               |
| priority           | Yes                    | No                               |
| replace            | Yes (deprecated)       | No                               |
| require            | Yes                    | Yes                              |
| restrict           | Yes                    | No (restricted to elements only) |
| scope              | Yes (default: `false`) | No (scope is always isolate)     |
| template           | Yes                    | Yes, injectable                  |
| templateNamespace  | Yes                    | No                               |
| templateUrl        | Yes                    | Yes, injectable                  |
| terminal           | Yes                    | No                               |
| transclude         | Yes (default: `false`) | Yes (default: `false`)           |

## Component-based application architecture

As already mentioned, the component helper makes it easier to structure your application with a component-based architecture. But what makes a component beyond the options that the component helper has?

- **Components only control their own View and Data:** Components should never modify any data or DOM that is out of their own scope. Normally, in AngularJS it is possible to modify data anywhere in the application through scope inheritance and watches. This is practical, but can also lead to problems when it is not clear which part of the application is responsible for modifying the data. That is why component directives use an isolate scope, so a whole class of scope manipulation is not possible.
- **Components have a well-defined public API - Inputs and Outputs:** However, scope isolation only goes so far, because AngularJS uses two-way binding. So if you pass an object to a component like this - `bindings: {item: '='}`, and modify one of its properties, the change will be reflected in the parent component. For components however, only the component that owns the data should modify it, to make it easy to reason about what data is changed, and when. For that reason, components should follow a few simple conventions:
  - Inputs should be using `<` and `@` bindings. The `<` symbol denotes [one-way bindings](https://docs.angularjs.org/api/ng/service/$compile#-scope-) which are available since 1.5. The difference to `=` is that the bound properties in the component scope are not watched, which means if you assign a new value to the property in the component scope, it will not update the parent scope. Note however, that both parent and component scope reference the same object, so if you are changing object properties or array elements in the component, the parent will still reflect that change. The general rule should therefore be to never change an object or array property in the component scope. `@` bindings can be used when the input is a string, especially when the value of the binding doesn't change.

    ```js
    bindings: {
      hero: '<',
      comment: '@'
    }
    ```

  - Outputs are realized with `&` bindings, which function as callbacks to component events.

    ```js
    bindings: {
      onDelete: '&',
      onUpdate: '&'
    }
    ```

  - Instead of manipulating Input Data, the component calls the correct Output Event with the changed data. For a deletion, that means the component doesn't delete the `hero` itself, but sends it back to the owner component via the correct event.

    ```html
    <!-- note that we use kebab-case for bindings in the template as usual -->
    <editable-field on-update="$ctrl.update('location', value)"></editable-field><br>
    <button ng-click="$ctrl.onDelete({hero: $ctrl.hero})">Delete</button>
    ```

  - That way, the parent component can decide what to do with the event (e.g. delete an item or update the properties)

    ```js
    ctrl.deleteHero(hero) {
      $http.delete(...).then(function() {
        var idx = ctrl.list.indexOf(hero);
        if (idx >= 0) {
          ctrl.list.splice(idx, 1);
        }
      });
    }
    ```

- **Components have a well-defined lifecycle:** Each component can implement "lifecycle hooks". These are methods that will be called at certain points in the life of the component. The following hook methods can be implemented:
  - `$onInit()` - Called on each controller after all the controllers on an element have been constructed and had their bindings initialized (and before the pre & post linking functions for the directives on this element). This is a good place to put initialization code for your controller.
  - `$onChanges(changesObj)` - Called whenever one-way bindings are updated. The `changesObj` is a hash whose keys are the names of the bound properties that have changed, and the values are an object of the form `{ currentValue, previousValue, isFirstChange() }`. Use this hook to trigger updates within a component such as cloning the bound value to prevent accidental mutation of the outer value.
  - `$doCheck()` - Called on each turn of the digest cycle. Provides an opportunity to detect and act on changes. Any actions that you wish to take in response to the changes that you detect must be invoked from this hook; implementing this has no effect on when `$onChanges` is called. For example, this hook could be useful if you wish to perform a deep equality check, or to check a Date object, changes to which would not be detected by AngularJS's change detector and thus not trigger `$onChanges`. This hook is invoked with no arguments; if detecting changes, you must store the previous value(s) for comparison to the current values.
