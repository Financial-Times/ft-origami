---
layout: default
title: Component specification
section: Component spec
permalink: /docs/component-spec/
site_section: about-origami
---

# Origami component specification

_To start using Origami components with your product, see the [using Origami in your products]({{site.baseurl}}/docs/developer-guide/) section._

This section defines the requirements for Origami-conforming components and is a [normative specification](http://www.w3.org/TR/qaframe-spec/).  Non-normative (informative) sections are indicated explicitly or by inset and boxed asides.  The words **MUST**, **MUST NOT**, **SHOULD**, **SHOULD NOT**, and **MAY** have the meaning given to them in [RFC 2119](http://www.ietf.org/rfc/rfc2119.txt)

The name **module** shall refer to components that:

* Are made available to product developers as a git repo; and
* Are compliant with the [module specification](modules); and
* Contain an `origami.json` file declaring them to be modules

The name **web service** shall refer to components that:

* Are made available to product developers as an HTTP API; and
* Are compliant with the [web services specification](web-services); and
* Contain an `origami.json` declaring them to be services

## Non-Origami components

This section is non-normative.

Product developers may also make use of other techniques for pulling FT or third party content, style, behaviours or services into their application. **Client side includes**, JavaScript libraries included from third parties directly into a page using `<script>` tags, are often used - examples of those in current use include [Twitter](https://dev.twitter.com/), [Podhoster](http://podhoster.com/) and [Tynt](http://www.tynt.com/installation_guide.php).

Pages served through Akamai can also make use of logic that runs on the Akamai platform to modify either the request or the response in between the end user and the product application.  These bits of Akamai-based logic are effectively **middleware** components.

## Components in the stack

This section is non-normative.

The following diagram shows how a product application can use a combination of different types of component to build a page:

![Architecture diagram]({{site.baseurl}}/img/architecture.png)

The three layers divide areas of responsibility for the web platform.  The bottom layer comprises data services - the APIs, production systems, and backends that create and hold the master copy of content and services that we offer to readers.  These include the content and search APIs and other production systems including feeds and APIs from third parties.  At the top layer is the website the product developer is building, and its direct interactions with the end user, normally via a CDN.
