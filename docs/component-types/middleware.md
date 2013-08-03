---
layout: default
title: Middleware
section: Component types
permalink: /docs/component-types/middleware/
---

# Middleware

Where a service is offered by routing a request/response through a proxy that applies logic and transforms the data appropriately, we call this service **middleware**.  This allows developers to take advantage of complex server side logic without needing to code it themselves, which is especially important when similar logic is required by lots of our websites.

Possible use cases for middleware include:

* Categorising user region
* Content authorisation (on request)
* De-duping (on response)

## Distinct from web services

It's important to distinguish between middleware and web service components.  While a product interacts with a web service component by making HTTP requests to it, and then incorporating the result into its own output in some way, middleware offers no HTTP API that a product application can use.  Instead, an app could interact with middleware in a number of ways:

* Receiving and making use of additional HTTP request headers added by the middleware (eg `X-FT-User-Region: UK` or `X-FT-Touch-Enabled: true`)
* Setting special HTTP response headers to be processed by middleware on the way to the end user (eg `X-FT-Transform: dedupe`)
* Making a policy config file available at a known location which a middleware service can access to determine how to intervene in requests to your application (eg `/policy.access_service.json`)

## Requirements

Middleware might work in a variety of ways to do a huge variety of things that we can't possibly imagine accurately today, so we do not seek to set any standards over how the middleware might work or what it might do.  Instead, we set the following requirements to ensure that middleware services are free of prodcut bias and deliver as much value across the FT as possible:

* It *must* not be necessary for any developers outside of the product developer to do any work in order to enable a product developer to make use of a middleware service in their product.
* It should be possible to make use of a middleware service in a new product application with less than an hour's work by the product developer.
