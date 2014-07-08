---
layout: default
title: Developer guide
section: Developer guide
permalink: /docs/developer-guide/
---

#Developer guide

When you're building a new web product, chances are you need a lot of stuff that's common across many FT sites.  Origami **modules** provide you with common functional components, behaviours, layouts and styles, while Origami **web services** provide dynamic data services and markup feeds.

##Web services

Web services all share a common, recognisable pattern.  For more information on use of web services, consult the web services guide:

* [Using web services](web-services)

##Modules

Modules are more complicated, since they offer units of code that can be integrated into your application.

Origami's front end modules contain SASS, JavaScript and markup templates to create great looking UI elements.  The SASS and JavaScript are designed to be built into minified bundles that you can serve as subresources using `<link>` and `<script>` tags, while the markup templates are there to guide you to generate the necessary HTML in your application.

Modules are all compliant with a single standardised build process, and are delivered unbuilt, so you need to build them in order to use them in your application.  There are two ways to do this - either set up the standard build process in your own project, or use our build service to fetch pre-built bundles containing the modules of your choice.

For a complete list of available modules, demos, dependency information and usage instructions, the [Origami Registry](http://registry.origami.ft.com) provides a one stop shop:

* [Go to Origami Registry](http://registry.origami.ft.com)

Once you know which modules you want to use, consult the using modules guide for information on how to integrate them into your project:

* [Using modules](using-modules)





