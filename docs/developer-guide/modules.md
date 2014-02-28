---
layout: default
title: Using modules
section: Developer guide
permalink: /docs/developer-guide/building-modules/
---

# Building and using Origami modules

Building Origami modules manually gives you the most flexibility and control, but you will need to use some specific tools.  Remember that in many cases you may be able to get started faster by using the [build service](../build-service), which will do all this for you.

This tutorial assumes you are starting from a fresh install of a UNIX-like OS with a bash shell and have cloned or initalised a git repo for your project somewhere on the filesystem.  If you're a bit further along than that, feel free to skip any steps you've already completed.

## 1. Install NodeJS, npm, bower and grunt

Node is available from most package manager repositories, so it's best to install from the one that is maintained for your system:

* [View NodeJS install guide](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager)

You should install Node along with npm and bower, which are both package managers (npm is used to install packages for running server-side build automation; bower is used to install Origami modules), and grunt, which is a build automation tool.  CentOS and RedHat are the most common Linux variants in use at the FT, so if you're on one of those, you can get Node along with npm from the EPEL YUM repo.  You will need root access to the system, so that you can use use [sudo](http://en.wikipedia.org/wiki/Sudo) to install as the superuser:

	sudo yum install npm --enablerepo=epel

Once you have installed node and npm, you can use npm to install bower and grunt:

	sudo npm install -g bower
	sudo npm install -g grunt-cli

## 2. Install Ruby, the Gem installer, and the SASS gem

Ruby is required to run the SASS compiler.  You can install it from source, via pre-built binaries or your preferred package manager.

* [View Ruby install guide](https://www.ruby-lang.org/en/downloads/)

On CentOS and RedHat, you can install Ruby from EPEL using YUM:

	sudo yum install rubygems

Once Ruby is installed, you can install the Sass gem using the gem installer:

	sudo gem install sass

You now have all the system-level pre-requisities to build Origami modules in a project sandbox, so the remaining instructions in this tutorial can be performed as an unprivileged user and will only affect files in your project's working tree.

## 3. Set up an NPM package manifest for your project

You need some Node packages to run the build process.  We'll assume you have a project working tree and are committing to a git repo.  In the root of your working tree, create a file called `package.json`, with the following contents:

	{
	  "private": true,
	  "devDependencies": {
	    "grunt-contrib-sass": "^0.6.0",
	    "grunt-browserify": "^1.3.0",
	    "grunt-contrib-watch": "^0.5.3",
	    "brfs": "^1.0.0",
	    "debowerify": "^0.5.1"
	  }
	}

You're installing three grunt plugins: [contrib-sass](https://npmjs.org/package/grunt-contrib-sass) to compile SASS (which uses the Ruby SASS gem you installed in step 2), [browserify](https://npmjs.org/package/grunt-browserify) to compile JavaScript using [browserify](http://browserify.org/), and [contrib-watch](https://npmjs.org/package/grunt-contrib-watch) to allow you to trigger the build process to re-run automatically when you change any of your source files.

You're also installing two browserify transforms: [debowerify](https://npmjs.org/package/debowerify) which allows browserify to compile JavaScript modules that have been installed using bower, and [brfs](https://github.com/substack/brfs) which allows inlining of static assets like templates into JavaScript files.

These modules are listed as *devDependencies* because they are not required to run your application, only to build it.  Marking your project as *private* means that it cannot accidentally be published to the [npm registry](http://npmjs.org) as a component.

<aside>
	<h4>Specifying versions</h4>
	You may like to amend your package.json to replace the versions above with more recent ones.  You can find the latest version on the relevant NPM module page linked above.  The versions shown here are known to work by the Origami team, and are expressed using the [Semver](http://www.semver.org) `^` operator, which accepts updated versions up to but not including the next major version.
</aside>

## 4. Set up a bower package manifest

Hopefully you know which Origami modules you want.  If you don't, check out the Origami registry for a list of all our supported components.  You can also add any module from the [bower registry](http://sindresorhus.com/bower-components/) that has a [commonJS interface](http://wiki.commonjs.org/wiki/Modules/1.1).

Once you know which Origami modules you want, create a `bower.json` file in the root of your project.   This you have to create yourself, and it will be different for each project, but it must conform to the bower [configuration spec](https://docs.google.com/a/ft.com/document/d/1APq7oA9tNao1UYWyOm8dKqlRP2blVkROYLZ2fLIjtWc/edit).  It's not very well documented currently, but is very similar to npm's config.  Here is an example (used by one of the Origami web services):

	{
	   "name": "tweet-service",
	   "dependencies": {
	      "o-tweet": "git://github.com/triblondon/tweet-module.git#0.1",
	      "o-techdocs": "git://github.com/Financial-Times/o-techdocs#~0.0.3",
	      "jquery": "2.0"
	   }
	}

You should set `name` to be the name of your project's repo.  `dependencies` is a list of the front-end modules you would like to use in your project.  If the module is in the [bower registry](http://sindresorhus.com/bower-components/), you can simply specify the version number you want (using [semver](http://semver.org) rules), otherwise you must provide the full path to the component's repository followed by a hash and the version you want.

This time we're listing these are *dependencies*, not *devDependencies*, because they are actually required by your project in production.


## 5. Create your master SASS and JavaScript files

Now you need to create a SASS and/or JavaScript file that requires the Origami components as dependencies.  In SASS, you can do this with the `@import` statement, and in JavaScript, using `require`.  The syntax of the SASS import is:

	@import '{modulename}/main';

As an example, create a `main.scss` file anywhere in your project's working tree, containing:

	/* Import Origami components */
	@import 'o-tweet/main';
	@import 'o-techdocs/main';

	/* Add our own SASS */
	.mything {
		color: red;
	}

The syntax of the JavaSript require is:

	{handle} require('{modulename}');

As an example, create a `main.js` file anywhere in your project's working tree, containing:

	// Require module with no API, so no need to handle the return value
	require('o-techdocs');

	// Require a module with an API, so assign the return value to a var to use as a handle to that module
	var $ = require('jquery');
	$(function() {
		// Do something on DOMReady
	});


## 6. Set up a grunt automation script

Now you need to set up the tasks to stitch everything together.  To do this, you need to know:

* Where you have put your master SASS file and master JavaScript file
* Where you want the finished bundles to be saved (usually a publicly accessible web server directory unless you are routing the request for the bundle through a front-controller)

We'll assume for the purposes of this example that your CSS and JS are in `/client/[sass|js]` and you want to save the finshed bundles in `/public` (make sure that directory exists and is writable).  Create a file called `Gruntfile.js` in the root of your project's working tree, with the following contents:

	module.exports = function(grunt) {
	  "use strict";

	  grunt.initConfig({
	    sass: {
	      docs: {
	        options: {
	          style: 'compressed',
	          loadPath: './bower_components'
	        },
	        files: {
	          './public/bundle.css': './client/sass/main.scss'
	        }
	      }
	    },
	    browserify: {
	      dist: {
	        files: {
	          './public/bundle.js': ['./client/js/main.js'],
	        },
	        options: {
	          transform: ['debowerify', 'brfs']
	        }
	      }
	    },
	    watch: {
	      sass: {
	        files: ['./client/sass/**'],
	        tasks: ['sass']
	      },
	      js: {
	        files: ['./client/js/**'],
	        tasks: ['browserify']
	      }
	    }
	  });


	  grunt.loadNpmTasks('grunt-contrib-sass');
	  grunt.loadNpmTasks('grunt-contrib-watch');
	  grunt.loadNpmTasks('grunt-browserify');

	  // Default task(s).
	  grunt.registerTask('default', ['sass', 'browserify']);
	  grunt.registerTask('js', ['browserify']);
	  grunt.registerTask('css', ['sass']);
	};


This is a little long, but taking it step by step:

* We create config for three grunt tasks: sass, browserify and watch.
* Sass is configured to compile the file /client/sass/main.scss into /public/bundle.css using compressed (minified) CSS syntax, and loading modules from ./bower_components (where the Origami components will have been installed by bower)
* Browserify is configued to compile the file /client/js/main.js into /public/bundle.js, via the debowerify transform, which adds support for finding the modules in bower_components (similar to setting the loadPath in the Sass task)
* Watch is set up to run both the browserify and sass tasks automatically if any files in your client-side SASS or JS directories change
* We load the three task runners that are needed
* We register three command-line commands that are linked to running tasks.  This enables you to type `grunt js` on the command line and have it run browserify.  Some are already supported by default, so we don't need to configure `grunt watch`, but it will still work and run the watch task.  `grunt` with no argument will run the default task, which we've configured to be both browserify and sass.

## 7. Prevent git from committing dependencies

Please don't commit dependencies into your project.  To avoid this, you probably want to add the following lines to your `.gitignore` file in the root of your project (or create one if you don't have one already):

	.DS_Store
	.sass-cache/
	bower_components/
	node_modules/
	public/

You may need to change `public/` if you are writing your finished bundles elsewhere.

## 8. Run the build

Run npm to install the build tool dependencies:

	npm install

This will create a `node_modules` directory in the root of your working tree, containing all the node packages you need to run the build process.

Now run bower to install the front-end components:

	bower install

This will create a `bower_components` directory in the root of your working tree, containing all the front end modules you want to use in your project.


Now bundle it all together with grunt:

	grunt

This will use the tools you installed with npm, to read your project's JS and CSS master files, fully explore all their required dependencies, and pull everything together into two bundles, one for JS, and one for CSS.

If you want to continue working on your CSS and JS code (edit your own code but not anything in the bower_components directory), you'll also want to use grunt to watch your files and automatically retrigger the build when you save a change.

	grunt watch


## 9. Use the bundles

Now, you can simply load the bundles in your web page.  If you saved your bundles to `/public` and that's also the root of your web server, you would write the following HTML:

	<link rel="stylesheet" href="bundle.css" />
	<script defer src="bundle.js"></script>

It's advisable to put the `defer` attribute on your `<script>` tags, so that loading of the script does not block page load.  Origami components will never require you to load script prior to the DOM being rendered.  See Nicholas Zakas's post [The truth about non blocking JavaScript](http://calendar.perfplanet.com/2010/the-truth-about-non-blocking-javascript/) for more details.  You should also place the script tag at the very end of your document, not next to the link tag.


## 10. Deal with assets

Finally, we need to deal with assets - files from components that may be loaded on demand by the component's CSS or JavaScript.  Origami has a built in asset loader that allows the load path for these assets to be configured, and by default it's set to `/bower_components`.  This means that assets will load 'out of the box' if you:

* Are using a regular web server that maps URL paths directly to filesystem paths
* Have set your web server's document root to the root of your project's working tree

For very simple projects, this may be true.  But it's generally not a great idea to have your bower_components directory in the public part of your web server, and you may well want to process requests for front-end bundles via a router or [front-controller](http://en.wikipedia.org/wiki/Front_Controller_pattern) of some kind.  In that case, you should set the [o-assets config variables](http://git.svc.ft.com/summary/origami%2Fo-assets.git) in your main SASS file to the values that you want for your project.  Typically this just involves setting one global path prefix.  Here's an example of how you could do this in the main.scss example used earlier:

	/* Set Origami config */
	$o-assets-global-path: '/resources';

	/* Import Origami components */
	@import 'o-tweet/main';
	@import 'o-techdocs/main';

	/* Add our own SASS */
	.mything {
		color: red;
	}

If `o-tweet` wanted to load a background image that was at `/img/separator.gif` in the o-tweet repo, this config would result in the image being requested from `/resources/o-tweet/img/separator.gif`.  It is then up to you to handle this request and deliver the appropriate file from your bower_components directory.
