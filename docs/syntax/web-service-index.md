---
layout: default
title: Web service index
section: Syntax
permalink: /docs/syntax/web-service-index/
---

# Web service index format

All Origami web services are required to expose an `/__about` endpoint to list the available versions of the service.  The response give at this URL must be a JSON document conforming to the following format.

## Format

<table class="o-techdocs-table">
<tr>
	<th>Property</th>
	<th>Type</th>
	<th>Description</th>
</tr><tr>
	<td><code>{</code></td>
	<td></td>
	<td></td>
</tr><tr>
	<td>&nbsp;&nbsp;<code>name</code></td>
	<td>string*</td>
	<td>The <b>repo</b> name of the web service</td>
</tr><tr>
	<td>&nbsp;&nbsp;<code>versions [</code></td>
	<td>array*</td>
	<td>A list of versions</td>
</tr><tr>
	<td>&nbsp;&nbsp;&nbsp;&nbsp;<code>"..."</code></td>
	<td>string*</td>
	<td>URL of a version of the web service.  Repeat for additional versions.  May be specified as a full URL, or just the path component of the URL, in which case the full URL can be determined by using the same scheme and hostname as the URL that served the web service index document.</td>
</tr><tr>
	<td>&nbsp;&nbsp;<code>]</code></td>
	<td></td>
	<td></td>
</tr><tr>
	<td><code>}</code></td>
	<td></td>
	<td></td>
</tr>
</table>

## Example


	{
	  "name": "tweet-service",
	  "versions": [
	    "http://tweet.webservices.ft.com/v1",
	    "http://tweet.webservices.ft.com/v2"
	  ]
	}
