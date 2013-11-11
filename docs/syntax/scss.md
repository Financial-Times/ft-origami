---
layout: default
title: SCSS
section: Syntax
permalink: /docs/syntax/scss/
---

# SCSS standards

Origami has adopted [SASS](http://sass-lang.com/) and specifically the most common SCSS variant, as the preferred way of declaring style information.

## Selectors

* Specificity should be minimised
* Specificity should primarily come from class naming, rather than selectors
    - GOOD: `.ft-thing-title`
	- BAD: `div.header div.titleContainer h1`
* Keep selectors short. Ideally just one class
* Avoid IDs
* Avoid using only tag names, except when applying a reset
* Avoid using tag names in addition to classes
	- GOOD: `.ft-thing-module`
	- BAD: `div.ft-thing-module`
* Avoid relying on a specific element structure unless you’re really confident that the structure will never change
	- GOOD: `.ft-thing-title-icon`
	- BAD: `.ft-thing-module h1 span`
* Avoid specificity wars. Don’t use increased specificity to overcome an existing overly-specific selector - make the existing one less specific, or use new class names.

## Class naming

* Classes that mark the outer element of a module should be named `ft-{modulename}-module`.
* Classes that are not restricted to a module root should be named `ft-{classname}`.
* Classes that are constrained by a module root class selector should be unadorned.
* Consider separating styles into categories, according to [SMACSS](http://smacss.com/) principles:
	- *Base* - resets, defaults
	- *Layout* - for dividing the page into the major sections
	- *Module* - the reusable, modular components of a design, including minor (intra-module) layout
	- *State* - hover, disabled, etc
	- *Theme* - colours, typography etc

## State

* Define default style first, then state-specific styles
* Name states according to these definitions:
	- *hover* - (:hover) when mouse pointer is over element
	- *focus* - (:focus) when key events will be targetted to the element
	- *error* - element is in error state, e.g. a form field
	- *disabled* - element cannot be interacted with
	- *selected* - element is chosen out of a larger group
* Consider iOS's emulated-hover behaviour on elements whose `:hover` style changes `display` or `visibility`
* Consider all forms of user input, not just mouse.

## Properties

* Where vendor-specific properties are used, use a mixin to apply the various properties. This allows the vendor-specific ones to be removed from just one place as browser support changes.
* Prefer [feature flag](/ft-origami/docs/syntax/html/) and conditional classes to CSS hacks
    - GOOD: `.lt-ie8 .module { height: 100px; }`
    - BAD: `.module { height*: 100px; }`
* Order properties consistently. The use of [CSS Comb](http://csscomb.com/) is recommended to automate this.

## Values

* Do not use `!important`
* Avoid CSS expressions and behaviours, except to polyfill essential features for older browsers (e.g. boxsizing.htc for `box-sizing: border-box`)

## Media queries

* Consider browsers that don't support media queries. Default styles may need to be declared outside of a media query, then overridden with ones in a media query
* Define them in one place using mixins
* Use variables for the values used in the media query (min-width, max-width etc)

## Code organisation and formatting

When listing multiple comma-separated selectors, put each one on a new line:

    .footer-link:hover,
    .footer-link:focus {
        //
    }

Each attribute should be on a new line and indented:

    .footer-link {
        font-size: 12px;
        color: $ft-color-link;
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

## SASS features

SASS features should be used only where they result in increased clarity and reuse. Care should be taken that the resulting CSS is not compromised by unnecessary SASS nesting etc.

SASS variables, mixins and functions are global (within all SASS files being processed at one time), so name them to avoid conflicts. e.g. `$ft-grid-col-width` instead of just `$col-width`

### Variables

* Should be defined in their own file.
* Variables for use by third parties should generally be defined by their purpose, rather than their value: e.g. `$bg-color-skyline` rather than `$biege`

### Nesting

* Use of SASS nesting can easily result in unnecessarily long, inefficient, and overly-specific selectors.
* If nesting is used, it should be done so sparingly and to a maximum of 2 levels.



