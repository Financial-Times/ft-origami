---
layout: default
title: General best practices
section: Developer guide
permalink: /docs/developer-guide/general-best-practices/
---

# General best practices for front end development

Origami requires a high standard of developers who make components for use by others, but many of these same rules are just good practices for anyone that builds websites using the web technologies of HTML, CSS and JavaScript.  If you are building an FT site, please use the following checklist for up to date guidance on the best practies you should be following in your web development.


##HTML

###Trigger standards mode

Use an HTML5 DOCTYPE, and add the `X-UA-Compatible` meta tag to force Internet Explorer not to use compatibility mode.

<?prettify linenums=1?>
	<!DOCTYPE html>
	<html>
	<head>
	   ...
	   <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">


###Use UTF-8

Character encoding can cause problems, especially on sites that are predominently in English with a few foreign characters here and there, where issues with character encoding can easily go unnnoticed.

Ensure that your pages are **UTF-8** encoded, using both an HTTP response header **and** an HTML meta tag:

<?prettify linenums=1?>
	<meta charset="UTF-8">

Place this as the first tag within the `<head>` section of the page, before `<title>`, since it's important that the browser knows the right character set to use before it gets to any content.


###Use ARIA for state

ARIA is a set of accessibility standards that allow users of assistive technologies to get a better experience of the web.  It is important not only that you correctly flag when a state exists on an object, but that you choose the right state label, and you apply it using the right ARIA attribute.  Examples of states that you need to flag manually in your markup are **busy**, **selected** and **invalid**.

<?prettify linenums=1?>
	<li aria-selected="true">I'm selected</li>
	<li aria-selected="false">I'm not selected, but am selectable</li>

Some states are automatically recognised by the browser and you don't need to do anything to enable them, such as **hovered** and **focused**, but it is possible to break the browser's behaviour (eg by setting a CSS `outline: none` property).  In the particular case of focus, please allow the browser to apply it's default focus style if possible.

Some Origami components may not display correctly unless you apply the right state attributes.

* [Full list of states recognised by Origami]({{site.baseurl}}/docs/syntax/scss/#state)
* [ARIA states and properties specification](http://www.w3.org/TR/wai-aria/states_and_properties) (W3C)


###Validate your code

Run your fully assembled page through the [W3C validator](http://validator.w3.org/) to ensure you don't have any invalid code.  Origami components should have no invalid code, so if you find any please raise a bug.


##CSS

###Lint your code

Consider running [SASSlint](https://github.com/causes/scss-lint) or CSSlint on your CSS.  The syntax standards used by Origami are a good set of rules to use:

* [Origami SASS syntax standard]({{site.baseurl}}/docs/syntax/scss/#syntax-convention-rules)


###Minimise CSS specificity

CSS selectors have a heirarchy of specificity, which can lead to 'specificity wars', especially in products that are maintained by multiple non-collaborating teams.  Avoid these problems by following CSS best practices:

* Keep your selectors short: one single class token is ideal, and this is easily achievable with a convention such as BEM.
* Don't use IDs (you may need IDs in your HTML to connect together elements for accessibility, but you shouldn't ever need to reference them in CSS)
* Avoid using `!important` on anything except single property overrides.  Origami requires any use of `!important` to be justified in a comment, which is good practice to help developers who come after you.

* [Learn about BEM (block element modifier)](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)


###Measure lengths in pixels

All Origami components use pixels for length measures.  To avoid incompatibilities, and because relative measures such as ems result in over-complicated calculations, we recommend using pixels for lengths.


###Use standard colour palette

The FT standard colour palette is available as an Origami component, [o-colors](http://registry.origami.ft.com/components/o-colors).  Use use cases rather than palette colours, adding your own use cases where needed.  If you are using SASS, avoid including any raw colour values in your SASS, except as part of defining new colour use cases.

Information about how to use o-colors is available in the docs:

* [Learn about o-colors](http://registry.origami.ft.com/components/o-colors)


###Turn off hover effects when appropriate

If the user is on a touchscreen device and does not have a mouse or similar device connected, there will be no on-screen mouse cursor.  Hover effects are unnecessary in these situations, and can degrade the user experience on devices which [emulate hover](https://developer.apple.com/library/safari/documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/HandlingEvents.html).

Equally, when a user is scrolling, hover effects can be unintentionally triggered by content moving *under* the mouse rather than the mouse moving *over* the content, which can have a [detrimental effect on scroll performance](http://www.html5rocks.com/en/tutorials/speed/unnecessary-paints/).

Consider using [o-hoverable](http://registry.origami.ft.com/components/o-hoverable), which intelligently flags when hover effects are desiriableby toggling a class on the `<html>` element.


##Images

###Format and scale images correctly

There are a number of best practices to observe on the use of images:

* Make sure you use an appropriate format (typically JPEG for photographs, PNG for illustrations)
* Support screens with a high pixel density by creating images at a pixel density of 2, and trade off higher compression to achieve the same file size.  For example, if you want to display a 400x400 image, consider creating an 800x800 image and turning up the compression until the file size is acceptable.  Studies suggest the sharper but more compressed image works equally well on high and low density screens.
* Use an optimisation tool such as [ImageOptim](https://imageoptim.com/) to remove unnecessary metadata and colour profiles
* Scale image containers with viewport size so that images do not cause pages to scroll horizontally on small screens
* Use the Origami [image service](http://image.webservices.ft.com) to rescale your images dynamically based on the size of the container.


##JavaScript

###Lint your code

Consider running [JSHint](http://www.jshint.com/) over your JavaScript.  The syntax standards used by Origami are a good set of rules to use:

* [Origami JavaScript syntax standard]({{site.baseurl}}/docs/syntax/js/#syntax-convention-rules)


###Do not rely on JavaScript for navigation

Don't create links with `javascript:` prefixes in the href unless those links are not relevant to navigating the site.  Any UI element that appears to be navigation should have a real href.

Do not interfere with common browser affordances, for example, CMD+click or CTRL+click on a link usually opens the link in a new window, but capturing the click in JavaScript can break that feature, which will quite reasonably irritate users.


##Performance

###Audit with PageSpeed

Use Google's [PageSpeed Insights](http://developers.google.com/speed/pagespeed/insights) service to analyse your page and try to score at least 80 on both the mobile and desktop categories.  This will cover off a wide variety of performance related best practices.

<!--##Use polyfill service-->
