---
layout: default
title: Middleware
section: Component types
permalink: /docs/component-types/middleware/
---

# Middleware

Where a service is offered by routing a request/response through a proxy that applies logic and transforms the data appropriately, we call this service **middleware**.  This allows developers to take advantage of complex server side logic without needing to code it themselves, which is especially important when similar logic is required by lots of our websites that might use different technologies.

Possible use cases for middleware include:

* Categorising user region (on request)
* Content authorisation (on request)
* De-duping (on response)

## Distinct from web services

It's important to distinguish between middleware and web service components.  Products interact with a web service component by making HTTP requests to it (whether that be from the server, the edge or the browser), and then incorporating the result into their own output in some way.   In contrast, middleware offers **no HTTP API** that a product application can use.  Instead, an app could interact with middleware in a number of ways:

* Receiving and making use of additional HTTP request headers added by the middleware (eg `X-FT-User-Region: UK` or `X-FT-Touch-Enabled: true`)
* Setting special HTTP response headers to be processed by middleware on the way to the end user (eg `X-FT-Transform: dedupe`)
* Making a policy config file available at a known location which a middleware service can access to determine how to intervene in requests to your application (eg `/policy.access_service.json`)
* Responding to special policy requests that a middleware service might make *to* it, eg to perform a HEAD request on a content URL to determine its specific access policy.


## Requirements

Middleware might work in a variety of ways to do a huge variety of things that we can't possibly imagine accurately today, so we do not seek to set any standards over how the middleware might work or what it might do.  Instead, we set the following requirements to ensure that middleware services are free of product bias and deliver as much value across the FT as possible:

* It *must* not be necessary for any developers outside of the product developer to do any work in order to enable a product developer to make use of a middleware service in their product (ie the developer or operator of the middleware should not need to get invovled).
* It should be possible to make use of a middleware service in a new product application with less than an hour's work by the product developer.
* All inputs and outputs from middleware *must* be describeable in terms of HTTP.
