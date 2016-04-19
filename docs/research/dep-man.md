---
layout: default
title: Dependency management
permalink: /docs/research/dep-man/
site_section: about-origami
---

# Dependency manager research

## NPM

* \+ Already likely to be in use in any Node.js project
* \- Default behaviour is to load dependencies recursively and have multiple different versions of the same module
* \- Can't require a git dependency at a semver version unless we run [our own NPM registry](https://github.com/isaacs/npmjs.org) (also available as a $50/month service: )
* \- Even if we do run our own NPM registry, we can't load packages from it and the public registry in the same package.json because NPM doesn't support multiple registries even though it's been [discussed for over three years](https://github.com/isaacs/npm/issues/100) (there are workarounds like [npm-proxy](https://github.com/g-k/npm-proxy) or having your registry mirror the entire content of the global one)


### Experiments

#### Depend on A and B, each depends on different specific C using `dependencies`

*BAD*. Creates sub-node_modules directories inside A and B, and loads two different versions of C

	Andrews-MacBook-Air:test-main andrew$ npm install
	test-b@1.0.0 node_modules/test-b
	└── test-c@1.0.0
	test-a@1.0.0 node_modules/test-a
	└── test-c@1.5.0

We'd have to write a new tool to flag this as a conflict.


#### Depend on A and B, each depends on same specific C using `dependencies`

*BAD*. Creates sub-node_modules directories inside A and B, and loads the same version of C twice, once inside A, once inside B.

	Andrews-MacBook-Air:test-main andrew$ npm install
	test-b@1.0.0 node_modules/test-b
	└── test-c@1.0.0
	test-a@1.0.0 node_modules/test-a
	└── test-c@1.0.0

This could be tidied up with `npm dedupe` which would remove the nested node_modules directories and place C alongside A and B.


#### Depend on A and B, each depends on same specific C using `peerDependencies`

*BAD*. Error, despite both A and B requiring exactly compatible versions of C.  Suspect this is because we're using git directly rather than via a registry.

	Andrews-MacBook-Air:test-main andrew$ npm install
	npm ERR! peerinvalid The package test-c does not satisfy its siblings' peerDependencies requirements!
	npm ERR! peerinvalid Peer test-a@1.0.0 wants test-c@git://github.com/triblondon/test-c.git#v1.0.0
	npm ERR! peerinvalid Peer test-b@1.0.0 wants test-c@git://github.com/triblondon/test-c.git#v1.0.0


#### Depend on A and B, each depends different but compatible semver range of C using `dependencies`

**BAD**: Fails because NPM does not support semver ranges on git dependency references:

	npm ERR! Failed resolving git HEAD (git://github.com/triblondon/test-c.git) fatal: ambiguous argument '%3C1.7': unknown revision or path not in the working tree.
	npm ERR! Failed resolving git HEAD (git://github.com/triblondon/test-c.git) Use '--' to separate paths from revisions, like this:
	npm ERR! Failed resolving git HEAD (git://github.com/triblondon/test-c.git) 'git <command> [<revision>...] -- [<file>...]'
	npm ERR! Failed resolving git HEAD (git://github.com/triblondon/test-c.git)




## Bower

* \+ Doesn't care what the repo contains
* \+ Flattens all dependencies into a single level
* \+ Supports semver versioning on git dependencies without any need to run a private registry (but if you do want one, [you can](http://toranbillups.com/blog/archive/2013/08/04/How-to-host-a-private-bower-registry/), and you can have the install process check as many registries as you like)
* \+ Can output JSON from the CLI, great for build service automation

### Experiments

#### Depend on A and B, each depends on same specific C

*GOOD*. Loads one copy of A, B and C and puts them all in one bower_components directory.

	Andrews-MacBook-Air:test-main andrew$ bower install
	test-a#777fa93cba bower_components/test-a
	└── test-c#1.0.1
	test-b#bf0d694040 bower_components/test-b
	└── test-c#1.0.1
	test-c#1.0.1 bower_components/test-c

#### Depend on A and B, each depends on different specific C

*GOOD*. Prompts interactively for conflict resolution.

	Andrews-MacBook-Air:test-main andrew$ bower install

	Unable to find a suitable version for test-c, please choose one:
	    1) test-c#v1.0.1 which resolved to 1.0.1 and has test-a#777fa93cba as dependants
	    2) test-c#v1.5.1 which resolved to 1.5.1 and has test-b#e1e2b91be2 as dependants

	Prefix the choice with ! to persist it to bower.json

	Choice:

#### Depend on A and B, each depends on different but compatible semver range of C

*GOOD*. Installs the most recent version that meets all the required ranges

	Andrews-MacBook-Air:test-main andrew$ bower install
	test-a#33eeaf5ccb bower_components/test-a
	└── test-c#1.5.1
	test-c#1.0.1 bower_components/test-c
	test-b#fe8956874e bower_components/test-b
	└── test-c#1.0.1

#### Depend on A and B, each depends on a different and incompatible semver range of C

*GOOD*. Prompts interactively for conflict resolution.

	Andrews-MacBook-Air:test-main andrew$ bower install

	Unable to find a suitable version for test-c, please choose one:
	    1) test-c#<1.4 which resolved to 1.0.1 and has test-b#fe8956874e as dependants
	    2) test-c#>1.0.5 <=2 which resolved to 1.5.1 and has test-a#535ff742b2 as dependants

	Prefix the choice with ! to persist it to bower.json

	Choice:


## Component

- Requires CSS rather than Sass, so rejecting
