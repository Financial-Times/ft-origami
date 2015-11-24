---
layout: default
title: Using web services
section: Developer guide
permalink: /docs/developer-guide/web-services/
site_section: developer-guide
---

# Using Origami web services

Origami web services provide a variety of front-end related data services and content that can be used to improve your site and speed up development.

To discover available Origami services, check the [Origami registry](http://registry.origami.ft.com).  The registry contains links to the service's online documentation, which will describe its API endpoints, arguments and output.  There are however a few hints and techniques for using web services that are common to most services.

## Where and how to use web services

There are lots of ways of integrating web services into your application, and the choice depends largely on what the service provides and how dynamic your request is.  Here are a few techniques:

### Scheduled download and cache

This is useful if you want to download content from the service on a schedule, and store it within your application, decoupling the web service from your public request-serving architecture.  An example using plain PHP would be:

<?prettify lang=php linenums?>
	$markup = file_get_contents('http://ft-nav.webservices.ft.com/v1/nav?depth=2');
	file_put_contents('/tmp/navcache.html', $markup);

This is an oversimplified example - in practice you should use an HTTP client that respects cache and deprecation headers (see below) and you'd probably want to store the result in a database rather than a tmp file.  But the advantages of this technique are that it eliminates risk multiplication, and it avoids scaling your service traffic with your public traffic.  Usually, this technique is good if the API has only a few content variations that you need, and the cache time is relatively long (at least an hour).

### Real time interaction from your application

Equally, you could interact with the service from your application's backend in real time, and this might be the best option if you need to tailor your API request to the needs of each individual user, the cache time is too short for pre-generation, or the API requests you're making are writes rather than reads (e.g. submitting analytics).

### Use dynamic content assembly at the edge

Akamai and Varnish both support an Edge assembly language called [Edge side includes](http://en.wikipedia.org/wiki/Edge_Side_Includes) which can be used to easily incorporate a fragment of content from another source into your web page:

	<body>
		<esi:include src="http://ft-nav.webservices.ft.com/v1/nav?depth=2" alt="/failsafe/nav.html" onerror="continue"/>
		<div class="content">
		...
		</div>
	</body>


### In AJAX from the browser

If the content you want to load from an Origami web service is not required on page load, you may choose to load it lazily or even on demand.  Many web services support this by setting permissive [CORS headers](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing) on their responses, allowing you to load their content using AJAX from a page on a different domain.

	var xhr = new XMLHttpRequest();
	xhr.open("get", "http://tweet.webservices.ft.com/v1/statuses/show.html?id=266031293945503744&source=rankings.ft.com");
	xhr.onload = function() {
		document.getElementById('tweet_detail').innerHTML = this.responseText;
	}
	xhr.send();


## Caching

All Origami web services are required to be opinionated about how you may cache their HTTP responses, and to express that in a Cache-control header.  Make sure you respect this, especially if you are loading the web service endpoint from your own code rather than using dynamic content assembly on a CDN.

Pay particular attention to revalidation rules.  If the service does not include a `must-revalidate` directive, you may choose to continue to use stored responses from the service even after they exceed their `max-age` and become stale.

## Deprecation

Web services will inevitably be improved and changed, and in some cases changes may be incompatible with the way you've integrated with the service.  In these cases the service developer will release a new version of the service and will advertise the deprecation of the old version via a mailing list email and by including an `X-Service-Termination-Date` header in responses to your API requests.

In any request to an Origami service, you should always check the response for the presence of an `X-Service-Termination-Date` header and make sure you are alerted if one appears.  This will ensure you always get the maximum amount of time possible to effect your upgrade before the service is turned off.

Web services are also required to proactively notify interested parties when a service termination is planned.  To avoid being taken by surprise, join the service's notification mailing list, or if it doesn't have one, star the repo on GitHub.

## Risk multiplier effect

If your app integrates with a lot of external services, it's easy to increase the risk of an outage in your app by inadvertently making your app critically dependent on those services.  Although many (though by no means all) Origami services offer very high availability and robust architectures to support that, chaining together lots of very low probabilities still results in an unacceptably high one.

To mitigate this, wherever possible ensure your application is not dependent on the service.  If it's a piece of content, allow that part of the page to go blank, or simply continue using a stale copy until the service comes back online.   If it's a data service, store your request until you're able to send it.  There are lots of possible ways of adding mitigating logic to your application, so try to ensure that you have fully mitigated the effect of service outages wherever practical.

## Source identification

All Origami web services require you to submit a `source` parameter on every API request.  This can be sent as a GET or POST parameter, or as an `X-FT-Source` HTTP request header.  The reason for this is to allow operations staff to easily see which applications are responsible for traffic to web services, and more easily alert you if your traffic seems unusual.

You can set `source` to anything you like, but a good practice is to use your application's public hostname, e.g. `source=rankings.ft.com`.
