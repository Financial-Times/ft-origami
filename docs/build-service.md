---
layout: default
title: Build service
permalink: /docs/build-service/
---

# Build service

Since Origami components are very granular, product developers may find themselves spending a considerable amount of time concerned with setting up dependency management, and build processes to do things such as minification and concatenation of source files.  The **build service** exists to allow developers to avoid this effort if desired.  This is especially useful for bootstrapping early stage prototypes as well as building hacks, experiments, and adding components to legacy applications.

The service offers high availability, reliability, HTTPS with the same hostname and path, and its own cache layer, so can be used for client-side requests.  It offers three endpoints:

	http://buildservice.ft.com/bundles/[css|js]
	http://buildservice.ft.com/pages
	http://buildservice.ft.com/files

## Resource compiler (/bundles)

The resource compiler operates on the endpoints starting with `/bundles`. It loads a number of specified modules using bower (including all their dependencies), bundles and minifies the result and returns it as an HTTP response.  Individual sub-endpoints serve JS and CSS (see API reference below).

Examples of valid resource compilation requests:

	/bundles/js?modules={module}:{version},{module}:{version}...
	/bundles/js?modules=ads:1.2,tracking:3,cookiewarn:3.3.1
	/bundles/css?modules=velcro:1.7.3,font,grid:3

Product developers should most likely choose to request all JS modules in a single bundle request, and likewise for CSS, and then write them into the `<head>` of their HTML document:

<?prettify linenums=1?>
	<link rel='stylesheet' href='http://buildservice.ft.com/bundles/css?modules=nav:2.3,tweet:1,velcro' />
	<script src='http://buildservice.ft.com/bundles/js?modules=nav:2.3,tweet:1,tracking:3.5,ads:1.2' />

### Dependency conflicts

Where a resource compiler request results in multiple versions of the same module being included, the build service will generate an error page instead of the requested output.  The error page includes information about which modules caused the dependency conflict, and which versions of the depended-upon module are in contention.  For example:

	Cannot complete build: conflicting dependencies exist.

	ft-velcro:
	  - Required at version 1.7 by nav-module
	  - Required at version 1.9 by cookiewarn-module

	ft-base-js:
	  - Required at version 2.7.4 in <querystring>
	  - Required at version ~3.2 by nav-module
	  - Required at version 4.* by signinstatus-module

Dependency conflicts must be resolved by either the product developer requesting a different version of the modules that contain the conflicting dependencies, or by the component developer updating the components to allow a broader range of versions of the dependency.

### Build process

The build service performs the build process by executing these steps in order:

1. Sort the requested modules in alphabetical order and produce a hash of the result to use as a key for this build request
1. Create a new module directory, local to the build service platform
1. If a JS bundle, run `npm install debowerify` in the module root, since debowerify cannot be installed globally)
1. Create a bower.json file, listing all the requested modules as dependencies
1. Run `bower install --json` to install the dependencies and get parseable output.  Stop if there are conflicting dependencies.
1. Create a module_source file in the root of the module, containing a `require()` (for JS) or `@import` (for CSS) statement for each requested module.
1. Run `browserify -t debowerify module_source module_bundle` (for JS) or `node-sass --include-path './bower_components' module_source module_bundle` (for CSS).  Wait for the build to finish.
1. Run the requested minification process, if appropriate
1. Cache the module_bundle file against this build request and discard the temporary module.


## Page wrapper (/pages)

If product developers need a fairly standard set of components in a pretty standard arrangement, or simply don't really care and want to be guided as to what to put on the page, it may be useful to provide a complete, pre-composed page, into which they can simply insert content.  These page templates are git repos, so that changes can be easily tracked - and suggested via pull requests.  This also offers a reference implementation of a complete front end build, and a platform for running functional module tests.

**TODO: To be continued.  Will probably support resolving partials from other repos, and ESIs for including content from web service components**


## File proxy (/files)

This API offers the ability to request, over HTTP, any single file from any known module component.  This is useful to make use of modules that provide static resources such as images, fonts, audio, video or other media, but which the product developer does not want to require using a dependency manager.

The file proxy is also useful when requesting CSS from the build service, because embedded image URLs would be rewritten to go through the proxy, allowing CSS loaded through the resource compiler to still load any included backgrounds.  JavaScript modules might also feasibly include code to load resources from their module, but modules that do this will not be supported by the build service due to the complexity of locating and rewriting paths in JavaScript code.


## Domain sharding

The build service will support a, b, c and d subdomains which will also resolve to the build service, to allow for domain sharding, if the developer requires it (eg `a.buildservice.ft.com`, `b.buildservice.ft.com`).


## Caching and rebuilding

Requested bundles, pages and files will be generated on demand and then cached indefinitely.  Where it's a bundle that includes Semver versions of modules, the build service will check periodically to see if the matching version has changed (the matching version may differ from the version actually used in the current bundle due to multiple modules requesting the same dependency at different semver ranges).  If so, it will re-run the build and swap out the existing cached version for the new one.

If bundles receive no requests at all for a period of two weeks, they'll be deleted.  If requested subsequently, that bundle will need to be rebuilt, so initial requests for it will fail to return any content.  This is not expected to be a problem since it will only affect bundles that have virtually no traffic, and since even search crawlers would keep the bundle alive, it's unlikely that anything with a publicly available URL would be deleted.

The build service consumer *must* cache the output of any build service endpoint using standard HTTP caching rules, respecting the Cache-Control header, including taking advantage of circumstances in which it is permitted to deliver a stale response.

## Availability strategy

The build service will be highly available, and shared-nothing, so each node will be responsible individually for caching its own copy of the build bundles.  Product developers will be expected to prime the build service cache before releasing their product to public traffic, but will not need to prime each node individually.  New build service nodes coming online will take a copy of all existing bundles before being made available to the load balancer.


## API reference

### GET /bundles/js

Fetch a set of modules and build a JavaScript bundle.

<table class='table'>
<tr>
	<th>Param</th>
	<th>Where?</th>
	<th>Description</th>
</tr><tr>
	<td><code>modules</code></td>
	<td>Querystring</td>
	<td>A comma separated list of modules in the form <code>modulename:version</code>.  Modulename may be a full URL (URL-encoded), or just the name of the repository.  Where it is not a URL, the build service will try to find it as a repository from known Git sources.  <code>version</code> is optional - if not present the build service will build the most recent version of the module, if it is present, it will be interpreted using Semver rules and the best matching version will be built.  Using specific commit sha1s is not supported.
</td>
</tr><tr>
	<td><code>minify</code></td>
	<td>Querystring</td>
	<td><em>(Optional)</em> If present, specifies how the build service should minify the built resources.  Options are 'cc-simple' or 'cc-advanced' for <a href='https://developers.google.com/closure/compiler/'>Google closure compiler</a>, or 'none' for no minification.  Default is 'cc-simple'.</td>
</tr><tr>
	<td><code>export</code></td>
	<td>Querystring</td>
	<td><em>(Optional)</em> If present, tells browserify to generate a <a href='https://github.com/umdjs/umd'>UMD</a> bundle for the supplied export name. This bundle works with other module systems and sets the name given as a window global if no module system is found.  This parameter passes the <code>-s</code> option to browserify).</td>
</tr><tr>
	<td><code>debug</code></td>
	<td>Querystring</td>
	<td><em>(Optional)</em> If present and true, the generated bundle will include a module list showing dependency relationships in a JavaScript comment block, preceding the bundle's code.</td>
</tr>
</table>

*Note: Due to the expected long duration of the build process, this method operates asyncronously*

If the requested bundle is already available, a `200 OK` status code will be returned with the bundle in the response body.

If the bundle is not immediately available, but the request is valid, a `202 Accepted` status will be returned, and if not already in progress, the build will commence in the background.  An `X-FT-Build-Status` response header will be included in the response giving the identifier for the build, the date the build started in [RFC1123](http://www.ietf.org/rfc/rfc1123.txt) format, the current status, and an optional progress indication for that stage of the build:

	X-FT-Build-Status: {build_hash}; {build_start_date}; {status} {progress}
	X-FT-Build-Status: 1b1ab000a9b5642f6b8726039f1e79477b57c103; Tue, 15 Nov 2012 08:12:31 GMT; downloading 2/6

If the request was not valid, a `400 Bad Request` is returned, with a plain text explanation in the response body

If the request was valid but the build failed, a `500 Internal Server Error` is returned, with a plain text explanation in the response body.  The most common causes of a 500 error are dependency conflicts or linting errors from closure compiler.


### GET /bundles/css

Fetch a set of modules and build a CSS bundle.

<table class='table'>
<tr>
	<th>Param</th>
	<th>Where</th>
	<th>Description</th>
</tr><tr>
	<td><code>modules</code></td>
	<td>Querystring</td>
	<td>A comma separated list of modules in the form <code>modulename:version</code>.  Modulename may be a full URL (URL-encoded), or just the name of the repository.  Where it is not a URL, the build service will try to find it as a repository from known Git sources.  <code>version</code> is optional - if not present the build service will build the most recent version of the module, if it is present, it will be interpreted using Semver rules and the best matching version will be built.  Using specific commit sha1s is not supported.</td>
</tr><tr>
	<td><code>style</code></td>
	<td>Querystring</td>
	<td><em>(Optional)</em> Determines the use of whitespace in the output.  Options are the same as those available for [Sass's command line style option](http://sass-lang.com/docs/yardoc/file.SASS_REFERENCE.html#output_style).  Defaults to 'compressed'.</td>
</tr><tr>
	<td><code>debug</code></td>
	<td>Querystring</td>
	<td><em>(Optional)</em> If present and true, the generated bundle will include a module list showing dependency relationships in a CSS comment block, preceding the bundle's code.</td>
</tr>
</table>

*Note: Due to the expected long duration of the build process, this method operates asyncronously*

If the requested bundle is already available, a `200 OK` status code will be returned with the bundle in the response body.

If an existing bundle is not available, but the request is valid, a `202 Accepted` status will be returned, and if not already in progress, the bundling will commence in the background.  An `X-FT-Build-Status` response header will be included in the response giving the date the build started in [RFC1123](http://www.ietf.org/rfc/rfc1123.txt) format, the current status, and an optional progress indication for that stage of the build:

	X-FT-Build-Status: {build_hash}; {build_start_date}; {status} {progress}
	X-FT-Build-Status: 1b1ab000a9b5642f6b8726039f1e79477b57c103; Tue, 15 Nov 2012 08:12:31 GMT; downloading 2/6

If the request was not valid, a `400 Bad Request` is returned, with a plain text explanation in the response body

If the request was valid but the build failed, a `500 Internal Server Error` is returned, with a plain text explanation in the response body.  The most common causes of a 500 error are dependency conflicts or compilation errors from Sass.


### GET /page/`template`:`version`

Outputs a complete HTML page with [Mustache](http://mustache.github.io/) template placeholders for product content, and `<script>` and `<link>` tags to pull in a predefined set of resources from the build service.

<table class='table'>
<tr>
	<th>Param</th>
	<th>Where</th>
	<th>Description</th>
</tr><tr>
	<td><code>template</code></td>
	<td>URL</td>
	<td>Name of a git repo containing a template that is to be rendered.  <b>TODO: template syntax?  Allow partials from other repos?</b></td>
</tr><tr>
	<td><code>version</code></td>
	<td>URL</td>
	<td><em>(Optional)</em> Semver compliant version number reference.</td>
</tr>
</table>

**TODO: Define response.**


### GET /files/`module`/`version`/`path`

Loads and returns a file from a module component's repo.

<table class='table'>
<tr>
	<th>Param</th>
	<th>Where</th>
	<th>Description</th>
</tr><tr>
	<td><code>module</code></td>
	<td>URL</td>
	<td>Name of a git repo containing a the file to return</td>
</tr><tr>
	<td><code>version</code></td>
	<td>URL</td>
	<td>Semver compliant version number reference.</td>
</tr><tr>
	<td><code>path</code></td>
	<td>URL</td>
	<td>Path to the file within the repo.</td>
</tr>
</table>

The most recent tagged version of the file that matches the specified Semver version number will be returned.
