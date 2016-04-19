---
layout: default
title: Setting up background linters
permalink: /docs/background-linters/
site_section: about-origami
redirect_from: "/docs/developer-guide/background-linters/"
---

# Setting up background linters

ESLint *should* be used when developing Origami components. It's useful to have linters run in the background and highlight errors as you're typing. SublimeLinter and ESLint packages are recommended for Sublime Text and JetBrains IDEs respectively.

## Install dependencies

If you already have Origami Build Tools (OBT) and ESLint configured, skip to the [Installing background linter plugins](#Installing-background-linter-plugins) section.

Ensure you have installed [Origami Build Tools](https://www.npmjs.com/package/origami-build-tools). This will provide you with Sass, scss-lint and provide instructions on how to set up Node.js and Ruby.

### Install ESLint

ESLint isn't installed automatically installed as part of OBT, so install it with the following command:

#### Enter the following to your shell

<pre class="cli">
	<kbd>npm install -g eslint</kbd>
</pre>

You can have an `.eslintrc` configuration file per folder. It is recommended to use the [Origami global configuration](https://github.com/Financial-Times/origami-build-tools/blob/master/config/.eslintrc) when developing Origami components. We recommend installing the configuration file into your home directory (User directory) to avoid installing it into each individual project folder.

#### Create  a global configuration file
<pre class="cli">
	<kbd>curl -o ~/.eslintrc https://raw.githubusercontent.com/Financial-Times/origami-build-tools/master/config/.eslintrc</kbd>
</pre>

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
