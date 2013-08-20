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

* Add no objects to the global scope, other than JSONp callback function names
* Include AMD and CommonJS interfaces in a [Universal Module Definition](https://github.com/umdjs/umd/blob/master/returnExports.js)
* Do not execute any code on parse
* Export an `init` and a `destroy` method
* Do not leave any non-garbage collectable traces after `destroy` is called
* Do not require global variables to be defined prior to the script loading

### Syntax convention rules

**TODO: Agree Jshint config - issue #25**


## CSS

### Class naming

* Classes that mark the outer element of a module should be named `ft-{modulename}-module`.
* Classes that are not restricted to a module root should be named `ft-{classname}`.
* Classes that are constrained by a module root class selector should be unadorned.

### Other stuff TODO


## HTML

* Where a component contains a chunk of HTML, it must be (by itself) well formed XML (ie. it must have a single root element, all elements that are opened must be closed, closing tags must be in order)
* Use semantic markup where native elements exist to describe the content (so use `<address>` not `<div class='address'>`)
* The root element should have a class name of `ft-{modulename}-module`
* ID and event handler attributes are not permitted
* No non-HTML content (eg `<script>`, `<style>`)

## JSON

**TBC - define some standard formats for certain shapes of data, eg RSS type feeds? Issue #23**
