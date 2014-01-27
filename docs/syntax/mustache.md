---
layout: default
title: Mustache
section: Syntax
permalink: /docs/syntax/mustache/
---

# Mustache Standards

Where Origami components include templates, the templates must be in [Mustache](http://mustache.github.io/) format.  This is because product developers may choose to use any technology stack to built their application, and it's important that they not be forced to choose a particular one in order to use Origami components.

## Naming conventions and encapsulation

Always namespace variables used in the template i.e. <code>&#123;{o-modulename.heading}&#125;</code> not <code>&#123;{heading}&#125;</code>

## Including other templates

Partials included from the same repository *must* be referenced using a relative path:

<pre><code>&lt;p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et&lt;/p>
&#123;{> ../partials/innerbox.mustache }&#125;
&lt;p>dolore magna aliqua. Ut enim ad minim veniam...&lt;/p>
</code></pre>

Partials *must not* be included from outside the module (see [issue 102](https://github.com/Financial-Times/ft-origami/issues/102))


## Including static assets

To be decided.  See [issue 83](https://github.com/Financial-Times/ft-origami/issues/83).
