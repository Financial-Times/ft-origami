---
layout: default
title: Core vs enhanced experience guide
section: Modules
permalink: /docs/developer-guide/modules/core-vs-enhanced-experience/
site_section: developer-guide

---

# Core vs Enhanced experience

Origami modules that use JavaScript provide two feature levels, `core experience` is served to all browsers, and `enhanced experience` is served to modern browsers.

When using an Origami component in a page, you should perform a `cuts the mustard` test on that page to determine if the browser can handle the JavaScript for the `enhanced` experience, or if it should just have the `core` experience.

<aside>
<h4>A real world example of core vs enhanced experience</h4>
For an example of what is considered the core experience of a module compared to the enhanced experience, take o-date. For core experience, o-date will just be a date, in enhanced experience, o-date will convert dates to a relative format, eg from "June 15 2015" to "5 days ago".
</aside>

## Using a cuts the mustard with Origami

### 1. Define the test
A `cuts the mustard` test works by testing for some features only implemented in modern browsers. Our recommended cuts the mustard test is as follows:

	var getRandomValuesAvailable;
	var cryptoApi = window.crypto || window.msCrypto;
	if (cryptoApi) {
		getRandomValuesAvailable = 'getRandomValues' in cryptoApi;
	}

	var cutsTheMustard = (
		typeof Function.prototype.bind !== 'undefined'
		&& typeof document.documentElement.dataset === 'object'
		&& ('withCredentials' in new XMLHttpRequest())
		&& getRandomValuesAvailable
		);


### 2. Add styles to hide core-only HTML in Origami

Origami contains fallback content to be displayed when the cuts the mustard test fails.  To ensure it does not display in up to date browsers, you must add some style rules to your own stylesheet:

	.core .o--if-js,
	.enhanced .o--if-no-js { display: none !important; }

The `core` and `enhanced` classes here are not defined by Origami, but must simply match the classes you choose to put on your `<html>` element (so you can change these if you like).  Modernizr by default removes a `no-js` class if it exists, and adds a `js` class, but these are not subject to the cuts the mustard test, so just remember that if you are using Modernizr, don't use those classes.

When you send the HTML source to the browser, remember to pre-populate the HTML tag with the core class (or whatever you choose to call it):

	<html class="core">

Then if the browser passes your CTM, you can replace `core` with `enhanced`


	if (cutsTheMustard) {
	  // Swap the `core` class on the HTML element for an `enhanced` one
	  // We're doing it early in the head to avoid a flash of unstyled content
	  document.documentElement.className = document.documentElement.className.replace(/\bcore\b/g, 'enhanced');
	}

### 3. Asynchronously load any JavaScript

And finally, load any JavaScript the page needs only if our cuts the mustard test has passed. We do this asynchronously to make sure it doesn't block rendering.

	<script>
	  (function(src) {
	    if (cutsTheMustard) {
	      var o = document.createElement('script');
	      o.async = o.defer = true;
	      o.src = src;
	      var s = document.getElementsByTagName('script')[0];
	      s.parentNode.insertBefore(o, s);
	    }
	  }('https://example.com/main.js'));
	</script>


Putting that all together:

<div class="o-techdocs-gist" data-repo="Financial-Times/ft-origami" data-branch="gh-pages" data-path="/examples/ctm.html"></div>

## Recommended cuts the mustard test

The current recommended boundary between core and enhanced experience is defined by the following expression:

	'querySelector' in document && 'localStorage' in window && 'addEventListener' in window

This matches the expression published by the BBC in their [original post about CTM](http://responsivenews.co.uk/post/18948466399/cutting-the-mustard), but coverage is now broad enough that we can use it too.  The following browsers (including later versions) pass this test and qualify for enhanced experience:

* IE 9
* Firefox 3.5
* Opera 10.5
* Safari 4
* iPhone and iPad iOS 1
* Android phone and tablets 2.1
* Blackberry OS 6
* Opera Mobile 11.5
* Chrome (all)
* Mobile Firefox (all)

This is a close match for the recommended minimum support in the [FT browser support policy](https://docs.google.com/a/ft.com/document/d/1dX92MPm9ZNY2jqFidWf_E6V4S6pLkydjcPmk5F989YI/edit#heading=h.wcrwnubj26sk).


## Customising your cuts the mustard test

Origami components declare their minimum requirements in terms of [Polyfill Service](http://cdn.polyfill.io/v1/docs/) features. If the feature required is not in the Polyfill Service library, which is most often the case for CSS features, they can be declared as [Modernizr](http://modernizr.com/docs/) tests. Component developers are required to ensure that any JavaScript bundled with their module will run without error in all the browsers that pass the recommended CTM test above, but they may enhance their component's behaviour using more cutting edge features.  To verify the exact set of browser features required by the set of modules you are using:

1. Make an aggregated list of the entries from all the `browserFeatures.required` sections of your chosen modules' [Origami manifest files]({{site.baseurl}}/docs/syntax/origamijson).
2. Refer to the Polyfill Service `detect.js` in each [polyfill directory](https://github.com/Financial-Times/polyfill-service/tree/master/polyfills) that match the names given in the Origami configs.
3. Refer to the Modernizr [feature-detects](https://github.com/Modernizr/Modernizr/tree/master/feature-detects), for those that aren't in the [Polyfill Service](http://cdn.polyfill.io/v1/docs/), that match the names given in the Origami configs.
4. Build an expression that achieves that includes those tests.


## Multiple cuts the mustards

You might find that your product uses some modules with especially onerous browser feature requirements.  In that case, you may like to consider having two bundles with different levels of requirements, and separate cuts-the-mustard tests.  This is best avoided if you can, but if you do need more granular support, it's an option.

If you choose to do this, you must target `o--if-no-js` tags more selectively by including the modules' classes in the selector:

	.core1 .o-module-a .o--if-js,
	.enhanced1 .o-module-a .o--if-no-js,
	.core2 .o-module-b .o--if-js,
	.enhanced2 .o-module-b .o--if-no-js { display: none !important; }

Messy.  So it's generally preferred to turn all modules on and off at the same time, using the same test.
