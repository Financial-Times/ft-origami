---
layout: default
title: JavaScript
section: Syntax
permalink: /docs/syntax/js/
---

## JavaScript standards

These standards are written for module components, but parts can apply equally to non-component use cases.

### Encapsulation rules

* Add no objects to the global scope, other than JSONp callback function names.  Variables declared outside of any enclosing function are permitted, provided that the module requires a commonJS interface.  If you don't want to depend on CommonJS, wrap the module in an [IIFE](http://en.wikipedia.org/wiki/Immediately-invoked_function_expression).
* If the module does not require CommonJS it must include a [Universal Module Definition](https://github.com/umdjs/umd/blob/master/returnExports.js) that includes support for CommonJS.
* Do not execute any code on parse
* Export, at a minimum, an `init` and a `destroy` method
* Do not leave any non-garbage collectable traces after `destroy` is called
* Do not require global variables to be defined prior to the script loading.  If your module requires configuration, read the config from data attributes attached to parts of DOM that your module will own (see following section for details)

### Data attributes

If a module requires configuration, this should be done using data- attributes on the HTML element that is the root element of the DOM owned by the module.  Data attributes should be named `data-{modulename}-{key}`, eg `data-tweet-id`.  The module may also create attributes of this form at runtime.

In some cases, especially for tracking use cases, a module may act on portions of DOM not exclusively controlled by it.  In this case the same naming conventions apply, but the module *must not* create these attributes itself.  Instead, it may only act on data- attributes outside of its own portions of 'owned DOM' if the element has already had the appropriate data attribute applied.

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
	  newcap: true,
	  immed: true,
	  trailing: true,
	  smarttabs: true
	}

Developers *should* stick to the above `jshintrc` config, since this represents a common standard across FT teams, but are permitted to make changes if desired.
