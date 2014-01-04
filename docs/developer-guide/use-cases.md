---
layout: default
title: Use cases
permalink: /docs/use-cases/
---

# Application to use cases

This section describes how the Origami standard can be applied to specific use cases for product applications that we have at the FT.

## FT Web app (app.ft.com)

**Context and constraints:** This application has a build process, and is comfortable with requiring modules using Bower.  Since it must work offline reliably, it requires all resources to be served by its own backend, so nothing can be loaded from a third party host.  Visually it is very distinct from normal FT sites, but does include some common elements such as standard colours, tracking, and ads.

**Solution:** Use Bower to require module components and make custom bundles using whatever compiler / minifier tool is preferred (in the case of the web app, browserify and closure compiler).  Use ESI or a regular scheduled download task to fetch content from web service components.  Serve the app through Akamai to take advantage of middleware components.  Avoid client side includes, which cannot serve this use case.


## FT CMS (www.ft.com)

**Context and constraints:** Large legacy Java app, built on top of huge stack of legacy publishing tech.  Contains the FT homepage, the 'flagship' front end product, and therefore lots of the page components.

**Solution:** Bower is going to be hard due to legacy platform, so use the build service to request built versions of modules, then combine those with app specific JavaScript and CSS to make a custom bundle without needing to use Bower.  Use app's choice of Java based bundling and minifying tools.  Use access control service middleware for paywall.


## FT Blogs (blogs.ft.com/beyond-brics)

**Context and constraints:** PHP Wordpress app with lots of blogs (60ish), plugins (80ish), and themes (5ish), but very few alterations to the WP core, to ensure that WP can be upgraded reasonably easily.

**Solution:** Use the [build service](/docs/build-service) to serve assets directly into the theme on the client side, writing `<script>` and `<link>` tags that pull bundles directly from the build service.  Wordpress plugins add additional scripts and styles to the page, many of which are badly encapsulated and can't easily be made to play with a build process, so these continue to be served by WP in its normal way.


## FT Austerity Audit (ig.ft.com/austerity-audit/)

**Context and constraints:** Static site with no server-side logic, built around an editorial event, no future roadmap or long term support.  Has a build process, modern development practices and a savvy front end development team.  Visually very distinct from ft.com, and aspires to be behind the paywall (which was technically infeasible when it was built)

**Solution:** Could require modules with Bower, or create a custom page and pull in components using the build service.  Use the access service middleware to provide paywall.

## App promo (apps.ft.com)

**Context and constraints:** Basic static single page site advertising a promotion.  Visually a bit different to ft.com but not intentionally, and could easily be delivered within the same visual standards.

**Solution:** Use build service to pull a wrapper page pre-built with all the components required, and add some extra CSS and HTML to it before serving it to the end user.
