---
layout: default
title: Developer guide
section: Developer guide
permalink: /docs/developer-guide/
---

# Developer guide

When you're building a new web product, chances are you need a lot of stuff that's common across many FT sites.  Origami modules provide you with common functional components, behaviours, layouts and styles, while Origami services provide dynamic data services and markup feeds.

Origami's web services all share a common, recognisable pattern.  For more information on use of web services, consult the web services guide:

* [Using web services](web-services)

Modules are more complicated, since they offer units of code that can be integrated into your application.

Origami's front end modules contain SASS, JavaScript and markup templates to create great looking UI elements.  The SASS and JavaScript are designed to be built into minified bundles that you can serve as subresources using `<link>` and `<script>` tags, while the markup templates are there to guide you to generate the necessary HTML in your application.

Modules are all compliant with a single standardised build process, and are delivered unbuilt, so you need to build them in order to use them in your application.  There are two ways to do this - either set up the standard build process in your own project, or use our build service to fetch pre-built bundles containing the modules of your choice.

## Build service or manual build?

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

* [Building manually](building-modules)
* [Using the build service](build-service)

<aside>
	<h4>Mustache as a spec</h4>
	<p>Origami modules don't include markup in their build process.  Any templates inlcluded in a module component are simply specifications for the markup you need to write to activate the CSS and JavaScript.  Don't feel the need to consume the templates in your app and run Mustache, though you can if you want to.</p>
	<p>In the future it's likely that Origami markup will be available as templates in HTML imports</p>
</aside>

## Loading your script bundle

Whether via the build service or your own build process, your Origami modules will eventually compile to two resources - one JavaScript and one CSS.  You should serve the CSS to *all user agents*, but the JavaScript only to those that meet the minimum standards assumed by Origami module developers.  To ensure that you only run Origami JavaScript in these 'good' browsers, use a '[Cuts the mustard](http://responsivenews.co.uk/post/18948466399/cutting-the-mustard)' script loader.

Origami components declare their minimum requirements in terms of [Modernizr](http://modernizr.com/docs/) tests.  To set up a test that verifies the availability of all the features required by the components you're using:

1. Make an aggregated list of the tests from all the `required` sections of your chosen modules' [Origami manifest files]({{site.baseurl}}/docs/syntax/origamijson).
2. Make a [Modernizr build](http://modernizr.com/download/) that incorporates at least those tests.  Be aware that some of the tests we specify as requirements may not be core Modernizr tests.
3. Include your Modernizr script in the `<head>` of your page, after your stylesheets (either inline or as an external script, though using an external script will block the loading of your page, so consider inlining it).   This enables it to add test result classes to the `<html>` tag *before* the body is rendered, so users do not see any [FOUC](http://en.wikipedia.org/wiki/Flash_of_unstyled_content)s.
4. Add a 'cuts the mustard' test that checks that the required Modernizr tests pass, and if so, loads your JS bundle. For those Modernizr tests that fail, you can choose to [polyfill the functionality](http://html5polyfill.com/) and then load the JS anyway, or simply not load the JavaScript.  If you do not add the JavaScript, you **must unwrap** appropriate `<noscript>` tags, so that the browser benefits from content targeted at those without scripting capability.

### Styles for fallbacks and enhancements

Origami contains fallback content to be displayed when required features are not supported by the browser.  To ensure it does not display in up to date browsers, you must add some required style rules to your own stylesheet:

	.no-js .o--if-js { display: none !important; }
	.js .o--if-nojs { display: none !important; }

The `js` and `no-js` classes are not defined by Origami, but must simply match the classes you choose to put on your `<html>` element.  Modernizr by default removes a `no-js` class if it exists, and adds a `js` class, so choosing those classes means you can use Modernizr more easily.  Just remember to add a `no-js` class to your HTML tag:

	<html class='no-js'>

### Example

Here is a sample script that you can use to invoke the Modernizr tests and add the JS bundle or unwrap the noscript elements based on the result.

* [Download /examples/ctm.js]({{site.baseurl}}/examples/ctm.js)

<aside>
	<h4>Setting the bar</h4>
	<p>You might find that your bundle includes a minority of modules with especially onerous feature requirements.  In that case, you may like to consider having two bundles with different levels of requirements, and separate CTM tests.  This is best avoided if you can, but if you do need more granular support, it's an option.</p>
	<p>If you choose to do this, you can unwrap <code>noscript</code> tags more selectively by targeting them by their module name class rather than the generic <code>origami</code> class.</p>
</aside>

