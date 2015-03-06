---
layout: default
title: origami.json
section: Syntax
permalink: /docs/syntax/origamijson/
---

# Origami manifests

All origami components, whether modules or web services, should be discoverable by the Origami registry and provide information on how the component is supported.  To do this, the component must contain an `origami.json` file in the root of its repository.

## Format

`origami.json` is a JSON format file, with the following properties:

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
	<td><code>&nbsp;&nbsp;description</code></td>
	<td>string*</td>
	<td>A short (&lt; 5 words, ideally) description of the purpose of the component</td>
</tr><tr>
	<td><code>&nbsp;&nbsp;origamiType</code></td>
	<td>string*</td>
	<td>The value 'module' where the component conforms to the <a href="{{site.baseurl}}/docs/component-spec/modules/">module</a> spec, or "service" where it conforms to the <a href="{{site.baseurl}}/docs/component-spec/web-services/">web service</a> spec.</td>
</tr><tr>
	<td><code>&nbsp;&nbsp;origamiVersion</code></td>
	<td>integer*</td>
	<td>Version of Origami to which the component conforms.  Currently must be set to 1.</td>
</tr><tr>
	<td><code>&nbsp;&nbsp;support</code></td>
	<td>string*</td>
	<td>
		<p>Where a product developer can go for support on this component.  Either an email address (which should be a group or role based address, not a named individual), or the URL of the component's bug or issue tracker (e.g. a GitHub issues URL, or other issue tracker such as Redmine).</p>
		<p>The owner identified here by email address or URL commits to the following obligations:</p>
		<ul>
			<li>review code prior to a release</li>
			<li>sign off deployments</li>
			<li>publish and keep up to date release notes and documentation</li>
			<li>move to decommission the component when appropriate</li>
		</ul>
	</td>
</tr><tr>
	<td><code>&nbsp;&nbsp;supportStatus</code></td>
	<td>string*</td>
	<td><p>Current support status of the component's major version.  Set to one of:</p>
		<ul>
			<li>'active' (feature development ongoing, bug reports will be gratefully received and acted upon promptly)</li>
			<li>'maintained' (not actively developed but reproducible bugs will be fixed promptly and work done where necessary to maintain compatibility with browsers and other components)</li>
			<li>'deprecated' (not actively developed, not recommended for new projects, only the most disabling bugs will be addressed and only when time allows, but existing implementations may still work)</li>
			<li>'dead' (known to be broken, no plans to fix)</li>
			<li>'experimental' (the component is not ready for production use.  This was previously called 'not implemented')</li>
		</ul>
	</td>
</tr><tr>
	<td><code>&nbsp;&nbsp;ci&nbsp;{</code></td>
	<td>object</td>
	<td>(optional) A set of one or more URLs where build validity information can be found</td>
</tr><tr>
	<td><code>&nbsp;&nbsp;&nbsp;&nbsp;travis</code></td>
	<td>string</td>
	<td>A <a href="https://travis-ci.org/">Travis CI</a> build status URL (normally <code>https://api.travis-ci.org/repos/<em>owner</em>/<em>repo</em>/builds.json</code>)</td>
</tr><tr>
	<td><code>&nbsp;&nbsp;&nbsp;&nbsp;jenkins</code></td>
	<td>string</td>
	<td>A <a href="http://jenkins-ci.org/">Jenkins</a> build status URL</td>
</tr><tr>
	<td><code>&nbsp;&nbsp;},</code></td>
	<td></td>
	<td></td>
</tr><tr>
	<td><code>&nbsp;&nbsp;browserFeatures&nbsp;{</code></td>
	<td>object</td>
	<td>(optional) For modules only, a grouping object for browser features required or used by this module</td>
</tr><tr>
	<td><code>&nbsp;&nbsp;&nbsp;&nbsp;required</code></td>
	<td>array</td>
	<td>A list of features, as defined by [Modernizr tests](http://modernizr.com/docs/), which the module will assume to exist, and may choose to rely on in its JavaScript code.  If these features do not exist, the module *may* error.</td>
</tr><tr>
	<td><code>&nbsp;&nbsp;&nbsp;&nbsp;optional</code></td>
	<td>array</td>
	<td>A list of features, as defined by [Modernizr tests](http://modernizr.com/docs/), which the module will use if they are available in the browser.  The absense of the feature may result in the module offering different or reduced functionality, but it will be handled elegantly.</td>
</tr><tr>
	<td><code>&nbsp;&nbsp;}</code></td>
	<td></td>
	<td></td>
</tr><tr>
	<td><code>&nbsp;&nbsp;serviceUrl</code></td>
	<td>string</td>
	<td>(optional) For web services only, the URL on which the service is provided.  Required for web services.</td>
</tr><tr>
	<td><code>&nbsp;&nbsp;demos:&nbsp;[</code></td>
	<td>array</td>
	<td>(optional) For modules only, paths within the repo to HTML pages that demonstrate the functionality of the module.  Array, may refer to more than one demo.</td>
</tr><tr>
	<td><code>&nbsp;&nbsp;&nbsp;&nbsp;{</code></td>
	<td>object</td>
	<td>An object for each demo (repeatable)</td>
</tr><tr>
	<td><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;title</code></td>
	<td>string</td>
	<td>(optional) Title of the demo.  If not specified, the path basename will be used.</td>
</tr><tr>
	<td><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;path</code></td>
	<td>string</td>
	<td>Path from the root of the repo to the HTML file that comprises the demo</td>
</tr><tr>
	<td><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;description</code></td>
	<td>string</td>
	<td>(optional) Description of the demo</td>
</tr><tr>
	<td><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;expanded</code></td>
	<td>boolean</td>
	<td>(optional) Whether to show the demo by default.  If false, demo should be accessible but muted or collapsed relative to expanded demos.  Default true.</td>
</tr><tr>
	<td><code>&nbsp;&nbsp;&nbsp;&nbsp;}</code></td>
	<td>object</td>
	<td>&nbsp;</td>
</tr><tr>
	<td><code>&nbsp;&nbsp;]</code></td>
	<td>object</td>
	<td>&nbsp;</td>
</tr><tr>
	<td><code>}</code></td>
	<td></td>
	<td></td>
</tr>
</table>

\* Required property

## Example


	{
	  "description": "Tweet module",
	  "origamiType": "module",
	  "origamiVersion": 1,
	  "support": "developer@example.com",
	  "supportStatus": "active",
	  "browserFeatures": {
	    "required": [
	      "postmessage",
	      "localstorage"
	    ],
	    "optional": [
	      "webaudio"
	    ]
	  },
	  "demos": [
	  	"/demos/demo1.html"
	  ],
	  "ci": {
	    "travis": "https://api.travis-ci.org/repos/Financial-Times/o-tweet/builds.json"
	  }
	}
