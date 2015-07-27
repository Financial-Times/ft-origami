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
* Do not read or modify the DOM on parse
* If it's possible for the module to create DOM nodes, timers, or otherwise occupy more than a token amount of memory, export a `destroy` method that reverts the module to a pre-`init` state.
* Do not leave any non-garbage collectable traces after `destroy` is called
* Do not modify the DOM outside of areas of [owned DOM]({{site.baseurl}}/docs/syntax/html/#owned-dom), except:
	* to add feature flag CSS classes to the `documentElement`; or
	* to add a new section of owned DOM to an element explicitly nominated by the host application (e.g. by the host application calling a method of the module's API and passing an element to which the module is asked to append its DOM)
* Do not require global variables to be defined prior to the script loading.  If your module requires configuration, read the config from data attributes attached to parts of DOM that your module will own (see [Data attributes](#data-attributes) for details)
* Do not assume the existence of globals except those defined as part of ECMAScript 5 and features listed in the `browserFeatures/required` section of `origami.json`.

<aside>
	<h4>What about polyfills?</h4>
	<p>Remember that the rule about globals applies to polyfills too.  Don't include polyfills in component code.  If you want to use a modern browser feature, you must:</p>
	<ul>
		<li>declare it as a requirement in your Origami manifest; or</li>
		<li>declare it as optional, test for it, and if not present, skip that functionality; or</li>
		<li>include code (either your own or a dependency that provides the feature <em>without adding it outside of your module scope</em>.</li>
	</ul>
	<p>Where modern browser features might be vendor-prefixed, you can get the correct prefixed version using <a href="https://github.com/Financial-Times/o-useragent">o-useragent</a>.</p>
</aside>

###Scoping and binding `this`

The value of `this` *should not* be copied into non-semantic variables such as `that`, `self` or `_this` in order to embed a child funtion context.  Instead, either use a semantic name, or bind the correct value of `this`.  Some object methods accept the intended value of `this` as an argument, such as [Array.prototype.filter](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/filter), and this method *should* be considered most preferred:


	arr.filter(function(item) {
	   this.blah();
	}, this);

As an alternative, use `bind`:


	fetch('http://blah.com/blah.json')
	  .then(function(response) {
	    return response.json();
	  }.bind(this));

If you do copy a reference to `this` into a separate variable, make it semantic:

<?prettify?>
	var post = this;

<aside>ES6 offers lexical <code>this</code> binding as part of arrow functions, which provides a much more elegant solution to this problem, but currently we require Origami code to be written in ES5 syntax.  ES6 methods that can be polyfilled by the <a href="https://cdn.polyfill.io">polyfill service</a> down to IE9 <em>may</em> be used (e.g. Promises), provided the component <a href="http://origami.ft.com/docs/syntax/origamijson/#format">declares each feature in the <code>browserFeatures</code> section of its <code>origami.json</code> file</a>.</aside>



## Initialisation

Modules *must* do as little as possible on parse, instead deferring start-up tasks to a publicly exported, static 'init' function that should be either invoked explicitly using the module's API, or automatically by binding to the `o.DOMContentLoaded` or `o.load` events.

Where modules bind to the `o.DOMContentLoaded` or `o.load` events, their `init` method *must* be callable with no arguments, that is, they *may* accept arguments, but if they do, all such arguments *must* be optional (see [issue 228](https://github.com/Financial-Times/ft-origami/pull/228)).

Modules that expose an `init` method or an instance constructor which takes an argument identifying an area of owned DOM *must* allow all of the following types of references:

* An [`HTMLElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) object
* A string containing a valid querySelector expression, e.g. ".main-content > [data-o-component~='o-share']"
* Nothing (or any falsey value), which should be interpreted as `document.body`

Where this reference is passed to an `init` function, the module *may* create multiple instances and return them in an array.  Where passed to a constructor, the module must only create one instance and return it.

Where the reference is to an element that is not itself owned DOM, the init function *may* traverse the subtree looking for elements that are.

Where JavaScript exists to enhance elements, and accompanying CSS depends on knowing whether the JavaScript intends to apply (or has applied) that enhancement, the JavaScript *may* add a data attribute of the form `data-{modulename}-js` with no value to the root element of the component when the JavaScript initialises.  For example, o-tabs markup would not contain a `o--if-js` class, because the tabs content should remain visible even if the tabs JavaScript is not running on the page, but if the JavaScript does run, it could apply an `data-o-tabs-js` data attribute to allow the tabs CSS to hide all but the selected tab panel.

## Error handling

Modules *should* use [o-errors](http://registry.origami.ft.com/components/o-errors) to report runtime JavaScript errors and exceptions, as well as log notices and other significant events, using the `oErrors.log` custom event.

<aside>
Where modules do not explicitly convert exceptions into o-errors events, any unhandled exceptions will still be caught and reported if o-errors has been initalised on the page.  However, the report will lack critical information about the DOM elements to which the error relates.</aside>

## Configuration

If a module's JavaScript requires configuration, the following methods of passing that configuration *must be* supported.

### Data attributes on owned DOM

If a module acts to enhance markup, the module *must* be configurable using data- attributes on the HTML element that is the root element of the DOM owned by the module.  Data attributes *must* be named `data-{modulename}-{key}`, e.g. `data-o-tweet-id`.  The module *may* also create attributes of this form at runtime, provided that the element is already within owned DOM for that module.

<aside>
	Developers should avoid the temptation to name data attributes based on the same naming conventions as BEM in CSS.  Data attributes are not subject to the same semantics as classes so BEM is not a great fit.
</aside>

### Global declarative config block

Where it is possible for multiple instances of a module to exist on a page and for the same configuration to apply to all of them, or where a module has no markup (e.g. o-tracking or o-errors), the module *must* support declarative configuration via JSON data placed within a `<script>` block with a `type='application/json'` and a data attribute in the module's namespace with the key 'config' and no value, ie. `data-{modulename}-config`.  For example:

	<script data-o-errors-config type='application/json'>
	    {
	        "sentryEndpoint": "https://....",
	        "application": {
	            "version": "1.2.3",
	            "name": "Foo Application"
	        }
	    }
	</script>

Components *must* parse any such configuration using `JSON.parse` and only in response to an event (such as `o.DOMContentLoaded`) or function call.  Components *must not* expect more than one global declarative config block in their namespace to be present on the page.

<aside>Global declarative config is not useful in situations where a developer chooses to call a component's static <code>init()</code> function directly, since the config could simply be passed into the function.  Components should support that, and consider throwing an error if declarative config exists when init is called.</aside>


## DOM Selectors

When using selector engines other than native `querySelector`, modules *must not* use selectors that are incompatible with querySelector.  This allows for an easier future upgrade path to querySelector.

Modules *may* assume that any HTML markup that relates to their component follows the hierarchical structure specified in their module's Mustache template. However, modules *should not* make assumptions about the order of HTML elements, and should, as far as possible, cope with the presence within the component of elements not specified in the template.

Modules *must* not throw an error if there are no instances of the module's owned DOM in the page.

## Communicating with host page code and other components

Modules may wish to communicate (or make communication possible) with other components of the same type, other components of different types, or non-component code in the host page.  This should be accomplished with API methods (when invoking known dependencies) and DOM events (in all other cases).

### API

Modules *may* expose an external API via `module.exports`.  Modules *must not* rely on the existence of any APIs other than those that are explicitly required dependencies, expressed in the `browserFeatures` property of origami.json, or defined as part of the DOM level 2 specification.

### Events

Modules *may* **emit** events to allow loose coupling with other components and the host page.  In doing so, the module *must*:

* use only browser-native DOM events with bubbling enabled
* specify `createevent` as a required browser feature in the `browserFeatures` section of origami.json
* where the module wishes to attach custom data payloads to events, specify `customevents` as a required browser feature in addition to 'createevent', use the [CustomEvent](https://developer.mozilla.org/en/docs/Web/API/CustomEvent) API, and pass an object in the `details` property.
* trigger events only on elements within the component's owned DOM, or otherwise only on the body element
* namespace event names with the name of the module in camelCase, separated from the event name with a dot, e.g. `oModuleName.eventName`
* name the event using the present tense, e.g. `dialogClose`, not `dialogClosed`, and using camel-case.

A valid example of a module emitting a DOM event is shown below:


	this.dispatchEvent(new CustomEvent('oTestModule.oTestClick', {
	  detail: {...},
	  bubbles: true
	}));

Modules *may* **bind** to events emitted by themselves, other modules, the host page or the browser (except `DOMContentLoaded` and `load`).  In doing so, the module:

* *must not* stop the propagation chain except for events created by itself
* *should* bind only to the BODY element and use [event delegation](http://stackoverflow.com/questions/1687296/what-is-dom-event-delegation) to ensure that handlers do not need to be bound every time elements are created.  If not bound to the body element, handlers *must* be bound to elements within the module's owned DOM.

Modules *should* handle events during the [bubbling phase](http://stackoverflow.com/questions/4616694/what-is-event-bubbling-and-capturing), not the capturing phase (unless the event has no bubbling phase)

If a module wishes to bind to the `DOMContentLoaded` or `load` browser events, it *must* prefix the event name with `o.`, and *must* expose the function that it binds to the event via its external API, eg:


	document.addEventListener('o.DOMContentLoaded', init);
	exports.init = init;


### Foreign events

Modules *may* emit events defined by **other modules**, using the other module's namespace, but must only do so if:

* the foreign module is not a direct dependency; and
* there are no callbacks in the event `details` payload; and
* the foreign module has invited public use of the event in its documentation and has provided a comprehensive spec for the `details` payload

For the most part, use of this technique creates too much 'magic' behaviour that would not be expected by a product developer and should be avoided, but in some cases e.g. analytics, may be a reasonable compromise to enable loose coupling.

### Use of the z-axis (`o-layers`)

A module e.g. o-overlays and o-hiearchical-nav, may need to display some or all of its owned DOM outside of the normal content flow so that it obscures content outside its owned DOM. The module *must* bind to and fire `o-layers` events on its closest parent with the class `o-layers__context`, or `body` if no such element exists. The module *must* use the custom events defined in `o-layers` to:

* broadcast changes in its own state
* listen for events fired in its `o-layers__context` by other modules that make use of the z-axis

Any module *may* use the `o-layers__context` class to define a new region of the DOM that can handle new layers independently of other regions of the DOM (e.g. two graphs handling their own tooltips independently, a date-picker appearing within a modal dialog).

## Data storage

Modules that store data on the client via user-agent APIs *must* encapsulate all the logic required to get and set that data and must remain compatible with the format of data that they store, unless the major version number of the module changes. In that case the module *must not* invalidate any existing data, and *should* provide advice in docs on migrating user data from previous versions.

## Functions

Modules *should* avoid containing functions with more than 3 arguments.  Where more parameters are required, consider passing an object (and if so, consider using [lo-dash's defaults function](http://lodash.com/docs#defaults)).

##Objects

Object properties *must not* be named after reserved words in the JavaScript language.  ([Learn more](https://github.com/airbnb/javascript/issues/61))

Object prototypes *must not* be overwritten. Instead, assign additonal properties to the prototype individually:


	Jedi.prototype.fight = function fight() {
	  console.log('fighting');
	};

Overwriting the prototype wipes out the `constructor` property and makes inheritance difficult.  An exception to this is when creating subclasses, in which case there is no alternative, but the constructor property *should* be reinstated ([read more](http://www.2ality.com/2011/06/constructor-property.html)):


	function Super(x) { ... }
	Super.prototype.foo = ...

	function Sub(x, y) {
	    Sub.superclass.constructor.call(this, x);
	}
	Sub.superclass = Super.prototype;
	Sub.prototype = Object.create(Sub.superclass);
	Sub.prototype.constructor = Sub;

## Animation

Modules *must not* animate elements using methods that do not utilise hardware acceleration if hardware accelerated alternatives are available.  For example, repositioning an element repeatedly using its `left` or `top` CSS properties is not allowed.  Instead, use [CSS transitions](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Using_CSS_transitions) and [`will-change`](http://tabatkins.github.io/specs/css-will-change/).  On user agents that do not support accelerated animation, animation *should* not be used.

## Syntax convention rules

JavaScript *must* be linted with [JSHint](http://www.jshint.com/).  If you wish to specify a particular JSHint configuration you may do so at the module level with a `.jshintrc` file, and at the file level with a `/*jshint: ... */` comment.  If you specify neither of these, code *must* pass a JSHint check with the following settings:

<div class="o-techdocs-gist" data-repo="Financial-Times/origami-build-tools" data-path="/config/jshint.json"></div>

Developers *should* stick to the above `jshintrc` config, since this represents a common standard across FT teams, but are permitted to make changes if desired.  In addition to the jshint rules:

###One var per line

The `var` statement *must* declare only one variable.  Use additional `var` statements for subsequent declarations:


	var foo = "hello";
	var bar = "goodbye";
	var novalue;

This makes diffs easier to read, and reduces the chance of errors associated with missing semicolons or commas.

###Comments

Single line comments *should* be placed on a newline above the subject of the comment.  An empty line *should* be inserted before the comment.


## Subresources

JavaScript modules in Origami components may want to load additional files (fonts, JSON data, images etc) that are also part of the component's file tree.  To resolve these paths safely, JS modules wishing to load sub-resources from their own component *must* resolve the file path using the [Origami assets module](https://github.com/Financial-Times/o-assets):


	someiframe.src = require('o-assets').resolve('/img/logo.png', 'tracking');

Without any explicit configuration, `o-assets` will assume, as we do for sub-resources in Sass, that the modules are installed publicly at a URL path of `/bower_components` on the current host, and will form URLs on that basis.  Product developers are advised to reconfigure o-assets to accommodate their own server-side URL routing architecture.

Where external resources are not within Origami modules, a [protocol-relative URL](http://www.paulirish.com/2010/the-protocol-relative-url/) *must* be used (see [issue 173](https://github.com/Financial-Times/ft-origami/issues/173)).


### Inlining subresources

In some cases it may be desirable or necessary to include the content of a static asset in a JavaScript source bundle (typically to include templates).  To do this, use the [textrequireify](http://git.svc.ft.com:8080/projects/OT/repos/textrequireify) transform for browserify, which provides a `requireText` method.  The [standard Origami build process]({{site.baseurl}}/docs/developer-guide/building-modules) includes this, so it is available through the build service ([learn more](https://github.com/Financial-Times/ft-origami/issues/110)).

You would write this in your JavaScript source:

<?prettify?>
	var template = requireText('main.mustache');

And it would be converted to this by the build process:

<?prettify?>
	var template = 'This is the content of main.mustache';


## Hover events

Where JavaScript includes bindings to `mouse...` hover events (such as `mouseover`, `mouseout`, `mouseenter`, and `mouseleave`), the [o-hoverable](https://github.com/Financial-Times/o-hoverable) module must be used to make those hover capabilities configurable.

## Viewport events

For viewport events that may fire several times in quick succession (`scroll`, `resize` and `orientationchange`) it's good practice to throttle listeners to these. [o-viewport](https://registry.origami.ft.com/components/o-viewport) provides pre-throttled abstractions of these events and *should* be used by modules that need to listen for changes to the viewport.
