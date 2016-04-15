---
layout: default
title: Initialising modules
section: Modules
permalink: /docs/developer-guide/modules/initialising-modules/
site_section: developer-guide
---

* TODO: explain o-auto-init, and that Build Service modules don't need this

# Initialising modules

Origami module JavaScript does not perform any initialisation automatically. This is to avoid them appearing to be "magic" and potentially hard to debug. However, modules can bind to custom versions of native browser load events:

* `o.DOMContentLoaded`
* `o.load`

If you want to initialise Origami components that have auto-initialise capability, fire these custom events in response to the native ones:

	if (document.readyState === 'interactive' || document.readyState === 'complete') {
		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
	}
	document.addEventListener("DOMContentLoaded", function() {
		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
	});

Alternatively, all modules that have auto-initialise capability also expose the bound function handler as part of their public API (normally as `init()`). This means you can choose to only initialise the modules that you want to, in the order that you want them.
