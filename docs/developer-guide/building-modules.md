---
layout: default
title: Installing modules manually
section: Developer guide
permalink: /docs/developer-guide/building-modules/
---

# Building and using Origami modules

Building Origami modules manually gives you the most flexibility and control, but you will need to use some specific tools.  Remember that in many cases you may be able to get started faster by using the [build service](../build-service), which will do all this for you.

This tutorial assumes you are starting from a fresh install of a UNIX-like OS with a bash shell and have cloned or initalised a git repo for your project somewhere on the filesystem.  If you're a bit further along than that, feel free to skip any steps you've already completed.

<aside>
	<h4>No support for Windows</h4>
	<p>Origami's build tools do not support Windows as a development environment and the instructions on this page assume you are using a UNIX-like OS.  Windows <strong>might</strong> work, to some degree, but we don't make any guarantees, either of what works today or what might continue to work tomorrow!  If you're a windows user, consider running a Linux VM, or signing up for a free <a href='http://c9.io'>Cloud9</a> account, and use their online Ubuntu VMs (but don't put any passwords or other secret data into C9 VMs)</p>
</aside>

## 1. Install NodeJS, npm, bower and grunt

To use Origami components, you need some Node tools:

* [NodeJS](http://nodejs.org/) is the JavaScript runtime, which we need to run npm, bower and grunt.
* [npm](http://npmjs.org) is the package manager for the back end (loads Origami build tools)
* [bower](http://bower.io) is the package manager for the front end (loads Origami components)
* [grunt](http://gruntjs.com/) is a task runner, which we use to run the build process

NodeJS can be installed manually or via package management, and often ships preinstalled on many OS distributions.  To find out if you have it installed and which version you have, type this at a terminal ([What's a terminal?](#note-terminal)):

<aside class="o-techdocs__aside--toggleable" id='note-terminal'>
	<h4>What's a "terminal"?!</h4>
	<p>The terminal is an application that enables you to run commands on your computer by typing them in on your keyboard.  It's like having a text-message chat with your computer.  On Mac OS, the terminal is an application you can find in your Applications folder.  On most Linux systems, it's available from the applications or programs menu if you're not using it by default.  On Windows, 'Command prompt' (which is the same thing by a different name) is available in the Apps menu, or prior to Windows 8, press Windows+R, type <code>cmd</code> in the dialog that appears, and press enter.</p>
</aside>

<pre class='cli'>
<kbd>node -v</kbd>
<output>v0.10.29</output>
</pre>

If you get an error, or the number you get does not match the most recent release shown on the [Node website](http://nodejs.org/), you need to install/upgrade Node.  If you're installing it on a personal machine, go to the Node website and click the Install button to download the installer suitable for your system:

* [Download the Node installer](http://nodejs.org/)

If you want to install on a server or other maintained environment, you'll most likely prefer to use a package manager.  Node is available in most package management repositories, and instructions are available in the Node install guide:

* [Install Node via package manager](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager)

Installing Node will automatically install [npm](http://npmjs.org), the Node Package Manager, which you can then use to install bower and grunt (bower and grunt are Node modules so are available from the NPM registry).  Once you have installed Node, type this at a terminal:

<pre class='cli'>
<kbd>sudo npm install -g bower</kbd>
<kbd>sudo npm install -g grunt-cli</kbd>
</pre>

These commands may prompt you for your password.  You will need root access to your machine to complete this step.  On FT-managed machines the root password is typically the same as the password you use to log into the corporate network.

## 2. Install Ruby, the Gem installer, and the SASS gem

Ruby is required to run the SASS compiler, which converts Origami's complex [SASS](http://sass-lang.com/) code into simple CSS that defines what our components look like on the web page.  You may already have Ruby, since it ships preinstalled on many computers.  To find out, type this at a terminal:

<pre class='cli'>
<kbd>ruby -v</kbd>
<output>ruby 2.0.0p247 (2013-06-27 revision 41674) [universal.x86_64-darwin13]</output>
</pre>

If you see an error, or the version does not match the latest version shown on the [Ruby website](https://www.ruby-lang.org/en/downloads/), you need to install/upgrade it.  You can install from source, via pre-built binaries or your preferred package manager.

* [View Ruby install guide](https://www.ruby-lang.org/en/installation/)

Installing Ruby also installs Gem, Ruby's package manager (Gem is to Ruby as NPM is to Node).  Once Ruby is installed, you can install the Sass gem using the gem installer:

<pre class='cli'>
<kbd>sudo gem install sass</kbd>
<output>Fetching: sass-3.3.11.gem (100%)
Successfully installed sass-3.3.11
Parsing documentation for sass-3.3.11
Installing ri documentation for sass-3.3.11
1 gem installed</output>
</pre>

You now have all the system-level pre-requisities to build Origami modules in a project sandbox, so the remaining instructions in this tutorial can be performed as an unprivileged user and will only affect files in your project's working tree.

## 3. Set up an NPM package manifest to install build tools

You now need some Node packages to run the Origami build process.  Choose where you want to start building your project (normally this is also the root of a git repository, but it can be any folder on your computer).  A common pattern is to create a folder called `sandboxes` in your home directory, and then create a subdirectory with the name of your project, eg `/sandboxes/origami-demo`.  We'll refer to this as the 'root of the working tree', because you'll create files and folders within the project folder which descend from the root of the project.

In the root of your working tree, create a file called `package.json`, with the following contents:

	{
	  "private": true,
	  "devDependencies": {
	    "grunt-contrib-sass": ">=0.6.0 <1",
	    "grunt-browserify": "^1.3.0",
	    "grunt-contrib-watch": ">=0.5.3 <1",
	    "textrequireify": "^1.0.0",
	    "debowerify": ">=0.5.1 <1"
	  }
	}

<aside>
	<h4>What are build tools for?</h4>
	<p>If you compare building a website with making a cake, where your website is the finished cake and all the Origami components you plan to use are the ingredients, these build tools are the mixer and the oven - the tools you need to use to convert the ingredients into the cake.</p>
</aside>

You're installing three grunt plugins: [contrib-sass](https://npmjs.org/package/grunt-contrib-sass) to compile SASS (which uses the Ruby SASS gem you installed in step 2), [browserify](https://npmjs.org/package/grunt-browserify) to compile JavaScript using [browserify](http://browserify.org/), and [contrib-watch](https://npmjs.org/package/grunt-contrib-watch) to allow you to trigger the build process to re-run automatically when you change any of your source files.

You're also installing two browserify transforms: [debowerify](https://npmjs.org/package/debowerify) which allows browserify to compile JavaScript modules that have been installed using bower, and [textrequireify](http://git.svc.ft.com:8080/projects/OT/repos/textrequireify) which allows inlining of static assets like templates into JavaScript files.

These modules are listed as *devDependencies* because they are not required to run your application, only to build it.  Marking your project as *private* means that it cannot accidentally be published to the [npm registry](http://npmjs.org) as a public component.

<aside>
	<h4>Specifying versions</h4>
	You may like to amend your <code>package.json</code> to replace the versions above with more recent ones.  You can find the latest version on the relevant NPM module page linked above.  The versions shown here are known to work by the Origami team, and are expressed using the <a href='http://www.semver.org'>Semver</a> <code>^</code> operator, which accepts updated versions up to but not including the next major version (note that this doesn't work in the same way for versions &lt; 1 so to get the same behaviour, specify the range explicitly)
</aside>

## 4. Set up a bower package manifest to load Origami components

Hopefully you know which Origami modules you want.  If you don't, check out the [Origami registry](http://registry.origami.ft.com) for a list of all our supported components.  You can also add any module from the [bower registry](http://bower.io/search/) that has a [commonJS interface](http://wiki.commonjs.org/wiki/Modules/1.1).

Once you know which Origami modules you want, create a `bower.json` file in the root of your working tree.   This you have to create yourself, and it will be different for each project, but it must conform to the bower [configuration spec](http://bower.io/docs/creating-packages/), which is very similar to npm's config.  Here is an example:

	{
	   "name": "origami-demo",
	   "dependencies": {
	      "o-tweet": ">=0.1 <1",
	      "o-techdocs": "^2.0.0",
	      "jquery": "^2.0"
	   }
	}

`dependencies` is a list of the front-end modules you would like to use in your project.  If the module is in the [Origami registry](http://registry.origami.ft.com) or the [bower registry](http://bower.io/search/), you can simply specify the version number you want (using [semver](http://semver.org) rules), otherwise you must provide the full URL of the component's repository followed by a hash and the version you want.

This time we're listing these as *dependencies*, not *devDependencies*, because they are actually required by your project in production.

To ensure that bower can find Origami modules, it needs to be set up to search the Origami registry.  To do this, create a `.bowerrc` file in the root of your project's working tree (or in your home directory, if you want to apply it automatically to all projects), with the following contents:

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

## 5. Create your master SASS and JavaScript files

Now you need to create a SASS and/or JavaScript file that requires the Origami components as dependencies.  In SASS, you can do this with the `@import` statement, and in JavaScript, using `require`.  The syntax of the SASS import is:

	@import '{modulename}/main';

As an example, create a `main.scss` file at `/client/scss/main.scss` (relative to the root of your working tree), containing:

	/* Import Origami components */
	@import 'o-tweet/main';
	@import 'o-techdocs/main';

	/* Add our own SASS */
	.mything {
		color: red;
	}

The syntax of the JavaSript require is:

	{handle} = require('{modulename}');

As an example, create a `main.js` file at `/client/js/main.js`, containing:

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

We'll assume for the purposes of this example that your CSS and JS are in `/client/sass` and `/client/js` and you want to save the finshed bundles in `/public` (make sure that directory exists).  Create a file called `Gruntfile.js` in the root of your project's working tree, with the following contents:

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
	          './public/bundle.css': './client/scss/main.scss'
	        }
	      }
	    },
	    browserify: {
	      dist: {
	        files: {
	          './public/bundle.js': ['./client/js/main.js'],
	        },
	        options: {
	          transform: ['debowerify', 'textrequireify']
	        }
	      }
	    },
	    watch: {
	      sass: {
	        files: ['./client/scss/**'],
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

This list of ignored files includes your two dependency directories (node_modules for your build tools, and bower_components for your Origami components), a couple of annoying directories often created by your computer automatically (.DS_Store and .sass-cache), and finally the `public` directory because the files in there will be generated by the build process and are not part of our application's source code.

Remember that because `.gitignore` starts with a dot, it may not show up in your directory listing, and you may need to toggle an option to make hidden files visible in order to see it.

## 8. Run the build

Run npm to install the build tool dependencies:

<pre class='cli'>
<kbd>npm install</kbd>
<output>...lots of output...</output>
</pre>

This will create a `node_modules` directory in the root of your working tree, containing all the node packages you need to run the build process.

Now run bower to install the front-end components:

<pre class='cli'>
<kbd>bower install</kbd>
<output>bower o-tweet#>=0.1 <1      not-cached https://github.com/Financial-Times/o-tweet.git#>=0.1 <1
bower o-tweet#>=0.1 <1         resolve https://github.com/Financial-Times/o-tweet.git#>=0.1 <1
...lots more output...</output>
</pre>

This will create a `bower_components` directory in the root of your working tree, containing all the front end modules you want to use in your project.


Now bundle it all together with grunt:

<pre class='cli'>
<kbd>grunt</kbd>
<output>Running "sass:docs" (sass) task
Running "browserify:dist" (browserify) task
>> Bundled ./public/bundle.js

Done, without errors.</output>
</pre>

This will use the tools you installed with npm, to read your project's JS and CSS master files, fully explore all their required dependencies, and pull everything together into two bundles, one for JS, and one for CSS.

If you want to continue working on your CSS and JS code (edit your own code but not anything in the bower_components directory), you'll also want to use grunt to watch your files and automatically retrigger the build when you save a change.

<pre class='cli'>
<kbd>grunt watch</kbd>
<output>Running "watch" task
Waiting...</output>
</pre>


## 9. Use the bundles

Now, you can simply load the bundles in your web page.  If you saved your bundles to `/public` and that's also the root of your web server, you would write the following HTML:

	<link rel="stylesheet" href="bundle.css" />
	<script defer src="bundle.js"></script>

It's advisable to put the `defer` attribute on your `<script>` tags, so that loading of the script does not block page load.  Origami components will never require you to load script prior to the DOM being rendered.  See Nicholas Zakas's post [The truth about non blocking JavaScript](http://calendar.perfplanet.com/2010/the-truth-about-non-blocking-javascript/) for more details.  You should also place the script tag at the very end of your document, not next to the link tag.

Here's an example of a web page that includes the script and link tags in the right place, and also adds some content that we can style using the Origami components.  You can create this in your public directory as `/public/index.html`:

	<!DOCTYPE html>
	<html>
	  <head>
	    <link rel='stylesheet' href='bundle.css'>
	  </head>
	  <body>

	    <div class="o-tweet">
	      <div class="o-tweet__h-card">
	        <a class="o-tweet__url-profile" target="_blank" title="Go to twitter profile for @Barack_Obama" href="http://twitter.com/Barack_Obama"><img class="o-tweet__avatar" src="https://pbs.twimg.com/profile_images/451007105391022080/iu1f7brY_bigger.png"></a>
	        <span class="o-tweet__user-name">Barack Obama</span> tweets:
	      </div>
	      <blockquote>Four more years. <a href="http://t.co/bAJE6Vom">pic.twitter.com/bAJE6Vom</a></blockquote>
	      <div class="o-tweet__media o-tweet__photo">
	        <img src="https://pbs.twimg.com/media/A7EiDWcCYAAZT1D.jpg" alt="Embedded photo">
	      </div>
	      <ul class="o-tweet__metadata">
	        <li class="o-tweet__stats"><strong>778,085</strong> retweets</li>
	        <li class="o-tweet__stats"><strong>293,535</strong> favorites</li>
	        <li class="o-tweet__creation-date"><a class="o-tweet__permalink" title="Permalink to tweet" href="http://twitter.com/Barack_Obama/statuses/266031293945503744"><time>10:20am, 1st Mar 2014</time></a></li>
	      </ul>
	    </div>

	    <script defer src="bundle.js"></script>

	  </body>
	</html>


## 10. Deal with assets

Finally, we need to deal with assets - files from components that may be loaded on demand by the component's CSS or JavaScript.  Origami has a built in asset loader that allows the load path for these assets to be configured, and by default it's set to `/bower_components`.  This means that assets will load 'out of the box' if you:

* Are using a web server that maps URL paths directly to filesystem paths; and
* Have set your web server's document root to the root of your project's working tree

For very simple projects, this may be true.  But it's generally not a great idea to have your `bower_components` directory in the public part of your web server, and you may well want to process requests for front-end bundles via a router or [front-controller](http://en.wikipedia.org/wiki/Front_Controller_pattern) of some kind.  In that case, you should set the [o-assets config variables](http://git.svc.ft.com/summary/origami%2Fo-assets.git) in your main SASS file to the values that you want for your project.  Typically this just involves setting one global path prefix.  Here's an example of how you could do this in the main.scss example used earlier:

	/* Set Origami config */
	$o-assets-global-path: '/resources';

	/* Import Origami components */
	@import 'o-tweet/main';
	@import 'o-techdocs/main';

	/* Add our own SASS */
	.mything {
		color: red;
	}

If `o-tweet` wanted to load a background image that was at `/img/separator.gif` in the `o-tweet` repo, this config would result in the image being requested from `/resources/o-tweet/img/separator.gif`.  It is then up to you to handle this request and deliver the appropriate file from your bower_components directory.
