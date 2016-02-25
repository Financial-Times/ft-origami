---
layout: default
title: Installing modules with the build service
section: Developer guide
permalink: /docs/developer-guide/build-service/
site_section: developer-guide
---

# Using the build service

If building modules sounds like a lot of work, you can let someone else do it for you and use our **build service**, which performs all the build steps in [Installing modules manually]({{site.baseurl}}/docs/developer-guide/building-modules) on a central build server and then serves your requested bundles directly to your user's browser.

This is especially useful for bootstrapping early stage prototypes as well as building hacks, experiments, and adding components to existing sites that weren't built with Origami in mind.  The service offers high availability, reliability, HTTPS with the same hostname and path, and its own CDN cache layer, so can be used for client-side requests.

The build service hosts its own API and technical documentation at [build.origami.ft.com](http://build.origami.ft.com).

## Building a page

The following steps are a brief tutorial to get you to the point of having a working page made of Origami components working in your browser.  Intentionally this tutorial takes every possible shortcut to allow you to achieve this with no software other than a web browser, but it should arm you with everything you need to add components to a site or build one from scratch.

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

Prepare your jsbin by pasting in the Origami boilerplate code explained above; now you're ready to add some components to your page.

As an example, we'll add the standard FT header and footer.  All Origami components are listed in a directory called the Origami Registry, so go there now and find the header component:

* [Go to the Origami Registry](http://registry.origami.ft.com)

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

In quick start, you'll see a token you can add to your build service `<link...>` and `<script...>` tags.  Copy the token, which will look something like `o-header@^3.0.3` to your clipboard, and switch back to JS Bin.  Find the two references to `build.origami.ft.com` in the header of the HTML document, and insert the token in place of the example `a,b,c` in both places.

This is the CSS bit you need to update:

![Updating the boilerplate HTML to load your modules' CSS](/img/build-service-link-example.png)

And this is the JavaScript bit:

![Updating the boilerplate HTML to load your modules' JavaScript](/img/build-service-script-example.png)

This has now added the behaviour to your page, enabling drop-down menus to work.

<aside>Sometimes you may have to wait a few minutes after updating these tags before the styles and script are applied successfully.  To reload the output, click 'Run with JS' in the top right of the JSBin Output window.</aside>

Repeat this process for the footer:

1. Find the component page in the registry
1. Copy the HTML of the demo you want
1. Paste it in the `<body>` section of your JS Bin page
1. Back on the component registry page, find the token from the quick start section, e.g. `o-footer@^3.0.1`
1. Add this to the build service loader tags alongside the one for the header.  You can separate the two with a comma.

The build service is capable of including more than one component in the same bundle, so you can simply add multiple modules into the same URL.  Here's an example:

	<link rel="stylesheet" href="//build.origami.ft.com/v2/bundles/css?modules=o-fonts@^1,o-ft-icons@^2,o-header@^3.0.3,o-footer@^3.0.1" />

It's important that you do this, so that any CSS that is shared between the header and footer (there's quite a bit) isn't downloaded twice.

<aside>Remember that when you change the modules you are requesting in your build service tags, it may take a few minutes to build the resulting bundle of code.  Be patient and hit 'Run with JS' a few times until the styling appears.</aside>


----

Well done, you have built a responsive, FT branded web document with Origami.

Using the techniques you just learned, you can now bring your content to life very easily by adding various components between the header and the footer.
