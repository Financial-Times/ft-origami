---
layout: default
title: Using the Polyfill Service
section: Modules
permalink: /docs/developer-guide/modules/using-the-polyfill-service/
site_section: developer-guide

---
# The Polyfill Service

Not all browsers are equal. As new standards and features are added to browsers, older ones (eg ie8) are left behind. "Polyfilling" is a technique where older browsers are served JavaScript which upgrades their feature-set. This frees up developers to write modern JavaScript without having to spend time getting it working on older browsers.

Ordinarily, developers have to identify and manage the polyfills they need. This is where [Polyfill.io](http://polyfill.io) comes in. Polyfill.io uses user-agent sniffing to return only the polyfills that the requesting browser needs. Polyfill.io is built and maintained by a community of developers led by Origami.

All documentation for Polyfill.io is available at [Polyfill.io](http://polyfill.io).


## Using Polyfill.io with other polyfills
Polyfilling things twice will give unpredictable results and is likely to lead to bugs in the browsers that use those polyfills. To avoid conflicts, where possible, you should only use polyfills from a single source.

If you want to use a polyfill that isn't provided by Polyfill.io, you should not use the default set from Polyfill.io as this can lead to conflicts. These conflicts are especially common for ES6 features while Polyfill.io brings in polyfills for these new language features.


## Polyfill.io and the Build Service
Origami Build Tools and the Build Service both include some polyfills from core-js which conflict with the Polyfill.io's default set. Until we remove these conflicting polyfills from Origami's tools (when Polyfill.io can provide the same coverage for ES6 as offered in core-js) this will continue to be a problem.

Right now, the conflict exists with `Symbol`, `Map` and `Set` polyfills. If you are using these features, there are two possible solutions:

- If possible, only use polyfills delivered by the Polyfill-Service - ​*recommended, future-proof*
- Alternatively, if you need to include the Babel polyfills, you can exclude polyfills from the default set in Polyfill.io by adding the following parameters to your Polyfill.io request:  `?excludes=Symbol,Symbol.iterator,Symbol.species,Map,Set`

### Exclude Symbol polyfills from the Build Service or OBT
In OBT you can exclude all the Babel polyfills by setting a the `babelRuntime` flag eg
`obt build --babelRuntime=false`

There is an open issue on the Build Service to exclude the core-js polyfills there too: https://github.com/Financial-Times/origami-build-service/issues/58.
