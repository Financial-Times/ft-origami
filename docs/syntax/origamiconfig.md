---
layout: default
title: origamiconfig
section: Syntax
permalink: /docs/syntax/origamiconfig/
---

# Origami manifests

All origami components, whether modules or web services, should be discoverable by the Origami registry and provide information on how the component is supported.  To do this, the component must contain an `.origamiconfig` file in the root of its repository.

## Format

`.origamiconfig` is a JSON format file, with the following properties:

<table class='table'>
<tr>
	<th>Property</th>
	<th>Type</th>
	<th>Description</th>
</tr><tr>
	<td><code>{</code></td>
	<td></td>
	<td></td>
</tr><tr>
	<td><code>&nbsp;&nbsp;description</code></td>
	<td>string*</td>
	<td>A short (&lt; 5 words, ideally) description of the purpose of the component</td>
</tr><tr>
	<td><code>&nbsp;&nbsp;origamiType</code></td>
	<td>string*</td>
	<td>The value 'module' where the component conforms to the <a href='{{site.baseurl}}/docs/component-types/modules'>module</a> spec, or 'service' where it conforms to the <a href='{{site.baseurl}}/docs/component-types/web-services'>web service</a> spec.</td>
</tr><tr>
	<td><code>&nbsp;&nbsp;origamiVersion</code></td>
	<td>integer*</td>
	<td>Version of Origami to which the component conforms.  Currently must be set to 1.</td>
</tr><tr>
	<td><code>&nbsp;&nbsp;support</code></td>
	<td>string*</td>
	<td>
		<p>Where a product developer can go for support on this component.  Either an email address (which should be a group or role based address, nota named individual), or the URL of the component's bug or issue tracker (eg a GitHub issues URL, or other issue tracker such as Redmine).</p>
		<p>The owner identified here by email address or URL commits to the following obligations:</p>
		<ul>
			<li>review code prior to a release</li>
			<li>sign off deployments</li>
			<li>publish and keep up to date release notes and documentation</li>
			<li>move to decommision the component when appropriate</li>
		</ul>
	</td>
</tr><tr>
	<td><code>&nbsp;&nbsp;supportStatus</code></td>
	<td>string*</td>
	<td><p>Current support status of the component.  Set to one of:</p>
		<ul>
			<li>'active' (feature development ongoing, bug reports will be gratefully received and acted upon promptly)</li>
			<li>'maintained' (not actively developed but reproducible bugs will be fixed promptly and work done where necessary to maintain compatibility with browsers and other components)</li>
			<li>'deprecated' (not actively developed, not recommended for new projects, only the most disabling bugs will be addressed and only when time allows, but existing implementations may still work)</li>
			<li>'dead' (known to be broken, no plans to fix)</li>
			<li>'not implemented' (the component is either yet to be built or currently a work in progress; developers should star the project for updates)</li>
		</ul>
	</td>
</tr><tr>
	<td><code>&nbsp;&nbsp;serviceUrl</code></td>
	<td>string</td>
	<td>(optional) For web services only, the URL on which the service is provided.  Required for web services.</td>
</tr><tr>
	<td><code>}</code></td>
	<td></td>
	<td></td>
</tr>
</table>

## Example

<?prettify linenums=1?>
	{
	  "description": "Tweet service",
	  "origamiType": "service",
	  "origamiVersion": 1,
	  "support": "origamisupport-service-tweet@ft.com",
	  "supportStatus": "active",
	  "serviceUrl": "http://tweet.webservices.ft.com"
	}
