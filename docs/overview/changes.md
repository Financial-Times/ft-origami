---
layout: default
title: Changes news feed
section: Overview
permalink: /docs/overview/changes/
---

# Spec changes newsfeed

The following documents the chronology of changes to the Origami spec and significant (ie. breaking) releases of Origami modules since 13th January 2014.  If you want more detailed granularity, please refer to the [commit log](https://github.com/Financial-Times/ft-origami/commits/gh-pages).

### 26 March 2014

**origami-build-tools**: [1.0.0 released](https://github.com/Financial-Times/origami-build-tools@1.0.0): First release

**o-ft-header**: [1.0.0 released](http://registry.origami.ft.com/components/o-ft-header@1.0.0) backwards compatible to 0.6.x

**o-ft-footer**: [1.0.0 released](http://registry.origami.ft.com/components/o-ft-footer@1.0.0) backwards compatible to 0.7.x

### 25 March 2014

**o-ft-forms**: [0.6.0 released](http://registry.origami.ft.com/components/o-ft-forms@0.6.0): Updates dependencies. Backwards compatible with 0.5.x

### 24 March 2014

**Dependency reference syntax**: Modules strongly recommended to use `^` syntax when specifying dependencies ([Issue](https://github.com/Financial-Times/ft-origami/issues/148))

**Sass version**: Modules' Sass must be compilable in Sass 3.3 and avoid emitting deprecation warnings ([Issue](https://github.com/Financial-Times/ft-origami/issues/126))

**o-useragent** [0.5.0 released](http://registry.origami.ft.com/components/o-useragent@0.5.0) new API for js prefixing utility. Incompatible with 0.4.x

### 21 March 2014

**o-fonts**: [1.0.0 released](http://registry.origami.ft.com/components/o-fonts@1.0.0): Now requires SASS 3.3. API Backwards compatible with 0.x

### 20 March 2014

**o-ft-icons**: [1.0.0 released](http://registry.origami.ft.com/components/o-ft-icons@1.0.0): Changed status to 'active'. Backwards compatible with 0.x

### 18 March 2014

**o-fonts-assets**: [0.1.0 released](http://registry.origami.ft.com/components/o-fonts-assets@0.1.0): Creates repository for FT fonts

**o-ft-buttons**: [1.0.0 released](http://registry.origami.ft.com/components/o-ft-buttons@1.0.0): Origami buttons - unified design

### 19 March 2014

**o-ft-forms**: [0.5.0 released](http://registry.origami.ft.com/components/o-ft-forms@0.5.0): Adds radio and checkbox styles. Backwards compatible with 0.4.x

### 14 March 2014

**Subdependencies**: Modules must not use features of subdependencies directly (e.g using oFontsInclude when only oFtTypography is a direct dependency) and should alias features of their dependencies that consumers are likely to need. ([Issue](https://github.com/Financial-Times/ft-origami/issues/150))

**Web service index syntax**: Web service index endpoint may list versions as paths without full hostname ([Issue](https://github.com/Financial-Times/ft-origami/issues/137))

### 12 March 2014

**o-ft-header**: [0.6.0 released](http://registry.origami.ft.com/components/o-ft-header@0.6.0): Html and css incompatible with 0.5.x

**o-ft-footer**: [0.7.0 released](http://registry.origami.ft.com/components/o-ft-footer@0.7.0): Html and css incompatible with 0.6.x

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

**o-ft-forms**: [0.4.0 released](http://registry.origami.ft.com/components/o-ft-forms@0.4.0): Adds validation styles. Backwards compatible with 0.3.x

### 27 Feb 2014

**CI**: Allow CI endpoints to be specified in the Origami manifest file so that build status can be shown in registry

**Support status**: Status overrides all prior statuses on the same major version

### 25 Feb 2014

**CI**: CI should use NodeJS as test runner ([Issue](https://github.com/Financial-Times/ft-origami/issues/125))

### 24 Feb 2014

**o-assets**: [0.4.0 released](http://registry.origami.ft.com/components/o-assets@0.4.0): Parameters in sass mixin now compulsory. Otherwise backwards compatible with 0.3.x

### 21 Feb 2014

**Domain sharding**: No longer supporting domain sharding in web services

**Hostname change**: buildservice.ft.com becomes build.origami.ft.com

**Asset paths**: Allow static asset paths to be listed in Origami manifest file

**SVG syntax**: Prohibit self-closing tags in inline SVG ([Issue](https://github.com/Financial-Times/ft-origami/issues/66))

**o-colors**: [2.2.0 released](http://registry.origami.ft.com/components/o-colors@2.2.0): New mechanism for use cases. Backwards compatible but previous mechanism deprecated

### 19 Feb 2014

**Owned DOM**: Define 'Owned DOM' and require modules to only modify DOM within their area of owned DOM

**o-useragent** [0.4.0 released](http://registry.origami.ft.com/components/o-colors@0.4.0): Changed to use placeholder classes to target useragents. Css incompatible with 0.3.x

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

**o-ft-typography**: [1.0.0 released](http://registry.origami.ft.com/components/o-ft-typography@1.0.0): Now includes general and article-specific typographic styles. Incompatible with 0.x

### 29 Jan 2014

**o-ft-header** [0.5.0 released](http://registry.origami.ft.com/components/o-ft-header@0.5.0): Adds support for injecting content into the header. Backwards compatible with 0.4.x

### 24 Jan 2014

**Cuts the mustard**: Add process for performing Cuts the mustard test ([Issue](https://github.com/Financial-Times/ft-origami/issues/86))

**Responsiveness in SASS**: Modules must not include media queries unless full width. Placeholder classes should be used to provide alternative visual styling which product developer can mix in to media queries at product level. ([Issue](https://github.com/Financial-Times/ft-origami/issues/68))

### 29 Jan 2014

**o-techdocs** [1.0.0 released](http://registry.origami.ft.com/components/o-techdocs@1.0.0): Css for layout incompatible with 0.x

### 21 Jan 2014

**o-grid** [2.0.0 released](http://registry.origami.ft.com/components/o-grid@2.0.0): Changes selector syntax. Completely incompatible with 1.x

### 20 Jan 2014

**CORS in web services**: Web services are no longer required to support the `X-FT-Source` header as it interferes with straightforward implementation of CORS.

### 17 Jan 2014

**Demos**: Added `demos` property to Origami manifest file, allowing modules to list demos to be displayed in registry ([Issue](https://github.com/Financial-Times/ft-origami/issues/92))

**Cuts the mustard**: Modules to document their requirements using Modernizr test names ([Issue](https://github.com/Financial-Times/ft-origami/issues/86))

**Scope in JS**: Modules must assume no globals exist except those they have defined in `browserFeatures` and those present in ECMAScript 3. ([Issue](https://github.com/Financial-Times/ft-origami/issues/94))

**o-colors**: [2.0.0 released](http://registry.origami.ft.com/components/o-colors@2.0.0): New variable syntax and addition of `oColorsGetColorFor()` mixin

### 13 Jan 2014

**Ignores**: README.md must not be ignored in bower.json, otherwise the README cannot be loaded by the registry
