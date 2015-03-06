---
layout: default
title: Installing modules with the build service
section: Developer guide
permalink: /docs/developer-guide/build-service/
---

# Using the build service

If building modules sounds like a lot of work, you can let someone else do it for you and use our **build service**, which performs all the build steps in the [Installing modules manually]({{site.baseurl}}/docs/developer-guide/building-modules) on a central build server and then serves your requested bundles directly to your user's browser.

This is especially useful for bootstrapping early stage prototypes as well as building hacks, experiments, and adding components to existing sites that weren't built with Origami in mind.  The service offers high availability, reliability, HTTPS with the same hostname and path, and its own CDN cache layer, so can be used for client-side requests.

The build service hosts its own API and technical documentation at [build.origami.ft.com](http://build.origami.ft.com).

## Building a page

The following steps are a brief tutorial to get you to the point of having a working page made of Origami components working in your browser.  Intentionally this tutorial takes every possible shortcut to allow you to acheive this with no software other than a web browser, but it should arm you with everything you need to add components to a site or build one from scratch.

### Find the boilerplate and start a JS Bin

First, you need something to start from.  Origami provides a recommended skeleton of an HTML page to get you started, so first, find that and copy it to your clipboard:

* Learn more about [Core vs enhanced experience]({{site.baseurl}}/docs/developer-guide/using-modules/#core-vs-enhanced-experience)

Once you have the recommended boilerplate, you can begin to build your page.  You need an editor that allows you to edit HTML and view the result.  To do this we recommend using **JS Bin**.  Since you'll want to keep this tutorial around, open the link below in a separate tab:

* [Start a new JS Bin](http://jsbin.com)

You'll see something like this:

![JS Bin start screen](/img/jsbin.png)

If the panels you see are not 'HTML' and 'Output', click the buttons at the top of the page until you see only HTML and Output panels displayed.  Click anywhere in the 'HTML' view, press CTRL+A (CMD+A on MacOS) to select all the existing HTML, and then paste the HTML you copied earlier.

The right hand side of the screen should be blank, which is fine.


### Add some components

Now you need to find some components to add to your page.  As an example, we'll add the standard FT header and footer.  All Origami components are listed in a directory called the Origami registry, so go there now and find the header component:

* [Go to Origami Registry](http://registry.origami.ft.com)

To find the header:

1. Type 'head' in the filter bar on the registry homepage
2. The list below the filter bar should start to change to show only components with 'head' in their name.  At time of writing this tutorial, `o-header` was the only one that matched 'head'.
3. Either click on the o-header component or, if it's the top one in the list, just press enter.

Now, you'll be looking at a demo of the header that you want.  Find the demo you like best ('Branded' is often a good choice) by ticking and unticking the demo names on the right of the registry page.  When you have it, look below the demo to find the HTML.

![HTML source of a demo in the Origami registry](/img/registry-demo-html.png)

Copy all the HTML to your clipboard.

Switch to your JS Bin window and find the bit that says `<!-- Body content here -->`.  Paste your header HTML just below that.

![After pasting the source of a component into a JS Bin](/img/jsbin-unstyled-component.png)

Now on the right of your JS Bin window, you'll see the content for your header, but it will be unstyled.  You need to add the CSS and JavaScript to style it and activate its behaviours, like dropdown menus.  Go back to the registry, and on the o-header page, scroll down to the section called 'Quick start'.

In quick start, you'll see two HTML tags, a `<link...>` and a `<script...>`.  Copy the link tag to your clipboard, and switch back to JS Bin to paste it in under where you see `<!-- Load the stylesheet ... -->` (replacing the example).  Your header should now look styled.

Back in the registry page, copy the bit of the JavaScript tag after `modules=`, which looks like this:

	o-header@x.y.z

Now paste that into the placeholder in the boilerplate after `<!-- Load main JavaScript bundle -->`, replacing the `a,b,c` bit with the  module name and version on your clipboard.

![Adding a JavaScript module to a page](/img/jsbin-add-js.png)

This has now added the behaviour to your page, enabling drop-down menus to work.

Repeat this process for the footer:

1. Find the component page in the registry
1. Copy the HTML of the demo you want
1. Paste it in the `<body>` section of your JS Bin page
1. Back on the component registry page, find the module name and version from the quick start section, e.g. `o-footer@^1.2.3`
1. Add this to the link and script tags

That last bit differs slightly from the first component, because you now already have `<link>` and `<script>` tags on your page that are loading from the build service.  The build service is capable of including more than one component in the same bundle, so you can simply add multiple modules into the same URL.  Here's an example:

	<link rel="stylesheet" href="//build.origami.ft.com/bundles/css?modules=o-header@^3.0.0,o-footer@^3.0.0" />

It's important that you do this, so that any CSS that is shared between the header and footer (there's quite a bit) isn't downloaded twice.


### Loading fonts and icons

First, let's edit the `<link>` tag to load styles for these modules:

* `o-ft-icons`
* `o-fonts`

You should have something like this:

	<link rel="stylesheet"
	      href="//build.origami.ft.com/bundles/css?modules=o-header@^3.0.0,o-footer@^3.0.0,o-fonts@^1.4.0,o-ft-icons@^2.1.1" />

Icons should now display. We now need to show the font.

#### JSBin's CSS tab


![JSBin's CSS tab](/img/jsbin-css-tab.png)

In the "CSS" JSBin tab, type:

	body {
		margin: 0;
	}

This will remove the margin on the body element.

At the moment, we have a page that lacks font styles:

![No fonts yet](/img/jsbin-before.png)

We need to define a few default styles to display the correct font and align icons properly.

**Set language from CSS to SCSS** to enable Sass syntax in JSBin.

![Setting JSBin from CSS to SCSS](/img/jsbin-set-to-scss.gif)

Go to [the Header's SCSS demo code](https://github.com/Financial-Times/o-header/blob/master/demos/src/scss/demo.scss) and copy the rules for `html` and `.demo__icon`. Add them to the SCSS tab:

![Setting JSBin from CSS to SCSS](/img/jsbin-html-demo-icon.png)

Hurray, you now have a header and a footer displayed using the correct font!

![The header, showing with web fonts](/img/jsbin-after.png)
