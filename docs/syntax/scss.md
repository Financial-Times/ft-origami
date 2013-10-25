---
layout: default
title: SCSS
section: Syntax
permalink: /docs/syntax/scss/
---

# SCSS coding guidelines

Origami has adopted SASS and specifically the most common SCSS variant, as the preferred way of declaring style information.

## Selectors

* Specificity should be minimised
* Specificity should primarily come from class naming, rather than selectors
* Keep selectors short. Ideally just one class
* Avoid IDs
* Avoid using only tag names, except when applying a reset
* Avoid using tag names in addition to classes
* Avoid relying on a specific element structure (e.g. ``.module h1 span``) unless you’re really confident that the structure will never change
* Avoid specificity wars. Don’t use increased specificity to overcome an existing overly-specific selector - make the existing one less specific, or use new class names etc

## Class naming

* Classes that mark the outer element of a module should be named ``ft-{modulename}-module``.
* Classes that are not restricted to a module root should be named ``ft-{classname}``.
* Classes that are constrained by a module root class selector should be unadorned.
* Consider separating styles into categories, according to [SMACSS](http://smacss.com/) principles:
    * *Base* - resets, defaults
    * *Layout* - for dividing the page into the major sections
    * *Module* - the reusable, modular components of a design, including minor (intra-module) layout
    * *State* - hover, disabled, etc
    * *Theme* - colours, typography etc

## State
* Define default style first, then state-specific styles
* Name states according to these definitions:
    * *hover* - (:hover) when mouse pointer is over element
    * *focus* - (:focus) when key events will be targetted to the element
    * *error* - element is in error state, e.g. a form field
    * *disabled* - element cannot be interacted with
    * *selected* - element is chosen out of a larger group
* Bear in mind iOS's emulated-hover behaviour on elements whose ``:hover`` style changes ``display`` or ``visibility``
* Consider all forms of user input, not just mouse.

## Attributes

* Where vendor-specific attributes are used, use a mixin to apply the various attributes. This allows the vendor-specific attributes to be removed from just one place as browser support changes.
* Prefer conditional (``.lt-ie9``) classes over CSS hacks
* Avoid CSS expressions and behaviours, except to polyfill essential features for older browsers (e.g. boxsizing.htc for ``box-sizing: border-box``)
* Order attributes consistently. The use of [CSS Comb](http://csscomb.com/) is recommended to automate this.
* Do not use ``!important``

## Media queries

* Declare default styles first, then enhance with media-query-based styles
* Define them in one place using mixins
* Use variables for the values used in the media query (min-width, max-width etc)

## Code organisation and formatting

### Files and folders

* SASS variables, mixins and functions should be in their own files, separate from the code that uses them

### Comments

Comments should be kept to a minimum as they are often ignored or missed by developers. This results in out of date comments that no longer relate to the surrounding code. If you see redundant comments, follow the [boy scout rule](http://programmer.97things.oreilly.com/wiki/index.php/The_Boy_Scout_Rule).

* Comments may be used to indicate logically separate sections of files, however separate files is generally preferred
* Comments should be used to explain attributes whose purpose is to fix obscure browser bugs. Ideally the comment should include a URL to a page giving full details of the bug.
* Comments should be used to explain mixins and functions

## SASS features

SASS features should be used only where they result in increased clarity and reuse. Care should be taken that the resulting CSS is not compromised by unnecessary SASS nesting etc.

SASS variables, mixins and functions are global (within all SASS files being processed at one time), so name them to avoid conflicts. e.g. ``$ftGridColWidth`` instead of ``$colWidth``

### Variables

* Should be defined in their own file.
* Variables for use by third parties should generally be defined by their purpose, rather than their value: e.g. ``$bgColorSkyline`` rather than ``$biege``

### Nesting

* Use of SASS nesting can easily result in unnecessarily long, inefficient, and overly-specific selectors.
* If nesting is used, it should be done so sparingly and to a maximum of 2 levels.

## Code formatting

* When listing multiple comma-separated selectors, put each one on a new line.
* Each attribute should be on a new line and indented.


