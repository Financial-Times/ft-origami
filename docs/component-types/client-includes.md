---
layout: default
title: Client side includes
section: Component types
permalink: /docs/component-types/client-includes/
---

# Client side includes & third party scripts

**Client side includes** are offered as a JavaScript `<script>` tags that the product developer includes on their page.  This is used fairly extensively already across the FT for third party scripts, interactive graphics and in order to bypass caching layers in the main .com technology stack, but since it does not subject the script to any packaging, it can easily pollute the global scope and be a bad neighbour to other scripts and styles on the page.

We should not build any of our own components as client side includes, and where we need to include those built by third parties (eg ads) we should try to ensure that the third party adheres to [our JS standards]({{site.baseurl}}/docs/syntax-requirements).  We should encourage third parties to build their JavaScript as CommonJS modules, with Bower package config, which should enable them to be treated identically to module components by product developers.  Where they don't, we should consider making it compliant by importing it in an Origami module devoted to the purpose.

Product developers should therefore prefer including third party scripts as modules using bower.  If not possible, prefer using the [build service]({{site.baseurl}}/docs/build-service/) to concatenate and minify third party scripts into the same bundle as their own javascript.  Third party scripts that cannot be loaded in this way most likely use bad practices, such as immediately-invoked `document.write` expressions.  Product developers should strongly prefer fixing this at the component level rather than simply including the third party component directly using its own invocation code.

Current examples of client side includes are:

* Fast FT (could be replaced with a dedicated product app, on eg fast.ft.com)
* Tynt (consider wrapping with a module)
* Podhoster (Needs a complete rewrite)
* Twitter buttons (Could be avoided)
* Facebook buttons (Could be avoided)
* Inferno (Likely to be replaced with a new third party)
* Clippings
* Email this
