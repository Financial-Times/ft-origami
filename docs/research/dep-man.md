---
layout: default
title: Dependency management
permalink: /docs/research/dep-man/
---

# Dependency manager comparison

## NPM

* \+ Doesn't care what the repo contains
* \- Default behaviour is to load dependencies recursively and have multiple different versions of the same module
* \- Can't require a git dependency at a semver version unless we run our own NPM registry (https://github.com/isaacs/npmjs.org)

### Experiments

#### Depend on A and B, each depends on different specific C using `dependencies`

*BAD*. Creates sub-node_modules dirs inside A and B, and loads two different versions of C

	Andrews-MacBook-Air:test-main andrew$ npm install
	test-b@1.0.0 node_modules/test-b
	└── test-c@1.0.0
	test-a@1.0.0 node_modules/test-a
	└── test-c@1.5.0


#### Depend on A and B, each depends on same specific C using `dependencies`

*BAD*. Creates sub-node_modules dirs inside A and B, and loads the same version of C twice, once inside A, once inside B.

	Andrews-MacBook-Air:test-main andrew$ npm install
	test-b@1.0.0 node_modules/test-b
	└── test-c@1.0.0
	test-a@1.0.0 node_modules/test-a
	└── test-c@1.0.0

#### Depend on A and B, each depends on same specific C using `peerDependencies`

*BAD*. Error, despite both A and B requiring exactly compatible versions of C.  Suspect this is because we're using git directly rather than via a registry.

	Andrews-MacBook-Air:test-main andrew$ npm install
	npm ERR! peerinvalid The package test-c does not satisfy its siblings' peerDependencies requirements!
	npm ERR! peerinvalid Peer test-a@1.0.0 wants test-c@git://github.com/triblondon/test-c.git#v1.0.0
	npm ERR! peerinvalid Peer test-b@1.0.0 wants test-c@git://github.com/triblondon/test-c.git#v1.0.0



## Bower

* \+ Doesn't care what the repo contains
* \+ Flattens all dependencies into a single level
* \+ Supports semver versioning on git dependencies
* \+ Has a public registry for common components
* \+ You can run a [private registry](http://toranbillups.com/blog/archive/2013/08/04/How-to-host-a-private-bower-registry/) relatively easily

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

#### Depend on A and B, each depends on different but comaptible semver range of C

*GOOD*. Installs the most recent version that meets all the required ranges

	Andrews-MacBook-Air:test-main andrew$ bower install
	test-a#33eeaf5ccb bower_components/test-a
	└── test-c#1.5.1
	test-c#1.0.1 bower_components/test-c
	test-b#fe8956874e bower_components/test-b
	└── test-c#1.0.1

#### Depend on A and B, each depends on a different and incompatible semver range of C

*GOOD*. Prompts interactively for conflict resolution, and

	Andrews-MacBook-Air:test-main andrew$ bower install

	Unable to find a suitable version for test-c, please choose one:
	    1) test-c#<1.4 which resolved to 1.0.1 and has test-b#fe8956874e as dependants
	    2) test-c#>1.0.5 <=2 which resolved to 1.5.1 and has test-a#535ff742b2 as dependants

	Prefix the choice with ! to persist it to bower.json

	Choice:


## Component

- Requires CSS rather than SASS
