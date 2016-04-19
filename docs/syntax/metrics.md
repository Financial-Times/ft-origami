---
layout: default
title: Metrics format
section: Syntax
permalink: /docs/syntax/metrics/
site_section: about-origami
---

# Metrics format

All Origami web services are encouraged to emit metrics over TCP to the FT graphite service.  Metrics keys are heirarchical, delimited by dots, and the first two levels are standardised:

	{appName}.{envName}.*

Your `appName` *must* be the common name of your application, which *should* be the name of your code repository, the CMDB name and the first token of the service's hostname.  The `appName` *must* distinguish the application from any other services run by the FT.

The `envName` *must* be a name describing the **environment** on which the instance of the application is running.  Each environment *must* be reported using a unique environment name.  The naming of each environment is left up to the developer.

Both `appName` and `envName` *must* match the PCRE pattern `/^[a-z0-9\-]{3,}$/`.

## Examples

The following shows some examples of metrics formatted using the plaintext protocol and named in compliance with the standard above:

	polyfill-service.qa.useragentcount.chome.40 735 1424112224
	polyfill-service.prod.memory 58915263 1424112224
