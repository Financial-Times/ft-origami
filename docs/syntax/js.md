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
* Do not modify the DOM outside of areas of [owned DOM]({{site.baseurl}}/docs/syntax/html/#owned_dom)
* Do not require global variables to be defined prior to the script loading.  If your module requires configuration, read the config from data attributes attached to parts of DOM that your module will own (see [Data attributes](#data_attributes) for details)
* Do not assume the existence of globals except those defined as part of ECMAScript 3 and features listed in the `browserFeatures/required` section of `origami.json`.

<aside>
	<h4>What about polyfills?</h4>
	Remember that the rule about globals applies to polyfills too.  Don't include polyfills in component code.  If you want to use a modern browser feature, you can a) declare it as a requirement in your Origami manifest; b) declare it as optional, test for it, and if not present, skip that functionality; or c) include code (either your own or a dependency that provides the feature <em>without adding it outside of your module scope</em>.
</aside>

## Data attributes

If a module's JavaScript requires configuration, this should be done using data- attributes on the HTML element that is the root element of the DOM owned by the module.  Data attributes should be named `data-{modulename}-{key}`, eg `data-tweet-id`.  The module may also create attributes of this form at runtime.

In some cases, especially for tracking use cases, a module may act on portions of DOM not exclusively controlled by it.  In this case the same naming conventions apply, but the module *must not* create these attributes itself.  Instead, it may only act on data- attributes outside of its own portions of 'owned DOM' if the element has already had the appropriate data attribute applied.

## DOM Selectors

When using selector engines other than native `querySelector`, modules *must not* use selectors that are incompatible with querySelector.  This allows for an easier future upgrade path to querySelector.

## Communicating with host page code and other components

Modules may wish to communicate, or make possible communication with other components of the same type, other components of different types, or non-component code in the host page.  This should be accomplished with DOM events and API methods.

### API

Modules *may* expose an external API via `module.exports`.  Modules *must not* rely on the existence of any APIs other than those that are explicitly required dependencies, explictly expressed in the `browserFeatures` property of origami.json, or defined as part of the DOM level 2 specification.

### Events

Modules *may* **emit** events to allow loose coupling with other components and the host page.  In doing do, the module *must*:

* use only browser-native DOM events with bubbling enabled
* specify `createevent` as a required browser feature in the `browserFeatures` section of origami.json
* where the module wishes to attach custom data payloads to events, specify `customevents` as a required browser feature in addition to 'createevent'
* trigger events only on elements within the component's owned DOM, or otherwise only on the body element
* namespace event names with the name of the module in camelcase, eg `oModuleNameEventName`

A valid example of a module emitting a DOM event is shown below:

<?prettify linenums=1?>
	this.dispatchEvent(new CustomEvent('oTestClick', {
	  detail: {...},
	  bubbles: true
	}));

Modules *may* **bind** to events emitted by themselves, other modules, the host page or the browser.  In doing so, the module *must*:

* *not* stop the progagation chain except for events created by itself
* bind only to the BODY element and use [event delegation](http://stackoverflow.com/questions/1687296/what-is-dom-event-delegation) to ensure that handlers do not need to be bound every time elements are created.

Modules *should* handle events during the [bubbling phase](http://stackoverflow.com/questions/4616694/what-is-event-bubbling-and-capturing), not the capturing phase (unless the event has no bubbling phase)

## Functions

Modules *should* avoid containing functions with more than 3 arguments.  Where more parameters are required, consider passing an object (and if so, consider using [lo-dash's defaults function](http://lodash.com/docs#defaults)).

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

JavaScript modules in Origami components may want to load additional files (fonts, JSON data, images etc) that are also part of the component's file tree.  To resolve these paths safely, JS modules wishing to load subresources from their own component *must* resolve the file path using the [Origami assets module](https://github.com/Financial-Times/o-assets):

<?prettify linenums=1?>
	someiframe.src = require('o-assets').resolve('/img/logo.png', 'tracking');

Without any explicit configuration, `o-assets` will assume, as we do for subresources in SASS, that the modules are installed publicly at a URL path of `/bower_components` on the current host, and will form URLs on that basis.  Product developers are advised to reconfigure o-assets to accomodate their own server-side URL routing architecture.

### Inlining subresources

In some cases it may be desirable or necessary to include the content of a static asset in a JavaScript source bundle (typically to include templates).  To do this, use the `fs::readFileSync` method from NodeJS.  In the [standard Origami build process]({{site.baseurl}}/docs/developer-guide/building-modules) this will be converted into an inline string assignment using the [brfs](https://github.com/substack/brfs) transform ([learn more](https://github.com/Financial-Times/ft-origami/issues/110)).

You would write this in your JavaScript source:

<?prettify linenums=1?>
	var template = require('fs').readFileSync('main.mustache');

And it would be converted to this by the build process:

<?prettify linenums=1?>
	var template = "This is the content of main.mustache";


## Hover events

Where JavaScript includes bindings to `mouse...` hover events (such as `mouseover`, `mouseout`, `mouseenter`, and `mouseleave`), the [o-hoverable](https://github.com/Financial-Times/o-hoverable) module must be used to make those hover capabilities configurable.
