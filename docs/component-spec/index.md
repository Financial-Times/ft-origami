---
layout: default
title: Component spec
section: Component spec
permalink: /docs/component-spec/
---

# Component specification

This section defines the requirements for Origmai-conforming components.  Product developers may also

Origami-compatible components come in two flavours:

* Module components
* Web service components

Git repositories holding static resources and [CommonJS][1] JavaScript modules are **module components**.  However, much of what a product developer may want to include in a site from a central source will be dynamic content, such as the most read content across FT, or the up to date global navigation section list.  These snippets of ever-changing content are available from HTTP endpoints known as **web service components**.

Product developers may also make use of other techniques for pulling FT or third party content or services into their application. **Client side includes**, JavaScript libraries included from third parties directly into a page using `<script>` tags, are often used - examples of those in current use include Twitter, Podhoster and Tynt.  Pages served through Akamai can also make use of logic that runs on the Akamai platform to modify either the request or the response in between the end user and the product application.  These bits of Akamai-based logic will be called **middleware** in this spec.  Below we define the circumstances in which it's reasonable to create and use client side libraries or middleware, but in principle we prefer to create modules or web services.

The following diagram shows how a product application can use a combination of different types of component to build a page:

![Architecture diagram]({{site.baseurl}}/img/architecture.png)

The three layers divide areas of responsibility for the web platform.  The bottom layer comprises data services - the APIs, production systems, and backends that create and hold the master copy of content and services that we offer to readers.  These include the content and search APIs, Clamo, and other production systems including feeds and APIs from third parties.  At the top layer is the website the product developer is building, and its direct interactions with the end user, normally via Akamai.  The product application will make use of data services itself to build its own unique content or features, but it will also want to draw in prepared components.  This is where the middle layer sits, and is the subject of this spec.

Read more about each type of component:

* [Modules]({{site.baseurl}}/docs/component-types/modules)
* [Web services]({{site.baseurl}}/docs/component-types/web-services)
* [Client side includes]({{site.baseurl}}/docs/component-types/client-includes)
* [Middleware]({{site.baseurl}}/docs/component-types/middleware)

[1]: https://github.com/commonjs/commonjs/blob/master/docs/specs/modules/1.0.html.markdown
