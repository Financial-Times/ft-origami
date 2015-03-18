---
layout: default
title: Installing modules manually
section: Developer guide
permalink: /docs/developer-guide/building-modules/
---

# Building Origami modules into your product

Building Origami modules manually gives you the most flexibility and control, but you will need to use some specific tools.  Remember that in many cases you may be able to get started faster by using the [build service](../build-service), which will do all this for you.

This tutorial assumes you are starting from a fresh install of a UNIX-like OS with a bash shell and have cloned or initalised a git repo for your project somewhere on the filesystem.  If you're a bit further along than that, feel free to skip any steps you've already completed.

<aside>
	<h4>No support for Windows</h4>
	<p>Origami's build tools do not support Windows as a development environment and the instructions on this page assume you are using a UNIX-like OS.  Windows <strong>might</strong> work, to some degree, but we don't make any guarantees, either of what works today or what might continue to work in the future.  If you're a Windows user, consider running a Linux VM, or signing up for a free <a href="http://c9.io">Cloud9</a> account, and use their online Ubuntu VMs (but don't put any passwords or other secret data into C9 VMs)</p>
</aside>

## 1. Install Node.js, Ruby and Git

To use Origami components, you need two language runtimes (it doesn't matter if you are not writing your application in Node or Ruby, you still need to install them) and the <code>git(1)</code> version control system:

* [Node.js](http://nodejs.org/) is the JavaScript runtime, which we need to run all the build tools, which are written in JavaScript.
* [Ruby](https://www.ruby-lang.org) is required to run the [Sass](http://sass-lang.com/) compiler and [scss-Lint](https://github.com/causes/scss-lint)
* [Git](https://www.git-scm.com) is required to install packages from Git repositories using [Bower](http://bower.io/), a package manager.

### Node.js

Node.js can be installed manually or via package management, and often ships preinstalled on many OS distributions.  To find out if you have it installed and which version you have, type this at a terminal ([What's a terminal?](#note-terminal)):

<aside class="o-techdocs__aside--toggleable" id="note-terminal">
	<h4>What's a "terminal"?!</h4>
	<p>The terminal is an application that enables you to run commands on your computer by typing them in on your keyboard.  It's like having a text-message chat with your computer.  On Mac OS, the terminal is an application you can find in your Applications folder.  On most Linux systems, it's available from the applications or programs menu if you're not using it by default.  On Windows, 'Command prompt' (which is the same thing by a different name) is available in the Apps menu, or prior to Windows 8, press Windows+R, type <code>cmd</code> in the dialog that appears, and press enter.</p>
</aside>

<pre class="cli">
<kbd>node -v</kbd>
<output>v0.10.29</output>
</pre>

If you get an error, or the number you get does not match the most recent release shown on the [Node website](http://nodejs.org/), you need to install/upgrade Node.  If you're installing it on a personal machine, go to the Node website and click the Install button to download the installer suitable for your system:

* [Download the Node installer](http://nodejs.org/)

If you want to install on a server or other maintained environment, you'll most likely prefer to use a package manager.  Node is available in most package management repositories, and instructions are available in the Node install guide:

* [Install Node via package manager](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager)

### Ruby

You may already have Ruby, since it ships preinstalled on many computers.  To find out, type this at a terminal:

<pre class="cli">
<kbd>ruby -v</kbd>
<output>ruby 2.0.0p247 (2013-06-27 revision 41674) [universal.x86_64-darwin13]</output>
</pre>

If you see an error, or the version does not match the latest version shown on the [Ruby website](https://www.ruby-lang.org/en/downloads/), you need to install/upgrade it.  You can install from source, via pre-built binaries or your preferred package manager.

* [View Ruby install guide](https://www.ruby-lang.org/en/installation/)

### Git

To determine whether you have <code>git(1)</code> installed type this at a terminal:

<pre class="cli">
<kbd>git --version</kbd>
<output>git version 2.0.3</output>
</pre>

If you see an error, or the version does not match the latest version shown on the [Git website](https://git-scm.com), you need to install/upgrade it.

* [View Git install guide](http://git-scm.com/book/en/Getting-Started-Installing-Git)

## 2. Install gulp

*This step only applies if you want to make the origami build process run as part of your own Gulp-powered build process. As an alternative you can use Origami build tools as a command line client.  If you prefer to do this (or you are not building your application in Node), skip this and move on to step 3.*

[Gulp](http://gulpjs.com/) is a task runner, which we use to run the build process tasks.  Once you have installed Node, type this at a terminal:

<pre class="cli">
<kbd>npm install -g gulp</kbd>
</pre>

This command may prompt you for your password.  You will need administrative access to your machine to complete this step.  On FT-managed machines the password is typically the same as the password you use to log into the corporate network.


## 3. Install origami build tools

You now need a Node package to run the Origami build process.  How you install this depends on whether you are intending to use it as a command line tool or as part of a Gulp-powered build process.

<aside>
	<h4>What are build tools for?</h4>
	<p>If you compare building a website with making a cake, where your website is the finished cake and all the Origami components you plan to use are the ingredients, these build tools are the mixer and the oven - the tools you need to use to convert the ingredients into the cake.</p>
</aside>

Choose where you want to start building your project (normally this is also the root of a git repository, but it can be any folder on your computer).  A common pattern is to create a folder called `sandboxes` in your home directory, and then create a subdirectory with the name of your project, eg `~/sandboxes/origami-demo`.  We'll refer to this as the 'root of the working tree', because you'll create files and folders within the project folder which descend from the root of the project.

Install the build tools as a command line utility:

<pre class="cli">
<kbd>npm install -g origami-build-tools</kbd>
<output>/home/ubuntu/.nvm/v0.10.30/bin/origami-build-tools -> /home/ubuntu/.nvm/v0.10.30/lib/node_modules/origami-build-tools/lib/origami-build-tools-cli.js
origami-build-tools@2.0.0 /home/ubuntu/.nvm/v0.10.30/lib/node_modules/origami-build-tools
├── which@1.0.5
...</output>
</pre>

### If you are using Gulp

In the root of your working tree, create a file called `package.json`, with the following contents:

	{
	  "private": true,
	  "devDependencies": {
	    "origami-build-tools": "latest",
	    "gulp": "latest"
	  }
	}

The packages are listed in *devDependencies* because they are not required to run your application, only to build it.  Marking your project as *private* means that it cannot accidentally be published to the [npm registry](http://npmjs.org) as a public component.

## 4. Set up a package manifest to load Origami components

Hopefully you know which Origami modules you want.  If you don't, check out the [Origami registry](http://registry.origami.ft.com) for a list of all our supported components.  You can also add any module from the [bower registry](http://bower.io/search/) that has a [commonJS interface](http://wiki.commonjs.org/wiki/Modules/1.1).

Once you know which Origami modules you want, create a `bower.json` file in the root of your working tree.   This you have to create yourself, and it will be different for each project, but it must conform to the bower [configuration spec](http://bower.io/docs/creating-packages/), which is very similar to npm's config.  Here is an example that includes a few key components:

	{
		"name": "origami-demo",
		"dependencies": {
			"o-grid": "^3.0.3",
			"o-header": "^3.0.0",
			"o-footer": "^3.0.0",
			"o-colors": "^2.4.7",
			"o-fonts": "^1.6.7",
			"o-ft-icons": "^2.3.4"
		}
	}

`dependencies` is a list of the front-end modules you would like to use in your project.  If the module is in the [Origami registry](http://registry.origami.ft.com) or the [bower registry](http://bower.io/search/), you can simply specify the version number you want (using [semver](http://semver.org) rules), otherwise you must provide the full URL of the component's repository followed by a hash and the version you want.

<aside>
	<h4>v0.x.x: Beware!</h4>
	<p>Versions lower than 1 (eg. <code>v0.3.2</code>) are considered experimental builds, and are treated differently by Bower.  Origami forbids the creation of components with a version lower than 1, so if you see one, it is probably not ready for use.</p>
</aside>

This time we're listing these as *dependencies*, not *devDependencies*, because they are actually required by your project in production.

To ensure that the Origami modules can be found, it needs to be set up to search the Origami registry.  To do this, create a `.bowerrc` file in the root of your project's working tree (or in your home directory, if you want to apply it automatically to all projects), with the following contents:

	{
		"registry": {
			"search": [
				"http://registry.origami.ft.com",
				"https://bower.herokuapp.com"
			]
		}
	}

<aside>
	Sometimes when you create files starting with a dot, they won't show up in the directory listing, because starting a file with a dot marks it as a <em>hidden file</em>.  You can normally choose an option to 'show hidden files' or similar, and on the command line you can always see hidden files with the `ls -al` command.
</aside>

## 5. Create your master Sass and JavaScript files

Now you need to create a Sass and/or JavaScript file that requires the Origami components as dependencies.  In Sass, you can do this with the `@import` statement, and in JavaScript, using `require`.  The syntax of the Sass import is:

	@import '{modulename}/main';

As an example (assuming you loaded these modules in your `bowser.json`), create a `main.scss` file at `/client/scss/main.scss` (relative to the root of your working tree), containing:

	// Output grid helper classes and data-attributes
	$o-grid-is-silent: false;
	
	// Output @font-face declarations
	$o-fonts-is-silent: false;
	
	// Output icon helper classes
	$o-ft-icons-is-silent: false;
	
	// Import Origami components
	@import 'o-grid/main';
	@import 'o-fonts/main';
	@import 'o-ft-icons/main';
	@import 'o-header/main';
	@import 'o-footer/main';
	@import 'o-colors/main';
	
	// Store the default FT sans-serif font stack in a variable
	$sans-serif: oFontsGetFontFamilyWithFallbacks(BentonSans);
	
	html {
		// Set a font family on the whole document
		font-family: $sans-serif;
	
		// Prevent navigation menus from creating
		// extra space on sides of the page
		overflow-x: hidden;
	}
	
	body {
		// Remove space around the document
		margin: 0;
	}
	
	
	// Add your own styles here…

The syntax of the JavaSript require is:

	{handle} = require('{modulename}');

As an example, create a `main.js` file at `/client/js/main.js`, containing:

	'use strict';
	// Require module
	var header = require('o-header');

	// Wait until the page has loaded
	if (document.readyState === 'interactive' || document.readyState === 'complete') {
		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
	}
	document.addEventListener('DOMContentLoaded', function() {
		// Dispatch a custom event that will tell all required modules to initialise
		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
	});


## 6. Set up a gulp automation script

*If you are not using gulp, skip this step 6 and proceed to step 7*

Now you need to set up the tasks to stitch everything together.  To do this, you need to know:

* Where you have put your master Sass file and master JavaScript file
* Where you want the finished bundles to be saved (usually a publicly accessible web server directory unless you are routing the request for the bundle through a front-controller)

We'll assume for the purposes of this example that your CSS and JS are in `/client/scss` and `/client/js` and you want to save the finshed bundles in `/public`.  Create a file called `gulpfile.js` in the root of your project's working tree, with the following contents:

	'use strict';
	var gulp = require('gulp');
	var obt = require('origami-build-tools');

	gulp.task('build', function() {
		obt.build(gulp, {
			js: './client/js/main.js',
			sass: './client/scss/main.scss',
			buildJs: 'bundle.js',
			buildCss: 'bundle.css',
			buildFolder: 'public'
		});
	});

	gulp.task('verify', function() {
		obt.verify(gulp);
	});

	gulp.task('watch', function() {
		gulp.watch('./client/**/*', ['verify', 'build']);
	});

	gulp.task('default', ['verify', 'build', 'watch']);

Taking it step by step:

* We configure three gulp tasks: build, verify and watch
* Build runs Sass to compile the file `/client/scss/main.scss` into `/public/bundle.css` using compressed (minified) CSS syntax, and Browserify to compile the file `/client/js/main.js` into `/public/bundle.js`
* Verify runs SCSSLint on `/client/scss/main.scss` and JSHint on `/client/js/main.js` to make sure your code is readable and hasn't got potential errors.  We enforce coding standards defined by Origami ([SCSS]({{site.baseurl}}/docs/syntax/scss/#syntax-convention-rules) and [JavaScript]({{site.baseurl}}/docs/syntax/js/#syntax-convention-rules))
* Watch is set up to run the verify and build tasks automatically if any files in your client-side Sass or JS directories change

The benefit of using gulp is that you can add your own build steps in addition to the standard Origami ones, so at this point, feel free to add your own code to the build and verify tasks.

## 7. Prevent git from committing dependencies

Please don't commit dependencies into your project.  To avoid this, you should add the following lines to a `.gitignore` file in the root of your project:

	.DS_Store
	.sass-cache/
	bower_components/
	node_modules/
	public/
	build/
	demos/local/
	docs/

This list of ignored files includes your two dependency directories (`node_modules` for your build tools, and `bower_components` for your Origami components), a couple of annoying directories often created by your computer automatically (`.DS_Store` and `.sass-cache`), and finally the `public` directory because the files in there will be generated by the build process and are not part of our application's source code. `node_modules` is only necessary if you're using Node.JS, like for example, if you went with the Gulp build process.

Remember that because `.gitignore` starts with a dot, it may not show up in your directory listing, and you may need to toggle an option to make hidden files visible in order to see it.

## 8. Run the build

You're ready to run your build.  First, use origami-build-tools to install everything else that you need, including the Origami components that you want:

<pre class="cli">
<kbd>origami-build-tools install</kbd>
<output>...output telling us which tools are being installed...</output>
</pre>

This will install a number of additional tools, and create a `bower_components`directory in the root of your working tree, containing all the Origami modules you've listed in your `bower.json` file.

It will also create a `node_modules` directory in the root of your working tree, containing [origami-build-tools](https://github.com/Financial-Times/origami-build-tools) and [gulp](http://gulpjs.com), which is all you need to run the build process.

Now bundle it all together.  This is done in one of two ways depending on whether you are using Gulp or not.

### With Gulp:

Just type `gulp`:

<pre class="cli">
<kbd>gulp</kbd>
<output>Browserifying ./client/js/main.js
Compiling ./client/scss/main.scss</output>
</pre>

If you want to continue working on your CSS and JS code (edit your own code but not anything in the bower_components directory), you can also tell grunt to watch your files and automatically retrigger the build when you save a change.

<pre class="cli">
<kbd>gulp watch</kbd>
<output>[13:38:37] Using gulpfile ~/origami/obt-test/gulpfile.js
[13:38:37] Starting 'watch'...
[13:38:37] Finished 'watch' after 9.1 ms</output>
</pre>

### With command line interface:

Since you have not saved any configuration specific to your project, you need to tell the build tools where to find the files in your project by passing arguments on the command line:

<pre class="cli">
<kbd>origami-build-tools build --js=./client/js/main.js --sass=./client/scss/main.scss --buildJs=bundle.js --buildCss=bundle.css --buildFolder=public</kbd>
<output>Browserifying ./client/js/main.js
Compiling ./client/scss/main.scss</output>
</pre>

You can also watch for changes using the CLI tool, by adding a `--watch` to your command line.

In both cases, (gulp and CLI) this will use origami-build-tools to read your project's JS and CSS master files, pull together all their required dependencies, and pull everything together into two bundles, one for JavaScript, and one for CSS.


## 9. Use the bundles

Now, you can simply load the bundles in your web page.  If you saved your bundles to `/public` and that's also the root of your web server, you would write the following HTML:

	<link rel="stylesheet" href="public/bundle.css" />
	<script defer async src="public/bundle.css"></script>

It's advisable to put the `defer` and `async` attribute on your `<script>` tags, so that loading of the script does not block page load.  Origami components will never require you to load script prior to the DOM being rendered.  See Nicholas Zakas's post [The truth about non blocking JavaScript](http://calendar.perfplanet.com/2010/the-truth-about-non-blocking-javascript/) for more details.

The Origami spec includes instructions for how to structure your HTML page, so go and grab the boilerplate HTML from here:

* Learn more about [Core vs enhanced experience]({{site.baseurl}}/docs/developer-guide/using-modules/#core-vs-enhanced-experience)

Here's an example of a web page created from the boilerplate that includes the script and link tags in the right place, and also adds some content that we can style using the Origami components.  You can create this in your public directory as `/public/index.html`:

	<!DOCTYPE html>
	<html class="core">
	<head>
		<meta charset="utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<title>Origami template</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />

		<!--
			Perform your cuts the mustard test.
		-->
		<script>
			var cutsTheMustard = ('querySelector' in document && 'localStorage' in window && 'addEventListener' in window);

			if (cutsTheMustard) {
				// Swap the `core` class on the HTML element for an `enhanced` one
				// We're doing it early in the head to avoid a flash of unstyled content
				document.documentElement.className = document.documentElement.className.replace(/\bcore\b/g, 'enhanced');
			}
		</script>

		<!--
			Hide any enhanced experience content when in core mode, and vice versa.
			Add any other inlined CSS here
		-->
		<style>
			.core .o--if-js,
			.enhanced .o--if-no-js { display: none !important; }
		</style>

		<!--
			This is where your CSS bundle is loaded, and we add any inline CSS
		-->
		<link rel="stylesheet" href="public/bundle.css" />
		<style>
			/* Add any inline CSS here */
		</style>

		<!--
			Unconditionally load the polyfill service to provide the best support
			possible for modern web standards.
			Only features missing in this user agent will be filled.
			If you want, you can provide a list of features to polyfill, otherwise
			all features that can be polyfilled will be.
			See the polyfill service home page for more details:
			https://cdn.polyfill.io/
		-->
		<script src="//polyfill.webservices.ft.com/v1/polyfill.min.js"></script>

		<!--
			Load the main JavaScript bundle asynchronously
		-->
		<script>
			(function(src) {
				if (cutsTheMustard) {
					var o = document.createElement('script');
					o.async = o.defer = true;
					o.src = src;
					var s = document.getElementsByTagName('script')[0];
					s.parentNode.insertBefore(o, s);
				}
			}('public/bundle.js'));
		</script>
	</head>
	<body>

		<!-- Body content here -->
		[Find header and footer components from registry.origami.ft.com and put them here]

	</body>
	</html>


Now, you should be able to start a static web server in the `/public` directory, and load your page.  If you are using a Mac, this command in Terminal will start a server:

<pre class="cli">
<kbd>python -m SimpleHTTPServer 8001</kbd>
<output>Serving HTTP on 0.0.0.0 port 8001 ...</output>
</pre>

Now you can simply go to [http://localhost:8001/](http://localhost:8001) to view your page.

## 10. Deal with assets

Finally, we need to deal with assets - files from components that may be loaded on demand by the component's CSS or JavaScript.  Origami has a built in asset loader that allows the load path for these assets to be configured, and by default it's set to `/bower_components`.  This means that assets will load 'out of the box' if you:

* Are using a web server that maps URL paths directly to filesystem paths; and
* Have set your web server's document root to the root of your project's working tree

For very simple projects, this may be true.  But it's generally not a great idea to have your `bower_components` directory in the public part of your web server, and you may well want to process requests for front-end bundles via a router or [front-controller](http://en.wikipedia.org/wiki/Front_Controller_pattern) of some kind.  In that case, you should set the [o-assets config variables](http://github.com/Financial-Times/o-assets) in your main Sass file to the values that you want for your project.  Typically this just involves setting one global path prefix.  Here's an example of how you could do this in the main.scss example used earlier:

	/* Set Origami config */
	$o-assets-global-path: '/resources';

	/* Import Origami components */
	@import 'o-tweet/main';
	@import 'o-techdocs/main';

	/* Add our own Sass */
	.mything {
		color: red;
	}

If `o-tweet` wanted to load a background image that was at `/img/separator.gif` in the `o-tweet` repo, this config would result in the image being requested from `/resources/o-tweet/img/separator.gif`.  It is then up to you to handle this request and deliver the appropriate file from your `bower_components` directory.
