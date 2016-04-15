---
layout: default
title: Origami modules quick start
section: Modules
permalink: /docs/developer-guide/modules/very-quick-origami/
site_section: developer-guide

---

<h1>Origami modules quick start <span class="o-labels o-labels--big">Tutorial</span></h1>

This tutorial is the quickest way to get started with Origami. By the end of it you should know enough to create disposable prototypes using Origami's ui modules. If you want to know how to use Origami in production websites, you'll need a bit more information than this tutorial includes.

We have a more detailed set of tutorials if you want a proper introduction. [Take me to the proper guide](/docs/developer-guide/modules/).

## 1. Set up your page

We're going to use [Codepen.io](http://codepen.io/pen/?editors=1000) for this demo. You could also use [JS Bin](http://jsbin.com/?html,output) or serve the demo from a local server.

First, let's put some minimum viable HTML onto the page. This is not the HTML you would use in production, but for prototyping with the Build Service it's fine.


	<html>
		<head>
			<!-- build service links and scripts here -->
		</head>
		<body>
			Hello!
			<button>Here's a button</button>
		</body>
	</html>



## 2. Include the CSS

OK, we've got a button there, but it's completely unstyled. Let's use the `o-buttons` Origami module to style it.

We're going to use the Build Service to provide the styles.

To do that we need to request the `o-buttons` CSS from the Build Service:

```
https://build.origami.ft.com/v2/bundles/css?modules=o-buttons
```

This request says "give me the CSS for o-buttons at the latest version"

Let's add that to our page in the `<head>` as a `<link ...>` tag

```
<link rel="stylesheet" href="https://build.origami.ft.com/v2/bundles/css?modules=o-buttons" />
```

<aside class='read-more'>
<strong>Read more about component versioning</strong>
<p>This example only uses the component tag (o-buttons). To use Origami modules in production code safely, you should also use a version number with your Build Service request.</p>
<a class='o-buttons' href='{{site.baseurl}}/docs/developer-guide/modules/module-versioning/'>Find out more about component versioning</a>
</aside>

## 3. Add the classes

Next add the right classes to your HTML. Some Origami components are more complicated than `o-buttons`. To help with this we provide example HTML already marked up with the right classes that you can copy into your project.

For this tutorial though, you need to add the class `o-buttons` to the `<button>` tag.

o-buttons has some design variations. Let's apply the `standout` variation by the adding `o-buttons--standout` class.

```
<button class="o-buttons o-buttons--standout">Here's a button</button>
```

## 4. Include the JavaScript

`o-buttons` also has some JavaScript to make buttons work better on touch devices like phones. Getting JavaScript from the build service is as easy as getting the CSS.

```
https://build.origami.ft.com/v2/bundles/js?modules=o-buttons
```

Instead of using a `<link ...>` tag, use a `<script ...>` tag.

```
<script async type="javascript" src="https://build.origami.ft.com/v2/bundles/js?modules=o-buttons" />
```

## 5. Putting it all together

~~~ html
<html>
	<head>
		<!-- build service links and scripts here -->
		<script async type="javascript" src="https://build.origami.ft.com/v2/bundles/js?modules=o-buttons" />
		<link rel="stylesheet" href="https://build.origami.ft.com/v2/bundles/css?modules=o-buttons" />
	</head>
	<body>
		Hello!
		<button class="o-buttons o-buttons--standout">Here's a button</button>
	</body>
</html>
~~~

## What's next?

Well done! you've used an o-button on a page. Adding more components is very similar:

1. Add the names of other components to you want to the build service requests
1. Add the HTML and classes

Some components, like `o-header` have much more complicated HTML than `o-buttons`. Where this is the case, you should copy and the HTML for those elements from the [Origami Registry](http://registry.origami.ft.com/components/).

## Find out more

This tutorial is a very quick guide to Origami. It skipped over a few important concepts that you'll need to know for using Origami modules in a live service. The next tutorial will take you through using Origami in more detail.

<a href="/docs/developer-guide/modules/choosing-your-build-method/" class="o-buttons o-buttons--standout">Let's do this the proper way</a>
