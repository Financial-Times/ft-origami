---
title: The Build Service
---


# {{page.title}}

Using the Origami Build Service is the quickest way of getting Origami components to work in your product. The service bundles together the CSS and the JavaScript for all Origami components on a central server. You can then access specific component bundles by using a `link` or `script` tag.

<aside>You can find more detailed information on the Build Service's self hosted <a href="https://www.ft.com/__origami/service/build">API and technical documentation</a>.</aside>

Below is a step by step walkthrough for building page for an article about fruit, and we'll include a few Origami components to do so.

## Setting up your sandbox
For this tutorial, we recommend you follow along by setting up your project in [Codepen](https://codepen.io/), or [JSBin](https://jsbin.com/?html,output).


There are usually three three parts to an Origami component; HTML, CSS and JavaScript. We're going implement one at a time to put together our page. Then, we'll look at browser compatibility and our solutions for that.

We'll be providing code snippets for you to follow, you can also have a look at the [result of the tutorial](#).

Let's begin.

## Boilerplate HTML
We'll need to start with some boilerplate markup.

There are two important things we want on an article page—a [grid](https://registry.origami.ft.com/components/o-grid), and some consistent [typography](https://registry.origami.ft.com/components/o-typography).

In order to get that, we'll need the foundation of our HTML to look like this:

<pre><code class="o-syntax-highlight--html">&lt;!DOCTYPE html>
&lt;html>
	&lt;head>
		&lt;title>My First Origami Page&lt;/title>
	&lt;/head>
	&lt;body>
		&lt;div class="o-grid-container o-typography-wrapper">
			&lt;div class="o-grid-row" data-o-grid-colspan="center 8">
			&lt;/div>
		&lt;/div>
	&lt;/body>
&lt;/html></code></pre>

<aside><a href="https://codepen.io/ft-origami/pen/GBXgZa" class="o-typography-link--external" target="\_blank" rel="noopener">CODEPEN!</a></aside>

You won't see anything yet, but the classes and the data attribute will be working together to center our content across a span of 8 columns when we add the CSS to our page.

For now, let's finish putting together the content of our page.

## Component HTML
With the exception of JavaScript-only components, all of Origami's components rely on markup. This markup, combined with the styling and the functionality, is what determines how a component will look and behave on a page.

<aside>A single component can have many variations, and all the variations for all components can be found in the <a href="https://registry.origami.ft.com/components">Origami Registry</a>.</aside>

First, we're going to add some content for our article, so lets add a heading and some great information about fruit _below_ our warning message:

<aside><a href="https://codepen.io/ft-origami/pen/KBxwWN" class="o-typography-link--external" target="\_blank" rel="noopener">CODEPEN!</a></aside>

<pre style="white-space: pre-line"><code class="o-syntax-highlight--html">&lt;h1>Funky Fruit&lt;/h1>  
&lt;h3>Durian&lt;/h3>
&lt;p>Due to its overpowering smell, durian has been banned on many types of public transport across Thailand, Japan and Hong Kong. In Singapore, the fruit is banned across all types of public transportation and even taxis have signs to let you know they refuse to carry passengers transporting the smelly fruit.&lt;/p>
&lt;h3>Dragonfruit&lt;/h3>
&lt;p>The cactus flower that produces dragon fruit survives only a single night. It blooms in the evening, ready for pollination by baths and moths, and wilts the very next day. The very brief pollination period, however, is sufficient for the plant to bear fruits.&lt;/p>
&lt;h3>Naseberry, aka Sapodilla&lt;/h3>
&lt;p>The sapodilla tree supplies the building blocks for a number of products utilized by humans.  Long ago, the Mayas and Aztecs would boil its ‘chicle’ sap, mold it into thick blocks and cut them into small pieces to chew. They were making the first chewing gum!&lt;/p></code></pre>


Finally, we want to showcase the popularity of each fruit in a sortable table. To do that, we're going to use a [striped variation of the o-table](https://registry.origami.ft.com/components/o-table#demo-row-stripes) component.

So next up, let's add this `o-table` markup under our content:

<pre><code class="o-syntax-highlight--html">&lt;table class="o-table o-table--row-stripes" data-o-component="o-table">
	&lt;thead>
		&lt;th>Fruit&lt;/th>
		&lt;th data-o-table-data-type="numeric" class="o-table__cell--numeric">Popularity (%)&lt;/th>
		&lt;th>Taste Note&lt;/th>
	&lt;/thead>
	&lt;tbody>
		&lt;tr>
		&lt;td>Naseberry&lt;/td>
		&lt;td class="o-table__cell--numeric">4&lt;/td>
		&lt;td>chewy&lt;/td>
		&lt;/tr>
		&lt;tr>
			&lt;td>Dragonfruit&lt;/td>
			&lt;td class="o-table__cell--numeric">71&lt;/td>
			&lt;td>sweet&lt;/td>
		&lt;/tr>
		&lt;tr>
			&lt;td>Durian&lt;/td>
			&lt;td class="o-table__cell--numeric">32&lt;/td>
			&lt;td>smelly&lt;/td>
		&lt;/tr>
	&lt;/tbody>
&lt;/table></code></pre>

<aside><a href="https://codepen.io/ft-origami/pen/wxEBda" class="o-typography-link--external" target="\_blank" rel="noopener">CODEPEN!</a></aside>

## Component CSS

Now we come to the second step in putting our page together, and a big part of what makes the Build Service a quick solution.

The Build Service will perform a number of build steps to compile and bundle up the SCSS that most Origami component styles are written in. Since it is all bundled for us to pick and choose from, let's begin by styling our grid. This means we'll have to add a `link` tag to our `<head>`

The `href` of that link references the endpoint that serves all CSS bundles in the Build Service, and looks like this:


<pre><code class="o-syntax-highlight--html">&lt;link rel="stylesheet" href="https://www.ft.com/__origami/service/build/v2/bundles/css?modules=o-grid"/></code></pre>

<aside><a href="https://codepen.io/ft-origami/pen/ajazYj" class="o-typography-link--external" target="\_blank" rel="noopener">CODEPEN!</a></aside>
Now, you should see all of your content snap to the center of the page. This means that we've successfully fetched the `o-grid` CSS bundle from the Build Service.

But we also want to style our content and our table.

It is important to highlight that you only need **one** link tag per page, regardless of how many components you are using. The Build Service can include more than one component in the bundle we ask for, meaning that we can add multiple components to the same URL. This avoids duplicating the CSS that is shared between components, because we are only downloading it all once.

So in order to add the styling for all of our other components, we need to add a few components to our url:

<pre><code class="o-syntax-highlight--html">&lt;link rel="stylesheet" href="https://www.ft.com/__origami/service/build/v2/bundles/css?modules=o-grid,o-typography,o-table"/></code></pre>
<aside><a href="https://codepen.io/ft-origami/pen/LBJErq" class="o-typography-link--external" target="\_blank" rel="noopener">CODEPEN!</a></aside>

And now, when we look at our page, we should have a styled table, different typography and a type of grid in place.

## Component JavaScript

There is one more step, before our page is entirely functional. Not all Origami components use JavaScript, in fact, of the ones we've used in this example, only `o-table` does.

So our final step involves providing our table with the ability to sort its content. Much like the `link` tag for the CSS, we fetch JavaScript bundles from an Build Service endpoint, through a `script` tag.

Let's add the following to our `<head>`:

<pre><code class="o-syntax-highlight--html">&lt;script src="https://www.ft.com/__origami/service/build/v2/bundles/js?modules=o-table">&lt;/script></code></pre>
<aside><a href="https://codepen.io/ft-origami/pen/ejLNNL" class="o-typography-link--external" target="\_blank" rel="noopener">CODEPEN!</a></aside>

Now you can scroll down to your table, and sort alphabetically by fruit name, or numerically by popularity.

<!-- ## Boilerplate HTML
The page we are building is going to be compatible with many different browsers, because we will be using the Polyfill Service and a 'cuts the mustard' test, which largely depend on a browsers ability to support a version of JavaScript, or any JavaScript at all. This is important because based on that support, Origami components will offer certain functionalities and behaviours.

<aside>
	<h6>Polyfilling</h6>
	<p>The <a href="#">Polyfill Service</a> is an Origami Service that makes newer APIs available to older browsers, allowing Origami developers to write code to modern standards.</p>
	<h6>Mustard cutting</h6>
	<p>All Origami components provide a 'core' experience for older browsers, and an 'enhanced' experience for newer ones. By adding <a href="#">a 'cuts the mustard' test</a> to our page, we can determine which experience to serve to which browser</p>
</aside> -->
