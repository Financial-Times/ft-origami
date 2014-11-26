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

<aside>Examples of good module names include <code>o-tweet</code>, <code>o-colors</code>, <code>o-grid</code>, <code>o-tabs</code>, <code>o-tabs-style1</code>, <code>o-cookiewarn</code>, <code>o-ft-nav</code>.  There is no standard or requirement for the use of <code>-ft-</code> in the name, and for the purposes of this spec it is semantically meaningless.</aside>


## Requirements

The following requirements apply to creating a Origami-compatible module component:

* *May* contain any resource that is a CommonJS JavaScript module, any declarative language that is agnostic of server-side technology stack (HTML, Mustache, CSS, Sass, JSON etc), or binary data (may also contain build tasks, tests etc but these must be marked as not installable in package config)

### Modules *must*:

* contain a valid [Origami manifest file]({{site.baseurl}}/docs/syntax/origamijson)
* store CSS as SCSS, to enable products and other modules to make use of variables and mixins
* not be used for imperative code except JavaScript (and JavaScript must have a client-side use case to be considered a front end component)
* not contain build scripts except as required for development and testing.
* be buildable using the standard build process described by the [build service]({{site.baseurl}}/docs/developer-guide/build-service/)
* list all build, development and testing scripts as ignores in the module's bowser configuration.
* where there is a dependency on a web service component (eg because the module is a JavaScript library that makes AJAX requests to a service), be compatible with the version of the web service API that carries the same major version number asthe module.  For example, version 2.4.5, 2.4.6, and 2.7 of a module *must* all be compatible with API version 2 of the web service.
* contain a single 'main' file for each included language from which all other files of the same language are ultimate dependencies (using `require` for JS, `@import` for CSS or `{>}` for mustache as appropriate).  These main files *must* be called `main.js`, `main.scss` and `main.mustache` respectively and *must* be in the module root.
* include a README.md file in the root of the repo, which must contain, where applicable:
	* Any markup structure on which the module depends (if that markup is not provided by a web service).  For example, a module providing CSS to style postal addresses, should include a guide to writing the correct markup.  A JavaScript module that requires configuration via `data-` attributes should document those attributes.
	* Links to repos of web services that exist to provide markup or data that is used by the module.
* be stored in a Git repo accessible to any FT network (see [recommendations for module locations](#where-to-store-modules) below)
* not include package management config for any package manager other than Bower, except for package config whose only purpose is to load dependencies for development or testing of the component and which does not render the repo installable by that packaging system
* where they contain Sass files, conform to the syntax and language standards for [use of Sass in Origami components]({{site.baseurl}}/docs/syntax/scss)
* where they contain JavaScript files, conform to the syntax and language standards for [use of JavaScript in Origami components]({{site.baseurl}}/docs/syntax/javascript)
* where they are openly hosted on GitHub and have CI, use [Travis](https://travis-ci.org) to do the CI
* consider touch, keyboard and mouse interaction where applicable
* list, in documentation, the minimum versions of each browser family in which the component has been tested using the enhanced experience and the core experience (see [browser support](#browser-support) below)


### Modules *should*:

* include a bower-compatible `bower.json` file (in the root of the repo) which if present *must* conform to the requirements set out in 'Packaging and build configuration' below.
* have automated CI, and if they do it *must* include verification that the module can be built using the mechanism described in the build service guide (see also "Continuous integration" below)


## Managing new releases

When new versions of components are released, updates may be needed to components and products that consume the component.  The following notification rules apply:

* If the release is a new **major** version, the component developer *must* notify maintainers of all components and products listed as dependents in the Origami registry, at least 1 day prior to the release being tagged (to enable other breaking changes to be suggested), and again immediately after the release.
* If the release is a new **minor** version, the component developer *should* notify maintainers of all components and products listed as dependents in the Origami registry, immediately after the release.
* If the release is a new **patch** version, no notifications need be sent.


## Themes

Modules *may* be **themeable**, meaning that they contain minimal visual style and expect style to be applied to them from outside the module.  Modules *may* also be **theming**, meaning that they contain styles designed to change the appearance of another module.

A themeable module *must*:

* by default, only apply minimal, essential styles; and
* provide at least one built-in theme, attached to a `o-modulename--theme` modifier class

A theming module *must* define a theme by combining the class name of the themeable module with its own class name.  For example, if module A is providing a theme for module B:

<?prettify linenums=1?>
	.o-modulea--o-moduleb--theme {
		/* theme styles */
	}

Themes that depend on the target module's JavaScript being active *must* use the appropriate JavaScript data attribute selector:

<?prettify linenums=1?>
	.o-modulea--o-moduleb--theme[data-o-moduleb-js] {
		/* theme styles */
	}

Theming classes *must* be applied to the root element of the component to be themed.


## Packaging and build configuration

<aside>When a developer goes to use a module, and finds that it has config for a particular package management system, they should be able to assume that the same package manager can be used to install <em>any</em> Origami module.  So it's important that all Origami modules share the same package config and do not include any 'special' config for package managaement systems that aren't compatible with all modules.</aside>

[Bower](http://bower.io/) is the package manager used by Origami.  If a module has no dependencies, Bower does not require any package configuration, though the module *must* be tagged in git with [Semver](http://semver.org)-compatible version numbers (eg `v0.0.4`).  Component authors *should* provide a `bower.json` file anyway, *must* do so if the module has dependencies, and if they do it *must* conform to the following requirements:

* *Must* include a `name` property set to the repo name, eg 'o-grid'
* *Must* include a `main` property *if* the module contains any JavaScript, and if present, *must* be set to the value `main.js`.
* *Must* include a `dependencies` object *if* the module has any Origami dependencies, specify dependencies without URLs, and accept as wide a range of versions of dependencies as possible (also see 'Module subdependencies' below)
* *Must* include an `ignore` property listing all files and directories in the module that are not required by product developers, which *must* include anything that is not declarative code or front end JavaScript.  The `origami.json` and `README.md` files *should not* be ignored, since they may be needed by Origami-aware tools that install and catalogue Origami modules.
* *May* include `devDependencies` if appropriate
* *Must not* include a `version` property.  The version property is not needed and risks being out of sync with the repo tag
* *Should* not include anything else

The following is an example `bower.json` file that meets the above spec:

<?prettify linenums=1?>
	{
		"name": "o-grid",
		"dependencies": {
			"o-colors": ">=1.2.0 <2"
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
* *Must not* include any of the following: `dependencies`, `files`, `bugs`, `publishConfig`, `preferGlobal`, `cpu`, `os`, `engineStrict`, `engines`, `config`, `bin`. `main` and `version` *should not* be included unless the module has a server side use case (see 'Isomorphic modules' below)
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

### Isomorphic modules

Some modules' JavaScript may have use cases outside the browser, most notably in node.js applications e.g. `o-date` can be used to format dates in the browser or on the server. Where there is a definite need for this modules *should* include a `package.json` with the following properties:

* `name`, which *must* be the same as the module's origami name
* `version`, which *must* have a value of `0.0.0`
* `main`, which *should* normally have a value of `["main.js"]`

If the module requires any dependencies which are aimed solely at browsers (e.g. `o-dom`), and consequently are unlikely to define a package.json, the module *must* contain an `index.js` file which requires only those features and dependencies needed in non-browser environments, and set the `main` property of `package.json` to `["index.js"]`.

The module *must not* be added to the NPM registry and the module's documentation *should* advise developers to install by using a tagged tarball (links to which are available from the module's github repo's 'releases' tab).

## Module subdependencies

Modules *should* have as few subdependencies as possible.  Where the dependency is required to test the module or view the examples, but not to use it, it should be listed in `devDependencies` not in `dependencies`.

If any feature of a dependency's subdepencies are used directly then that subdependency *must* also be added as a direct dependency e.g. if your module has `o-ft-typography` as a dependency but makes use of `oFontsInclude()` in its stylesheets then `o-fonts` must also be added as a dependency.

If a module requires that any feature of its dependencies be used directly by products/components consuming the module then it *should* alias that functionality within its own namespace to avoid them having to include the subdependency as a direct dependency e.g o-ft-typography aliases `oFontsInclude` to `oFtTypographyIncludeFont`.

When listing dependencies in the `dependencies` section of the `bower.json` package configuration, the version requried *must* be specified using the semver `^` operator, allowing for updates up to the next major version, unless a version within that range is known to break the module (note that this doesn't work in the same way for packages that are not yet at version 1, for which, specify an explicit range.  See [#148](https://github.com/Financial-Times/ft-origami/issues/148))

Where the dependency is an Origami module that is *also a dependency of many other Origami modules*, it *must* verify and assert the widest version compatibility possible, including maintaining compatibility with earlier versions unless to do so would be impractical.

Where a dependency is an Origami module it *must* be listed under its original name (in order to avoid causing conflicts in the Build service resource compiler.

* Good: `"o-colors": "^1.2.0"`
* Bad: `"colors-legacy": "1.1.0"`

## Tests and demos

Components *should* include tests which at least verify that the component can be built using [origami-build-tools](https://github.com/Financial-Times/origami-build-tools). Component authors *may* additionally test their component however they like, provided that all test related files *should* be in the `tests` directory, and that test related files *must* not be installable.  The source files of the component *should* be in `src` (except the main JS and/or Sass file).  The project *must* contain a `README.md` formatted in markdown.

Component authors *may* include a `demos` folder to provide examples.  Demos *must* be created using [origami-build-tools](https://github.com/Financial-Times/origami-build-tools), and *must* be compatible with the demo viewer in the Origami registry.  Demos *must* include only the minimum amount of content to show the component, and particularly should not include any headings, backgrounds, margins or other content that are not part of the component itself, unless absolutely essential to the ability to demonstrate the component.

Where styles need to be added specifically for a demo (eg to make the content of [o-grid](https://github.com/financial-times/o-grid) containers visible), they *must* be attached to classes with a `demo-` prefix, for example:

<?prettify linenums=1?>
	.demo-cell {
	  background-color: red;
	}

### Choosing demo content

When choosing content for a demo, and deciding on the composition of a demo, component developers *must* craft realistic examples using real use cases.  If it's necessary to make demos contrived in order to demonstrate the full range of features of the component, multiple demos *should* be created, so that at least one demo (which *should* be the default-expanded demo) shows a realistic use case.

### Demo config file

The demo config file tells the Build Service and the [origami-build-tools](https://github.com/Financial-Times/origami-build-tools) what demo files to build. It has two properties:

* `options`: __Object__ configuration to apply to all demos (unless overridden for a specific demo)
* `demos`: __Array__ list of demos to build

Options, and individual demos, can have the following properties:

* `template`: __String__ The mustache template to render. (_Required_)
* `sass`: __String__ The Sass file to compile. (_Optional_)
* `js`: __String__ The JS file to build with Browserify. (_Optional_)
* `data`: __String__ Data to pass to the mustache template. (_Optional_)
* `bodyClasses`: __String__ CSS classes to set on the body. (_Optional_)
* `expanded`: __Boolean__ (default: `true`) Whether the demo should be shown in expanded form in the [Registry](registry.origami.ft.com). (_Optional_)
* `description`: __String__ Explanation of the purpose of the demo. (_Optional_)
* `dependencies`: __Array__ List of strings of other modules that are only needed for one or more demos and will be loaded via the build service. They follow the same structure as how the build service works. (Eg: "o-ft-icons@^2.3.1" or "o-ft-icons") (_Optional_)

Individual demos also have another property:

* `name`: __String__ Demo name which will also be used as the name of the outputted html file. (_Required_)

Example:

<?prettify linenums=1?>
	{
		"options": {
			"sass": "demos/src/demo.scss",
			"data": "demos/src/data.json",
			"bodyClasses": "o-hoverable-on",
       		"dependencies": ["o-custom-module@^1.0.0"] 
		},
		"demos": [
			{
				"name": "demo1",
				"template": "demos/src/demo1.mustache",
				"js": "demos/src/demo1.js"
			},
			{
				"name": "demo2",
				"template": "demos/src/demo2.mustache",
				"js": "demos/src/demo2.js",
				"expanded": false,
				"description": "Demo of obscure but realistic scenario."
			}
		]
	}


### Continuous integration

Modules *should* implement CI. If a module does so and is openly hosted on GitHub, it *must* use Travis CI, via the [origami-build-tools](https://github.com/Financial-Times/origami-build-tools) utility.  To invoke this in a module simply create a `.travis.yml` file in the root of the repo containing:

<script src="https://gist.github.com/samgiles/a518205002ce9de60a39.js"></script>

Then enable Travis for the project from your [Travis profile page](https://travis-ci.org/profile).  The origami build tool will read the `bower.json` file, build the CSS and JavaScript bundles from the main files (the CSS in both silent and non-silent mode), and will verify that the resulting bundles are valid.

Modules that are not openly published on GitHub *should* use Jenkins for CI.

## Browser support

All modules *must* include documentation that states a mininum version in which the module has been tested, for each of the browser families shown in the example below.  Where a module includes JavaScript, minimum versions should be given for the enhanced experience and core experience separately.

Example:

<table>
	<tr><th>Browser</th><th>Min for enhanced exp.</th><th>Min for core exp.</th></tr>
	<tr><td>Internet Explorer</td><td>9</td><td>6</td></tr>
	<tr><td>Firefox</td><td>25</td><td>3</td></tr>
	<tr><td>Chrome</td><td>10</td><td>1</td></tr>
	<tr><td>Safari</td><td>5</td><td>2</td></tr>
	<tr><td>Mobile Safari</td><td>9</td><td>6</td></tr>
	<tr><td>Mobile Firefox</td><td>9</td><td>6</td></tr>
	<tr><td>Android browser</td><td>9</td><td>6</td></tr>
	<tr><td>Opera</td><td>12</td><td>4</td></tr>
</table>

## Where to store modules

Modules *must* be stored in git repos with the same name as the module itself.  The host server *must* be one of the following, listed in order of preference (from most preferred to least):

1. Public GitHub (github.com/Financial-Times)
2. Stash (git.svc.ft.com:8080)
3. Private repo on public GitHub (github.com/Financial-Times)


## File structure

This section is non-normative.  A module component *may* be organised as follows, but this does not imply any requirements aside from those listed above.  The following can be considered an opinion on a good file structure for a module.

	.
	├─ demos
	├─ test
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
	├─ .travis.yml
	├─ bower.json
	├─ main.js
	├─ main.scss
	├─ origami.json
	└─ README.md
