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

* Specificity *must* be minimised. Use [BEM](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) where there is any chance of components being nested.
* Specificity *must* primarily come from class naming, rather than selectors.  Selectors *may* use multiple operands if necessary, for example to prefix a class with a configuarable selector, or to apply adjacency rules:
	- GOOD: `.o-tweet__title`, `$o-tweet-legacy-behaviour .o-tweet__user`, `.o-tweet__media + .o-tweet__stats`
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

* Classes that mark the outer element of a module component *must* have the same name as the module (which will start with `o-`).  The `o-` prefix *should* not be used by product developers for their own CSS.
* Classes that are not restricted to a module root *must* be named `o-{classname}`, which may be different from the name of the module.  For example, a module called `o-typography` may contain a class called `o-allcaps`.
* Classes that style elements within a module root element should use single selectors based on [BEM](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/), especially if the component might contain other components (eg in the case of a 'grid' component), to avoid one component's styles affecting the appearance of a component within it.  Where a component can never contain any child components (eg a 'tweet' component or a 'gallery' component), they may instead choose to use simple class names and increase specificity with the module root selector as a parent.
* SASS variables, mixins and functions are global (within all SASS files being processed at one time), so name them to avoid conflicts. 
    - GOOD: `$o-gallery-thumb-width`, `@mixin oGalleryCalculatePadding()`
    - BAD: `$thumb-width`, `@mixin calculatePadding()`

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
* Order properties consistently. The use of [CSS Comb](http://csscomb.com/) is recommended to automate this, and should be used during development so that other developers beneift from cleaner code being available in the source tree.

## Hacks and feature/user-agent detection

* Prefer [feature flag](/ft-origami/docs/syntax/html/) and conditional classes to CSS hacks. Where you use a conditional class, make it configurable so that the product developer can use whatever classname they want, and can apply the legacy support to whichever user agents they want. [Modernizr](/ft-origami/docs/3rd-party-a-list/) is the preferred tool for applying conditional classes to the html.
	- GOOD: `$o-modulename-nosvg .thing { display: none; }`
	- BAD: `.no-inlinesvg .thing {display: none}`
	- BAD: `.thing { display*: none; }`

* If targeting a particular user agent is unavoidable the module *must* use the selector variables provided by [o-useragent](http://git.svc.ft.com/summary/?r=origami/o-useragent.git). If o-useragent doesn't already contain a variable to target the user agent you need, add a variable to it and release a new patch.
	- GOOD: `$o-useragent-ie7 .thing { height: 100%; }`
	- BAD: `.ie7 .thing { height: 100%; }`
	- BAD: `.thing { height*: 100%; }`

## Values

* Component CSS *should* not use `!important`.  Valid use cases for !important exist, but usually only at the product level.  If !important is used in a component, a comment should be left in code to explain why it was necessary.
* Avoid CSS expressions and behaviours, except to polyfill essential features for older browsers (e.g. boxsizing.htc for `box-sizing: border-box`)

### SASS variables

* If a variable could potentially be used as a configurable option in products consuming the module, the variable *must* be defined with `!default` and added to the module's documentation
* Variables that are internal to a module and which should not be used or set outside of it *must* be prefixed with an underscore, *should* be defined without !default, and *should not* be included in the module's documentation.  Since SASS has no private scope, these underscore variables are not protected from overwriting so we use convention to distinguish them from public variables.
* Modules *must not* overwrite variables defined by another module.  Instead, a module *may* define a new variable in its own namespace and set it to the value of the dependency's variable.
* Variables *should* be defined in a dedicated file.
* Variables intended for use externally by consuming products and modules *should* be defined by their purpose, rather than their value: e.g. `$o-colors-skyline-bg` rather than `$o-colors-beige`

## Responsiveness

Modules are responsible for providing responsive behaviours where appropriate.  There are a number of strategies available.  We intend to standardise this but do not yet have agreement on the best strategy.  In the meantime, component authors are requested to raise their use case and preference on issue [#68](https://github.com/Financial-Times/ft-origami/issues/68) in the issue tracker.  Currently we see the following possible solutions:

1. **Module includes media queries** and manages its responsiveness autonomously.  This makes the component easiest to consume by products, but only works for full width modules, makes it hard to *prevent* a module acting responsively when the page width of the product is fixed, and by default may result in numerous rather un-coordinated breakpoints.  If using this strategy, all breakpoint length measurements must be configurable variables.
2. **Module includes mixins**, such as `o-tweet-responsive-narrow`, which a product developer may include in their media queries.  This has the benefit of allowing product developers to manage breakpoints in a way that suits their content more holistically, and means unused responsive styles will be compiled out when the bundle is built.  However, it requires the product developer to do additional work to enable the module's responsive behaviour, and could not easily be supported by the build service.
3. **Module includes responsive classes**, a similar approach to using mixins, but product developers would control responsiveness by adding or removing classes in the markup rather than importing mixins in their CSS.  This allows product developers to make use of the responsiveness even when fetching CSS from the build service, but changing from one responsive style to another would require JavaScript.
4. **Module includes multiple markup templates**, which contain potentially starkly different markup for rendering the same data model.  This allows components to more easily change beyond recognition when going from one responsive mode to another (eg a vertical accordian becomes a horizontal tab bar), but would require much more extensive development work by the product developer if they wanted to use multiple templates.

Regardless of which of the above strategies is used, components *must* by default render themselves correctly in at least a coherent non-responsive way.

## Subresources

When your styles refer to external resources, notably fonts and images, the module *must* use `o-assets` to declare paths to these resources in a robust, build-agnostic fashion. Please see [the module's repository](http://git.svc.ft.com/summary/?r=origami/o-assets.git) for documentation and the rationale behind enforcing this approach.



## Code organisation and formatting

### Layout

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
