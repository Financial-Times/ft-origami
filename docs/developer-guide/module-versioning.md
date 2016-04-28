---
layout: default
title: Module versioning
section: Modules
permalink: /docs/developer-guide/modules/module-versioning/
site_section: developer-guide

---

# Module versioning

The Origami team update and improve Origami modules frequently. We release updated modules with a new version number. Module version numbers follow the [Semantic Versioning Specification](http://semver.org/) (SemVer). If you’ve used npm this will be familiar as it's the same versioning specification as they use.

Each new version of a module will have a version number like `1.3.0`, `3.2.12` or `10.22.3`. These numbers are the `MAJOR.MINOR.PATCH` numbers.

* **MAJOR**: Increments to this number mean the change was significant, or broke backwards compatibility.
* **MINOR**: Increments to this number mean a non breaking change, such as a performance improvement, a design tweak, or a new feature.
* **PATCH**: Increments to this number mean a bug has been fixed, and the fix was not a breaking change.

When you request an Origami module, you should request a version number or a version range.

You can ask for a specific version, eg `o-buttons@3.1.3`, but it's usually better to ask for a range of versions using the caret character(^), eg `o-buttons@^3.1.3`. The caret here is specifying that you want `o-buttons` at `3.1.3`, but you’ll accept any minor or patch releases too. This means your components will stay more up to date and is safe to do as all breaking changes go out as a Major version.

There’s more to SemVer ranges than just the caret character. To learn about other ways to specify ranges, have a look at npm’s [semver calculator tool](http://semver.npmjs.com).

**The SemVer range you request determines how up to date your components will stay**.

## Version conflicts

Origami modules are built using other modules. For example, `o-buttons` depends on `o-colors`, `o-icons` and `o-hoverable`. Origami modules use SemVer ranges to specify the range of modules they'll accept.

To stop many versions of different components being downloaded to your user’s browsers, when you use more than one component, Origami will flatten the dependencies and try and find a version of the component that both modules can use. This can lead to situations where there is no version of a module that satisfies all SemVer ranges.

Let's look at an example. You have a Build Service request for `o-buttons@^3.0.0` and `o-forms@^1.0.2`.

`o-forms` and `o-buttons` have a shared dependency on `o-colors`, but for `o-buttons@^3.0.0` and `o-forms@^1.0.2` there is no version of `o-colors` that fits within the SemVer ranges specified.

When you request the CSS for `o-buttons@^3.0.0` and `o-forms@^1.0.2` from the Build Service, you get the following conflict notice:

```
/*
Cannot complete build: conflicting dependencies exist.

Unable to find suitable version for o-colors
 - Required at version ^2.3.16 by o-forms@1.0.0
 - Required at version ^3.1.0 by o-buttons@^3.0.0

*/
```

The only fix for this is to use a newer version of `o-forms` or and older version `o-buttons`.

In some cases, the Origami team will back-port features, and widen SemVer ranges to help lessen the impact of conflicts, particularly where a lot of people are still using an older version of a module.

## Shrinkwrapping

In some cases, you might want to tightly lock down the versions of components you're using. This is known as **shrinkwrapping**.

If you're using the Build Service, you can see the shrinkwrapped version of any build service request at the top of a response. So, if you visit

`https://origami-build.ft.com/v2/bundles/css?modules=o-grid@^4.0.0,o-fonts@^1.4.0`

at the top you'll see it's shrinkwrapped equivalent:

```
/** Shrinkwrap URL:
 *    /v2/bundles/css?modules=o-grid%404.0.8%2Co-fonts%401.8.4%2Co-autoinit%401.2.0&shrinkwrap=sass-mq%403.2.9
 */
```

If you're not using the Build Service, you can shrinkwrap your modules using precise SemVer values instead of ranges in your bower.json.


## Beta releases

Origami developers will sometimes release versions of modules with a beta flag.

`o-buttons@^2.0.0-beta`

The presence of `-beta` (or a versioned beta, like `-beta.1`, `-beta.2`) here means this module is still experimental and shouldn't be used in production applications yet.
