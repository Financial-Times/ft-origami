---
layout: default
title: Changes news feed
section: Overview
permalink: /docs/overview/changes/
---

# Spec changes newsfeed

The following documents the chronology of changes to the Origami spec and significant (ie. breaking) releases of Origami modules since 13th January 2014.  If you want more detailed granularity, please refer to the [commit log](https://github.com/Financial-Times/ft-origami/commits/gh-pages).

###13 Aug 2014

**Content security policy**: Packaged apps and sites served with CSP restrictions may need to take additional steps to make the build service work ([Issue](https://github.com/Financial-Times/ft-origami/issues/237))

###7 Aug 2014

**Best practices**: Product developers should follow these best practices to develop sites to the same standard as Origami components ([Issue](https://github.com/Financial-Times/ft-origami/pull/221))

###6 Aug 2014

**Layers**: Where a component needs to use z-axis, o-layers must be used ([Issue](https://github.com/Financial-Times/ft-origami/pull/207))

**Build service auto-init**: Build service now supports auto-initialisation and auto-export by default ([Issue](https://github.com/Financial-Times/ft-origami/pull/235))

###5 Aug 2014

**Initialising modules**: Standardise the way that modules define their init methods ([Issue](https://github.com/Financial-Times/ft-origami/pull/228))

###1 Aug 2014

**Primary is now Enhanced**: Renamed this to combat perception that 'primary' is 'normal'.  Core is normal. ([Issue](https://github.com/Financial-Times/ft-origami/pull/232), [Issue](https://github.com/Financial-Times/ft-origami/pull/234)).

###29 July 2014

**Manual build process**: Guidelines revised extensively following first Origami workshop ([Issue](https://github.com/Financial-Times/ft-origami/commit/fbb661aaaba6b368a72bb830b6407138354110f5))


###21 July 2014

**Owned DOM**: Modules *must* not throw an error if there are no instances of the module's owned DOM in the page. ([Issue](https://github.com/Financial-Times/ft-origami/pull/200))

**Browser support declaration**: Components must declare the browsers that they have been tested in ([Commit](https://github.com/Financial-Times/ft-origami/commit/97854ea4fdb08c951278170d4221d32b06604a30))

**Developer guidelines**: Extensively revised developer guide ([Commit](https://github.com/Financial-Times/ft-origami/commit/04131633709c995a64ff8d3b2110cd4219244839))

**Support**: Origami team now available via a mailing list ([Commit](https://github.com/Financial-Times/ft-origami/commit/e10289501aa98010cf00976fc75daa742eb6f251))

###13 July 2014

**Silent styles**: Drop recommendation for silent mode in modules with JavaScript ([Commit](https://github.com/Financial-Times/ft-origami/commit/8cc161ba066c62221e22161334fd12cfd497e0ff))

**Security**: Drop recommendation to implement JSONP endpoints in web services following Rosetta Flash vulnerability ([Commit](https://github.com/Financial-Times/ft-origami/commit/581e9bc08bc8e0bc71a5383927c3c290f2d89ab0))

###8 July 2014

**Notification requirements**: Developers must notify potential consumers when new versions of components are released ([Issue](https://github.com/Financial-Times/ft-origami/issues/220))

###2 July 2014

**Privacy hinting**: Use underscores to indicate privacy of Sass objects.  Use underscore prefixes on all filenames except the main file. ([Issue](https://github.com/Financial-Times/ft-origami/issues/208))

**Sass imports**: Multiple Sass files in the same module should all be imported in main ([Issue](https://github.com/Financial-Times/ft-origami/issues/205))

###19 June 2014

**o-viewport**: Recommend using o-viewport for scroll, resize and orientationchange events ([Commit](https://github.com/Financial-Times/ft-origami/commit/bb217eaed631c65b7c3010872882f43afd44d4d2))

###12 June 2014

**Auto-initialisation**: Modules must not use native DOMContentLoaded and load events, instead use namespaced ones ([Issue](https://github.com/Financial-Times/ft-origami/issues/196))

**Sass Linting**: Sass must comply with new standardised lint rules ([Issue](https://github.com/Financial-Times/ft-origami/issues/193))

###22 May 2014

**Isomorphic modules**: Special rules for modules that have a server-side NodeJS use case ([Commit](https://github.com/Financial-Times/ft-origami/commit/3dcc3cc047fa985fcaf76ba5e801b6efd5284e61))

**Unit of length**: Pixels must be used as the unit for any length value in CSS ([Issue](https://github.com/Financial-Times/ft-origami/issues/162))

###20 May 2014

**Demos and testing**: Demos must work in the registry ([Commit](https://github.com/Financial-Times/ft-origami/commit/58dd87d2e4f5fbcbddf087dde1d493130027b4db)).

**Themes**: Modules may contain styles to theme other modules ([Commit](https://github.com/Financial-Times/ft-origami/commit/f2660fd74bc7210bbb8903a3a57969f9ce95cec7))

**Storage**: When storing data in the browser, modules must encapsulate logic and remain compatible with the data format ([Issue](https://github.com/Financial-Times/ft-origami/issues/190))

###14 May 2014

**Demos**: New syntax for describing demos in the origami.json file ([Issue](https://github.com/Financial-Times/ft-origami/issues/184))

**JS Encapsulation**: Updated rules on JavaScript encapsulation and what can and cannot be run on parse ([Issue](https://github.com/Financial-Times/ft-origami/issues/163))

###9 May 2014

**Interaction states**: Added a list of all the interaction states that components should consider ([Issue](https://github.com/Financial-Times/ft-origami/issues/187))

**Vendor prefixes**: Components must use o-useragent for vendor prefixing ([Issue](https://github.com/Financial-Times/ft-origami/pull/182))

**Silent CSS**: Loosen rules to allow provision of styles as mixins rather than placeholders ([Issue](https://github.com/Financial-Times/ft-origami/issues/188))

###5 May 2014

**Feature flags**: Add rules on use of feature flags ([Issue](https://github.com/Financial-Times/ft-origami/pull/175))

**Lo-dash**: We replaced lo-dash with lo-dash-node in the third party A list ([Issue](https://github.com/Financial-Times/ft-origami/pull/186))

###25 April 2014

**o-useragent**: [1.0.0 released](http://registry.origami.ft.com/components/o-useragent@1.0.0). Adds vendor prefixing utility to sass. Backwards compatible to 0.5.x

###15 April 2014

**Protocol-relative URLs**: Require all URLs referenced in components to be protocol relative to avoid HTTP/HTTPS issues ([Issue](https://github.com/Financial-Times/ft-origami/issues/173))

###11 April 2014

**Modernizr inlining**: Advise product developers to inline their custom build of Modernizr to avoid an extra blocking HTTP request ([Commit](https://github.com/Financial-Times/ft-origami/commit/e324ac9c0639fe48e318496653a264c9d916d3f9))

###10 April 2014

**AJAX**: Recommend use of superagent for AJAX ([Issue](https://github.com/Financial-Times/ft-origami/issues/166))

**Events**: Recommend use of ftdomdelegate to make it easier to bind and unbind native DOM events ([Commit](https://github.com/Financial-Times/ft-origami/commit/1af2b87a704a92f8701c8e9abb6174c48677f4d0))

**jQuery**: Recommend avoiding jQuery in components, with rationale ([Commit](https://github.com/Financial-Times/ft-origami/commit/1af2b87a704a92f8701c8e9abb6174c48677f4d0))

###4 April 2014

**init/destroy**: Updating rules on use of init and destroy methods in components ([Issue](https://github.com/Financial-Times/ft-origami/pull/165))

**Foreign events**: It's allowed for one module to trigger events defined by another module, in certain restricted scenarios ([Commit](https://github.com/Financial-Times/ft-origami/commit/f10bc430bb0c261220e6c1894a34da47a6247c61))

###28 March 2014

**Foreign elements**: Components must be tolerant of foreign markup being introduced into their DOM ([Issue](https://github.com/Financial-Times/ft-origami/pull/158))

**Inter-component communication**: Use of APIs and native DOM events for communicating with and between components in JavaScript ([Issue](https://github.com/Financial-Times/ft-origami/issues/147))

###26 March 2014

**origami-build-tools**: [1.0.0 released](https://github.com/Financial-Times/origami-build-tools@1.0.0): First release

**o-ft-header**: [1.0.0 released](http://registry.origami.ft.com/components/o-ft-header@1.0.0) backwards compatible to 0.6.x

**o-ft-footer**: [1.0.0 released](http://registry.origami.ft.com/components/o-ft-footer@1.0.0) backwards compatible to 0.7.x

###25 March 2014

**o-ft-forms**: [0.6.0 released](http://registry.origami.ft.com/components/o-ft-forms@0.6.0): Updates dependencies. Backwards compatible with 0.5.x

###24 March 2014

**Dependency reference syntax**: Modules strongly recommended to use `^` syntax when specifying dependencies ([Issue](https://github.com/Financial-Times/ft-origami/issues/148))

**Sass version**: Modules' Sass must be compilable in Sass 3.3 and avoid emitting deprecation warnings ([Issue](https://github.com/Financial-Times/ft-origami/issues/126))

**o-useragent** [0.5.0 released](http://registry.origami.ft.com/components/o-useragent@0.5.0) new API for js prefixing utility. Incompatible with 0.4.x

###21 March 2014

**o-fonts**: [1.0.0 released](http://registry.origami.ft.com/components/o-fonts@1.0.0): Now requires Sass 3.3. API Backwards compatible with 0.x

###20 March 2014

**o-ft-icons**: [1.0.0 released](http://registry.origami.ft.com/components/o-ft-icons@1.0.0): Changed status to 'active'. Backwards compatible with 0.x

###18 March 2014

**o-fonts-assets**: [0.1.0 released](http://registry.origami.ft.com/components/o-fonts-assets@0.1.0): Creates repository for FT fonts

**o-ft-buttons**: [1.0.0 released](http://registry.origami.ft.com/components/o-ft-buttons@1.0.0): Origami buttons - unified design

###19 March 2014

**o-ft-forms**: [0.5.0 released](http://registry.origami.ft.com/components/o-ft-forms@0.5.0): Adds radio and checkbox styles. Backwards compatible with 0.4.x

###14 March 2014

**Subdependencies**: Modules must not use features of subdependencies directly (e.g using oFontsInclude when only oFtTypography is a direct dependency) and should alias features of their dependencies that consumers are likely to need. ([Issue](https://github.com/Financial-Times/ft-origami/issues/150))

**Web service index syntax**: Web service index endpoint may list versions as paths without full hostname ([Issue](https://github.com/Financial-Times/ft-origami/issues/137))

###12 March 2014

**o-ft-header**: [0.6.0 released](http://registry.origami.ft.com/components/o-ft-header@0.6.0): Html and css incompatible with 0.5.x

**o-ft-footer**: [0.7.0 released](http://registry.origami.ft.com/components/o-ft-footer@0.7.0): Html and css incompatible with 0.6.x

###11 March 2014

**Core experience**: Modules must use `no-js` and `js` classes to handle cuts-the-mustard failures

###10 March 2014

**Bower registry**: Origami registry is now a bower registry and dependencies should use it ([Issue](https://github.com/Financial-Times/ft-origami/issues/100))

**CI**: Modules should use origami-build-tools to verify builds in CI

###5 March 2014

**Mustache is a spec**: Mustache files need not be consumed as templates, and should be seen as a spec

**Web service description syntax**: Drop requirement for `docs` property

###28 Feb 2014

**XML validity**: Markup need not be valid XML, actually we just require a subset of XML rules

**o-ft-forms**: [0.4.0 released](http://registry.origami.ft.com/components/o-ft-forms@0.4.0): Adds validation styles. Backwards compatible with 0.3.x

###27 Feb 2014

**CI**: Allow CI endpoints to be specified in the Origami manifest file so that build status can be shown in registry

**Support status**: Status overrides all prior statuses on the same major version

###25 Feb 2014

**CI**: CI should use NodeJS as test runner ([Issue](https://github.com/Financial-Times/ft-origami/issues/125))

###24 Feb 2014

**o-assets**: [0.4.0 released](http://registry.origami.ft.com/components/o-assets@0.4.0): Parameters in sass mixin now compulsory. Otherwise backwards compatible with 0.3.x

###21 Feb 2014

**Domain sharding**: No longer supporting domain sharding in web services

**Hostname change**: buildservice.ft.com becomes build.origami.ft.com

**Asset paths**: Allow static asset paths to be listed in Origami manifest file

**SVG syntax**: Prohibit self-closing tags in inline SVG ([Issue](https://github.com/Financial-Times/ft-origami/issues/66))

**o-colors**: [2.2.0 released](http://registry.origami.ft.com/components/o-colors@2.2.0): New mechanism for use cases. Backwards compatible but previous mechanism deprecated

###19 Feb 2014

**Owned DOM**: Define 'Owned DOM' and require modules to only modify DOM within their area of owned DOM

**o-useragent** [0.4.0 released](http://registry.origami.ft.com/components/o-colors@0.4.0): Changed to use placeholder classes to target useragents. Css incompatible with 0.3.x

###14 Feb 2014

**JavaScript syntax**: Additional requirements for JavaScript that contains DOM selectors, events, or animation, and limit functions to three arguments. ([Issue](https://github.com/Financial-Times/ft-origami/issues/71))

###10 Feb 2014

**Use of ID**: The ID attibute is now allowed in component markup certain specific circumstances ([Issue](https://github.com/Financial-Times/ft-origami/issues/112))

###6 Feb 2014

**Metrics syntax**: Standard deviation is now optional in metrics output ([Issue](https://github.com/Financial-Times/ft-origami/issues/115)), add `since` property to record time at which count values were last reset, allow and recommend that the last modified date for metrics be set as an HTTP header ([Issue](https://github.com/Financial-Times/ft-origami/issues/113))

**Mustache syntax**: Update rules for referencing other files within Mustache templates ([Issue](https://github.com/Financial-Times/ft-origami/issues/109))

###3 Feb 2014

**CI**: Add requirement for CI ([Issue](https://github.com/Financial-Times/ft-origami/issues/103))

###31 Jan 2014

**Sass Syntax**: Require `!optional` to be used when extending placeholder classes

**o-ft-typography**: [1.0.0 released](http://registry.origami.ft.com/components/o-ft-typography@1.0.0): Now includes general and article-specific typographic styles. Incompatible with 0.x

###29 Jan 2014

**o-ft-header** [0.5.0 released](http://registry.origami.ft.com/components/o-ft-header@0.5.0): Adds support for injecting content into the header. Backwards compatible with 0.4.x

###24 Jan 2014

**Cuts the mustard**: Add process for performing Cuts the mustard test ([Issue](https://github.com/Financial-Times/ft-origami/issues/86))

**Responsiveness in Sass**: Modules must not include media queries unless full width. Placeholder classes should be used to provide alternative visual styling which product developer can mix in to media queries at product level. ([Issue](https://github.com/Financial-Times/ft-origami/issues/68))

###29 Jan 2014

**o-techdocs** [1.0.0 released](http://registry.origami.ft.com/components/o-techdocs@1.0.0): Css for layout incompatible with 0.x

###21 Jan 2014

**o-grid** [2.0.0 released](http://registry.origami.ft.com/components/o-grid@2.0.0): Changes selector syntax. Completely incompatible with 1.x

###20 Jan 2014

**CORS in web services**: Web services are no longer required to support the `X-FT-Source` header as it interferes with straightforward implementation of CORS.

###17 Jan 2014

**Demos**: Added `demos` property to Origami manifest file, allowing modules to list demos to be displayed in registry ([Issue](https://github.com/Financial-Times/ft-origami/issues/92))

**Cuts the mustard**: Modules to document their requirements using Modernizr test names ([Issue](https://github.com/Financial-Times/ft-origami/issues/86))

**Scope in JS**: Modules must assume no globals exist except those they have defined in `browserFeatures` and those present in ECMAScript 3. ([Issue](https://github.com/Financial-Times/ft-origami/issues/94))

**o-colors**: [2.0.0 released](http://registry.origami.ft.com/components/o-colors@2.0.0): New variable syntax and addition of `oColorsGetColorFor()` mixin

###13 Jan 2014

**Ignores**: README.md must not be ignored in bower.json, otherwise the README cannot be loaded by the registry
