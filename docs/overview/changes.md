---
layout: default
title: Changes news feed
section: Overview
permalink: /docs/overview/changes/
---

# Spec changes newsfeed

The following documents the chronology of changes to the Origami spec and significant (ie. breaking) releases of Origami modules since 13th January 2014.  If you want more detailed granularity, please refer to the [commit log](https://github.com/Financial-Times/ft-origami/commits/gh-pages).

### 26 March 2014

**origami-build-tools**: [1.0.0 released](https://github.com/Financial-Times/origami-build-tools/releases/tag/1.0.0): "First release".

### 25 March 2014

**o-ft-forms**: [0.6.1 released](https://github.com/Financial-Times/o-ft-forms/releases/tag/0.6.1): "It's active!".

### 24 March 2014

**Dependency reference syntax**: Modules strongly recommended to use `^` syntax when specifying dependencies ([Issue](https://github.com/Financial-Times/ft-origami/issues/148))

**Sass version**: Modules' Sass must be compilable in Sass 3.3 and avoid emitting deprecation warnings ([Issue](https://github.com/Financial-Times/ft-origami/issues/126))

### 21 March 2014

**o-fonts**: [1.0.0 released](https://github.com/Financial-Times/o-fonts/releases/tag/1.0.0): "Now requires SASS 3.3".

**o-gallery**: [0.2.1 released](https://github.com/Financial-Times/o-gallery/releases/tag/0.2.1): "Updated o-ft-icons version".

### 20 March 2014

**o-ft-icons**: [1.0.0 released](https://github.com/Financial-Times/o-ft-icons/releases/tag/1.0.0): "Changed status to 'active'".

### 18 March 2014

**o-fonts-assets**: 0.1.0 released (private repo).

**o-ft-buttons**: [1.0.0 released](https://github.com/Financial-Times/o-ft-buttons/releases/tag/1.0.0): "Origami buttons - unified design".

### 14 March 2014

**Subdependencies**: Modules must not use features of subdependencies directly (e.g using oFontsInclude when only oFtTypography is a direct dependency) and should alias features of their dependencies that consumers are likely to need. ([Issue](https://github.com/Financial-Times/ft-origami/issues/150))

**Web service index syntax**: Web service index endpoint may list versions as paths without full hostname ([Issue](https://github.com/Financial-Times/ft-origami/issues/137))

### 11 March 2014

**Core experience**: Modules must use `no-js` and `js` classes to handle cuts-the-mustard failures

### 10 March 2014

**Bower registry**: Origami registry is now a bower registry and dependencies should use it ([Issue](https://github.com/Financial-Times/ft-origami/issues/100))

**CI**: Modules should use origami-build-tools to verify builds in CI

### 5 March 2014

**Mustache is a spec**: Mustache files need not be consumed as templates, and should be seen as a spec

**Web service description syntax**: Drop requirement for `docs` property

### 28 Feb 2014

**XML validity**: Markup need not be valid XML, actually we just require a subset of XML rules

### 27 Feb 2014

**CI**: Allow CI endpoints to be specified in the Origami manifest file so that build status can be shown in registry

**Support status**: Status overrides all prior statuses on the same major version

### 25 Feb 2014

**CI**: CI should use NodeJS as test runner ([Issue](https://github.com/Financial-Times/ft-origami/issues/125))

### 21 Feb 2014

**Domain sharding**: No longer supporting domain sharding in web services

**Hostname change**: buildservice.ft.com becomes build.origami.ft.com

**Asset paths**: Allow static asset paths to be listed in Origami manifest file

**SVG syntax**: Prohibit self-closing tags in inline SVG ([Issue](https://github.com/Financial-Times/ft-origami/issues/66))

### 19 Feb 2014

**Owned DOM**: Define 'Owned DOM' and require modules to only modify DOM within their area of owned DOM

### 14 Feb 2014

**JavaScript syntax**: Additional requirements for JavaScript that contains DOM selectors, events, or animation, and limit functions to three arguments. ([Issue](https://github.com/Financial-Times/ft-origami/issues/71))

### 10 Feb 2014

**Use of ID**: The ID attibute is now allowed in component markup certain specific circumstances ([Issue](https://github.com/Financial-Times/ft-origami/issues/112))

### 6 Feb 2014

**Metrics syntax**: Standard deviation is now optional in metrics output ([Issue](https://github.com/Financial-Times/ft-origami/issues/115)), add `since` property to record time at which count values were last reset, allow and recommend that the last modified date for metrics be set as an HTTP header ([Issue](https://github.com/Financial-Times/ft-origami/issues/113))

**Mustache syntax**: Update rules for referencing other files within Mustache templates ([Issue](https://github.com/Financial-Times/ft-origami/issues/109))

### 3 Feb 2014

**CI**: Add requirement for CI ([Issue](https://github.com/Financial-Times/ft-origami/issues/103))

### 31 Jan 2014

**SASS Syntax**: Require `!optional` to be used when extending placeholder classes

**o-ft-typography**: [1.0.0 released](https://github.com/Financial-Times/o-ft-typography/releases/tag/1.0.0): "Now includes general and article-specific typographic styles".

### 24 Jan 2014

**Cuts the mustard**: Add process for performing Cuts the mustard test ([Issue](https://github.com/Financial-Times/ft-origami/issues/86))

**Responsiveness in SASS**: Modules must not include media queries unless full width. Placeholder classes should be used to provide alternative visual styling which product developer can mix in to media queries at product level. ([Issue](https://github.com/Financial-Times/ft-origami/issues/68))

### 20 Jan 2014

**CORS in web services**: Web services are no longer required to support the `X-FT-Source` header as it interferes with straightforward implementation of CORS.

### 17 Jan 2014

**Demos**: Added `demos` property to Origami manifest file, allowing modules to list demos to be displayed in registry ([Issue](https://github.com/Financial-Times/ft-origami/issues/92))

**Cuts the mustard**: Modules to document their requirements using Modernizr test names ([Issue](https://github.com/Financial-Times/ft-origami/issues/86))

**Scope in JS**: Modules must assume no globals exist except those they have defined in `browserFeatures` and those present in ECMAScript 3. ([Issue](https://github.com/Financial-Times/ft-origami/issues/94))

**o-colors**: [2.0.0 released](https://github.com/Financial-Times/o-colors/releases/tag/2.0.0): "New variable syntax".

### 13 Jan 2014

**Ignores**: README.md must not be ignored in bower.json, otherwise the README cannot be loaded by the registry

### 7 Jan 2014

**o-colors**: [1.0.0 released](https://github.com/Financial-Times/o-colors/releases/tag/1.0.0): "Now with use-case variables".