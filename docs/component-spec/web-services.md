---
layout: default
title: Web services
section: Component spec
permalink: /docs/component-spec/web-services/
site_section: about-origami
---

# Web services

A **web service** component is offered as a URL endpoint that delivers content or data services. Web service components are available as raw source in git, but are not intended to be cloned or run by product developers unless they want to for testing. The component is the hosted service, rather than the application that runs it. Examples of good use cases for web services are:

  * [Serving optimised images](https://www.ft.com/__origami/service/image)
  * [Serving JS/CSS bundles of Origami components](https://www.ft.com/__origami/service/build)
  * [Providing standard navigation data](https://www.ft.com/__origami/service/navigation)


## Naming conventions

Origami web services follow strict naming conventions. We name all of our services in the pattern `Origami <name> Service`, e.g. Origami Build Service, Origami Image Service.

A slugified name will be used elsewhere. This is a lower case, hyphenated version of the name, e.g. origami-build-service, origami-image-service.

The slugified name *must* be used as the system code for the application.

Note: there may be exceptions to this naming structure in circumstances where "Service" doesn't effectively describe what the application does, e.g. with Origami Bower Registry. If you think that a different name might be required then discuss with the team.

### Repositories

The associated Git repository *must* be named with the slugified version of the web service name.

### Heroku applications

Heroku applications for a web service *must* be named with the slugified version of the web service name.

This *must* be suffixed with an environment identifier for non-production applications, and a region identifier for production applications. E.g. origami-build-service-qa, origami-build-service-eu.

### URLs

Origami web services *should* exist on a path under `ft.com` if users would benefit from HTTP2 in this case. If this is not possible for some reason then a subdomain *must* be used.

When using a path, it *should* be `/__origami/service/<short-name>`. The short name in this case is the slugified service name with `origami-` and `-service` removed, E.g. `/__origami/service/build`.

When using a subdomain, it *should* be `<short-name>.ft.com`. The short name in this case is the slugified service name with `-service` removed, E.g. `origami-build.ft.com`.

### Examples

<table class="o-techdocs-table">
	<tr>
		<th>Service name</th>
		<th>Repository</th>
		<th>Heroku app</th>
		<th>URL</th>
	</tr>
	<tr>
		<td>Origami Tweet Service</td>
		<td>origami-tweet-service</td>
		<td>origami-tweet-service-eu</td>
		<td><code>www.ft.com/__origami/service/tweet</code> or <code>origami-tweet.ft.com</code></td>
	</tr>
	<tr>
		<td>Origami Most Popular Service</td>
		<td>origami-most-popular-service</td>
		<td>origami-most-popular-service-eu</td>
		<td><code>www.ft.com/__origami/service/most-popular</code> or <code>origami-most-popular.ft.com</code></td>
	</tr>
</table>

<!--__ weird comment needed to fix markdown formatting -->


## Requirements

Many of the requirements below can be met by using Node.js and the [Origami Service module](https://github.com/Financial-Times/origami-service). We recommend this as a starting point.

### Web services *must*

  * Follow the [engineering checklist](https://docs.google.com/document/d/1NbgQwJKUhSJBVMWw8OVVrKyKwRieaXq7AOtioC69XKM/edit)

  * Provide the FT standard meta endpoints:

    * `/__about` ([standard](https://docs.google.com/document/d/1B80a0nAI8L1cuIlSEai4Zuztq7Lef0ytxJYNFCjG7Ko/edit))
    * `/__gtg` ([standard](https://docs.google.com/document/d/11paOrAIl9eIOqUEERc9XMaaL3zouJDdkmb-gExYFnw0/edit))
    * `/__health` ([standard](https://docs.google.com/document/d/18hefJjImF5IFp9WvPAm9Iq5_GmWzI9ahlKSzShpQl1s/edit))

  * Include a mandatory version number element to the API path for all API endpoints. This *must not* expose minor version changes and *must* be prefixed with a `v`. E.g.

    * `www.ft.com/__origami/service/tweet/v1/<endpoint>`
    * `www.ft.com/__origami/service/most-popular/v2/<endpoint>`
    * `www.ft.com/__origami/service/jobs/v3/<endpoint>`

    The only exception to this rule is when the service is replicating a third-party API. E.g. a Bower registry

  * Meet the [standard for HTML]({{site.baseurl}}/docs/syntax/html) where relevant

  * Require requests to API endpoints to contain an identification string set by the requesting application, in a `source` query string parameter. If the query parameter is missing, *must* return a `400 Bad Request` response status code. Requests to non-API endpoints such as the root path or `/__about` *should not* require the source parameter.

    If you are using Node.js to build the service, then we provide [Express middleware to check source parameters](https://github.com/Financial-Times/source-param-middleware).

  * When an error occurs that prevents the service from returning the output requested, the HTTP response code *must* be in the `5xx` or `4xx` range

  * Include an explicit `Cache-Control` header in all HTTP responses that have a `2xx` or `3xx` status

  * Serve content on the bare versioned endpoints (e.g. `/v1/`) that documents the service or links to documentation under a `docs` path (e.g. `/v1/docs/`). Documentation content thus served *should* use the `o-techdocs` module for formatting and layout

  * Redirect the root path `/` to the documentation endpoint for the latest API version

  * When a [non-backwards compatible change](#changes-and-versioning) is made to any output of the service, you *must*:

    * provide a new set of API endpoints with updated version number
    * continue to support previous versions for a minimum of 6 months
    * communicate the deprecation of the previous version to the service consumers and the wider business

  * When a prior version is to be terminated, you *must*:
    * give at least 6 months notice via an email notification to the service consumers and the wider business
    * review the top referring applications identified by the `source` parameter and proactively notify their owners
    * following the expiry of the termination date, and for ever more, the service *should* return either a `410 Gone`, a static copy of the last content to be generated, or redirect to the new version if the API is compatible

### Web services *should*

  * Be used for components that produce dynamic editorial content or data that is not practical to store statically in a module component (usually because it changes too frequently or there are too many possible permutations)

  * Serve permissive CORS response headers to allow the endpoints to be consumed in-browser from any origin (though consuming in-browser is discouraged). If CORS is supported, the service *must* support all potential pre-flight requests that would be required in the case of requests for HTTP methods other than GET

  * Use the querystring parameter `callback` if JSONP is supported. JSONP support is, however, not required

  * Be RESTful, ie. should use the most appropriate HTTP verb and URLs that semantically describe the resource to be acted upon

  * Emit metrics to the FT graphite service. See [Metrics](#metrics).

  * Use the [Origami Service module](https://github.com/Financial-Times/origami-service) if the service is built with Node.js

### Changes and versioning

A "backwards compatible change" is defined as one that, in the case of JSON output, adds a new property to an object, or adds or removes elements from an array. Any changes that remove existing properties of objects, or change the type of a value, are breaking. In the case of HTML output, any change that requires accompanying changes in a module component (CSS, JavaScript or other resources that act on the HTML) is breaking.

In the case of breaking changes, a service *must* maintain the existing functionality and release a new version.

When a new version of a web service is released, the service developer *may* choose to implement this by running multiple versions of the service behind a routing layer, such that `/v1/someendpoint` and `/v2/someendpoint` ultimately result in the same `/someendpoint` request being made to one or other of two separate instances of the web service. This is acknowledged as a valid approach, but other web service developers *may* simply wish to run one instance of the web service that can handle all versioned endpoints. This spec does not care about the internal architecture choices that the web service developer makes provided that the external interface satisfies the requirements set out above.

### De-duplication of output

Web service components *should not* offer any de-duplication of content. If a product developer wants to draw from multiple Origami sources, and de-dupe where the same individual content item may appear from more than one of those sources, that's not a problem that Origami will solve for them, but could be solved at the product level by consuming data rather than markup.


## Metrics

Web service components *should* emit metrics over TCP using the [Carbon plaintext protocol](http://graphite.readthedocs.org/en/latest/feeding-carbon.html), to the FT Graphite service. All metrics *must* conform to the [metrics naming conventions]({{site.baseurl}}/docs/syntax/metrics).

Web services *should* send metrics no more frequently than every 5 seconds, and should consult the monitoring team before sending more than 100,000 data points per hour.

Metrics are provided by default with the [Origami Service module](https://github.com/Financial-Times/origami-service).


## Example

The following HTTP request-response is compliant with the above requirements and the [syntax requirements]({{site.baseurl}}/docs/syntax-requirements) for the response body:

	GET /v1/navigation.html?level=first&selectedUrl=http%3A%2F%2Fwww.ft.com%2Fcompanies HTTP/1.1
	User-Agent: curl/7.24.0 (x86_64-apple-darwin12.0) libcurl/7.24.0 OpenSSL/0.9.8x zlib/1.2.5
	Host: nav.modules.ft.com
	Accept: text/html
	X-FT-Source: Example application

	HTTP/1.1 200 OK
	Server: Apache
	Sat, 03 Aug 2013 16:45:35 GMT
	Content-Type: text/html; charset=utf-8
	Cache-Control: public, max-age=60
	Last-Modified: Fri, 02 Aug 2013 16:58:42 GMT
	Content-Length: 2104
	Access-Control-Allow-Credentials: true
	Access-Control-Allow-Origin: *

	<nav class="o-nav" data-o-component="o-nav">
	<ol>
	<li data-o-track-pos="0"><a href="http://www.ft.com">Home</a></li>
	<li data-o-track-pos="1"><a href="http://www.ft.com/world/uk">UK</a></li>
	<li data-o-track-pos="2"><a href="http://www.ft.com/world">World</a></li>
	<li class="selected" data-o-track-pos="3"><a href="http://www.ft.com/companies">Companies</a>
	  <ol class="second-level">
	    <li class="has-third-level">
	      <a href="http://www.ft.com/companies/energy">Energy</a>
	      <ol class="third-level">
	        <li class="title"><a href="http://www.ft.com/companies/energy">Energy<span class="arrow">&#8250;</span></a></li>
	        <li><a href="http://www.ft.com/companies/oilandgas">Oil & Gas</a></li>
	        <li><a href="http://www.ft.com/companies/mining">Mining</a></li>
	      </ol>
	    </li>
	    <li><a href="http://www.ft.com/financials">Financials</a></li>
	    <li><a href="http://www.ft.com/companies/health">Health</a></li>
	    <li><a href="http://www.ft.com/intl/companies/industrials">Industrials</a></li>
	    <li><a href="www.ft.com/intl/companies/luxury-360">Luxury 360</a></li>
	    <li><a href="">Media</a></li>
	    <li><a href="">Retail & Consumer</a></li>
	    <li><a href="">Tech</a></li>
	    <li><a href="">Telecoms</a></li>
	    <li><a href="">Transport</a></li>
	    <li><a href="">By Region</a></li>
	    <li class="rss"><a href="http://www.ft.com/rss/companies"><img src="http://navigation-module.herokuapp.com/navigation/ft/img/rss-icon.gif" width="14" height="14" alt="RSS"></a></li>
	  </ol>
	</li>
	<li data-o-track-pos="4"><a href="http://www.ft.com/markets">Markets</a></li>
	<li data-o-track-pos="5"><a href="http://www.ft.com/global-economy">Global Economy</a></li>
	<li data-o-track-pos="6"><a href="http://www.ft.com/lex">Lex</a></li>
	<li data-o-track-pos="7"><a href="http://www.ft.com/comment">Comment</a></li>
	<li data-o-track-pos="8"><a href="http://www.ft.com/management">Management</a></li>
	<li data-o-track-pos="9"><a href="http://www.ft.com/personal-finance">Personal Finance</a></li>
	<li data-o-track-pos="10"><a href="http://www.ft.com/life-arts">Life & Arts</a></li>
	</ol>
	</nav>
