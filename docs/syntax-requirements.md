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

* Where a component contains a chunk of HTML, it must be (by itself) well formed XML (ie. it must have a single root element, all elements that are opened must be closed, closing tags must be in order)
* Use semantic markup where native elements exist to describe the content (so use `<address>` not `<div class='address'>`)
* The root element should have a class name of `ft-{modulename}-module`
* ID and event handler attributes are not permitted
* No non-HTML content (eg `<script>`, `<style>`, `<link>`, `<base>`)
* Do not use the `javascript:` handler in `href` attributes.
* Do not use the `target` attribute. This is for the Product application to implement.
* _Proposed:_ Do not use `<iframe>` with HTML responses although it is possible to add these to the document via javascript.
* _Proposed:_ Error pages (400-500) should return an empty response. It's up to the product application to provide content in this event. (or alternatively is it up to the product app to ignore the body of an 400-500 response?)
* _Proposed:_ Do not use `<title>`.

### Attribute based features

Includes [Microdata](http://www.w3.org/html/wg/drafts/microdata/master/), [WAI-ARIA](http://www.w3.org/WAI/intro/aria) and other `data-*` attribute specs.

** TBC - general guidelines for how to work with all HTML attribute based requirements including integrating as-yet-undefined specs.

#### `data-*`

Though no open web standards use data attributes, there are lots of first and third party libraries that rely on these. Sometimes there are cross-cutting concerns like tracking. These may be integrated into your component or added later by a product application. Some guidelines on how to deal with this...

* consider having a short namespace for data attributes you introduce. For example all data attributes within your components could be prefixed with `data-tweet-*`.

### Microdata

* Use of Microdata is not compulsory but encouraged.
* Use an FT model/schema if available. Failing that use the most appropriate schema from schema.org.
* If your component has a JSON response that references a schema then the HTML response should also include Microdata attributes to provide the semantics.
* Do not use the `itemref` attribute as the require the use of `id` too.

### WAI-ARIA

* use of [widget](http://www.w3.org/TR/wai-aria/roles#widget_roles) and [document structure](http://www.w3.org/TR/wai-aria/roles#document_structure_roles) roles are encouraged but not required. If used please follow the spec accurately across the entire component code base, half an implementation is worse than none at all.
* be cautious about using [landmark](http://www.w3.org/TR/wai-aria/roles#landmark_roles) roles as the are probably (but not always) the concern of the production application.
* do not use `role="main"` in you component.
* [abstract](http://www.w3.org/TR/wai-aria/roles#abstract_roles) roles must not be used.


## JSON

**TBC - define some standard formats for certain shapes of data, eg RSS type feeds? Issue #23**
