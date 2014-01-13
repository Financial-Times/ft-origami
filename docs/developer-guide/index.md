---
layout: default
title: Developer guide
section: Developer guide
permalink: /docs/developer-guide/
---

# Developer guide

When you're building a new web product, chances are you need a lot of stuff that's common across many FT sites.  Origami modules provide you with common functional components, behaviours, layouts and styles, while Origami services provide dynamic data services and markup feeds.

## Modules

Origami's front end modules are all compliant with a single standardised build process, and are delivered unbuilt, so you need to build them in order to use them in your application.  There are two ways to do this - either set up the standard build process in your own project, or use our build service to fetch pre-built bundles containing the modules of your choice.

### Build service or manual build?

If you are not sure which strategy to use, consult the following table of pros and cons to help you decide:

<table class='o-techdocs-table'>
<tr><th>Feature</th><th>Building manually</th><th>Using the build service</th></tr>
<tr><td>Unopinionated about your server-side technology stack</td><td>No.  You will need NodeJS (for package management and build automation) and Ruby (for SASS compilation)</td><td>Yes, there is no requirement for any server-side code</td></tr>
<tr><td>Can get set up quickly</td><td>No.  If you're not familar with node and don't have any pre-requisites installed, getting set up could take you a couple of hours</td><td>Yes, a few minutes at most</td></tr>
<tr><td>Can add your own front-end code to the Origami bundle</td><td>Yes, trivially</td><td>Not easily.  You'd have to publish that code as a standalone repo</td></tr>
<tr><td>Can use public open source JavaScript modules like jQuery</td><td>Yes</td><td>Yes, provided that they have a commonJS interface</td></tr>
</table>

Complete instructions for using both are included in this guide:

* [Building manually](building-modules)
* [Using the build service](build-service)

### Loading your script bundle

Whether via the build service or your own build process, your Origami modules will eventually compile to two resources - one JavaScript and one CSS.  You should serve the CSS to all user agents, but the JavaScript only to those that meet the minimum standards assumed by Origami module developers.  To ensure that you only run Origami JavaScript in these 'good' browsers, use a 'Cuts the mustard' script loader.  You can always find our most up to date recommendation as the following GitHub gist:

<script src="https://gist.github.com/triblondon/8399821.js"></script>

## Web services

Origami's web services all share a common, recognisable pattern.  For more information on use of web services, consult the web services guide:

* [Using web services](web-services)
