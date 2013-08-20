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

## Requirements

The following requirements apply to creating a Origami-compatible module component:

* *Should* be used for any resource that is (when required by a dependency manager) a collection of only static files or JavaScript
* *May* contain any resource that is a CommonJS JavaScript module, any declarative language (HTML, CSS, JSON etc), or binary data.
* *Should* store CSS as raw SCSS, so that products and other modules can make use of variables and mixins
* *Must not* be used for imperative code except JavaScript (and JavaScript must have a client-side use case to be considered a front end component)
* Where there is a dependency on a web service component (eg because the module is a JavaScript library that makes AJAX requests to a service), each version of the web service *must* be compatible with all versions of the module that carry the same major version number (and conversely, all versions of the module must be compatible with the version of the web service that shares the module's major version number).  For example, version 2.4.5, 2.4.6, and 2.7 of a module should all use version 2 of the web service.
* Where the module contains JavaScript or SCSS, there *must* be a single 'main' file from which all other files of the same language are ultimate dependencies (using `require` or `@import` as appropriate).  These main files must be called `main.js` and `main.scss` respectively and must be in the module root.
* *May* include an bower-compatible `bower.json` file (in the root of the repo) which if present *must* conform to the requirements set out in 'Packaging and build configuration' below.
* *Must* be stored in a Git repo (which *should* be GitHub) accessible to any FT network
* *Must not* include package management config for any package manager other than Bower **(TODO: What about modules that require a ton of npm stuff for dev and testing?)**
* *May* contain any number of .{thing}ignore files
* *Should* be organised as simply as possible and not include any extraneous files
* *Must* include a README.md file in the root of the repo, which must contain, where applicable:
	* Any markup structure on which the module depends (if that markup is not provided by a web service).  For example, a module providing CSS to style addresses, should include a guide to writing the correct markup.
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
	├─ bower.json
	├─ main.js
	├─ main.scss
	└─ README.md


## Packaging and build configuration

When a developer goes to use a module, and finds that it has config for a particular package management system, they should be able to assume that the same package manager can be used to install *any* Origami module.  So it's important that all Origami modules share the same package config and do not include any 'special' config for package managaement systems that aren't compatible with all modules.

[Bower](http://bower.io/) is the package manager supported by Origami.  If a module has no dependencies, bower does not require any package configuration, though the module *must* be tagged in git with Semver-compatible version numbers (eg `v0.0.4`).  Component authors may choose to provide a `bower.json` file anyway, and must do so if the module has dependencies, and if they do it must conform to the following requirements:

* *Must* include a useful `name`
* *Must* include a `version` based on [Semver][3] rules
* *Must* include a `main` property *if* the module contains any JavaScript, and *must* be set to the value `main.js`.
* *Must* include a `dependencies` object *if* the module has any Origami dependencies and should accept as wide a range of versions of dependencies as possible (also see 'Module subdependencies' below)
* *Must* include an `ignore` property listing all files and directories in the module that are not required by product developers
* *May* include `devDependencies` if appropriate
* *Should* not include anything else

The following is an example `bower.json` file that meets the above spec:

	{
		"name": "ft-tweet-module",
		"description": "Styles for rendering tweets on FT pages",
		"version": "1.0.0",
		"dependencies": {
			"ft-velcro": "git://github.com:Financial-Times/ft-velcro.git#>=1.2.0 <1.3.0"
		},
		"ignore": [
			"examples"
		]
	}

**TODO**: *What about modules that require a load of npm stuff to build for dev and testing?  Should we include package.json rules such as:*

Optionally, a module may include an npm-compatible `package.json` file, to allow it to install dependencies for development and testing.  These package configs should explictly exclude `dependencies`, `files` and `main` properties to avoid any implication that the npm config is designed to allow the module to be installed as a package using npm.  Instead, `devDependencies` should be used.

* *Must* include a useful `name` and `description`
* *Must* include a `version` based on [Semver][3] rules
* *Must* include a `repository` property with the URL of the git repo where the module lives.
* *Must* include a `private` property with the value set to `true`.
* *Must* include a `devDependencies` object *if* the module has any npm dependencies for dev or testing
* *Must not* include any of the following standard defined properties: dependencies, files, main, bugs, publishConfig, preferGlobal, cpu, os, engineStrict, engines, config, bin.
* *May* include any other standard defined property

The following is an example `package.json` file that meets the above spec:

	{
		"name": "ft-tweet-module",
		"description": "Styles for rendering tweets on FT pages",
		"version": "1.0.0",
		"repository": {
			"type": "git",
			"url": "https://github.com/Financial-Times/ft-tweet.git"
		},
		"devDependencies": {
			"grunt": "*",
			"node-sass": "*"
		}
	}


## Module subdependencies

Modules should have as few subdependencies as possible.  Where the dependency is required to test the module or view the examples, but not to use it, it should be listed in `devDependencies` not in `dependencies`.

When listing dependencies in the `dependencies` section of the package configuration, specify compatible versions using as wide a range as possible, always ending on a less-than-next-major-version unless you have good reason to limit automatic upgrades.  Where the dependency is an Origami module that is *also a dependency of many other Origami modules*, it's especially important to verify and assert the widest version compatibility possible.


## Tests and examples

We don't seek to standardise how a component author chooses to test their code, only that all test related files should be in the `tests` directory.  The source files of the component should be in `src` (except the main JS and/or SASS file).  The project must contain a `README.md` formatted in markdown.

If the component author wishes to include an `examples` or `dist` folder to provide examples or pre-compiled versions of the source, they're welcome to do so, but these aren't required.  The build service is able to build modules on demand, so the need for pre-compiled versions is limited.

## Naming conventions

Modules should be named using a short descriptive one-word term, suffixed with `-module`, as the name for the repository.  CSS classes should use the same name but add an `ft-` prefix.  Examples:

	== REPO ==             == CSS CLASS ==
	tweet-module           ft-tweet-module
	nav-module             ft-nav-module
	cookiewarn-module      ft-cookiewarn-module


## Using modules in a product application

If you are building a product and want to include some Origami modules, there are several ways you can do it.  They're listed here in increasing order of effort required:

### 1. Use the Build service to fetch a pre-built page

If you don't even want to write your own HTML page or decide which components you want - you just want to add some extra content to an existing page template, use the build service to download a complete HTML page containing all the components you need.  The page comes as a Mustache template, so you can then add your own data into the placeholders using a [Mustache implementation](http://mustache.github.io/), which are available in almost any language you might need.

### 2. Use the Build service directly in web page source

If you want to write your own page, and you want to choose a specific set of components, but you don't want a build process, you can still use the build service, but by writing your own `link` and `script` tags:

	<link rel='stylesheet' href='http://buildservice.ft.com/bundle/css?modules=nav:2.3,tweet:1,cookiewarn:2.3' />

Construct a URL to load a bundle of JS or CSS from the [Build service resource compiler][4], and simply append all the modules you want to the end of the URL.  The Build service will require all the modules that you want (including their dependencies), create a single bundled resource (using browserify or Sass, for JS and CSS respectively), minify the result (using closure compiler or compass) and serve it to you on the URL you requested.  Put the URL in a `<script>` or `<link>` tag, and your modules are loaded directly into your page.

This works well for CSS and JS modules.  If the module you want provides a font, SVG, images, or other static resources that don't require packaging but can still be included from the browser, you can still avoid serving the files yourself by using the [Build service file proxy][5].  Again just construct a URL to the resource you want.

### 3. Use the build service from your product application

	<?php
	$origami_css = file_get_contents('http://buildservice.ft.com/bundle/css?modules=nav:2.3,tweet:1');
	// Continue your build process

If you need a bit more customisation than you can get by using the build service from the browser, or you want to improve performance by bundling Origami modules with your own, you can use the build service from your own application.  We don't make any assumptions about what technology you're using for your product, but as long as it can make HTTP requests, it can load build service URLs, so you can load the resources that you want and then bundle them as appropriate.

Note that any subresources required by CSS files in the browser will still be loaded directly from the build service.

### 4. Build it yourself

	bower install

If you have the ability to run bower, or an alternative dependency manager based on git tags, you can install Origami modules by creating your own `bower.json` and listing all the modules you want as dependencies of your own project.  When you run `bower install`, all the modules you've requested will be loaded into the `bower_components` subfolder of your project root, and you can then find and compile all the various parts as you like.  Typically this would involve using [Sass][6] for CSS and [Browserify][7] for JavaScript.

**TODO: Better module building guide**

[1]: https://github.com/commonjs/commonjs/blob/master/docs/specs/modules/1.0.html.markdown
[3]: http://semver.org/
[4]: /docs/build-service/#resource_compiler
[5]: /docs/build-service/#file_proxy
[6]: http://sass-lang.com/
[7]: http://browserify.org/
