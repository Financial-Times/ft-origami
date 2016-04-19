---
layout: default
title: Build tools
permalink: /docs/research/build-tools/
site_section: about-origami
---

# Build tools research

The package manager research pointed to using bower, so this

## JavaScript

#### Download with bower, list main JS file in `main` array of each component

As expected, this fails.  Browserify does not come with built in support for Bower-resolved dependencies:

	Andrews-MacBook-Air:test-main andrew$ browserify src/main.js > bundle.js
	Error: Cannot find module 'test-a'

#### Same again, having installed debowerify

Debowerify must be installed locally, not with `-g`.

Browserify now works, but appears to fail to include the nested dependencies.

Updated debowerify to use bower.json rather than bower API:
https://github.com/triblondon/debowerify/commit/cee3f94bbf1523a5017852d691af0ab7ed35ac61

Now it works (with debug, since removed):

	Andrews-MacBook-Air:test-main andrew$ browserify -t debowerify src/main.js -o bundle.js
	/Users/andrew/sandboxes/test-main/src/main.js test-a->./../bower_components/test-a/src/js/main.js
	/Users/andrew/sandboxes/test-main/src/main.js test-b->./../bower_components/test-b/src/js/main.js
	/Users/andrew/sandboxes/test-main/bower_components/test-a/src/js/main.js test-c->./../../../test-c/src/js/main.js
	/Users/andrew/sandboxes/test-main/bower_components/test-b/src/js/main.js test-c->./../../../test-c/src/js/main.js

#### Summary of build steps for JavaScript

In the component:

* Put a main JS file in the root of the project.  All other JS files can live anywhere as long as they are ultimate dependencies of main.js via `require` statements
* List it as the `main` property of a bower.json file
* Create a release in GH

In the project / build service (assuming you already have node, npm and browserify installed):

* Create a bower.json file listing the component in the dependencies section
* Run bower install
* Create a main JS file that require()s the component somewhere within it
* Install Andrew's fork of debowerify (or list it in a package.json file and run npm install)
* Run browserify, with the debowerify transform, pointing at your main JS file
* Serve the resulting file in a `<script>` tag.

## Sass

Install fonzie globally.  Also has to install win-fork which is a dependency but not listed in fonzie's package config:

	Andrews-MacBook-Air:test-main andrew$ sudo npm install -g fonzie
	Andrews-MacBook-Air:test-main andrew$ sudo npm install -g win-fork

Ran it and got the following error, which seems to suggest bower's API has changed - maybe?

	Andrews-MacBook-Air:test-main andrew$ fonzie build
	TypeError: Object #<Object> has no method 'ls'
	    at Builder.getDependencies (/usr/local/lib/node_modules/fonzie/lib/builder.js:71:18)

Uninstalled fonzie and installed it again non-globally, and patched the file to fix that problem.

Running build this time produced no output, so tried 'install':

Andrews-MacBook-Air:test-main andrew$ ./node_modules/fonzie/bin/fonzie build
Andrews-MacBook-Air:test-main andrew$ ./node_modules/fonzie/bin/fonzie install

	execvp(): No such file or directory

	events.js:72
	        throw er; // Unhandled 'error' event
	              ^
	Error: spawn ENOENT

Speculated that this might be because I don't have the sass gem.  Installed that:

	Andrews-MacBook-Air:test-main andrew$ sudo gem install sass
	Password:
	Fetching: sass-3.2.10.gem (100%)
	Successfully installed sass-3.2.10
	Installing ri documentation for sass-3.2.10
	/System/Library/Frameworks/Ruby.framework/Versions/1.8/usr/lib/ruby/1.8/rdoc/rdoc.rb:280: warning: conflicting chdir during another chdir block
	/System/Library/Frameworks/Ruby.framework/Versions/1.8/usr/lib/ruby/1.8/rdoc/rdoc.rb:287: warning: conflicting chdir during another chdir block
	Done installing documentation for sass after 19 seconds
	1 gem installed

But this made no difference.

Gave up on fonzie and moved on to using node-sass
