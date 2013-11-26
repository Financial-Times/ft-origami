---
layout: default
title: SCSS
section: Syntax
permalink: /docs/syntax/scss/
---

# SCSS standards

Origami has adopted [SASS](http://sass-lang.com/) and specifically the most common SCSS variant, as the preferred way of declaring style information.  The following rules apply to creating styles for **components**, but could also be adopted in large part for product developers.

SASS features should be used only where they result in increased clarity and reuse. Care should be taken that the resulting CSS is not compromised by unnecessary SASS nesting.

## Selectors

* Specificity should be minimised. Use [BEM](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) where there is any chance of components being nested.
* Specificity should primarily come from class naming, rather than selectors
	- GOOD: `.o-tweet__title`
	- BAD: `div.tweet .header h1`
* Keep selectors short. Ideally just one class
* Avoid IDs
* Avoid using only tag names, except when applying a reset
* Avoid using tag names in addition to classes
	- GOOD: `.o-thing`
	- BAD: `div.o-thing`
* Avoid relying on a specific element structure unless you’re really confident that the structure will never change
	- GOOD: `.o-thing-title-icon`
	- BAD: `.o-thing h1 span`
* Avoid specificity wars. Don’t use increased specificity to overcome an existing overly-specific selector - make the existing one less specific, or use new class names.

## Naming conventions

* Classes that mark the outer element of a module component *must* be named `o-{modulename}` (o is for Origami).  The `o-` prefix should not be used by product developers for their own CSS.
* Classes that are not restricted to a module root *must* be named `o-{classname}`.  This is
* Classes that style elements within a module root element should use single selectors based on [BEM](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/), especially if the component might contain other components (eg in the case of a 'grid' component), to avoid one component's styles affecting the appearance of a component within it.  Where a component can never contain any child components (eg a 'tweet' component or a 'gallery' component), they may instead choose to use simple class names and increase specificity with the module root selector as a parent.
* SASS variables, mixins and functions are global (within all SASS files being processed at one time), so name them to avoid conflicts. e.g. `$o-grid-col-width` instead of just `$col-width`.

## State

* Use BEM modifiers to indicate state, except where state is switched automatically by the browser and selectable using pseudoclasses:
	- *:hover* - (:hover) when mouse pointer is over element
	- *:focus* - (:focus) when key events will be targetted to the element
	- *--error* - element is in error state, e.g. a form field
	- *--disabled* - element cannot be interacted with
	- *--selected* - element is chosen out of a larger group (use in preference to 'active')
* Consider iOS's emulated-hover behaviour on elements whose `:hover` style changes `display` or `visibility`
* Consider all forms of user input, not just mouse.

## Properties

* Where vendor-specific properties are used, prefer to use a mixin to apply the various properties. This allows the vendor-specific ones to be removed from just one place as browser support changes.
* Prefer [feature flag](/ft-origami/docs/syntax/html/) and conditional classes to CSS hacks.  Where you use a conditional class, make it configurable so that the product developer can use whatever classname they want, and can apply the legacy support to whichever user agents they want
	- GOOD: `$o-tweet-legacy-selector .thing { height: 100px; }`
	- BAD: `.thing { height*: 100px; }`
* Order properties consistently. The use of [CSS Comb](http://csscomb.com/) is recommended to automate this, and should be used during development so that other developers beneift from cleaner code being available in the source tree.

## Values

* Component CSS *must* not use `!important` (valid use cases for important exist, but only at the product level)
* Avoid CSS expressions and behaviours, except to polyfill essential features for older browsers (e.g. boxsizing.htc for `box-sizing: border-box`)

### SASS variables

* All variable assignments *must* end with `!default` to enable them to be overridden
* Should be defined in their own file.
* Variables for use by third parties should generally be defined by their purpose, rather than their value: e.g. `$bg-color-skyline` rather than `$biege`

## Media queries

* Consider browsers that don't support media queries. Default styles may need to be declared outside of a media query, then overridden with ones in a media query
* Define them in one place using mixins
* Use variables for the values used in the media query (min-width, max-width etc)

## Subresources

When your styles refer to external resources, notably fonts and images, the module must define the following three SASS variables as defaults, prior to referencing the subresource (replacing `modulename` with the appropriate module name, eg 'colors'):

<?prettify linenums=1?>
	$o-global-subresource-path-prefix = '/bower_components' !default;
	$o-modulename-current-version = '' !default;
	$o-modulename-subresource-path-prefix = $o-global-subresource-path-prefix + /modulename + $o-modulename-current-version + / !default;

When referencing a subresource, the module-specific path prefix should be prepended to a path from the root of the module:

<?prettify linenums=1?>
	background: url($o-modulename-subresource-path-prefix + /img/logo.png);

This policy is designed to enable product developers to easily use the build service, which will define `current-version` variables for each module in the bundle, and will set the global prefix to its own hostname.   This will mean that in the case of the example above, assuming version 1.2 of the colors module, the subresource would be requested from:

	http://buildservice.ft.com/files/o-colors/1.2/img/logo.png

This allows the build service to fully resolve the exact version of the right file, and serve it.  Equally, product developers may leave the prefix and version variables unchanged, in which case the default behaviour will request the resources from:

	/bower_components/o-colors/img/logo.png

If the product developer has installed the Origami modules in a `bower_components` directory (which is typical) and that directory is at the root of their web server's public document tree, the default variable values will make the subresources Just Work&trade;.  However, it's usually advisable not to install packages inside your web root, so the product developer is expected to want to redefine `$o-global-subresource-path-prefix` and implement a route for this within their front controller, mapping it to the location of their bower_components directory in their file tree.

When loading from installed modules there is no need for a version number because the subresource file will be part of the same installed package from which the CSS is drawn.


## Code organisation and formatting

### Structuring CSS source and imports

Separate styles into categories, according to the following [SMACSS](http://smacss.com/)-inspired layers:

- *Settings* - variable definitions only
- *Tools* - mixins, functions
- *Generics* - resets and very generic styles to apply to all elements
- *Base* - Default brand styles
- *Objects* - Generic styles for component primitives such as `.media`, `.box`, `.tabs`, `.list` etc.
- *GUI* - Module styles for specific components such as `.tabs-style1`, `.most-popular-content`
- *Trumps* - Simple modifiers that should trump everything else, and are marked `!important`, eg `.caps`, `.left`, `.no-margin`

Components *must* import all their dependencies, interspersing their own code, such that the above order is, as far as possible, maintained. For example:

<?prettify linenums=1?>
	/* Settings */
	@import 'o-colors/main';
	$o-tweet-background = $o-colors-box-background !default;

	/* Base */
	@import 'o-typography/main';

	/* Objects */
	@import 'o-box';

	/* GUI */
	.o-tweet {
		@extends box;
	}

When listing multiple comma-separated selectors, put each one on a new line:

<?prettify linenums=1?>
    .footer-link:hover,
    .footer-link:focus {
        //
    }

Each attribute should be on a new line and indented:

<?prettify linenums=1?>
    .footer-link {
        font-size: 12px;
        color: $o-color-link-text;
    }

### Files and folders

* SASS variables, mixins and functions should be in their own files, separate from the code that uses them

### Comments

Before adding comments, consider whether the code can be made more expressive in order to remove the need for a comment. If the code is as expressive as it can reasonably be, but the intent is still not clear, then comments should be used to supplement the code.

Avoid obvious comments:

    /*
     * Footer
     */
    footer {}

* Comments should be brief and to the point.
* Comments should be used to explain code whose purpose is to fix obscure browser bugs. Ideally the comment should include a URL to a page giving full details of the bug.
* Comments should be used to explain mixins and functions
* Comments may be used to indicate logically separate sections of files, however separate files is generally preferred
