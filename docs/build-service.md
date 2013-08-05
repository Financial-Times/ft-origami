---
layout: default
title: Build service
permalink: /docs/build-service/
---

# Build service

Since Origami components are very granular, product developers may find themselves spending a considerable amount of time concerned with setting up dependency management, and build processes to do things such as minification and concatenation of source files.  The **build service** exists to allow developers to avoid this effort where desired.  This is especially useful for bootstrapping early stage prototypes as well as building hacks, experiments, and adding components to legacy applications.

The service offers high availability, reliability, and its own cache layer, so can be used for client-side requests.  It offers three main endpoints:

	http://buildservice.ft.com/bundle/[css|js|html]
	http://buildservice.ft.com/page
	http://buildservice.ft.com/files

## Resource compiler

The resource compiler operates on the `/bundle` endpoint, loads a number of specified modules using npm or sass, fetches all their dependencies, bundles and minifies the result and returns it as an HTTP response.  Individual sub-endpoints serve JS, CSS and HTML.

Product developers should most likely choose to request all JS modules in a single bundle request, and likewise for CSS, but request each HTML module separately, so as to be able to place it at the right point in the page output.

Examples of valid resource compilation requests:

	/bundle/js?modules={module}:{version},{module}:{version}...
	/bundle/js?modules=ads:1.2,analytics:3,cookiewarn:3.3.1
	/bundle/css?modules=velcro:1.7.3,font,grid:3
	/bundle/html?modules=nav:~2.2.2

### Parameters

The resource compiler accepts the following query parameters, via either GET or POST:

<table>
<tr>
	<th>Param name</th>
	<th>Description</th>
</tr><tr>
	<td><code>modules</code></td>
	<td>A comma separated list of modules in the form <code>modulename:version</code>.  Modulename may be a full URL (URL-encoded), or just the name of the repository.  Where it is not a URL, the build service will try to find it as a repository from known Git sources.  <code>version</code> is optional - if not present the build service will build the most recent version of the module, if it is present, it will be interpreted using Semver rules and the best matching version will be built.</td>
</tr><tr>
	<td><code>minify</code></td>
	<td><em>(Optional)</em> If present, specifies how the build service should minify the built resources.  Options are 'cc-simple' for Google closure compiler with simple optimisations, or 'none' for no minification.  Default is 'cc-simple' for JavaScript bundles.</td>
</tr><tr>
	<td><code>overrideconflicts</code></td>
	<td><em>(Optional)</em> If not present, all dependency conflicts will cause build to fail.  If set to 'explicit', conflicts between a module explictly requested in the modules list and one that is a subdependency of a listed module will be resolved automatically in favour of the explictly requested version.  If set to 'new' or 'old', all conflicts will be resovled in favour of the newest or oldest version, respectively.</td>
</tr>
</table>


### Dependency conflicts

Where a resource compiler request results in multiple versions of the same module being included, the build service will generate an error page instead of the requested output.  The error page includes information about which modules caused the dependency conflict, and which versions of the depended-upon module are in contention.  For example:

	Cannot complete build: conflicting dependencies exist:

	ft-velcro:
	  - Required at version 1.7 by ft-navigation
	  - Required at version 1.9 by ft-cookie-notice

	ft-base-js:
	  - Required at version 2.7.4 in module list
	  - Required at version ~3.2 by ft-navigation
	  - Required at version 4.* by ft-signin-status

See Parameters section for the `overrideconflicts` parameter which can be used to resolve conflicts.


## Page wrapper

Outputs a complete HTML page with template placeholders for third party content, and `<script>` and `<link>` tags to pull in a predefined set of resources from the build service.  Configurable with either a specific site name if a wrapper has been built for a specific application, or various arguments to adjust the behaviour of a generic implementation.  The page templates would be git repos, so that changes can be easily tracked - and suggested via pull requests.  This also offers a reference implementation of a complete front end build, and a platform for running functional module tests.

	/page?id=apps_ft_com:2.5.5
	/page:2.5.5?withAds=1&cols=2&...


## File proxy

Outputs files from a module.  When requesting CSS from the build service, embedded image URLs would be rewritten to go through the build service.  JavaScript might also feasibly include code to load resources from the module, but modules that do this will not be supported by the build service due to the complexity of rewriting paths in JavaScript code.

	http://buildservice.ft.com/files/{module}/{version}/{path}?{params}
	http://buildservice.ft.com/image/nav/images/ft/opentriangle.jpg

The build service will support unlimited subdomains which will also resolve to the build service, to allow for domain sharding, if the developer requires it (eg a.buildservice.ft.com, b.buildservice.ft.com).  Output from the build service, where possible (and requested via a parameter) will include debug information to let the developer know how their request was processed and the output from the build.

Where the build service accepts module version numbers as inputs, the version numbers are expected to be tags on the module's git repo.  If a version number is not specified, the build service will use the most recent tag that conforms to a semver pattern.  Using specific commit sha1s will not initially be supported but could be in future.
