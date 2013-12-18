---
layout: default
title: Modules
section: Component types
permalink: /docs/component-types/modules/
---

# Module components

**Modules** are [git](http://git-scm.com/) repos containing static resources or [CommonJS][1] JavaScript modules with configuration enabling exportable portions of the codebase to be pulled into other projects using [Bower](http://bower.io/) or other tools compatible with the Bower package standard.  Examples of good use cases for modules are:

* Ads
* Tracking
* Sign in status (assuming that the login status is derived and added to the DOM in JavaScript)
* Search form
* Header
* Cookie notice
* Footer
* FT Main navigation (styles and behaviours only, not content)

Modules might contain resources such as JS modules, Sass modules, fonts, images, audio, video, or SVG.

## Naming conventions

Modules *must* be named using a short descriptive term (hyphenated if necessary) prefixed with `o-` (for Origami) as the name for the repository and CSS classes.  Examples: `o-tweet`, `o-colors`, `o-grid`, `o-tabs`, `o-tabs-style1`, `o-cookiewarn`, `o-ft-nav`.


## Requirements

The following requirements apply to creating a Origami-compatible module component:

* *Must* contain a valid [Origami manifest file]({{site.baseurl}}/docs/syntax/origamiconfig)
* *May* contain any resource that is a CommonJS JavaScript module, any declarative language that is agnostic of server-side technology stack (HTML, Mustache, CSS, SASS, JSON etc), or binary data (may also contain build tasks, tests etc but these must be marked as not installable in package config)
* *Must* store CSS as SCSS, so that products and other modules can make use of variables and mixins
* *Must not* be used for imperative code except JavaScript (and JavaScript must have a client-side use case to be considered a front end component)
* *Must not* contain build scripts other than for development and testing.  *Must* be buildable using the standard build process described by the [build service]({{site.baseurl}}/docs/build-service/), and all development and testing scripts *must* be excluded when the module is installed.
* Where there is a dependency on a web service component (eg because the module is a JavaScript library that makes AJAX requests to a service), each version of the web service *must* be compatible with all versions of the module that carry the same major version number (and conversely, all versions of the module must be compatible with the version of the web service that shares the module's major version number).  For example, version 2.4.5, 2.4.6, and 2.7 of a module should all use version 2 of the web service.
* Where the module contains JavaScript or SCSS, there *must* be a single 'main' file from which all other files of the same language are ultimate dependencies (using `require` or `@import` as appropriate).  These main files must be called `main.js` and `main.scss` respectively and must be in the module root.
* Where the module contains markup templates, there may be more than one 'top level' alternative for the product developer to choose from.  If the module contains a single exportable template, it *must* be called `main.mustache`.  If there are more than one, they *must* be prefixed `main-`, eg `main-large.mustache`, `main-regular.mustache`.  Multiple main templates *must* all support an identical data model.
* *May* include an bower-compatible `bower.json` file (in the root of the repo) which if present *must* conform to the requirements set out in 'Packaging and build configuration' below.
* *Must* be stored in a Git repo accessible to any FT network (see [recommendations for module locations](#where-to-store-modules) below)
* *Must not* include package management config for any package manager other than Bower, except for package config whose only purpose is to load dependencies for development or testing of the component.
* *May* contain any number of .{thing}ignore files
* *Must* include a README.md file in the root of the repo, which must contain, where applicable:
	* Any markup structure on which the module depends (if that markup is not provided by a web service).  For example, a module providing CSS to style addresses, should include a guide to writing the correct markup.  A JavaScript module that requires configuration via `data-` attributes should document those attributes.
	* Links to repos of web services that exist to provide markup or data that is used by the module.


## File structure

A module component could be organised like this, but this does not imply any requirements aside from those listed above.  The following can be considered an opinion on a good file structure for a module.

	.
	├─ examples
	├─ tests
	├─ src
	|   ├─ javascript
	|   |   ├─ module1.js
	|   |   └─ module2.js
	|   ├─ scss
	|   |   ├─ module1.scss
	|   |   └─ module2.scss
	|   ├─ images
	|   |   └─ logo.png
	|   └─ svg
	|       └─ icon1.svg
	├─ .gitignore
	├─ .origamiconfig
	├─ bower.json
	├─ main.js
	├─ main.scss
	└─ README.md



[1]: https://github.com/commonjs/commonjs/blob/master/docs/specs/modules/1.0.html.markdown
[3]: http://semver.org/
[4]: /docs/build-service/#resource_compiler
[5]: /docs/build-service/#file_proxy
[6]: http://sass-lang.com/
[7]: http://browserify.org/
