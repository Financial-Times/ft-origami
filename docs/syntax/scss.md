---
layout: default
title: SCSS
section: Syntax
permalink: /docs/syntax/scss/
---

## SCSS standards

Origami has adopted [SASS](http://sass-lang.com/) and specifically the most common SCSS variant, as the preferred way of declaring style information.

### Class naming

* Classes that mark the outer element of a module should be named `ft-{modulename}-module`.
* Classes that are not restricted to a module root should be named `ft-{classname}`.
* Classes that are constrained by a module root class selector should be unadorned.

### Other stuff TODO

* Don't use `!important`
