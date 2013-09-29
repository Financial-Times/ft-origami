---
layout: default
title: Syntax
section: Syntax
permalink: /docs/syntax/
---

# Syntax rules and standards

These rules apply to any code written as part of an Origami component, and provide standards for use of languages as well as models for standard representations of data within components.

## Language standards

* [JavaScript]({{site.baseurl}}/docs/syntax/js)
* [SCSS]({{site.baseurl}}/docs/syntax/scss)
* [HTML]({{site.baseurl}}/docs/syntax/html)

## Configuration standards

* [.origamiconfig]({{site.baseurl}}/docs/syntax/origamiconfig) component manifest format

## Data models

Use of [Microdata](http://schema.org/docs/gs.html) is not compulsory but strongly encouraged.  Use an FT model if one is available. Failing that use the most appropriate schema from schema.org.  Use of schema should be consistent across a serivce's JSON and HTML responses. Therefore, if a service component has `_itemtype` as a JSON root field, it should embed the same metadata in the HTML via Microdata.  To avoid multiple instances of singletons, the `_itemref` attribute cannot be used since the `id` is banned by the singleton rule.

In addition to public microdata we also define the following reusable FT models:

* **TODO**
