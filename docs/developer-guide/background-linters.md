---
layout: default
title: Setting up background linters
section: Developer guide
permalink: /docs/developer-guide/background-linters/
---

# Setting up background linters

ESLint *must* be used when developing Origami components. It's useful to have linters run in the background and highlight errors as you're typing. SublimeLinter and ESLint packages are recommended for Sublime Text and JetBrains IDEs respectively.

## Install dependencies

If you already have Origami Build Tools (OBT) and ESLint configured, skip to the [Installing background linter plugins](#Installing-background-linter-plugins) section.

Ensure you have installed [Origami Build Tools](https://www.npmjs.com/package/origami-build-tools). This will provide you with Sass, scss-lint and provide instructions on how to set up Node.js and Ruby. 

### Install ESLint

ESLint isn't installed automatically installed as part of OBT, so install it with the following command:

**Enter the following to your shell**
`npm install -g eslint`

You can have an `.eslintrc` configuration file per folder. It is recommended to use the Origami global configuration when developing Origami components.

**Create  a global configuration file**
`touch ~/.eslintrc`

**And add in the following options**
```json
{
	"ecmaFeatures": {
		"modules": true
	},
	"env": {
		"es6": true,
		"browser": true
	},
	"rules": {
		"no-unused-vars": 2,
		"no-undef": 2,
		"eqeqeq": 2,
		"guard-for-in": 2,
		"no-extend-native": 2,
		"wrap-iife": 2,
		"new-cap": 2,
		"no-caller": 2,
		"no-multi-str": 0,
		"dot-notation": 0,
		"strict": [2, "global"],
		"valid-jsdoc": 1,
		"no-irregular-whitespace": 1,
		"no-multi-spaces": 2,
		"one-var": [2, "never"],
		"constructor-super": 2,
		"no-this-before-super": 2,
		"no-var": 2,
		"prefer-const": 1,
		"no-const-assign": 2
	},
	"globals": {
		"require": false,
		"module": false,
		"exports": false,
		"requireText": false
	}
}
```

## Installing background linter plugins

### SublimeLinter

1. [Install the sublime text package manager](https://packagecontrol.io/installation), for more information on the package manager and how to use it, visit the [Package Control Usage page](https://packagecontrol.io/docs/usage).
2. Install package  `SublimeLinter`
3. Install package `SublimeLinter-eslint`
4. Restart sublime text

### JetBrains

1. Go to preferences and select plugins in the navigation
2. Click the 'Browse repositories...' button and search for 'ESLint'
3. Install the plugin
4. Restart your IDE
5. Enable the ESLint plugin in preferences > JavaScript > Code Quality Tools > ESLint
