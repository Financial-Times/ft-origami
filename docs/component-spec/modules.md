---
layout: default
title: Modules
section: Component spec
permalink: /docs/component-spec/modules/
---

# Module components

**Modules** are [git](http://git-scm.com/) repos containing static resources or [CommonJS](https://github.com/commonjs/commonjs/blob/master/docs/specs/modules/1.0.html.markdown) JavaScript modules with configuration enabling exportable portions of the codebase to be pulled into other projects using [Bower](http://bower.io/) or other tools compatible with the Bower package standard.  Examples of good use cases for modules are:

* Ads
* Tracking
* Sign in status (assuming that the login status is derived and added to the DOM in JavaScript)
* Search form
* Header
* Cookie notice
* Footer
* FT Main navigation (styles and behaviours only, not content)

## Naming conventions

Modules *must* be named using a short descriptive term (hyphenated if necessary) prefixed with `o-` (for Origami) as the name for the repository and CSS classes.

<aside>Examples of good module names include <code>o-tweet</code>, <code>o-colors</code>, <code>o-grid</code>, <code>o-tabs</code>, <code>o-tabs-style1</code>, <code>o-cookiewarn</code>, <code>o-ft-nav</code>.</aside>


## Requirements

The following requirements apply to creating a Origami-compatible module component:

* *Must* contain a valid [Origami manifest file]({{site.baseurl}}/docs/syntax/origamiconfig)
* *May* contain any resource that is a CommonJS JavaScript module, any declarative language that is agnostic of server-side technology stack (HTML, Mustache, CSS, SASS, JSON etc), or binary data (may also contain build tasks, tests etc but these must be marked as not installable in package config)
* *Must* store CSS as SCSS, to enable products and other modules to make use of variables and mixins
* *Must not* be used for imperative code except JavaScript (and JavaScript must have a client-side use case to be considered a front end component)
* *Must not* contain build scripts except as required for development and testing.  *Must* be buildable using the standard build process described by the [build service]({{site.baseurl}}/docs/developer-guide/build-service/)
* All build, development and testing scripts *must* be listed as ignores in the module's bowser configuration.
* Where there is a dependency on a web service component (eg because the module is a JavaScript library that makes AJAX requests to a service), each version of the web service *must* be compatible with all versions of the module that carry the same major version number (and conversely, all versions of the module must be compatible with the version of the web service that shares the module's major version number).  For example, version 2.4.5, 2.4.6, and 2.7 of a module *must* all be compatible with version 2 of the web service.
* Where the module contains JavaScript or SCSS, there *must* be a single 'main' file from which all other files of the same language are ultimate dependencies (using `require` or `@import` as appropriate).  These main files *must* be called `main.js` and `main.scss` respectively and *must* be in the module root.
* Where the module contains markup templates, there may be more than one 'top level' alternative for the product developer to choose from.  If the module contains a single exportable template, it *must* be called `main.mustache`.  If there is more than one, they *must* be prefixed `main-`, eg `main-large.mustache`, `main-regular.mustache`.  Multiple main templates *must* all support an identical data model.
* *Should* include a bower-compatible `bower.json` file (in the root of the repo) which if present *must* conform to the requirements set out in 'Packaging and build configuration' below.
* *Must* be stored in a Git repo accessible to any FT network (see [recommendations for module locations](#where-to-store-modules) below)
* *Must not* include package management config for any package manager other than Bower, except for package config whose only purpose is to load dependencies for development or testing of the component.
* *May* contain any number of .{thing}ignore files
* *Must* include a README.md file in the root of the repo, which must contain, where applicable:
	* Any markup structure on which the module depends (if that markup is not provided by a web service).  For example, a module providing CSS to style postal addresses, should include a guide to writing the correct markup.  A JavaScript module that requires configuration via `data-` attributes should document those attributes.
	* Links to repos of web services that exist to provide markup or data that is used by the module.
* SASS *must* conform to the syntax and language standards for (use of SASS in Origami components)[../syntax/scss]
* JavaScript *must* conform to the syntax and language standards for (use of JavaScript in Origami components)[../syntax/javascript]

## Packaging and build configuration

<aside>When a developer goes to use a module, and finds that it has config for a particular package management system, they should be able to assume that the same package manager can be used to install <em>any</em> Origami module.  So it's important that all Origami modules share the same package config and do not include any 'special' config for package managaement systems that aren't compatible with all modules.</aside>

[Bower](http://bower.io/) is the package manager used by Origami.  If a module has no dependencies, Bower does not require any package configuration, though the module *must* be tagged in git with [Semver](http://semver.org)-compatible version numbers (eg `v0.0.4`).  Component authors *should* provide a `bower.json` file anyway, *must* do so if the module has dependencies, and if they do it *must* conform to the following requirements:

* *Must* include a `name` property set to the repo name, eg 'o-grid'
* *Must* include a `main` property *if* the module contains any JavaScript, and if present, *must* be set to the value `main.js`.
* *Must* include a `dependencies` object *if* the module has any Origami dependencies and should accept as wide a range of versions of dependencies as possible (also see 'Module subdependencies' below)
* *Must* include an `ignore` property listing all files and directories in the module that are not required by product developers, which *must* include anything that is not declarative code or front end JavaScript.
* *May* include `devDependencies` if appropriate
* *Must not* include a `version` property.  The version property is not needed and risks being out of sync with the repo tag
* *Should* not include anything else

The following is an example `bower.json` file that meets the above spec:

<?prettify linenums=1?>
	{
	  "name": "o-grid",
	  "dependencies": {
	    "o-colors": "git://github.com:Financial-Times/o-colors.git#>=1.2.0 <1.3.0"
	  },
	  "ignore": [
	    "examples",
	    "tests",
	    ".gitignore"
	  ]
	}

Optionally, a module *may* include an npm-compatible `package.json` file, to allow it to install dependencies for development and testing (in fact, a module *may* install dependencies for development and testing using any package management system).  These package configs *must not* specify any `dependencies`, `files` or `main` properties, to avoid any implication that the npm config is designed to allow the module to be installed as a package using npm.  Instead, `devDependencies` should be used.

* *Must* include a `private` property with the value set to `true`.
* *Must* include a `devDependencies` object *if* the module has any npm dependencies for dev or testing
* *Must not* include any of the following: `dependencies`, `files`, `main`, `bugs`, `publishConfig`, `preferGlobal`, `cpu`, `os`, `engineStrict`, `engines`, `config`, `bin`.
* *May* include any other standard npm-defined property

The following is an example `package.json` file that meets the above spec:

<?prettify linenums=1?>
	{
	  "devDependencies": {
	    "grunt": "*",
	    "node-sass": "*"
	  },
	  "private": true
	}


## Module subdependencies

Modules *should* have as few subdependencies as possible.  Where the dependency is required to test the module or view the examples, but not to use it, it should be listed in `devDependencies` not in `dependencies`.

When listing dependencies in the `dependencies` section of the `bower.json` package configuration, the version requried *must* specify as wide a range as possible, allowing for at least automatic point release updates.  Where the dependency is an Origami module that is *also a dependency of many other Origami modules*, it *must* to verify and assert the widest version compatibility possible, including maintaining compatibility with earlier versions unless to do so would be impractical.

Where a dependency is an Origami module it *must* be listed under its original name (in order to avoid causing conflicts in the Build service resource compiler.

* Good: `"o-colors": "git://github.com:Financial-Times/o-colors.git#>=1.2.0 <1.3.0"`
* Bad: `"colors-legacy": "git://github.com:Financial-Times/o-colors.git#1.1.0"`


## Tests and examples

Component authors *may* test their component however they like, provided that all test related files *should* be in the `tests` directory, and that test related files *must* not be installable.  The source files of the component *should* be in `src` (except the main JS and/or SASS file).  The project *must* contain a `README.md` formatted in markdown.

Component authors *may* include an `examples` or `dist` folder to provide examples or pre-compiled versions of the source, but these *should* not be installable.


## Where to store modules

Modules *must* be stored in git repos with the same name as the module itself.  The host server *must* be one of the following, listed in order of preference (from most preferred to least):

1. Public GitHub (github.com/Financial-Times)
2. FT's GitBlit (git.svc.ft.com)
3. FT Labs' GitHub Enterprise (git.ak.ft.com)
4. Private repo on public GitHub (github.com/Financial-Times)


## File structure

This section is non-normative.  A module component *may* be organised as follows, but this does not imply any requirements aside from those listed above.  The following can be considered an opinion on a good file structure for a module.

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

