
---
layout: default
title: Modules
section: Component types
permalink: /docs/component-types/modules/
---

# Module components

**Modules** are git repos containing static resources or JavaScript with a `package.json` file allowing for exportable portions of the codebase to be pulled into other projects using [NPM](https://npmjs.org/) or other tools compatible with the NPM package standard.  Examples of good use cases for modules are:

* Ads
* Tracking
* Sign in status (assuming that the login status is derived and added to the DOM in JavaScript)
* Search form
* Header
* Cookie notice
* Footer
* FT Main navigation (styles and behaviours only, not content)

Modules might contain resources such as JS modules, Sass modules, fonts, images, audio, video, or SVG.

## Requirements

The following requirements apply to creating a Origami-compatible module component:

* *Should* be used for any resource that is (when required by a dependency manager) a collection of only static files or JavaScript
* *May* contain any resource that is JavaScript, any declarative language (HTML, CSS, JSON etc), or binary data.
* *Must not* be used for imperative code except JavaScript (and JavaScript must have a client-side use case to be considered a front end component)
* Where there is a dependency on a web service component, each version of the web service *must* be compatible with all versions of the module that carry the same major version number (and conversely, all versions of the module must be compatible with the version of the web service that shares the module's major version number).  For example, version 2.4.5, 2.4.6, and 2.7 of a module should all use version 2 of the web service.
* *Must* include a `package.json` conforming to the npm standard in the root of the repo for npm package management, and must not include package management config for any other package manager.
* *May* contain any number of .{thing}ignore files
* *Should* be organised as simply as possible and not include any extraneous files


## File structure

A module component should be organised like this:

	.
	├─ [examples]
	├─ [dist]
	├─ buildconf
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
	├─ package.json
	└─ README.md


## Packaging and build configuration

**TODO: package.json example + requirements for build service, build scripts, peerDependencies**


## Tests and examples

We don't seek to standardise how a component author chooses to test their code, only that all test related files should be in the `tests` directory.  The source files of the component should be in `src`.  The project must contain a `README.md` formatted in markdown.

If the component author wishes to include an `examples` or `dist` folder to provide examples or pre-compiled versions of the source, they're welcome to do so, but these aren't required.  The build service is able to build modules on demand, so the need benefit in pre-compiled versions is limited.
