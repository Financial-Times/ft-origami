---
layout: default
title: Web services
section: Component types
permalink: /docs/component-types/web-services/
---

# Web service components

A **web service** component is offered as a URL endpoint that delivers content.  The product developer includes this in their project either on demand on a request by request basis (using [ESI](http://en.wikipedia.org/wiki/Edge_Side_Includes) or similar technology), or by downloading the content on a regular schedule and pushing it into a local cache.  This is designed for content that is being changed frequently, so product developers should take care to respect cache control directives emitted by the service.  Examples of good use cases for web services are:

* FT Main navigation
* Most read / shared / commented
* Jobs from exec-appointments

## API

Web services must expose an HTTP endpoint on the hostname `{modulename}.modules.ft.com` as follows:

    /output[/v{version}[/{format}]]

Where `{version}` is the (major) version of the web service output, and `{format}` is either html or json.


## Requirements

* *Should* be used for components that comprise editorial content or data that is not practical to consider part of the source code of a module component.
* *Must not* output any executable code (use module components for that).
* Where `{version}` is not specified in a request, *must* use the most recent version.
* Where `{format}` is not specified in a request, *should* use content-negotiation (the HTTP `Accept` header), and as a default *must* return HTML output.
* Minor version changes in the web service application *must not* be exposed on the web service's HTTP API
* When returning HTML, *must* meet the [standard for HTML](/docs/syntax-requirements) that forms part of components
* When providing JSON output, *must* meet the [standard for JSON](/docs/syntax-requirements) that forms part of components
* *Should* support JSONp callback via the querystring parameter `callback`
* *May* accept other querystring parameters if desired to allow for module specific customisation of output.
* *May* provide any other HTTP endpoints as desired
* *Should* serve CORS response headers to allow the endpoints to be consumed in-browser from any origin (though consuming in-browser is discouraged)
* *Must* include explicit `Cache-control` header in HTTP responses, which product applications must respect.
* *Must* increment `{version}` when a change is made to the structure of the data returned or the markup used in HTML output.
* When `{version}` is incremented, must continue to support previous versions for a minimum of 3 months.
* If a prior version is to be dropped, the service must give at least 3 months notice via an email notification to the Github watcher list, and also by setting an `X-Service-Termination-Date:` header on HTTP responses.  When the termination date is reached, the content as at that date *should* continue to be served on that URL indefinitely.  This way, product applications still using a web service version that is no longer supported will likely continue to work, but will no longer get updated data.

## Example

The following HTTP request-response is compliant with the above requirements and the [syntax requirements](/docs/syntax-requirements) for the response body:

	GET /output/v1/html?level=first&selectedUrl=http%3A%2F%2Fwww.ft.com%2Fcompanies HTTP/1.1
	User-Agent: curl/7.24.0 (x86_64-apple-darwin12.0) libcurl/7.24.0 OpenSSL/0.9.8x zlib/1.2.5
	Host: navigation.modules.ft.com
	Accept: text/html

	HTTP/1.1 200 OK
	Server: Apache
	Sat, 03 Aug 2013 16:45:35 GMT
	Content-Type: text/html; charset=utf-8
	Cache-Control: public, max-age=60
	Last-Modified: Fri, 02 Aug 2013 16:58:42 GMT
	Content-Length: 2104
	Access-Control-Allow-Credentials: true
	Access-Control-Allow-Origin: *

	<nav class="ft-module-navigation">
	<ol>
	<li  data-track-pos="0"><a href="http://www.ft.com">Home</a></li>
	<li  data-track-pos="1"><a href="http://www.ft.com/world/uk">UK</a></li>
	<li  data-track-pos="2"><a href="http://www.ft.com/world">World</a></li>
	<li class="selected" data-track-pos="3"><a href="http://www.ft.com/companies">Companies</a>
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
	<li  data-track-pos="4"><a href="http://www.ft.com/markets">Markets</a></li>
	<li  data-track-pos="5"><a href="http://www.ft.com/global-economy">Global Economy</a></li>
	<li  data-track-pos="6"><a href="http://www.ft.com/lex">Lex</a></li>
	<li  data-track-pos="7"><a href="http://www.ft.com/comment">Comment</a></li>
	<li  data-track-pos="8"><a href="http://www.ft.com/management">Management</a></li>
	<li  data-track-pos="9"><a href="http://www.ft.com/personal-finance">Personal Finance</a></li>
	<li  data-track-pos="10"><a href="http://www.ft.com/life-arts">Life & Arts</a></li>
	</ol>
	</nav>
