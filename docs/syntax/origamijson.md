---
layout: default
title: origami.json
section: Syntax
permalink: /docs/syntax/origamijson/
site_section: about-origami
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
	<td><code>&nbsp;&nbsp;keywords</code></td>
	<td>string*</td>
	<td>Keywords related to the component to help discovery in the Registry. These should be stored as a comma separate string, i.e. "colours, palette, pink" for <code>o-colors</code>.</td>
</tr><tr>
	<td><code>&nbsp;&nbsp;origamiCategory</code></td>
	<td>string*</td>
	<td>The organisational category the module belongs to.  Must be set to one of the following: "components", "primitives", "utilities", "layouts".</td>
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
	<td><code>&nbsp;&nbsp;&nbsp;&nbsp;circle</code></td>
	<td>string</td>
	<td>A <a href="https://circleci.com/">CircleCI</a> build status URL (<code>https://circleci.com/api/v1/project/<em>owner</em>/<em>repo</em></code>)</td>
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
	<td>A list of features, as defined by <a href="http://cdn.polyfill.io/v1/docs/features/">Polyfill Service features</a> (or, if the feature required is not there, which is most often the case for CSS features, as <a href="http://modernizr.com/docs/">Modernizr tests</a>), which the module will assume to exist, and may choose to rely on in its JavaScript code.  If these features do not exist, the module <strong>may</strong> error.</td>
</tr><tr>
	<td><code>&nbsp;&nbsp;&nbsp;&nbsp;optional</code></td>
	<td>array</td>
	<td>A list of features, as defined by <a href="http://cdn.polyfill.io/v1/docs/features/">Polyfill Service features</a> (or, if the feature required is not there, which is most often the case for CSS features, as <a href="http://modernizr.com/docs/">Modernizr tests</a>), which the module will use if they are available in the browser.  The absense of the feature may result in the module offering different or reduced functionality, but it will be handled elegantly.</td>
</tr><tr>
	<td><code>&nbsp;&nbsp;}</code></td>
	<td></td>
	<td></td>
</tr><tr>
	<td><code>&nbsp;&nbsp;serviceUrl</code></td>
	<td>string</td>
	<td>(optional) For web services only, the URL on which the service is provided.  Required for web services.</td>
</tr><tr>
	<td><code>&nbsp;&nbsp;demosDefaults:&nbsp;{</code></td>
	<td>object</td>
	<td>(optional) Default options to be applied to all demos.</td>
</tr><tr>
	<td><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;template</code></td>
	<td>string*</td>
	<td>The mustache template to render.</td>
</tr><tr>
	<td><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sass</code></td>
	<td>string</td>
	<td>(optional) The Sass file to compile.</td>
</tr><tr>
	<td><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;js</code></td>
	<td>string</td>
	<td>(optional) The JS file to build with Browserify.</td>
</tr><tr>
	<td><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;data</code></td>
	<td>string</td>
	<td>(optional) Data to pass to the mustache template.</td>
</tr><tr>
	<td><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;documentClasses</code></td>
	<td>string</td>
	<td>(optional) CSS classes to set on the <code>html</code> tag.</td>
</tr><tr>
	<td><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dependencies</code></td>
	<td>array</td>
	<td>(optional) List of strings of other modules that are only needed for one or more demos and will be loaded via the build service. They follow the same structure as how the build service works. (e.g.: "o-ft-icons@^2.3.1" or "o-ft-icons").</td>
</tr><tr>
	<td><code>&nbsp;&nbsp;}</code></td>
	<td></td>
	<td></td>
</tr><tr>
	<td><code>&nbsp;&nbsp;demos:&nbsp;[</code></td>
	<td>array</td>
	<td>(optional) Array of individual demos. You can also apply the same properties as `demosDefaults` to specific demos. </td>
</tr><tr>
	<td><code>&nbsp;&nbsp;&nbsp;&nbsp;{</code></td>
	<td>object</td>
	<td>A config object to be applied for each demo (repeatable). Please check out the options in the <a href="http://origami.ft.com/docs/component-spec/modules/#demo-config">modules component spec</a></td>
</tr><tr>
	<td><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name</code></td>
	<td>string*</td>
	<td>Demo name which will also be used as the name of the outputted html file.</td>
</tr><tr>
	<td><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;description</code></td>
	<td>string*</td>
	<td>Explanation of the purpose of the demo.</td>
</tr><tr>
	<td><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;hidden</code></td>
	<td>boolean</td>
	<td>(optional) Whether the demo should be hidden in the Registry.</td>
</tr><tr>
	<td><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;display_html</code></td>
	<td>boolean</td>
	<td>(optional) Whether the demo should have a HTML tab in the Registry (defaults to <code>true</code>).</td>
</tr><tr>
	<td><code>&nbsp;&nbsp;&nbsp;&nbsp;}</code></td>
	<td></td>
	<td></td>
</tr><tr>
	<td><code>&nbsp;&nbsp;]</code></td>
	<td></td>
	<td></td>
</tr><tr>
	<td><code>}</code></td>
	<td></td>
	<td></td>
</tr>
</table>

\* Required property

## Example


	{
	  "description": "Tables module",
	  "origamiType": "module",
	  "origamiVersion": 1,
	  "keywords": "data, information, numbers",
	  "origamiCategory": "component",
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
	  "demosDefaults": {
	  	"sass": "demos/src/demo.scss",
	  	"js": "demos/src/demo.js"
	  },
	  "demos": [
	  	{
			"name": "demo1",
			"description": "Basic module implementation",
			"template": "demos/src/demo1.mustache"
		},
	  	{
			"name": "pa11y",
			"description": "Hidden test for pa11y",
			"hidden": true,
			"template": "demos/src/demo-pa11y.mustache"
	  	}
	  ],
	  "ci": {
	    "circle": "https://circleci.com/api/v1/project/Financial-Times/o-table"
	  }
	}
