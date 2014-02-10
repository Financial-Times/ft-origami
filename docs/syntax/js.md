---
layout: default
title: JavaScript
section: Syntax
permalink: /docs/syntax/js/
---

# JavaScript standards

These standards are written for module components, but parts can apply equally to non-component use cases.

## Browser support

Product developers are encouraged to include Origami JavaScript using a 'cuts the mustard' test to allow module developers to assume a minimum standard of support for JavaScript.  Minimum browser support standards for JavaScript are yet to be agreed, and are currently the subject of [issue 88](https://github.com/Financial-Times/ft-origami/issues/88).

## Encapsulation rules

* Add no objects to the global scope, other than JSONp callback function names.  Variables declared outside of any enclosing function are permitted, provided that the module requires a commonJS interface.  If you don't want to depend on CommonJS, wrap the module in an [IIFE](http://en.wikipedia.org/wiki/Immediately-invoked_function_expression).
* If the module does not require CommonJS it must include a [Universal Module Definition](https://github.com/umdjs/umd/blob/master/returnExports.js) that includes support for CommonJS.
* Do not execute any code on parse
* Export, at a minimum, an `init` and a `destroy` method
* Do not leave any non-garbage collectable traces after `destroy` is called
* Do not require global variables to be defined prior to the script loading.  If your module requires configuration, read the config from data attributes attached to parts of DOM that your module will own (see following section for details)
* Do not assume the existence of globals except those defined as part of ECMAScript 3 and features listed in the `browserFeatures/required` section of `origami.json`.

<aside>
	<h4>What about polyfills?</h4>
	Remember that the rule about globals applies to polyfills too.  Don't include polyfills in component code.  If you want to use a modern browser feature, you can a) declare it as a requirement in your Origami manifest; b) declare it as optional, test for it, and if not present, skip that functionality; or c) include code (either your own or a dependency that provides the feature <em>without adding it outside of your module scope</em>.
</aside>

## Data attributes

If a module requires configuration, this should be done using data- attributes on the HTML element that is the root element of the DOM owned by the module.  Data attributes should be named `data-{modulename}-{key}`, eg `data-tweet-id`.  The module may also create attributes of this form at runtime.

In some cases, especially for tracking use cases, a module may act on portions of DOM not exclusively controlled by it.  In this case the same naming conventions apply, but the module *must not* create these attributes itself.  Instead, it may only act on data- attributes outside of its own portions of 'owned DOM' if the element has already had the appropriate data attribute applied.

## DOM Selectors

When using selector engines other than native `querySelector`, modules *must not* use selectors that are incompatible with querySelector.  This allows for an easier future upgrade path to querySelector.

## Events

Modules *may* stop the propagation chain for events that they have created, but *must not* prevent default on browser events, since other modules, or indeed the product, may need to bind to those events for other reasons.

Any event listeners set up at page load *must* bind on the `<body>` element and use [event delegation](http://stackoverflow.com/questions/1687296/what-is-dom-event-delegation), and *must* be filtered based on the module's own class.

Modules *should* handle events during the [bubbling phase](http://stackoverflow.com/questions/4616694/what-is-event-bubbling-and-capturing), not the capturing phase.

## Functions

Modules *should* avoid containing functions with more than 3 arguments.  Where more parameters are required, consider passing an object.

## Animation

Modules *must not* animate elements using methods that do not utilise hardware acceleration if hardware accelerated alternatives are available.  For example, repositioning an element repeatedly using its `left` or `top` CSS properties is not allowed.  Instead, use [CSS transitions](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Using_CSS_transitions) and [`will-change`](http://tabatkins.github.io/specs/css-will-change/).  On user agents that do not support accelerated animation, animation *should* not be used.

## Syntax convention rules

JavaScript *must* be linted with [JSHint](http://www.jshint.com/).  If you wish to specify a particular JSHint configuration you may do so at the module level with a `.jshintrc` file, and at the file level with a `/*jshint: ... */` comment.  If you specify neither of these, code *must* pass a JSHint check with the following settings:

<?prettify linenums=1?>
	{
	  forin: true,
	  noarg: true,
	  noempty: true,
	  eqeqeq: true,
	  bitwise: true,
	  strict: true,
	  undef: true,
	  unused: true,
	  curly: true,
	  browser: true,
	  newcap: true,
	  immed: true,
	  trailing: true,
	  smarttabs: true
	}

Developers *should* stick to the above `jshintrc` config, since this represents a common standard across FT teams, but are permitted to make changes if desired.

## Subresources

JavaScript modules in Origami components may want to load additional files (fonts, JSON data, images etc) that are also part of the component's file tree.  To resolve these paths safely, JS modules wishing to load subresources from their own component *must* resolve the file path using the Origami module utilities module (**TODO**!):

<?prettify linenums=1?>
	var o = require('o-moduleutils');
	someiframe.src = o.resolve('tracking', '/img/logo.png');

Without any explicit configuration, Module Utils will assume, as we do for subresources in SASS, that the modules are installed publicly at a URL path of `/bower_components` on the current host, and will form URLs on that basis.  Product developers are advised to reconfigure Module Utils to accomodate their own server-side URL routing architecture.

## Hover events

Where JavaScript includes bindings to `mouse...` hover events (such as `mouseover`, `mouseout`, `mouseenter`, and `mouseleave`), the [o-hoverable](https://github.com/Financial-Times/o-hoverable) module must be used to make those hover capabilities configurable.
