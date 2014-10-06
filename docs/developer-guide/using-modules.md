---
layout: default
title: Using modules
section: Developer guide
permalink: /docs/developer-guide/using-modules/
---

# Using Origami modules

Origami modules are packages of JavaScript and CSS which can be imported into your page to create dynamic, on-brand UI components easily.

## Importing: build service vs manual build

If you are not sure which strategy to use to build your CSS and JS, consult the following table of pros and cons to help you decide:

<table class='o-techdocs-table'>
<tr><th>Feature</th><th>Building manually</th><th>Using the build service</th></tr>
<tr><td>Unopinionated about your server-side technology stack</td><td>No.  You will need NodeJS (for package management and build automation) and Ruby (for SASS compilation)</td><td>Yes, there is no requirement for any server-side code</td></tr>
<tr><td>Can get set up quickly</td><td>No.  If you're not familar with node and don't have any pre-requisites installed, getting set up could take you a couple of hours</td><td>Yes, a few minutes at most</td></tr>
<tr><td>Can add your own front-end code to the Origami bundle</td><td>Yes, trivially</td><td>Not easily.  You'd have to publish that code as a standalone repo</td></tr>
<tr><td>Can use public open source JavaScript modules like jQuery</td><td>Yes</td><td>Yes, provided that they have a commonJS interface</td></tr>
<tr><td>Can develop without being online</td><td>Yes</td><td>No, you need to be online if your pages pull resources from the build service.</td></tr>
</table>

Complete instructions for using both are included in this guide:

* [Building manually]({{site.baseurl}}/docs/developer-guide/building-modules)
* [Using the build service]({{site.baseurl}}/docs/developer-guide/build-service)

<aside>
	<h4>Mustache as a spec</h4>
	<p>Origami modules don't include markup in their build process.  Any templates inlcluded in a module component are simply specifications for the markup you need to write to activate the CSS and JavaScript, which use the Mustache template syntax.  Don't feel the need to consume the templates in your app and run Mustache, though you can if you want to, and Mustache implementations are available for most platforms.</p>
	<p>In the future it's likely that Origami markup will be available as templates in [HTML imports]()</p>
</aside>

## Core vs Enhanced experience

Whether via the build service or your own build process, your Origami modules will eventually compile to two resources - one JavaScript and one CSS.  You should serve the CSS to *all user agents*, but the JavaScript only to those that meet the minimum standards assumed by Origami module developers.  To ensure that you only run Origami JavaScript in these 'good' browsers, use a '[Cuts the mustard](http://responsivenews.co.uk/post/18948466399/cutting-the-mustard)' test.

Browsers that have all the features that all your modules need (whether natively or polyfilled) can run the Origami modules' JavaScript.  Those that don't should still be able to use the module, but without script.

Here is an example of how to integrate a cuts-the-mustard test into your page:

<div class='o-techdocs-gist' data-repo="Financial-Times/ft-origami" data-branch="gh-pages" data-path="/examples/ctm.html"></div>


### Customising polyfills

The example above uses the [Origami polyfill service](//polyfill.webservices.ft.com) to upgrade the browser to the latest possible support for web standards.  This can be done without arguments, in which case every possible web API that can be polyfilled will be, or if you want to be more efficient you can list only the polyfills you want to consider.  For more information see the service's own documentation.

The polyfill service works by reading the `User-Agent` HTTP header on the request from the browser, so users of different browsers will get different responses, which may range in size from several hundred KB to an empty file.


### Customising your cuts the mustard test

Origami components declare their minimum requirements in terms of [Modernizr](http://modernizr.com/docs/) tests.  Where possible, component developers will currently limit their *required* features to those present or polyfillable in IE9, but they may enhance their component's behaviour using more cutting edge features.  To verify the exact set of browser features required by the set of modules you are using:

1. Make an aggregated list of the entries from all the `browserFeatures.required` sections of your chosen modules' [Origami manifest files]({{site.baseurl}}/docs/syntax/origamijson).
2. Refer to the Modernizr [feature-detects](https://github.com/Modernizr/Modernizr/tree/master/feature-detects) that match the names given in the Origami configs.
3. Either generate a custom build of Modernizr that includes those tests, or build an expression yourself that achieves the same result.

Note that although the full Modernizr solution will likely be fairly complex, many sets of features became available as a group in all browsers.  You may therefore be able to make your test more succinct by taking advantage of this.  Refer to [http://iwanttouse.com](http://iwanttouse.com) for information on which features you 'get for free' with every test.

### Styles for fallbacks and enhancements

Origami contains fallback content to be displayed when the cuts the mustard test fails.  To ensure it does not display in up to date browsers, you must add some style rules to your own stylesheet:

	.core .o--if-js { display: none !important; }
	.enhanced .o--if-no-js { display: none !important; }

The `core` and `enhanced` classes here are not defined by Origami, but must simply match the classes you choose to put on your `<html>` element (so you can change these if you like).  Modernizr by default removes a `no-js` class if it exists, and adds a `js` class, but these are not subject to the cuts the mustard test, so just remember that if you are using Modernizr, don't use those classes.

When you send the HTML source to the browser, remember to pre-populate the HTML tag with the core class (or whatever you choose to call it):

	<html class='core'>

### Multiple cuts the mustards

You might find that your product uses some modules with especially onerous browser feature requirements.  In that case, you may like to consider having two bundles with different levels of requirements, and separate cuts-the-mustard tests.  This is best avoided if you can, but if you do need more granular support, it's an option.

If you choose to do this, you must target `o--if-no-js` tags more selectively by including the modules' classes in the selector:

	.core1 .-o-modulea .o--if-js { display: none !important; }
	.enhanced1 .-o-modulea .o--if-no-js { display: none !important; }
	.core2 .-o-moduleb .o--if-js { display: none !important; }
	.enhanced2 .-o-moduleb .o--if-no-js { display: none !important; }

Messy.  So it's generally preferred to turn all modules on and off at the same time, using the same test.

### Examples

Here are some examples of pages created using Origami components.  These are all JSBins, so feel free to clone the bin and play around with it.

* [Error aggregator](http://jsbin.com/ficavi/4) (Uses grid, forms, techdocs, date)


## Initialising module components

Origami components do not perform any initialisation automatically, to avoid appearing to be 'magic' and therefore potentially hard to debug.  However, modules are allowed to bind to custom versions of native browser load events:

* `o.DOMContentLoaded`
* `o.load`

If you wish to initalise Origami components that have auto-initialise capability, fire these custom events in response to the native ones:

	document.addEventListener("DOMContentLoaded", function() {
	    document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
	});

Alternatively, all modules that have auto-initialise capability also expose the bound function handler as part of their public API (normally as `init()`), so you can choose to only initialise the modules that you want to, in the order that you want them.
