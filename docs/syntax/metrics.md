---
layout: default
title: Metrics format
section: Syntax
permalink: /docs/syntax/metrics/
---

# Metrics format

All Origami web services are encouraged to emit metrics over TCP or UDP to the FT graphite service.  Metrics keys are heirarchical, delimited by dots, and the first two levels are standardised:

	{appName}.{envName}.*

Your `appName` *must* be common name of your application, which *should* be the name of your code repository, the CMDB name and the first token of the service's hostname.  The `appName` *must* distinguish the application from any other services run by the FT.

The `envName` *must* be the name of the **environment** on which the instance of the application is running.  Each environment *must* be reported using a unique environment name.  Where there are more than one of a type of environment, a number or string suffix can be used.  Where the purpose of an environment matches a description in the list below, the canonical name shown *should* be used.

<table class="o-techdocs-table">
<tr>
	<th>envName</th>
	<th>Description</th>
	<th>Example variation</th>
</tr><tr>
	<td><code>dev</code></td>
	<td>Development.  An environment directly edited by a developer, often on a local machine, rarely stable, may be spun up and down intermittently. The developer name is a good way of separating these</td>
	<td><code>dev-andrew</code></td>
</tr><tr>
	<td><code>qa</code></td>
	<td>Persistent test environment.  Environments used for testing (automated or manual), which are maintained and expected to deliver data continually.</td>
	<td><code>qa01</code></td>
</tr><tr>
	<td><code>ci</code></td>
	<td>Continuous integration.  Environments that are created for the purpose of performing an automated operation and will be destroyed as soon as the task is complete.</td>
	<td><code>ci01</code></td>
</tr><tr>
	<td><code>prod</code></td>
	<td>Production.  There is usually only one production environment (if you wish to segment further, use another level)</td>
	<td><code>prod</code></td>
</tr>
</table>

Both `appName` and `envName` *must* match the PCRE pattern `/^[a-z0-9\-]{3,}$/`.

## Examples

The following shows some examples of metrics formatted using the plaintext protocol and named in compliance with the standard above:

	polyfill-service.qa.useragentcount.chome.40 735 1424112224
	polyfill-service.prod.memory 58915263 1424112224
