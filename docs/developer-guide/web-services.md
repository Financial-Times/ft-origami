---
layout: default
title: Using web services
section: Developer guide
permalink: /docs/developer-guide/web-services/
site_section: developer-guide
---

# Using Origami web services

Origami web services provide a variety of front-end related data services and content that can be used to improve your site and speed up development. Our current services are the [Polyfill Service](http://polyfill.io), the [Image Service](https://www.ft.com/__origami/service/image/v2), the [Build Service](https://origami-build.ft.com/v2/) and the [Code Docs service](http://codedocs.webservices.ft.com/v1/docs/).

Each service hosts its own documentation. This page covers some general approaches and concerns for integrating an Origami web service into your application.

## Integration methods

The best way to integrate web services into your application depends on what the service provides and how dynamic your request is. Here are a few techniques:

### Scheduled download and cache

If you want to decouple the web service from your public request-serving architecture, you can download content on a schedule and store it for use later. An example using plain PHP would be:

<?prettify lang=php linenums?>
	$markup = file_get_contents('http://ft-nav.webservices.ft.com/v1/nav?depth=2');
	file_put_contents('/tmp/navcache.html', $markup);

This is an oversimplified example -- in practice you should use an HTTP client that respects cache and deprecation headers (see below) and you’d store the result in a database rather than a tmp file. This technique of downloading and caching eliminates risk multiplication, and it avoids scaling your service traffic with your public traffic. Usually, this technique is good if the API has only a few content variations that you need, and the cache time is relatively long (at least an hour).

### Real time interaction from your application

You could interact with the service from your application’s backend in real time, and this might be the best option if you need to tailor your API request to the needs of each individual user, the cache time is too short for pre-generation, or the API requests you’re making are writes rather than reads (e.g. submitting analytics).

### Use dynamic content assembly at the edge

Akamai and Varnish both support an Edge assembly language called [Edge side includes](http://en.wikipedia.org/wiki/Edge_Side_Includes) which you can use to incorporate a fragment of content from another source into your web page:

	<body>
		<esi:include src="http://ft-nav.webservices.ft.com/v1/nav?depth=2" alt="/failsafe/nav.html" onerror="continue"/>
		<div class="content">
		...
		</div>
	</body>


### In AJAX from the browser

If the content you want to load from an Origami web service is not required on page load, you may choose to lazy-load it or even load it on demand. Many web services support this by setting permissive [CORS headers](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing) on their responses. This allows you to load their content using AJAX from a page on a different domain.

	var xhr = new XMLHttpRequest();
	xhr.open("get", "http://tweet.webservices.ft.com/v1/statuses/show.html?id=266031293945503744&source=rankings.ft.com");
	xhr.onload = function() {
		document.getElementById('tweet_detail').innerHTML = this.responseText;
	}
	xhr.send();

## Source identification

All Origami web services require you to submit a `source` parameter on every API request.  This can be sent as a GET or POST parameter, or as an `X-FT-Source` HTTP request header.  The reason for this is to allow operations staff to easily see which applications are responsible for traffic to web services, and more easily alert you if your traffic seems unusual.

You can set `source` to anything you like, but a good practice is to use your application's public hostname, e.g. `source=rankings.ft.com`.

## Caching

All Origami web services provide a Cache-control header with their HTTP responses. Make sure you respect this header, especially if you're loading the web service endpoint from your own code rather than using dynamic content assembly on a CDN.

Pay particular attention to revalidation rules. Unless the service has returned a `must-revalidate` directive, it's safe to use stored responses from the service even after they've exceeded their `max-age` and become stale.

## Deprecation in Origami services

To keep improving our services and managing our maintenance overheads, we sometimes deprecate and switch off old APIs.

In these cases the we'll release a new version of the service and will advertise the deprecation of the old version via a mailing list email and by including an `X-Service-Termination-Date` header in responses to your API requests.

In any request to an Origami service, you should always check the response for the presence of an `X-Service-Termination-Date` header and make sure you're alerted if one appears. This will ensure you always get the longest time possible to make your upgrade before the service is turned off.

## Service robustness

As with any integration between your app and an external service, you should take steps to avoid a critical dependency on an Origami web service. This will limit the effect outages in Origami services can have on your application.

For example, if you're using a service for a piece of content, allow that part of the page to go blank, or continue using a stale copy until the service comes back online. If you're using a data service, store your request until you're able to send it.
