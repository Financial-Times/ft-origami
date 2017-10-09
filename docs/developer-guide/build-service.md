---
layout: default
title: Build Service guide
section: Modules
permalink: /docs/developer-guide/modules/build-service/
site_section: developer-guide
redirect_from: "/docs/developer-guide/build-service/"

---

<h1>Using the Build Service <span class="o-labels o-labels--big">Tutorial</span></h1>

The Build Service is the quickest and simplest way to get Origami Modules into your product.

The Build Service performs all the steps you need to use a module (detailed in the [manual build process tutorial]({{site.baseurl}}/docs/developer-guide/modules/building-modules/)) on a central server. You request the bundles using a `<link ...>` or `<script ...>` tag, and the Build Service handles the rest.

This is particularly useful for:

- early stage prototypes
- building hacks and experiments
- adding components to existing sites that weren't built with Origami in mind

The Build Service hosts its own API and technical documentation at [www.ft.com/__origami/service/build](https://www.ft.com/__origami/service/build). For a step by step tutorial on how to use the Build Service, keep reading!


## Building a page

This tutorial will take you though building a page that includes some Origami modules. By the end you'll have built a page using the Build Service with a [cuts the mustard test]({{site.baseurl}}/docs/developer-guide/modules/core-vs-enhanced-experience/) for older web browsers.

## 1. Create HTML, CSS & JS files
We're going to use a website called **JS Bin** to set up the files for this tutorial. JS Bin lets you paste HTML, JavaScript and CSS into one panel and see the result in another. You could also use [Codepen](http://codepen.io/pen/?editors=1000), or run your own server locally.

To create a new JS Bin, open this link in a new tab: [Create new JS Bin](https://jsbin.com/?html,output).

## 2. Put the boilerplate into the JS Bin
For this tutorial, we'll use some boilerplate HTML. There are two things in the boilerplate that we won't be covering here; the Polyfill Service and a 'cuts the mustard test'.

<aside class='read-more'>
<strong>Read more about the Polyfill Service</strong>
<p>The Polyfill Service is an Origami service that makes newer APIs available to older browsers, ensuring Origami developers can write code to modern standards</p>
<a class='o-buttons' href='{{site.baseurl}}/docs/developer-guide/modules/using-the-polyfill-service/'>Find out more about the Polyfill Service</a>
</aside>

<aside class='read-more'>
<strong>Read more about cutting the mustard</strong>
<p>Origami modules provide two experiences, core for older browsers and enhanced for newer browsers. To determine if a browser gets a core or enhanced experience we need developers to add a 'cuts the mustard test' to their pages</p>
<a class='o-buttons' href='{{site.baseurl}}/docs/developer-guide/modules/core-vs-enhanced-experience/'>Find out more about core vs enhanced experience</a>
</aside>

### The boilerplate
<div class="o-techdocs-gist" data-repo="Financial-Times/ft-origami" data-branch="gh-pages" data-path="/examples/build-service-tutorial-boilerplate.html"></div>


Your JS Bin should look something like this:

![JS Bin start screen](/img/build-service-tutorial/js-bin-start-page.png)

Delete the contents of the HTML panel and paste the Origami boilerplate in there instead.

The right hand side of the screen now say: `It worked!`.

![JS Bin with boilerplate pasted in](/img/build-service-tutorial/js-bin-with-boilerplate.png)


## 3. Add the HTML for the components

Now that you've added the boilerplate, it's time to add some components.

For this guide we'll add the standard FT header and footer. All Origami components are listed on the [Origami Registry](http://registry.origami.ft.com), so go there now and use the search box to find the header component:

* [Go to the Origami Registry](http://registry.origami.ft.com)

At the top of every module page on the registry there are some demos. Pick a demo header to use (we've chosen the minimal theme header).

![HTML source of a demo in the Origami registry](/img/build-service-tutorial/registry-demo-html.png)

Select the HTML tab and copy all the HTML to your clipboard (there is quite a lot of it).

Switch to your JS Bin window and find the bit that says `<!-- Body content here -->` (it's towards the bottom of the file).  Paste your header HTML just below that.

![After pasting the source of a component into a JS Bin](/img/build-service-tutorial/jsbin-unstyled-component.png)

## 4. Add the CSS and JavaScript for your components

Now on the right of your JS Bin window, you'll see the content for your header, but it will be unstyled.  You need to add the CSS and JavaScript to style it and activate its behaviours, like dropdown menus. To do this, we'll need to update the `<link...>` and `<script ...>` tags in the boilerplate.

Go back to the registry, and on the o-header page, scroll down to the section called 'Quick start'.

In quick start, you'll see a token, it will look something like: `o-header@^5.0.0`. This is the bit you need to add to the Build Service requests in the boilerplate.

<aside class='read-more'>
<strong>Read more about component versioning</strong>
<p>The token <code>o-header@^5.0.0</code> contains the component name and a version number as a semver range.</p>
<a class='o-buttons' href='{{site.baseurl}}/docs/developer-guide/modules/module-versioning/'>Find out more about component versioning</a>
</aside>

In JS Bin, find the Build Service CSS bundle request and replace `a,b,c` in the URL with the o-header token.

```
<!--
	Load the Origami stylesheet, including fonts and icons by default.
	Replace a,b,c with the names of the additional modules you want to load.
-->
<link rel="stylesheet" href="https://www.ft.com/__origami/service/build/v2/bundles/css?modules=a,b,c" />
```

After adding this, you should see that the header is now styled! JS Bin is pretty cool.
Next you need to add the JavaScript, which will make the header menus work. The JavaScript request is in a different place in the file.

```
<!--
	Load main JavaScript bundle (asynchronously, to make sure it's non-blocking).
-->
<script>
	(function(src) {
		if (cutsTheMustard) {
			var o = document.createElement('script');
			o.async = o.defer = true;
			o.src = src;
			var s = document.getElementsByTagName('script')[0];
			s.parentNode.insertBefore(o, s);
		}
	}('https://www.ft.com/__origami/service/build/v2/bundles/js?modules=a,b,c')); <---- this line here
</script>
```
This has now added the o-header JavaScript to your page, so the drop-down menus will work.

![Once you've added the JS and CSS bundles](/img//build-service-tutorial/jsbin-styled-component.png)

<aside>Sometimes you'll have to wait a few minutes after updating these tags before the styles and script are applied successfully.  To reload the output, click 'Run with JS' in the top right of the JSBin Output window.</aside>


## 5. Repeat

Now, repeat this process for the footer:

1. Find the component page in the registry
1. Copy the HTML of the demo you want
1. Paste it in the `<body>` section of your JS Bin page
1. Back on the component registry page, find the token from the quick start section, e.g. `o-footer@^3.0.1`
1. Add this to the Build Service loader tags alongside the one for the header. Separate the two with a comma.

The Build Service is capable of including more than one component in the same bundle, so you can add many modules into the same URL.  Here's an example:

	<link rel="stylesheet" href="https://www.ft.com/__origami/service/build/v2/bundles/css?modules=o-fonts@^1,o-icons@^4,o-header@^3.0.3,o-footer@^3.0.1" />

It's important that you do this, so that any CSS that's shared between the header and footer (there's quite a bit) isn't downloaded twice.

<aside>Remember, when you change the modules you are requesting in your Build Service tags, it may take a few minutes to build the resulting bundle of code.  Be patient and hit 'Run with JS' a few times until the styling appears.</aside>


----

## That's it!

Well done, you have built a responsive, FT branded web page with Origami.

Using the techniques you just learned, you can now bring your content to life easily by adding various components and HTML between the header and footer.

### Next

This tutorial has covered getting Origami components onto a page using the Build Service.

We've covered:

- Finding component HTML in the registry
- Adding CSS using the `<link ...>` subresource tag
- Adding JS using the `<script ...>` subresource tag

We skipped over some areas that you should understand if you want to use Origami in production:

- [The Polyfill Service](/docs/developer-guide/modules/using-the-polyfill-service/)
- [Core vs Enhanced experience](/docs/developer-guide/modules/cuts-the-mustard/)
- [Component versioning](/docs/developer-guide/modules/module-versioning/)
