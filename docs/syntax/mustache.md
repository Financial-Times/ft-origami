---
layout: default
title: Mustache
section: Syntax
permalink: /docs/syntax/mustache/
---

# Mustache Standards

Where Origami components include templates, the templates must be in [Mustache](http://mustache.github.io/) format.  This is because product developers may choose to use any technology stack to built their application, and it's important that they not be forced to choose a particular one in order to use Origami components.

Mustache templates must conform to the following rules

* When including partials, use a relative path
* Do not include partials from other modules.  Partials must come from the same module as the parent template
* Always namespace variables used in the template i.e. `{{o-modulename.heading}}` not `{{heading}}`
