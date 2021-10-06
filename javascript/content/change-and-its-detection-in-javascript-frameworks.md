# Change And Its Detection In JavaScript Frameworks

> Posted on Monday Mar 2, 2015 by [Tero Parviainen](http://teropa.info/) ([@teropa](https://twitter.com/teropa))

In 2015 there is no shortage of options when it comes to JavaScript frameworks. Between Angular, Ember, React, Backbone, and their numerous competitors, there's plenty to choose from.

One can compare these frameworks in various ways, but I think one of the most interesting differences between them is the way they manage state. In particular, it is useful to think about what these frameworks do when state changes over time. What tools do they give you to reflect that change in your user interface?

Managing the synchronization of app state and the user interface has long been a major source of complexity in UI development, and by now we have several different approaches to dealing with it. This article explores a few of them: Ember's data binding, Angular's dirty checking, React's virtual DOM, and its relationship to immutable data structures.

## Projecting Data

The basic task we're talking about is taking the internal state of the program and mapping it to something visible on the screen. You take an assortment of objects, arrays, strings, and numbers and end up with a tree of text paragraphs, forms, links, buttons, and images. On the web, the former is usually represented as JavaScript data structures, and the latter as the [Document Object Model](https://dom.spec.whatwg.org/)

We often call this process rendering, and you can think of it as a projection of your data model to a visible user interface. When you render a template with your data, you get a DOM (or HTML) representation of that data.

![Projecting Data](./resource/onchange-base.svg)

This by itself is simple enough: While the mapping from data model to UI may not always be trivial, it's basically still just a function with straightforward inputs and outputs.

Where things start to get more challenging is when we start talking about data changing over time. This can happen when the user interacts with the UI, or when something else happens in the world that updates the data. The UI needs to reflect this change. Furthermore, because rebuilding DOM trees is expensive, we'd like to do as little work as possible to get that updated data on the screen.

![Projecting Data - Changes](./resource/onchange-change.svg)

This is a much more difficult problem than merely rendering a UI once, since it involves state changes. This is also where the solutions out there begin to show their differences.

## Server-Side Rendering: Reset The Universe

> "There is no change. The universe is immutable."

Before the era of Big JavaScript, every interaction you had with a web application used to trigger a server roundtrip. Each click and each form submission meant that the webpage unloaded, a request was sent to the server, the server responded with a new page that the browser then rendered.

![Server side](./resource/onchange-reload.svg)

With this approach, there wasn't really any state to manage in the front-end. Each time something happened, that was the end of the universe, as far as the browser was concerned. Whatever state there was, it was a backend concern. The frontend was just some generated HTML and CSS, with perhaps a bit of JavaScript sprinkled on top.

While this was a very simple approach from a front-end perspective, it was also very slow. Not only did each interaction mean a full re-rendering of the UI, it was also a remote re-rendering, with a full roundtrip to a faraway data center.

Most of us don't do this in our apps anymore. We may render the initial state of our app server-side but then switch to managing things in the front-end (which is what [isomorphic JavaScript](https://en.wikipedia.org/wiki/Isomorphic_JavaScript) is largely about). There are people that are still succeeding with [more sophisticated versions of this pattern](https://signalvnoise.com/posts/3112-how-basecamp-next-got-to-be-so-damn-fast-without-using-much-client-side-ui) though.

## First-gen JS: Manual Re-rendering

> "I have no idea what I should re-render. You figure it out."

The first generations of JavaScript frameworks, like [Backbone.js](https://backbonejs.org/), [Ext JS](https://www.sencha.com/products/extjs/), and [Dojo](https://dojotoolkit.org/), introduced for the first time an actual data model in the browser, instead of just having some light-weight scripting on top of the DOM. That also meant that for the first time you had changing state in the browser. The contents of the data model could change, and then you had to get those changes reflected in the user interface.

While these frameworks gave you the architecture for separating your UI code from your models, they still left the synchronization between the two up to you. You can get some sort of events when changes occur, but it is your responsibility to figure out what to re-render and how to go about it.

![First-gen JS: Manual re-rendering](./resource/onchange-manual.svg)

The performance considerations of this model are also left largely to you as an application developer. Since you control what gets updated and when, you can tweak it pretty much as you'd like. It often becomes a balancing act between the simplicity of re-rendering large sections of the page, and the performance of re-rendering just the bits that need updating.

## Ember.js: Data Binding

> "I know exactly what changed and what should be re-rendered because I control your models and views."

Having to manually figure out re-rendering when app state changes is one of the major sources of incidental complexity in first-gen JavaScript apps. A number of frameworks aim to eliminate that particular problem. [Ember.js](https://emberjs.com/) is one of them.

Ember, just like Backbone, sends out events from the data model when changes occur. The difference is that with Ember, there's also something the framework provides for the receiving end of the event. You can [bind](https://guides.emberjs.com/release/components/template-lifecycle-dom-and-modifiers/) the UI to the data model, which means that there is a listener for update events attached to the UI. That listener knows what updates to make when it receives an event.

![Ember.js data binding](./resource/onchange-kvo.svg)

This makes for a pretty efficient update mechanism: Though setting all the bindings up takes a bit of work initially, after that the effort needed to keep things in sync is minimal. When something changes, only the parts of the app that actually need to do something will activate.

The big tradeoff of this approach is that Ember must always be aware of changes that occur in the data model. That means you need to have your data in special objects that inherit from Ember's APIs, and that you need to change your data using special setter methods. You can't say `foo.x = 42`. You have to say `foo.set('x', 42)`, and so on.

In the future this may be helped somewhat by the arrival of [Proxy in ECMAScript 6](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy). It lets Ember decorate regular objects with its binding code, so that all the code that interacts with those objects doesn't necessarily need to adhere to the setter conventions.

# AngularJS: Dirty Checking

> "I have no idea what changed, so I'll just check everything that may need updating."

Like Ember, Angular also aims to solve the problem of having to manually re-render when things have changed. However, it approaches the problem from a different angle.

When you refer to your data in an Angular template, for example in an expression like `{{foo.x}}`, Angular not only renders that data but also creates a watcher for that particular value. After that, whenever anything happens in your app, Angular checks if the value in that watcher has changed from the last time. If it has, it re-renders the value in the UI. The process of running these watchers is called dirty checking.

![AngularJS Dirty Checking](./resource/onchange-watch.svg)

The great benefit of this style of change detection is that now you can use anything in your data models. Angular puts no restrictions on that - it doesn't care. There are no base objects to extend and no APIs to implement.

The downside is that as the data model now doesn't have any built-in probes that would tell the framework about changes, the framework doesn't have any insight into if and where it may have occurred. That means the model needs to be inspected for changes externally, and that is exactly what Angular does: All watchers are run every time anything happens. Click handlers, HTTP response processors, and timeouts all trigger a digest, which is the process responsible for running watchers.

Running all watchers all the time sounds like a performance nightmare, but it can be surprisingly fast. This is mostly because there's usually no DOM access happening until a change is actually detected, and pure JavaScript reference equality checks are cheap. But when you get into very large UIs, or need to render very often, additional performance optimization trickery may be required.

Like Ember, Angular will also benefit from upcoming standards: In particular, the [Proxy in ECMAScript 6](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) will be a good fit for Angular, as it gives you a native API for watching an object's properties for changes. It will not cover all the cases that Angular needs to support though, as Angular's watchers can do much more than just observe simple object attributes.

The upcoming Angular 2 will also bring some interesting updates on the change detection front, as has been described recently in [an article by Victor Savkin](http://victorsavkin.com/post/110170125256/change-detection-in-angular-2). Update 7.3.2015: Also see [Victor's ng-conf](https://www.youtube.com/watch?v=jvKGQSFQf10) talk about the subject.
