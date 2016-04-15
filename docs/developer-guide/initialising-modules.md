---
layout: default
title: Initialising modules
section: Modules
permalink: /docs/developer-guide/modules/initialising-modules/
site_section: developer-guide
---

# Initialising modules

_Build Service users don't need to do any JavaScript initialisation. You only need to do this if you're using a manual build process. [Why?](#note-build-service)_

<aside class="o-techdocs__aside--toggleable" id="note-build-service">
	<h4>Initialising JS and the Build Service</h4>
	<p>All JavaScript bundles from the Build Service include a module called <code>o-autoinit</code>. <code>o-autoinit</code> does the initialisation step automatically so you don't have to do it yourself. Visit <a href='http://registry.origami.ft.com/components/o-autoinit'>o-autoinit on the Registry</a>.</p>
</aside>


Individual Origami module JavaScript does not perform any initialisation automatically. ie, putting the JavaScript and HTML for `o-gallery` on a page is not enough to get a working `o-gallery` (unless you're using the Build Service, which will auto-initialise components).

This is to avoid them appearing to be "magic" and potentially hard to debug.

There are three ways to initialise Origami modules, each offering an increased level of control.

## 1. Initialise every Origami module on the page in one go:

All Origami components listen for a custom event called `o.DOMContentLoaded`, and will initialise themselves on receiving it.

Here's a code snippet to demonstrate:

	// Wait for your document to be ready by listening to these native events.
	// Dispatch o.DOMContentLoaded once the native events have fired.
	if (document.readyState === 'interactive' || document.readyState === 'complete') {
		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
	}
	document.addEventListener("DOMContentLoaded", function() {
		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
	});

Initialising everything in one go like this is fine for most cases. On some occasions you might want more control over what gets initialised when.

## 2. Initialise every Origami module of a given type

For more fine-grained control, you can initialise all modules of a specific type in one go. All Origami modules have an `init()` function which you can call to initialise all instances of them.

So, to initialise all `o-gallery` components on a page, the following code would work:

	// Require the module, assign it to a variable
	var oGallery = require('o-gallery');

	// Initialise all the oGallerys
	oGallery.init();

## 3. Initialise every Origami component 1 by 1

For the most control, you can instantiate new instances of a module 1 by 1.

	// Require the module, assign it to a variable
	var oGallery = require('o-gallery');

	// Initialise an o-gallery for the passed in DOM element
	// This will initilise exactly 1 oGallery, even if the DOM element has more than 1 o-gallery in it.
	new oGallery(HTMLElement);

	// == or ==

	// Initialise an o-gallery for all o-gallery elements found within the supplied DOM element
	// This will initialise an o-gallery for every o-gallery found within the supplied DOM element
	oGallery.init(HTMLElement);
