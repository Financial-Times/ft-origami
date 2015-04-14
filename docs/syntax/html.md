---
layout: default
title: HTML
section: Syntax
permalink: /docs/syntax/html/
---

# HTML Standards

Where Origami components include or output HTML, it should meet the following requirements:

* The markup *must* be [valid HTML5](http://www.whatwg.org/specs/web-apps/current-work/multipage/syntax.html#syntax), except that a DOCTYPE, and opening `<html>` and `<body>` tags should be assumed (ie the markup should be a document body fragment which becomes a valid HTML5 document when enclosed in `<html>` and `<body>` tags).
* It *must* be valid HTML5 and must also conform to the following XML rules:
	* must have a single root element
	* all elements that are opened must be closed
	* closing tags must be in order
	* must not have valueless attributes
* Semantic markup *must* be used where native elements exist to describe the content:
	- GOOD: `<address>`
	- BAD: `<div class="address">`
* Elements or attributes that are normally singletons on a page *must not* be used in components. This includes attributes defined by specs external to the main HTML5 spec such as Microdata and WAI-ARIA. Examples:
	- BAD: `<meta name="viewport" content="..." />`
	- BAD: `<meta charset="utf-8">`
	- BAD: `<title>`, `<html>`, `<head>`, `<body>`
	- BAD: the `id` attribute (except as below)
	- BAD: the ARIA `role="main"` attribute
* The ID attribute *must not* be used, except where:
	* it identifies a form element that needs to be targeted by a `for` attribute *or* is an unavoidable requirement of a third party library e.g. google ads; **and**
	* the value is namespaced with the name of the module, e.g. `o-signin-username`; **and**
	* the module only has singleton use cases (ie, it is pointless to include it in a product page more than once).  If the module's markup may be used more than once on the same page it *must not* have hard-coded IDs, but *may* use Mustache placeholders instead.
* HTML5 elements are allowed as long they can be polyfilled with JavaScript back to IE7, but markup *must not* contain custom elements.
* The following **elements** must not be used:
	* `<script>`
	* `<style>`
	* `<base>`
	* `<link>`
	* `<noscript>`
* Those elements and attributes which are deprecated in the HTML5 spec *should* not be used:
	- BAD: `<applet>`, `<frameset>`, `<font>`, `<link rev="">`, `<td align="right">`
* `<iframe>` *must* not be used in markup. Iframes may be created by JavaScript.
* Conditional comments *must not* be used in components or recommended to product developers. Components should instead rely on classes on the `html` element that indicate feature support. Component authors may require the product application to set any feature support classes supported by [Modernizr](http://modernizr.com/docs/). Product developers may of course choose to apply those classes using conditional comments.
* HREFs in markup *must not* use the `javascript:` protocol.
* The following **attributes** must not be present on any element:
	* target
	* Event handler attributes, e.g. `onclick`, `onchange`
* The root element of a fragment of markup that represents a module (see also [owned DOM](#owned-dom)), *must*
	* have a class name equal to its module name (which will start `o-`, see also [SCSS standards]({{site.baseurl}}/docs/syntax/scss) for further details of class naming)
	* have a `data-o-component` attribute with the name of the component from which the markup is sourced
* Inline SVG included within HTML *must not* use self closing tags (i.e. all `<path>` elements must have an `</path>` tag).  [More details](https://github.com/Financial-Times/ft-origami/issues/66)

## Owned DOM

Any CSS or JavaScript that is included in a module *must* only act on elements already in the DOM if those elements have opted into control by that module.

* A module *may* act on an element using JavaScript (e.g. to attach event handlers, change the element's properties or content) if it or any ancestor has a data attribute `data-o-component` containing the module's name (note that an element may list multiple modules).
* A module *may* act on an element using CSS (to style it) if it or any ancestor has a class which starts with the name of the module.

As an example, the `o-date` component is permitted to style and apply JavaScript behaviour to the following element:

	<time data-o-component="o-date" class="o-date" datetime="2000-06-14T23:00:00.000Z">June 15, 2000</time>


## Anticipating lack of script

Markup may contain elements that do not work without accompanying JavaScript.  These elements *must* have a `o--if-js` class, and *should* be accompanied by an element with a class of `o--if-no-js` to offer feature fallback to users where the product developer opts not to run the JavaScript, or the user agent does not support it:

	<div class="o--if-js">Submit a new comment: ... </div>
	<div class="o--if-no-js">To comment on this article, you need to upgrade your web browser.  <a href="...">Learn how to upgrade</a>.</div>

To avoid unnecessary HTTP requests, elements with the class `o--if-no-js` *must not* be (or contain) `<img>` tags, and *must not* have a background image URL set with CSS.  Descendent elements of the `o--if-no-js` element *may* have CSS image backgrounds ([Learn more](http://timkadlec.com/2012/04/media-query-asset-downloading-results/))

* Learn more about [Core vs enhanced experience]({{site.baseurl}}/docs/developer-guide/using-modules/#core-vs-enhanced-experience)

## WAI-ARIA

Component authors are encouraged to provide assistive accessibility information in their component's markup.

* use of the [widget](http://www.w3.org/TR/wai-aria/roles#widget_roles) and [document structure](http://www.w3.org/TR/wai-aria/roles#document_structure_roles) roles are encouraged but not required.
* use the [landmark roles](http://www.w3.org/TR/wai-aria/roles#landmark_roles) with caution. These are probably the concern of the product application.
* do not use [abstract roles](http://www.w3.org/TR/wai-aria/roles#abstract_roles).
* if using ARIA, for example a specific role and its associated attribute, follow the spec accurately across the entire component's code base. Half an implementation is worse than none at all.

## Tracking

In accordance with the [JavaScript standards]({{site.baseurl}}/docs/syntax/js), it's OK for a module to act on elements outside its owned portion of the DOM if those elements are tagged with data attributes within the module's namespace.  This principle is used to enable tracking of other modules by the track module.  Since the need for tracking is extremely common, these are defined as part of Origami itself:

* Where a portion of DOM comprises a list of links, the attribute `data-track-pos` should be added to the parent of each link.  The value of the attribute should be an integer reflecting the link's zero-based index in the list.
* Where a portion of DOM has distinct sub-regions that is worth tracking separately, such as a sub-list of links inside a list of links, the data attribute `data-track-region` should be added to the element enclosing the region.  The value may be any string describing the enclosed content.

## Examples

Headlines fragment:

	<nav class="o-headlines" data-o-component="o-headlines" data-o-version="0.0.1">
		<ul>
			<li data-track-pos="0"><a href="http://www.ft.com">Home</a></li>
			<li data-track-pos="1"><a href="http://www.ft.com/uk">UK</a></li>
			<li data-track-pos="2"><a href="http://www.ft.com/world">World</a>
				<ul data-track-region="storyPackage">
					<li><a href="http://www.ft.com/world/us">US</a></li>
					<li><a href="http://www.ft.com/world/china">China</a></li>
					<li><a href="http://www.ft.com/world/kazakstan">Kazakstan</a></li>
				</ul>
			</li>
		</ul>
	</nav>
