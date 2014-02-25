---
layout: default
title: Using the build service
section: Developer guide
permalink: /docs/developer-guide/build-service/
---

# Using the build service

If building modules sounds like a lot of work, you can let someone else do it for you and use our **build service**, which performs all the build steps listed above on a central build server and then serves your requested bundles directly to your user's browser.

This is especially useful for bootstrapping early stage prototypes as well as building hacks, experiments, and adding components to legacy applications.  The service offers high availability, reliability, HTTPS with the same hostname and path, and its own cache layer, so can be used for client-side requests.  It offers the following endpoints:

	http://build.origami.ft.com/bundles/[css|js]
	http://build.origami.ft.com/files
	http://build.origami.ft.com/modules

## Resource compiler (/bundles)

The resource compiler operates on the endpoints starting with `/bundles`. It packages the specified modules (including all their dependencies), bundles and minifies the result and returns it as an HTTP response.  Individual sub-endpoints serve JS and CSS.

Examples of valid resource compilation requests:

	/bundles/js?modules={module}@{version},{module}@{version}...
	/bundles/js?modules=o-ads@1.2,o-tracking@3,o-cookiewarn@3.3.1
	/bundles/css?modules=o-signinstatus@1.7.3,o-fonts,o-grid@3

You should most likely request all the JS modules you want in a single bundle request, and likewise for CSS, and then write them into the `<head>` or end of the `<body>` of your HTML document:

<?prettify linenums=1?>
	<link rel='stylesheet' href='http://build.origami.ft.com/bundles/css?modules=o-ft-nav@2.3,o-tweet@1,colors' />
	<script src='http://build.origami.ft.com/bundles/js?modules=o-ft-nav@2.3,o-tweet@1,o-tracking@3.5,o-ads@1.2' />

### Dependency conflicts

Where a resource compiler request results in multiple versions of the same module being included, the build service will generate an error page (if error output is enabled) instead of the requested output.  The error page includes information about which modules caused the dependency conflict, and which versions of the depended-upon module are in contention.  For example (exact format to be determined):

	Cannot complete build: conflicting dependencies exist.

	o-colors:
	  - Required at version 1.7 by o-nav
	  - Required at version 1.9 by o-cookiewarn

	o-typography:
	  - Required at version 2.7.4 in MASTER-BUNDLE
	  - Required at version ~3.2 by o-nav
	  - Required at version 4.* by o-signinstatus

Note that some dependencies are required by the explicit module list sent to the build server (referred to above as MASTER-BUNDLE) while others are dependencies of those modules.

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


## File proxy (/files)

This API offers the ability to request, over HTTP, any single file from any known module component.  This is useful to make use of modules that provide static resources such as images, fonts, audio, video or other media, without having to install them.

The file proxy is also used by the resource compiler when creating bundles of JS or CSS that load external resources on demand.  This allows CSS loaded through the resource compiler to still load any included backgrounds, and JavaScript modules may make AJAX requests to load static resources from their repos.


## Caching and rebuilding

Requested bundles and files are generated on demand and then cached indefinitely.  Where it's a bundle that includes Semver versions of modules, the build service checks periodically to see if the matching version has changed (the matching version may differ from the version actually used in the current bundle due to multiple modules requesting the same dependency at different semver ranges).  If so, it will re-run the build and swap out the existing cached version for the new one.

If bundles receive no requests at all for a period of two weeks, they'll be deleted.  If requested subsequently, that bundle will need to be rebuilt, so initial requests for it will fail to return any content.  This is not expected to be a problem since it will only affect bundles that have virtually no traffic, and since even search crawlers would keep the bundle alive, it's unlikely that anything with a publicly available URL would be deleted.

If you are loading build service URLs from the server side, you *must* fully respect [cache control](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.9) directives emitted by the build service.

## Availability strategy

The build service is highly available, and shared-nothing, so each node is responsible individually for caching its own copy of the built bundles.  A load balancing strategy is implemented in front of build service nodes which follows this workflow:

1. Send request to a random node that has not yet been tried for this request.
2. If response has a `200`, `3xx` or `4xx` status, send the response back to the client and stop.
3. If there are any other nodes available that have not been tried yet, go back to step 1.
4. If the request contains a `sync=1` parameter, send the latest response back to the client and stop.
5. Add a sync=1 parameter to the request and go back to step 1.

## Concurrency

The build service is capable of running more than one build at the same time, but will not concurrently run more than one identical build.  The second and subsequent requests for the same resource received while the first is building will not cause a second build to be started, but will simply receive a `202` response (if async) or block waiting for the original build to finish (if sync).


## API reference

### GET /bundles/js

Fetch a set of modules and build a JavaScript bundle.

<table class='o-techdocs-table'>
<tr>
	<th>Param</th>
	<th>Where?</th>
	<th>Description</th>
</tr><tr>
	<td><code>modules</code></td>
	<td>Querystring</td>
	<td>A comma separated list of modules in the form <code>modulename@version</code>.  Modulename may be a full URL (URL-encoded), or just the name of the repository.  Where it is not a URL, the build service will try to find it as a repository from known Git sources.  <code>version</code> is optional - if not present the build service will build the most recent version of the module, if it is present, it will be interpreted using Semver rules and the best matching version will be built.  Using specific commit sha1s is not supported.
</td>
</tr><tr>
	<td><code>minify</code></td>
	<td>Querystring</td>
	<td><em>(Optional)</em> If present, specifies how the build service should minify the built resources.  Options are 'cc-simple' for <a href='https://developers.google.com/closure/compiler/'>Google closure compiler</a> simple optimisations, or 'none' for no minification.  Default is 'cc-simple'.  Closure compiler advanced optimisations are not available since the module code would need to be compatible with it, and this is unlikely to be the case for all modules.</td>
</tr><tr>
	<td><code>export</code></td>
	<td>Querystring</td>
	<td><em>(Optional)</em> If present, tells browserify to generate a <a href='https://github.com/umdjs/umd'>UMD</a> bundle for the supplied export name. UMD works with other module systems and if no module system is found sets the specified name as a window global (this parameter passes the <code>-s</code> option to browserify).</td>
</tr><tr>
	<td><code>debug</code></td>
	<td>Querystring</td>
	<td><em>(Optional)</em> If present and true, the successfully generated bundle will include a module list showing dependency relationships in a JavaScript comment block, preceding the bundle's code.</td>
</tr><tr>
	<td><code>sync</code></td>
	<td>Querystring</td>
	<td><em>(Optional)</em> If present and true, and there is no cached version of the build available, the build will be performed syncronously and the HTTP connection will be held open until the finished bundle is ready.  These requests will never receive a <code>202</code> response.</td>
</tr><tr>
	<td><code>newerthan</code></td>
	<td>Querystring</td>
	<td><em>(Optional)</em> If present and set to a valid <a href='http://en.wikipedia.org/wiki/ISO_8601'>ISO 8601</a> date in the past, the build service will not consider any cached copies of the build which are older than the date given, and if necessary will therefore begin a new build as if there were no build cached.</td>
</tr>
</table>

*Note: Due to the expected long duration of the build process, this method operates asyncronously*

If the requested bundle is already available, a `200 OK` status code will be returned with the bundle in the response body.

If an existing bundle is not available, but the request is valid, a `202 Accepted` status will be returned, and if not already in progress, the building and bundling will commence in the background (except where the `sync` parameter has been set).

All `2xx` responses will include an `X-FT-Build-Info` response header, giving the build hash, the date the build started in [RFC1123](http://www.ietf.org/rfc/rfc1123.txt) format, the hostname of the build server, and the current status (one of 'downloading', 'building', 'minifying', 'cached'):

	X-FT-Build-Info: {build_hash}; {build_start_date}; {build_server}; {status}
	X-FT-Build-Info: 1b1ab000a9b5642f6b8726039f1e79477b57c103; Tue, 15 Nov 2012 08:12:31 GMT; prod04-build02-uk1; cached

If the request was not valid, a `400 Bad Request` is returned, with a plain text explanation in the response body, wrapped in JavaScript comment syntax.

If the request was valid but the build failed, a `500 Internal Server Error` is returned, with a plain text explanation in the response body.  The most common causes of a 500 error are dependency conflicts or linting errors from closure compiler.  The build will also fail if the resulting bundle exceeds 5MB in size.


### GET /bundles/css

Fetch a set of modules and build a CSS bundle.

<table class='o-techdocs-table'>
<tr>
	<th>Param</th>
	<th>Where</th>
	<th>Description</th>
</tr><tr>
	<td><code>modules</code></td>
	<td>Querystring</td>
	<td>A comma separated list of modules in the form <code>modulename@version</code>.  Modulename may be a full URL (URL-encoded), or just the name of the repository.  Where it is not a URL, the build service will try to find it as a repository from known Git sources.  <code>version</code> is optional - if not present the build service will build the most recent version of the module, if it is present, it will be interpreted using Semver rules and the best matching version will be built.  Using specific commit sha1s is not supported.</td>
</tr><tr>
	<td><code>style</code></td>
	<td>Querystring</td>
	<td><em>(Optional)</em> Determines the use of whitespace in the output.  Options are the same as those available for <a href='http://sass-lang.com/docs/yardoc/file.SASS_REFERENCE.html#output_style'>Sass's command line style option</a>.  Defaults to 'compressed'.</td>
</tr><tr>
	<td><code>debug</code></td>
	<td>Querystring</td>
	<td><em>(Optional)</em> If present and true, the successfully generated bundle will include the ID of the build, and a module list showing dependency relationships in a CSS comment block, preceding the bundle's code.</td>
</tr><tr>
	<td><code>sync</code></td>
	<td>Querystring</td>
	<td><em>(Optional)</em> If present and true, and there is no cached version of the build available, the build will be performed syncronously and the HTTP connection will be held open until the finished bundle is ready.  These requests will never receive a <code>202</code> response.</td>
</tr><tr>
	<td><code>newerthan</code></td>
	<td>Querystring</td>
	<td><em>(Optional)</em> If present and set to a valid <a href='http://en.wikipedia.org/wiki/ISO_8601'>ISO 8601</a> date in the past, the build service will not consider any cached copies of the build which are older than the date given, and if necessary will therefore begin a new build as if there were no build cached.</td>
</tr>
</table>

*Note: Due to the expected long duration of the build process, this method operates asyncronously*

If the requested bundle is already available, a `200 OK` status code will be returned with the bundle in the response body.

If an existing bundle is not available, but the request is valid, a `202 Accepted` status will be returned, and if not already in progress, the building and bundling will commence in the background (except where the `sync` parameter has been set).

All `2xx` responses will include an `X-FT-Build-Info` response header, giving the build hash, the date the build started in [RFC1123](http://www.ietf.org/rfc/rfc1123.txt) format, the hostname of the build server, and the current status (one of 'downloading', 'building', 'minifying', 'cached'):

	X-FT-Build-Info: {build_hash}; {build_start_date}; {build_server}; {status}
	X-FT-Build-Info: 1b1ab000a9b5642f6b8726039f1e79477b57c103; Tue, 15 Nov 2012 08:12:31 GMT; prod04-build02-uk1; cached

If the request was not valid, a `400 Bad Request` is returned, with a plain text explanation in the response body, wrapped in CSS comment syntax.

If the request was valid but the build failed, a `500 Internal Server Error` is returned, with a plain text explanation in the response body.  The most common causes of a 500 error are dependency conflicts or compilation errors from Sass.  The build must also fail if the resulting bundle exceeds 5MB in size.


### GET /files/`module`@`version`/`path`

Loads and returns a file from a module component's repo.

<table class='o-techdocs-table'>
<tr>
	<th>Param</th>
	<th>Where</th>
	<th>Description</th>
</tr><tr>
	<td><code>module</code></td>
	<td>URL</td>
	<td>Name of a git repo containing a the file to return.</td>
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

The most recent tagged version of the file that matches the specified Semver version number will be returned, subject to a maximum file size of 5MB.


### GET /modules/`module`@`version`

Returns information in JSON format describing the module.

<table class='o-techdocs-table'>
<tr>
	<th>Property</th>
	<th>Type</th>
	<th>Description</th>
</tr><tr>
	<td><code>bowerEndpoint</code></td>
	<td>String</td>
	<td>Name or URL of the package with an optional version number. It's in a format accepted by the <code>bower install</code> command.</td>
</tr><tr>
	<td><code>bowerManifest</code></td>
	<td>Object</td>
	<td>Content of the <a href="https://github.com/bower/bower#defining-a-package"><code>.bower.json</code></a> file that's created by the <code>bower install</code> command. It contains the exact version of the package and its dependencies.</td>
</tr><tr>
	<td><code>origamiManifest</code></td>
	<td>Object</td>
	<td>Content of the <a href="/ft-origami/docs/syntax/origamijson/"><code>origami.json</code></a> file if it was found in the package.</td>
</tr><tr>
	<td><code>build</code></td>
	<td>Object</td>
	<td>Results of build tasks performed on the package. All properties in this object are optional. Each property in this object contains an object with a <code>valid</code> and an optional <code>error</code> properties.</td>
</tr><tr>
	<td><code>build.bundler.valid</code></td>
	<td>Boolean</td>
	<td><code>true</code> if the package could be fetched and installed by the build service.</td>
</tr><tr>
	<td><code>build.bundler.error</code></td>
	<td>String</td>
	<td>Message describing installation failure, if any.</td>
</tr><tr>
	<td><code>build.origami.valid</code></td>
	<td>Boolean</td>
	<td><code>true</code> if this is an Origami module and no conformance errors were found.</td>
</tr><tr>
	<td><code>build.origami.error</code></td>
	<td>String</td>
	<td>Message describing the conformance error, if any.</td>
</tr><tr>
	<td><code>build.css.valid</code></td>
	<td>Boolean</td>
	<td><code>true</code> if CSS and SASS files in the package compiled successfully.</td>
</tr><tr>
	<td><code>build.css.error</code></td>
	<td>String</td>
	<td>SASS compilation error message, if any.</td>
</tr><tr>
	<td><code>build.js.valid</code></td>
	<td>Boolean</td>
	<td><code>true</code> if JS was concatenated and minified without problems.</td>
</tr><tr>
	<td><code>build.js.error</code></td>
	<td>String</td>
	<td>JS compilation error message, if any.</td>
</tr>
</table>
