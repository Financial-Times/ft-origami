---
layout: default
title: Syntax requirements
section: Syntax requirements
permalink: /docs/syntax-requirements/
---

# Language specific syntax requirements

These rules apply to any code written as part of an Origami component

## JavaScript

### Encapsulation rules

* Add no objects to the global scope, other than JSONp callback function names.  Variables declared outside of any enclosing function are permitted, provided that the module requires a commonJS interface.  If you don't want to depend on CommonJS, wrap the module in an IIFE.
* If the module does not require CommonJS it must include a [Universal Module Definition](https://github.com/umdjs/umd/blob/master/returnExports.js) that includes support for CommonJS.
* Do not execute any code on parse
* Export, at a minimum, an `init` and a `destroy` method
* Do not leave any non-garbage collectable traces after `destroy` is called
* Do not require global variables to be defined prior to the script loading.  If your module requires configuration, read the config from data attributes attached to parts of DOM that your module will own.

### Syntax convention rules

JavaScript *must* be linted with [JSHint](http://www.jshint.com/).  If you wish to specify a particular JSHint configuration you may do so at the module level with a `.jshintrc` file, and at the file level with a `/*jshint: ... */` comment.  If you specify neither of these, code *must* pass a JSHint check with the following settings:

	{
	  forin: true,
	  noarg: true,
	  noempty: true,
	  eqeqeq: true,
	  bitwise: true,
	  strict: true,
	  undef: true,
	  unused: true,
	  curly: true,
	  browser: true,
	  node: true,
	  newcap: true,
	  immed: true,
	  trailing: true,
	  smarttabs: true
	}

Developers *should* stick to the above `jshintrc` config, since this represents a common standard across FT teams, but are permitted to make changes if desired.

## CSS

### Class naming

* Classes that mark the outer element of a module should be named `ft-{modulename}-module`.
* Classes that are not restricted to a module root should be named `ft-{classname}`.
* Classes that are constrained by a module root class selector should be unadorned.

### Other stuff TODO

* Don't use `!important`


## HTML

* Where a component contains a chunk of HTML, it must be (by itself) well formed XML (ie. it must have a single root element, all elements that are opened must be closed, closing tags must be in order)
* Use semantic markup where native elements exist to describe the content (so use `<address>` not `<div class='address'>`)
* The root element should have a class name of `ft-{modulename}-module`
* ID and event handler attributes are not permitted
* No non-HTML content (eg `<script>`, `<style>`, `<link>`)

## JSON

** General rules**

* Use camelCase. Don't use snake_case.
* The entire response should be contained in a root object `{}`. The root object cannot be an array `[]`.
* Only use arrays for a collection when you need an ordinal list or it's dictated by an existing schema. Instead prefer objects for collections especially when the JSON document has internal reference between objects.
* A field's type must be consistent across all object. For example, a field should not be used to hold a string and then later in the document a number. It's also possible to use `null` to represent an uninitialised/no-value scalar. This is not recommended for arrays and objects, instead prefer an empty array/object. i.e. `[]` or `{}`.
* Errors need a minimal JSON(p) response body:

```json
{
  "code": {int},
  "message": {String}
}

```
But can also include a nested error structure. For example:

```json
{
  "code": 500,
  "message": "Internal server error",
  "error": [
    {
      "code": 1222,
      "field": "someField",
      "message": "This is totally broke"
    }
  ]
}
```

* Consider, as a best practice, using an 'envelope' for your domain data. This could be a field called `data`, `items` or `results`. Your choice could depend on the format of the JSON, the Microdata spec uses the `item` field for example and OData uses `results`. It also allows metadata fields to be kept separate and helps you later support a number of JSON formats.

A very simple service that describes social interactions for an article might be:

```json
{
	"_schema": "http://myservice.webservices.ft.com/json-schema/SocialCount"
	"_format": "json-schema",
	"_itemtype": "http://schema.ft.com/SocialCount",
	"data": {
		"articleUrl": "http://www.ft.com/cms/89f000d2-18a6-11e3-83b9-00144feab7de.html"
		"tweets": 10,
		"facebookLikes": 210,
		"comments": 7
	}
}
```

**Schema and JSON formats**

Note: There are competing specs for how to format JSON: JSON-LD, ODATA etc. It is yet to be decided whether FT will adopt them. The choice of which to use will be down to wider adoption at FT, the Origami spec will be updated to reflect this later.

* Generally speaking root fields prefixed with an underscore will be used for Origami defined metadata. This doesn't interfere with JSON-LD or the OData JSON format, or any field names from schema.org. For example:

```json
{
	"_schema": "http://myservice.webservices.ft.com/json-schema/Thing"
	"_format": "json-schema",
	"_itemtype": "http://schema.ft.com/Thing",
	"data": {
	 "_foo": "Underscores are ok here too."
	}
}
```

* The root `_format` field hints to the consumer the rules for processing the document. They'll probably then be able to use a library built to deal with JSON formatted to a known spec.

Values for `_format` can be:

	1. "none" when your the JSON is not formatted according to a known spec. 
	1. "json-ld" use this when the JSON is formatted according to the [JSON-LD spec](http://json-ld.org/spec/latest/json-ld/)
	1. "odata" use this when the JSON is formatted according to the [OData Spec](http://www.odata.org/documentation/odata-v2-documentation/json-format/)
	1. "json-microdata". Use this when the [format](http://foolip.org/microdatajs/live/) follows the [Microdata spec for representing items with JSON](http://www.w3.org/TR/2011/WD-microdata-20110525/#json).

i.e.

```json
{
	"_format": "json-ld"
	...
}
```

* Services should use (or otherwise extend) FT schema so that the vocabulary used across different services become consistent and familiar to the developer. If there is no FT model then use a public from schema.org if there is something relevant available. In many cases we hope that FT models which in fact be extensions of those from a public domain such as schema.org but it's likely there will need to be some deviations. If you find yourself inventing a new model do ask around to find similarities with other models so your service can offer a familiar vocabulary.

Use the `_itemtype` field to indicate the Type. This field name borrows from [Microdata](http://schema.org/docs/gs.html) where there is an equivalent HTML attribute.

```json
{
	"_itemtype": "http://schema.org/NewsArticle"
	...
}
```

* Consider making a [JSON-schema document](http://json-schema.org/example1.html). This helps consumers of your service in a number of ways.

The `_schema` field is used for the URL of this document. Note that a JSON-Schema document should have a `application/schema+json` content-type.

```json
{
	"_schema": "http://myservice.webservices.ft.com/v1/json-schema/NewsArticle"
	...
}
```
