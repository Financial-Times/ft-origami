---
layout: default
title: Syntax requirements
section: Syntax requirements
permalink: /docs/syntax-requirements/
---

# Language specific syntax requirements

These rules apply to any code written as part of an Origami component

## JavaScript

### Encapsulation rules

* Add no objects to the global scope, other than JSONp callback function names.  Variables declared outside of any enclosing function are permitted, provided that the module requires a commonJS interface.  If you don't want to depend on CommonJS, wrap the module in an [IIFE](http://en.wikipedia.org/wiki/Immediately-invoked_function_expression).
* If the module does not require CommonJS it must include a [Universal Module Definition](https://github.com/umdjs/umd/blob/master/returnExports.js) that includes support for CommonJS.
* Do not execute any code on parse
* Export, at a minimum, an `init` and a `destroy` method
* Do not leave any non-garbage collectable traces after `destroy` is called
* Do not require global variables to be defined prior to the script loading.  If your module requires configuration, read the config from data attributes attached to parts of DOM that your module will own.

### Syntax convention rules

JavaScript *must* be linted with [JSHint](http://www.jshint.com/).  If you wish to specify a particular JSHint configuration you may do so at the module level with a `.jshintrc` file, and at the file level with a `/*jshint: ... */` comment.  If you specify neither of these, code *must* pass a JSHint check with the following settings:

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
	  node: true,
	  newcap: true,
	  immed: true,
	  trailing: true,
	  smarttabs: true
	}

Developers *should* stick to the above `jshintrc` config, since this represents a common standard across FT teams, but are permitted to make changes if desired.

## CSS

### Class naming

* Classes that mark the outer element of a module should be named `ft-{modulename}-module`.
* Classes that are not restricted to a module root should be named `ft-{classname}`.
* Classes that are constrained by a module root class selector should be unadorned.

### Other stuff TODO

* Don't use `!important`


## HTML

* The root element should have a class name of `ft-{modulename}-module`
* Where a component contains a chunk of HTML, it must be (by itself) well formed XML (ie. it must have a single root element, all elements that are opened must be closed, closing tags must be in order).
* HTML5 valueless attributes are not allowed because they are not valid XML.
    - DO this: `<button disabled="disabled">Click me</button>`
    - NOT this: `<button disabled>Click me</button>`
* Use semantic markup where native elements exist to describe the content. E.g.
    - DO this: `<address>`
    - NOT this: `<div class="address">`
* No not include an element or attribute that should be a singleton on a page. This includes attributes defined by specs external to the main HTML5 spec such as Microdata and WAI-ARIA. Examples:
    - `<meta name="viewport" content="..." />`
    - `<meta charset="utf-8">`
    - `<title>`, `<html>`, `<head>`, `<body>`
    - the `id` attribute should not be used on any element
    - The ARIA `role="main"` attribute
* HTML5 elements are allowed as long they can be polyfilled with Javascript back to IE7.
* Refrain from using elements and attributes deprecated in the HTML5 spec unless they are absolutely necessary to support older browsers. Examples:
    - `<applet>`
    - `<frameset>`
    - `<font>`
    - `<link rev="">`
    - `<td align="right">`
* Do not use `<iframe>` within HTML responses. '<iframe>' is allowed if added to the document via javascript.
 * Error pages (400-500) should return an empty response. It's up to the product application to provide content in this event.
* Do not use conditional comments. Components should instead rely on classes on the `html` element that indicate feature support. The classes would be provided by Product application via [Modernizr](http://modernizr.com/docs/) (or something that provides the Modernizr capability classes). These classes enable you achieve something equivalent to conditional comments in that you can display content dependent on the browser/environment. Product developers, on the other hand, are free to use conditional comments as they wish.
* In addition to those mentioned above, the following HTML elements are disallowed:
    - `<script>`
    - `<style>`
    - `<link>`
    - `<base>`
* Some additional attributes (or attribute values) as also disallowed:
    - `href="javascript:..."` the javascript protocol is banned
    - `target` although using target="_blank" for non-FT content is the exception to this rule

### Attribute based features

Includes [Microdata](http://www.w3.org/html/wg/drafts/microdata/master/), [WAI-ARIA](http://www.w3.org/WAI/intro/aria) and other `data-*` attribute specs.

** TBC - general guidelines for how to work with all HTML attribute based requirements including integrating as-yet-undefined specs.

#### `data-*`

Though no open web standards use data attributes, there are lots of first and third party libraries that rely on these. Sometimes there are cross-cutting concerns like tracking. These may be integrated into your component or added later by a product application. Some guidelines on how to deal with this...

* consider having a short namespace for data attributes you introduce. For example all data attributes within your components could be prefixed with `data-tweet-*`.

### Microdata

* Use of [Microdata](http://schema.org/docs/gs.html) is not compulsory but strongly encouraged.
* Use an FT model if one is available. Failing that use the most appropriate schema from schema.org.
* Use of schema should be consistent across a serivce's JSON and HTML responses. Therefore, if a service component has `_itemtype` as a JSON root field, it should embed the same metadata in the HTML via Microdata.
* the `_itemref` attribute cannot be used; the `id` is banned by of the singleton rule (above).

### WAI-ARIA

* use of the [widget](http://www.w3.org/TR/wai-aria/roles#widget_roles) and [document structure](http://www.w3.org/TR/wai-aria/roles#document_structure_roles) roles are encouraged but not required.
* use the [landmark roles](http://www.w3.org/TR/wai-aria/roles#landmark_roles) with caution. These are probably the concern of the product application.
* do not use [abstract roles](http://www.w3.org/TR/wai-aria/roles#abstract_roles).
* if using ARIA, for example a specific role and it's associated attribute, follow the spec accurately across the entire component's code base. Half an implementation is worse than none at all.


## JSON

**TBC - define some standard formats for certain shapes of data, eg RSS type feeds? Issue #23**
