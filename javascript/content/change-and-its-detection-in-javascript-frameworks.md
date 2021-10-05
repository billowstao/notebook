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
