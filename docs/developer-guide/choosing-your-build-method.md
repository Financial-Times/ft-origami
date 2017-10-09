---
layout: default
title: How to pick your build method
section: Modules
permalink: /docs/developer-guide/modules/choosing-your-build-method/
site_section: developer-guide
---

# How to pick your build method

Origami modules are written as Sass and JavaScript and need 'building' before they can be delivered to users' browsers. There are two ways to 'build' a module. You can use the Build Service which is quick and simple but inflexible. For a more customisable build process Origami has the Origami Build Tools (OBT). To fully customise the process, add Bower to your existing build process. Under the hood, the Origami Build Tools use Bower packages.

### You have three choices

1) [Origami Build Service](https://www.ft.com/__origami/service/build/v2/) - the simplest way. Pull in the Origami CSS and Javascript as external files into your webpage. [See tutorial for using the Build Service in production](http://origami.ft.com/docs/developer-guide/modules/build-service/).

2) Manual build with the [Origami Build Tools](https://github.com/Financial-Times/origami-build-tools) - setting up a build process with Origami Build Tools gives you more customisation. [See Origami Build Tools tutorial](http://origami.ft.com/docs/developer-guide/modules/building-modules/).

3) Manual build with [Bower](https://bower.io/) - adding third-party build tool Bower to your project, lets you have a custom build process (using eg. Webpack) and install Origami components from the command line. [See Bower tutorial](https://bower.io/#install-bower).

### Build service vs manual build comparison
<table class="o-techdocs-table">
<tr>
	<th>Feature</th>
	<th>Using the build service</th>
	<th>Building manually</th>
</tr>
<tr>
	<td>Server-side technology requirements</td>
	<td>None, there is no need for any server-side code</td>
	<td>Node. You'll need Node.js (for package management and build automation).</td>
</tr>
<tr>
	<td>Set up time</td>
	<td>Quick, a few minutes at most</td>
	<td>Slower. If you're not familiar with Node.js and don't have any pre-requisites installed, getting set up could take you a couple of hours</td>
</tr>
<tr>
	<td>Can I add custom code into the Origami bundle?</td>
	<td>Not easily. You'd have to publish that code as a standalone repo</td>
	<td>Yes</td>
</tr>
<tr>
	<td>Can I use public open source JavaScript modules like jQuery?</td>
	<td>Yes, provided that they have a CommonJS interface</td>
	<td>Yes</td>
</tr>
<tr>
	<td>Can I develop without being online?</td>
	<td>No, you need to be online if your pages pull resources from the build service</td>
	<td>Yes</td>
</tr>
</table>

Once you've decided how to build Origami's modules, we have a tutorial for each method.


<a href="{{site.baseurl}}/docs/developer-guide/modules/build-service" class="o-buttons  o-buttons--secondary o-buttons--big">Build service tutorial</a> <a href="{{site.baseurl}}/docs/developer-guide/modules/building-modules" class="o-buttons  o-buttons--secondary o-buttons--big">Manual build tutorial</a>
