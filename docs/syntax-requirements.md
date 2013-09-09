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

* Add no objects to the global scope, other than JSONp callback function names.  Variables declared outside of any enclosing function are permitted, provided that the module requires a commonJS interface.  If you don't want to depend on CommonJS, wrap the module in an IIFE.
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
* No non-HTML content (eg `<script>`, `<style>`, `<link>`)

### Tracking requirements
* The root element should have the following data attributes: `data-track-component="{modulename}"` and  `data-track-version="{module version}"`
* Links should have a data attribute added to their parent element: `data-track-pos="{incrementing number}"`
  * Where `{incrementing number}` is a number starting at zero and increments for each parent element.
* Sub regions in the component, such as a sub-list of links inside a list of links should have a data attribute added to the parent of the region: `data-track-region="{region name}"`
  * TODO: Should region be one of a set number of values? e.g. 'storyPackage'

#### Tracking example
```
<headlines class="ft-headlines-module" data-track-component="headlines" data-track-version="0.0.1">
  <ul>
    <li data-track-pos="0"><a href="http://www.ft.com">Home</a></li>
    <li data-track-pos="1"><a href="http://www.ft.com/uk">UK</a></li>
    <li data-track-pos="2"><a href="http://www.ft.com/world">World</a>
      <ul data-track-region="storyPackage">
      	<li><a href="http://www.ft.com/world/us">US</a></li>
      	<li><a href="http://www.ft.com/world/china">China</a></li>
      	<li><a href="http://www.ft.com/world/kazakstan">Kazakstan</a></li>
      </ul>
    </li>
  </ul>
</headlines>
```


## JSON

**TBC - define some standard formats for certain shapes of data, eg RSS type feeds? Issue #23**
