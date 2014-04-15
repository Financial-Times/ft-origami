---
layout: default
title: Mustache
section: Syntax
permalink: /docs/syntax/mustache/
---

# Mustache Standards

Where Origami components include templates, the templates must be in [Mustache](http://mustache.github.io/) format.  This is because product developers may choose to use any technology stack to built their application, and it's important that they not be forced to choose a particular one in order to use Origami components.

## Reference formats

Mustache templates can include references to other assets, whether they are data placeholders, other templates, or other modules (all of which need to be resolved server-side), or static assets like images that might need to be resolved on the client.  In many cases these references will need to be transformed by product developers in order to make templates useful, while other product developers may simply use templates as a guide to the markup they must write into their own code.  Either way, templates must refer to external assets in a consistent way.

### Partials (other templates in the same repo)

Partials included from the same repository *must* be referenced using a relative path, prefixed with a `>` and enclosed in double braces:

<pre><code>&#123;{> ../partials/innerbox.mustache }&#125;
</code></pre>

Partials *must not* be included from outside the module.

### Other Origami modules

Other Origami modules *must* be referenced using the name of the module, enclosed in triple braces:

<pre><code>&#123;&#123;{ o-sign-in }&#125;&#125;
</code></pre>

### Static assets

Static assets such as images included from the same repository *must* be referenced using a relative path and included in the appropriate HTML markup

	<img src='../images/logo.png' />

### Links

Links to real URLs must be [protocol-relative](http://www.paulirish.com/2010/the-protocol-relative-url/):

	<a href='//www.google.com'>Google</a>

### Data

Placeholders for the module's data model *must* be referenced using a descriptive (lowercased and hyphened) keyword prefixed with the name of the module and a dot, enclosed in double or triple braces as appropriate:

<pre><code>&#123;{ o-ft-header.main-title }&#125;
</code></pre>

Double braces *must* be used for content that should have HTML entities escaped for display.  Triple braces *must* be used for content which should be inserted without modification.

## Standard variable names

Some Mustache variable names are common across modules.  Where the following use cases arise they *must* use the supplied name:

<table class='o-techdocs-table'>
<tr><th>Var name</th><th>Description</th></tr>
<tr>
	<td><code>module-version</code></td>
	<td>
		The current version of the module component.  Must be added to the outer element of a block of markup that comprises the component, as the value of the <code>data-o-version</code> attribute.
		<pre><code>&lt;div data-o-version="&#123;{o-ft-header.module-version}&#125;"&gt;...&lt;/div&gt;</code></pre>
	</td>
</tr>
</table>
