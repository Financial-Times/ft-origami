---
layout: default
title: Third party component A List
permalink: /docs/3rd-party-a-list/
---

# Third party components: the A list

Origami components may have dependencies (via Bower) on third party components.  This page documents which third party libraries are preferred where there may be multiple libraries that achieve the same goal.

<table class='o-techdocs-table'>
<thead>
	<tr><th>For this</th><th>Use this</th><th>Not these</th><th>Because</th></tr>
</thead>
<tbody>
	<tr>
		<td>DOM manipulation</td>
		<td><a href='https://github.com/jquery/jquery'>jQuery</a></td>
		<td>Mootools<br/>Dojo<br/>Prototype<br/>YUI</td>
		<td>A general purpose DOM manipulation library is invariably a common request, and jQuery is also often required by advertisers, so there is a high liklihood it will be on the page anyway.</td>
	</tr><tr>
		<td>AJAX</td>
		<td><a href='https://github.com/jquery/jquery'>jQuery</a></td>
		<td>?</td>
		<td>jQuery is so likely to be on the page anyway that using it even just for AJAX has a good chance of reducing page weight compared to using a specialist library</td>
	</tr><tr>
		<td>JavaScript utils</td>
		<td><a href='https://github.com/lodash/lodash'>Lo-dash</a></td>
		<td>Underscore</td>
		<td>Lo-dash is roughly functionally equivalent to Underscore, but generally delivers faster performance, and includes some useful things not available in Underscore.</td>
	</tr><tr>
		<td>Template engine</td>
		<td><a href='https://github.com/wycats/handlebars.js/'>Handlebars</a></td>
		<td>Mustache<br/>Hogan</td>
		<td>
			<p>It's compatible with Mustache templates, but offers additional features on top of Mustache's syntax. Origami has no opinion on how product developers should build applications, so when a component's purpose is to offer a raw template to the developer, it must use only fully Mustache-compatible syntax (but these components would also not actually require the template engine themselves).</p>
			<p>Components that contain templates but only use them interally in order to render a UI element, may use the more advanced template syntax offered by Handlebars, and prefer Handlebars as the template engine.</p>
		</td>
	</tr>
</tbody>
</table>
