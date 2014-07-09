---
layout: default
title: SCSS
section: Syntax
permalink: /docs/syntax/scss/
---

# SCSS standards

Origami has adopted [SASS](http://sass-lang.com/) and specifically the most common SCSS variant, as the preferred way of declaring style information.  The following rules apply to creating styles for **components**, but could also be adopted in large part for product developers.

SASS features should be used only where they result in increased clarity and reuse. Care should be taken that the resulting CSS is not compromised by unnecessary SASS nesting.

## SASS version

Component developers and Origami build tools *must* use SASS version ~3.3.0, and *should* fix any issues alerted by the compiler as deprecation warnings from 3.2.

## Syntax convention rules

SASS *must* validate using the following [SCSS-lint](https://github.com/causes/scss-lint) rules:

<script src="https://gist-it.appspot.com/github/Financial-Times/origami-build-tools/blob/master/config/scss-lint.yml?footer=minimal&amp;callback=oTechdocs.renderGistIt"></script>

##Selectors

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
* Styles *must not* affect any element except those which:
    * are in a portion of [owned DOM]({{site.baseurl}}/docs/syntax/html/#owned_dom); or
    * have an existing class in the module's namespace.


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

[ARIA roles](http://www.w3.org/TR/wai-aria/states_and_properties) *should* be used to indicate state, except where state is switched automatically by the browser and selectable using pseudoclasses.  The following states *should* be considered:

<table class='o-techdocs-table'>
    <tr><th>State</th><th>Description</th><th>Define using</th><th>Style guidance</th></tr>
    <tr>
        <td>Hovered</td>
        <td>The user has a <a href='#note-hoverable'>hoverable pointer</a> and it is positioned above the element.  Component developers *must* prefix all <code>:hover</code> pseudo-classes using an <a href='https://github.com/Financial-Times/o-hoverable'>o-hoverable</a> feature flag.</td>
        <td><code>:hover</code></td>
        <td>Having a hover effect hints to the user that clicking the element will do something.  Hover effects should be subtle, and if possible, suggestive of the action that will occur on click</td>
    </tr>
    <tr>
        <td>Focused</td>
        <td>The element is the current target of keyboard input</td>
        <td><code>:focus</code></td>
        <td>Any element on the page that is interactive must have a focused style that is distinct from its normal style.  Browsers will  add a default focused style to elements that are normally interactive, and the effect is typically a glow.</td>
    </tr>
    <tr>
        <td>Busy</td>
        <td>The element is currently being updated.</td>
        <td><code>[aria-busy]</code></td>
        <td>Busy states are typically indicated by a spinner or progress indicator being added to, or replacing, the content of the element</td>
    </tr>
    <tr>
        <td>Selected</td>
        <td>The element is a member of a list and is the currently selected item (or one of several currently selected items).  Not to be confused with <em>Active</em>.</td>
        <td><code>[aria-selected]</code></td>
        <td>The selected state should be strong and easily distinguishable from the stadard state.  It often inverts the colors, so things that are light-on-dark become dark-on-light when selected.</td>
    </tr>
    <tr>
        <td>Disabled</td>
        <td>The element is normally interactive, but interactivity is currently unavailable.</td>
        <td><code>:disabled</code></td>
        <td>When disabled, elements are usually displayed with less contrast and colour and with a flatter appearance.</td>
    </tr>
    <tr>
        <td>Active</td>
        <td>The element is currently being interacted with by the user.   Usually indicates that a mouse button is pressed down on the element.</td>
        <td><code>:active</code></td>
        <td>We typically do not style this state.</td>
    </tr>
    <tr>
        <td>Invalid</td>
        <td>The value entered into the element does not conform to the format expected by the application.</td>
        <td><code>[aria-invalid]</code></td>
        <td>Form fields in this state are typically displayed with a red border or background and may be suffixed with an icon and a message indicating the reason why the input was invalid.</td>
    </tr>
    <tr>
        <td>Pressed</td>
        <td>The element is a toggle (you can interact with it once to activate it, and again to deactivate it) and it is currently activated. Distinct from a checkbox because it activates an effect immediately, while a checkbox typically records data that isn't acted upon until a form is submitted.</td>
        <td><code>[aria-pressed]</code></td>
        <td>This can often be similar to the selected state, but also commonly found in a 'toggle switch' style.  In 3D designs, the pressed state is often shown concave instead of convex.</td>
    </tr>
    <tr>
        <td>Expanded</td>
        <td>The element, or another element that it controls, is currently expanded.  Appropriate to use this for flyout or dropdown navigation menus.</td>
        <td><code>[aria-expanded]</code></td>
        <td>When applied to menus, this should sit well with the selected and hover states.  Expanded should be stronger than hover or selected.</td>
    </tr>
</table>

By default, a module's style rules *must* render it in a form suitable for use without JavaScript (which may involve hiding it completely). Any modifications to that style which are desired if the JavaScript component of the module is present must be prefixed with `.o-modulename--js`.


### Feature flags and UA targeting

Style rules that are intended to apply to only a subset of user agents *should* use feature flags to apply the rules (which is a progressive enhancement technique).  Where feature flagging is not possible, developers *may* choose to target specific user agents (a graceful degradation technique).

#### Feature flags

The following are acceptable types of feature flag, in order of preference:

1. A SASS variable in the current module's namespace, set by default to the name of an appropriate Modernizr feature-detect, eg.

        $oModuleIfInlineSVG: 'inlinesvg' !default;
        $oModuleIfInlineSVG .oModuleThing {
            background: url(...inline SVG...);
        }

2. A function call to another module, whose purpose is to provide a feature detect:

        @import 'o-hoverable/main';
        #{oHoverableGetFlagSelector()} .oModuleThing:hover {
            text-decoration: underline;
        }

3. A SASS variable imported from another module's namespace, where the purpose of the module is to provide a feature detect:

        @import 'o-hoverable/main';
        $o-hoverable-if-hover-enabled .oModuleThing:hover {
            text-decoration: underline;
        }

Component developers *must not* use feature flags that would need to be set manually by a product developer (ie those that do not have feature detect code within Modernizr or feature-detection modules in Origami).  Component developers *must* assume that feature flag classes will be set on the `documentElement`, ie. the HTML tag.

Where a block of styles is feature-flagged, it *must not* extend any other component's placeholders or classes (see [issue 159](https://github.com/Financial-Times/ft-origami/issues/159)).

<?prettify linenums=1?>
    .o-mymodule-selector {
      color: red;
      @extend %o-yourmodule-placeholder;  // Extending allowed because .o-mymodule-selector is not a feature flag
    }

    $o-hoverable-if-hover-enabled .o-mymodule-selector {
      color: red;
      // No extending allowed here because the selector for this block includes a feature flag
    }


#### UA targeting

Where necessary, components *may* provide style rules targeted at specific user agents.  The [o-useragent](https://github.com/Financial-Times/o-useragent) module must be used to do this.


## Properties and values

### Property names

* Where vendor-specific properties are used, [o-useragent](https://github.com/Financial-Times/o-useragent)'s `oUseragentPrefixer()` mixin *should* be used to apply vendor prefixes. This gives product developers control over which ones are included in their stylesheets.
* CSS hacks to target particular browsers *must not* be used.  Instead, use [o-useragent](https://github.com/Financial-Times/o-useragent)'s `oUseragentTarget()` mixin.
* Properties *should* be ordered consistently.  [CSS Comb](http://csscomb.com/) *should* be used to automate this, and *should* be used during development so that other developers beneift from cleaner code being available in the source tree.

### Values

* Component CSS *should* not use `!important`.  Valid use cases for `!important` exist, but usually only at the product level.  If `!important` is used in a component, a comment *must* be left in code to explain why it was necessary.
* CSS expressions and behaviours *should* not be used, except to polyfill essential features for older browsers (e.g. boxsizing.htc for `box-sizing: border-box`)
* Lengths *must* use pixel or percentage units, not ems or rems.


## SASS variables

* If a variable could potentially be used as a configurable option in products consuming the module, the variable *must* be defined with `!default` and added to the module's documentation
* Variables that are internal to a module and which should not be used or set outside of it *should* be defined without !default.  Since SASS has no private scope, these underscore variables are not protected from overwriting so we use convention to distinguish them from public variables (see 'Privacy' below)
* Modules *must not* overwrite variables defined by another module.  Instead, a module *may* define a new variable in its own namespace and set it to the value of the dependency's variable.
* Variables *should* be defined in a dedicated file.
* Variables intended for use externally by consuming products and modules *should* be defined by their purpose, rather than their value: e.g. `$o-colors-skyline-bg` rather than `$o-colors-beige`


## Privacy and imports

Any object (eg. class, mixin, placeholder, function, variable) that is intended for public use (ie may be referenced by code outside of its own module) *must* be documented in the module's README.  All other objects *must* be prefixed with an underscore character, and *must not* be documented in the README (they *may* be documented in code comments).

If a module contains SCSS files other than the main file listed in bower.json, the file names of those files must be prefixed with an underscore, and all such files *must* be imported before any other SASS code.  All import statements *should* be in the module's main file.


## Responsiveness

Modules are responsible for providing responsive behaviours where appropriate, but take care not to build in responsive behaviour that may not be desired by the product.

* Modules that in most or all use cases will span the full width of a page (eg o-ft-header, o-ft-footer, o-grid) *may* contain media queries, or mix in placeholder classes from other modules that contain media queries.  If so, the breakpoints in the media queries *must* be configurable as SASS variables.
* All other modules *must* provide placeholder (and concrete if not in silent mode) classes to modify their appearance to suit different sizes of container, eg `o-tweet--large`, `o-tweet--medium` etc.  Product developers may then use these placeholders to mix in module responsiveness into their own media query breakpoints.
* When there is no media query support in the user agent (in the case of modules that use media queries) or the module's responsive placeholders have not been used, the module *must* render in its most compact visual form.


## Subresources

When styles refer to external resources such as fonts and images from an Origami module, the module *must* use `o-assets` to declare paths to these resources in a robust, build-agnostic fashion. Please see [the module's repository](https://github.com/financial-times/o-assets) for documentation and the rationale behind enforcing this approach.

Where external resources are not within Origami modules, a [protocol-relative URL](http://www.paulirish.com/2010/the-protocol-relative-url/) *must* be used (see [issue 173](https://github.com/Financial-Times/ft-origami/issues/173)).



## "Silent" styles

For every class selector included in a module's SASS, the module *must* also include the same selector as a placeholder or via a mixin, with the same styles.  Eg:

<?prettify linenums=1?>
    .o-thing-foo, %o-thing-foo {
        margin-top: 1em;
    }

If the original selector is not a class selector then the placeholder class can use a syntax suggestive of the original selector, which *must* be documented. Eg:

<?prettify linenums=1?>
    [data-o-grid-sizing~='S3'], %o-grid-sizing-S3 {
        width: 30%;
    }

Modules that make use of styles defined in other modules *must* use those styles by `@extend`ing the appropriate placeholder class (the `!optional` flag *should* be used to prevent compilation errors if something, e.g. a product developer changing a setting, causes that  placeholder class to be suppressed):

<?prettify linenums=1?>
    .o-anotherthing-foo, %o-anotherthing-foo {
        @extend %o-thing-foo !optional;
        margin-top: 1em;
    }

Where combinations of styles are used to create more complex elements, it may be sensible to use mixins rather than placeholders, eg:

<?prettify linenums=1?>
    @mixin oButtonsButton($buttonclass) {
        .#{$buttonclass} {
            /* standard button styles */
           &--standout {
             /* overrides & additions to make the button brighter */
           }
        }
    }

### Suppressing noisy styles with a 'silent mode'

Modules *should* provide a mechanism for suppressing output of any concrete selectors which may not always be required. If present, this mechanism *must* be activated by means of a sass variable `$o-{modulename}-is-silent` which *must* have a default value of `false`.  In practice, the effect of this *should* be to remove the `.`-prefixed selector, leaving only the placeholder (along with any functions, variables and mixins).

An example of an implementation satisfying these conditions can be found in the `oFtTypographyClass` mixin of the o-ft-typography module.


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
