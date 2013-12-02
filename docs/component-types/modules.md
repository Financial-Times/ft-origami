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

* *Must* contain a valid [Origami manifest file]({{site.baseurl}}/docs/syntax/origamiconfig)
* *May* contain any resource that is a CommonJS JavaScript module, any declarative language that is agnostic of server-side technology stack (HTML, Mustache, CSS, SASS, JSON etc), or binary data (may also contain build tasks, tests etc but these must be marked as not installable in package config)
* *Must* store CSS as SCSS, so that products and other modules can make use of variables and mixins
* *Must not* be used for imperative code except JavaScript (and JavaScript must have a client-side use case to be considered a front end component)
* *Must not* contain build scripts other than for development and testing.  *Must* be buildable using the standard build process described by the [build service]({{site.baseurl}}/docs/build-service/), and all development and testing scripts *must* be excluded when the module is installed.
* Where there is a dependency on a web service component (eg because the module is a JavaScript library that makes AJAX requests to a service), each version of the web service *must* be compatible with all versions of the module that carry the same major version number (and conversely, all versions of the module must be compatible with the version of the web service that shares the module's major version number).  For example, version 2.4.5, 2.4.6, and 2.7 of a module should all use version 2 of the web service.
* Where the module contains JavaScript or SCSS, there *must* be a single 'main' file from which all other files of the same language are ultimate dependencies (using `require` or `@import` as appropriate).  These main files must be called `main.js` and `main.scss` respectively and must be in the module root.
* Where the module contains markup templates, there may be more than one 'top level' alternative for the product developer to choose from.  If the module contains a single exportable template, it *must* be called `main.ms`.  If there are more than one, they *must* be prefixed `main-`, eg `main-large.ms`, `main-regular.ms`.  Multiple main templates *must* all support an identical data model.
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


## Packaging and build configuration

When a developer goes to use a module, and finds that it has config for a particular package management system, they should be able to assume that the same package manager can be used to install *any* Origami module.  So it's important that all Origami modules share the same package config and do not include any 'special' config for package managaement systems that aren't compatible with all modules.

[Bower](http://bower.io/) is the package manager supported by Origami.  If a module has no dependencies, Bower does not require any package configuration, though the module *must* be tagged in git with Semver-compatible version numbers (eg `v0.0.4`).  Component authors may choose to provide a `bower.json` file anyway, and *must* do so if the module has dependencies, and if they do it must conform to the following requirements:

* *Must* include a `name` property set to the repo name, eg 'grid-module'
* *Must* include a `main` property *if* the module contains any JavaScript, and if present, *must* be set to the value `main.js`.
* *Must* include a `dependencies` object *if* the module has any Origami dependencies and should accept as wide a range of versions of dependencies as possible (also see 'Module subdependencies' below)
* *Must* include an `ignore` property listing all files and directories in the module that are not required by product developers, which must include anything that is not declarative code or front end JavaScript.
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
	    "examples"
	  ]
	}

Optionally, a module *may* include an npm-compatible `package.json` file, to allow it to install dependencies for development and testing (in fact, a module may install dependencies for development and testing using any package management system).  These package configs should explictly exclude `dependencies`, `files` and `main` properties to avoid any implication that the npm config is designed to allow the module to be installed as a package using npm.  Instead, `devDependencies` should be used.

* *Must* include a `private` property with the value set to `true`.
* *Must* include a `devDependencies` object *if* the module has any npm dependencies for dev or testing
* *Must not* include any of the following standard npm defined properties: dependencies, files, main, bugs, publishConfig, preferGlobal, cpu, os, engineStrict, engines, config, bin.
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

Modules should have as few subdependencies as possible.  Where the dependency is required to test the module or view the examples, but not to use it, it should be listed in `devDependencies` not in `dependencies`.

When listing dependencies in the `dependencies` section of the `bower.json` package configuration, specify compatible versions using as wide a range as possible, allowing for automatic point release updates.  Where the dependency is an Origami module that is *also a dependency of many other Origami modules*, it's especially important to verify and assert the widest version compatibility possible.


## Tests and examples

We don't seek to standardise how a component author chooses to test their code, only that all test related files should be in the `tests` directory (and that the tests directory should not be installable).  The source files of the component should be in `src` (except the main JS and/or SASS file).  The project must contain a `README.md` formatted in markdown.

If the component author wishes to include an `examples` or `dist` folder to provide examples or pre-compiled versions of the source, they're welcome to do so, but these aren't required.  The build service is able to build modules on demand, so the need for pre-compiled versions is limited.

## Naming conventions

Modules should be named using a short descriptive term (hypenated if necessary) as the name for the repository prefixed with `o-` for Origami.  CSS classes should be the same.  Examples: `o-tweet`, `o-colors`, `o-grid`, `o-tabs`, `o-tabs-style1`, `o-cookiewarn`, `o-ft-nav`.

## Where to store modules

Modules *must* be stored in git repos with the same name as the module itself.  The host server may be any of the following, but they are listed in order of preference:

1. Public GitHub (there should be very few front end modules that we don't want to publicly disclose)
2. FT's GitBlit
3. FT Labs' GitHub Enterprise
4. Private repo on public GitHub (this is expensive - prefer one of the other options if possible)


## Using modules in a product application

If you are building a product and want to include some Origami modules, there are several ways you can do it.  They're listed here in increasing order of effort required:

### 1. Use the Build service to fetch a pre-built page

If you don't even want to write your own HTML page or decide which components you want - you just want to add some extra content to an existing page template, use the build service to download a complete HTML page containing all the components you need.  The page comes as a Mustache template, so you can then add your own data into the placeholders using a [Mustache implementation](http://mustache.github.io/), which are available in almost any language you might need.

### 2. Use the Build service directly in web page source

If you want to write your own page, and you want to choose a specific set of components, but you don't want a build process, you can still use the build service, but by writing your own `link` and `script` tags:

	<link rel='stylesheet' href='http://buildservice.ft.com/bundle/css?modules=nav@2.3,tweet@1,cookiewarn@2.3' />

Construct a URL to load a bundle of JS or CSS from the [Build service resource compiler][4], and simply append all the modules you want to the end of the URL.  The Build service will require all the modules that you want (including their dependencies), create a single bundled resource (using Browserify or Sass, for JS and CSS respectively), minify the result (using Closure compiler or Compass) and serve it to you on the URL you requested.  Put the URL in a `<script>` or `<link>` tag, and your modules are loaded directly into your page.

This works well for CSS and JS modules.  If the module you want provides a font, SVG, images, or other static resources that don't require packaging but can still be included from the browser, you can still avoid serving the files yourself by using the [Build service file proxy][5].  Again just construct a URL to the resource you want.

### 3. Use the build service from your product application

<?prettify linenums=1?>
	<?php
	$origami_css = file_get_contents('http://buildservice.ft.com/bundle/css?modules=nav@2.3,tweet@1');
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
