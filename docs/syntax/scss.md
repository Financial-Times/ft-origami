---
layout: default
title: SCSS
section: Syntax
permalink: /docs/syntax/scss/
---

# SCSS standards

Origami has adopted [SASS](http://sass-lang.com/) and specifically the most common SCSS variant, as the preferred way of declaring style information.  The following rules apply to creating styles for **components**, but could also be adopted in large part for product developers.

SASS features should be used only where they result in increased clarity and reuse. Care should be taken that the resulting CSS is not compromised by unnecessary SASS nesting.

## Selectors

### Naming conventions and encapsulation

SASS does not have proper encapsulation or scope, so strict adherence to namespacing rules is essential.

* Class and placeholder selectors (`.` and `%`) and SASS variables (`$`) *must* be prefixed with the module name, and written as hypen separated lowercase strings
    - GOOD: `.o-thing--large`, `$o-grid-mq-type: width;`
    - BAD: `.largething`, '$GridIsResponsive: true;'
* Mixins and functions *must* be prefixed with the module name, and written in camel case
    - GOOD: `@mixin oGalleryCalculatePadding()`
    - BAD: `@mixin calculate-padding()`
* Tag selectors (unprefixed, eg `h1`) *must not* be used alone, but may be used if prefixed with a correctly namespaced selector
    - GOOD: `.o-thing__content > h1`
    - BAD: `h1`
* ID selectors (`#`) *must not* be used at all
* Modules *must not* set or modify any CSS or SASS element in another module's namespace.
* Classes that mark the outer element of a module component *must* have the same name as the module


### Specificity

* Specificity *must* be minimised. Use [BEM](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/), especially if the component might contain other components (eg in the case of a 'grid' component), to avoid one component's styles affecting the appearance of a component within it.  Where a component can never contain any child components (eg a 'tweet' component or a 'gallery' component), they may instead choose to use simple class names and increase specificity with the module root selector as a parent.
* Selectors *should* contain a single operand, with the following exceptions:
    * To prefix a class for feature targeting, where the first operand is a documented [Modernizr](http://modernizr.com/docs/) test class name, and the second is a correctly namespaced selector (the feature selector *should* be configurable, and set to the Modernizr value by default)
        - GOOD: `$o-tweet-featureflag-svg .o-tweet__twitter-logo`
    * To apply styles to naked tags (those without a class) inside an element marked with a module specific class.  In these cases, use a child operator to minimize the chance of interference with other modules
        - ACCEPTABLE: `.o-thing__content h1`
        - BETTER: `.o-thing__content > h1`
    * To use the adjacent element operator:
    	- GOOD: `.o-tweet__media + .o-tweet__stats`
* Combination selectors, those that specify a combination of tag name, class and/or ID in the same selector token *must not* be used
	- GOOD: `.o-thing`
	- BAD: `div.o-thing`, `span#output-area`
* Increased specificity *must not* be used to overcome an existing overly-specific selector - make the existing one less specific, or use new class names.


### State

* BEM modifiers *should* be used to indicate state, except where state is switched automatically by the browser and selectable using pseudoclasses:
	- `$o-hoverable-if-hover-enabled :hover` - element is currently under the pointer
	- `:focus` - element is the target for any text input
	- `--error` - element is in error state, e.g. a form field
	- `--disabled` - element cannot be interacted with
	- `--selected` - element is chosen out of a larger group (prefer this instead of 'active')
* Where hover effects are included, [o-hoverable](https://github.com/Financial-Times/o-hoverable) *must* be used to allow the hover effects to be turned off.


## Properties and values

### Property names

* Where vendor-specific properties are used, a mixin *should* be used to apply the various properties. This allows the vendor-specific ones to be removed from just one place as browser support changes.
* CSS hacks to target particular browsers *must not* be used.  Instead, use the **o-useragent** module.
* Properties *should* be ordered consistently.  [CSS Comb](http://csscomb.com/) *should* be used to automate this, and *should* be used during development so that other developers beneift from cleaner code being available in the source tree.

### Values

* Component CSS *should* not use `!important`.  Valid use cases for `!important` exist, but usually only at the product level.  If `!important` is used in a component, a comment *must* be left in code to explain why it was necessary.
* CSS expressions and behaviours *should* not be used, except to polyfill essential features for older browsers (e.g. boxsizing.htc for `box-sizing: border-box`)


## SASS variables

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

When styles refer to external resources such as fonts and images, the module *must* use `o-assets` to declare paths to these resources in a robust, build-agnostic fashion. Please see [the module's repository](http://git.svc.ft.com/summary/?r=origami/o-assets.git) for documentation and the rationale behind enforcing this approach.


## "Silent" styles

For every class selector included in a module's SASS, the module *must* also include the same selector as a placeholder, with the same styles.  Eg:

    .o-thing-foo, %o-thing-foo {
        margin-top: 1em;
    }

If the original selector is not a class selector then the placeholder class can use a syntax suggestive of the original selector, which *must* be documented. Eg:

    [data-o-grid-sizing~='S3'], %o-grid-sizing-S3 {
        width: 30%;
    }

Modules that make use of styles defined in other modules *must* use those styles by `@extend`ing the appropriate placeholder class:

    .o-anotherthing-foo, %o-anotherthing-foo {
        @extend %o-thing-foo;
        margin-top: 1em;
    }

Modules *should* provide a mechanism for suppressing output of any concrete selectors which may not always be required. If present, this mechanism *must* be activated by means of a sass variable `$o-{modulename}-is-silent` which *must* have a default value of `false`.  In practice, the effect of this *should* be to remove the `.`-prefixed selector, leaving only the placeholder (along with any functions, variables and mixins).

<aside>An example of an implementation satisfying these conditions can be found in the `oFtTypographyClass` mixin of the o-ft-typography module</aside>


## Code organisation and formatting

### Layout

When listing multiple comma-separated selectors, each one *must* be placed on a new line.  Each property *must* be on a new line and indented (type of indent, tabs or spaces, is not standardised: developers *must* respect whatever indent type is already in use when editing existing modules)

<?prettify linenums=1?>
    .o-footer__link:hover,
    .o-footer__link:focus {
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
