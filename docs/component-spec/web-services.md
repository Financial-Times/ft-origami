---
layout: default
title: Web services
section: Component spec
permalink: /docs/component-spec/web-services/
---

# Web service components

A **web service** component is offered as a URL endpoint that delivers content or data services.  Content fragments can be included in projects either on demand on a request by request basis (using [ESI](http://en.wikipedia.org/wiki/Edge_Side_Includes) or similar technology), or by downloading the content on a regular schedule and pushing it into a local cache.  Other web services may act as data collectors (for analytics) or do almost anything else.  Web service components are available as raw source in git, but are not intended to be cloned or run by product developers unless they want to for testing.  The component is the hosted service, rather than the application that runs it.  Examples of good use cases for web services are:

* FT Main navigation
* Most read / shared / commented
* Jobs from exec-appointments
* Fetching individual tweets from twitter
* Collecting analytics

## Naming conventions

Web services source code repositories *must* be named using a short descriptive term (hypenated when appropriate), suffixed with `-service`.  The service hostname should drop the suffix.  Examples:

<table class='o-techdocs-table'>
<tr><th>Repo name</th><th>Host name</th></tr>
<tr><td>tweet-service</td><td>tweet.webservices.ft.com</td></tr>
<tr><td>nav-service</td><td>nav.webservices.ft.com</td></tr>
<tr><td>mostpopular-service</td><td>mostpopular.webservices.ft.com</td></tr>
</table>

## API host

Web services *must* expose an HTTP endpoint on the hostname `{componentname}.webservices.ft.com`, which conforms to the requirements included below.

## Requirements

* *Must* contain a valid [Origami manifest file]({{site.baseurl}}/docs/syntax/origamijson)
* *Should* be used for components that produce dynamic editorial content or data that is not practical to store statically in a module component (usually because it changes too frequently or there are too many possible permutations).
* *Should not* output any executable code (use module components for that)
* *Must* include a mandatory version number element to the API path for all API endpoints
* Minor version changes in the web service application *must not* be exposed on the version number included in the API endpoint URL
* *Should* support both HTML and JSON output (see below for details)
* When returning HTML, *must* meet the [standard for HTML]({{site.baseurl}}/docs/syntax/html)
* *Must* require requests to API endpoints to contain an identification string set by the requesting application, either in a `source` query string parameter or an `X-FT-Source` HTTP header.  Must support both.  If neither is present, must return a `400 Bad Request` response status code.  Requests to non-API endpoints such as the root path, /__about or /__metrics *should not* require the source parameter.
* *Must* provide monitoring endpoints and data conforming to the [FT Health page standard](https://docs.google.com/a/ft.com/document/d/18hefJjImF5IFp9WvPAm9Iq5_GmWzI9ahlKSzShpQl1s/edit)
* When an error occurs that prevents the service returning the output requested, the HTTP response code *must* be in the 5xx or 4xx range, and the response *must* have an empty content body unless debug information has been requested via a query string parameter.  The web service *should* implement such a parameter.  If it does, the parameter *must* be called `showerrors`, and the presence of this parameter *must* always turn on visible errors unless it has a value which is set to 0.
* *Should* support JSONp callback, and if it does, it *must* do so using the querystring parameter `callback` (when returning HTML with a JSON callback, the HTML string *must* be escaped and quoted)
* *Should* be RESTful, ie. should use the most appropriate HTTP verb and URLs that semantically describe the resource to be acted upon
* *Should* draw templates from a module component where practical (to allow product developers to consume them and do the templating themselves), and if it does, those templates *must* be Mustache format.  Conversely, templates built into the web service may be of any format.
* *May* accept any querystring parameters, POST data, URL parameters or other input as desired to allow for service specific features (this may include accepting input and then simply reformatting it and including it in the output, but component developers *should* avoid doing this in services whose output also draws from other content sources).
* *Should* serve permissive CORS response headers to allow the endpoints to be consumed in-browser from any origin (though consuming in-browser is discouraged)
* *Must* include an explicit `Cache-Control` header in all HTTP responses that have a 2xx or 3xx response status
* *Must* serve content on the bare versioned endpoints (eg `/v1/`) that documents the API methods available.  Documentation content thus served *should* use the `o-techdocs` module for formatting and layout.
* *Must* redirect the root path `/` to the documentation endpoint for the latest API version
* *Must* provide a mechanism for developers to subscribe to email notifications of version deprecation (which *should* be a github watcher list, if available).
* When a [non-backwards compatible change](#changes-and-versioning) is made to any output of the service:
	* the service *must* provide a new set of API endpoints with updated version number; and
	* the service *must* continue to support previous versions for a minimum of 3 months; and
	* the developer *must* begin work to agree a termination date for the previous version with its consumers and the wider business.
* When a prior version is to be terminated,
	* the developer *must* give at least 3 months notice via an email notification to the notification list; and
	* the service *must* include an `X-Service-Termination-Date:` header in all HTTP responses on that version's API endpoints, using an RFC1123 format date; and
	* following the expiry of the termination date, and for ever more, the service *should* return either a `410 Gone` or a static copy of the last content to be generated.

### Output formats

Some web services provide data to include in a website (eg a tweet service), while others may output little more than an acknowledgement (eg an analytics collector).  Where a web service's output is intended to be content for inclusion in a web page, it *should* be offered as both HTML and JSON.

### Changes and versioning

A "backwards compatible change" is defined as one that, in the case of JSON output, adds a new property to an object, or adds or removes elements from an array.  Any changes that remove existing properties of objects, or change the type of a value, are breaking.  In the case of HTML output, any change that requires accompanying changes in a module component (CSS, JavaScript or other resources that act on the HTML) is breaking.

In the case of breaking changes, a service *must* maintain the existing functionality and release a new version.

When a new version of a web service is released, the service developer *may* choose to implement this by running multiple versions of the service behind a routing layer, such that `/v1/someendpoint` and `/v2/someendpoint` ultimately result in the same `/someendpoint` request being made to one or other of two separate instances of the web service.  This is acknowledged as a valid approach, but other web service developers *may* simply wish to run one instance of the web service that can handle all versioned endpoints.  This spec does not care about the internal architecture choices that the web service developer makes provided that the external interface satisifes the requirements set out above.

### Environments

A web service component developer *must* make available a live instance of their service (which *should* be at `{componentname}.webservices.ft.com`), the source code (in a git repo), and instructions for building and running the service.

If the web service uses a data source or other depended-upon service for which multiple environments are available, the service *must* support switching between them at startup (either using a command line flag, or a config file, but either way it must be included in the documentation)

The product developer *must* use the current live version of the component for testing integration with their product, not an upcoming release or a test or dev environment of the service.  The service component developer is not required to (and is encouraged not to) maintain and make available any running instance of the service other than the live one.

Instructing a service to use a different (eg. test) data source *must not* be coupled in any way to using a different version of the service itself.

### Required endpoints

Web services *must* implement the following endpoints, for each version of the application, as well as at the root of the service host (except for `/__about` - see below). The root variant *may* redirect to the latest version variant, or *may* simply produce the same output as the latest version variant.  It is also OK to output the same data for all version variants if the data has not changed between versions.

<table class='o-techdocs-table'>
<tr><td><code>/</code></td><td>Description of the service and instructions for use, designed for human consumption.  This <em>should</em> be HTML, and <em>may</em> choose to use the standard Origami documentation stylesheet.</td></tr>
<tr><td><code>/__health</code></td><td>Health status JSON data conforming to the <a href="https://docs.google.com/a/ft.com/document/d/18hefJjImF5IFp9WvPAm9Iq5_GmWzI9ahlKSzShpQl1s/edit">FT Health check standard</a>.  Note that the health check standard currently requires the alerts to be output in a 'human readable' form, and that may require implementing additional endpoints (or reformatting at the edge)</td></tr>
<tr><td><code>/__metrics</code></td><td>A JSON document listing current metrics to allow automated monitoring, in the <a href='{{site.baseurl}}/docs/syntax/metrics'>metrics</a> format</td></tr>
<tr><td><code>/__about</code></td><td><em>(root only)</em> A JSON document linking to all available versions of the service, in the <a href='{{site.baseurl}}/docs/syntax/web-service-index'>web service index format</a><br/><em>(version endpoints only)</em> A JSON document in the <a href='{{site.baseurl}}/docs/syntax/web-service-description'>web service description format</a></td></tr>
</table>

If a web service has two versions, `v1` and `v2`, there *must* be three of each of the above.  Using the `/health` endpoint as an example, the complete paths `/__health`, `/v1/__health` and `/v2/__health` *must* be recognised and served by the web service, and *may* return the same content.  The `__about` data *must* also be available from three URLs, but will follow the [web service description format]({{site.baseurl}}/docs/syntax/web-service-description) format for those that are version prefixed, and the [web service index]({{site.baseurl}}/docs/syntax/web-service-index) format for the one that isn't.


### De-duplication of output

Web service components *should* not offer any de-duplication of content.  If a product developer wants to draw from multiple Origami sources, and de-dupe where the same individual content item may appear from more than one of those sources, that's not a problem that Origami will solve for them, but could be solved at the product level by consuming data rather than markup.

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

	<nav class="o-ft-nav" data-o-component="o-ft-nav" data-o-version="0.0.1">
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
