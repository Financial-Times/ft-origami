---
layout: default
title: New Origami starter guide
permalink: /github-guidelines/
---

# GitHub Guidelines

## How to contribute to Origami

Firstly, thank you for deciding to contribute to Origami! Please find the guidelines for creating issues or pull requests listed below.


### Issues

Before creating a new issue for a component, check the repository's issues list to see if someone else has already created an issue.

#### Reporting bugs

Found a bug with Origami? It will help us to prioritise and fix the bug if you fill out the template below before submitting an issue. Due to a recent new addition to GitHub, the template can be included automatically when an issue is opened.

##### The template for reporting bugs

```
[Short description of the problem]

**Steps taken to reproduce the bug**
1.
2.
3.
...

**Expected outcome**
[Describe the expected outcome]

**Actual outcome**
[Describe the actual outcome]

Note: You can include screenshots/animated gifs if it will help to fix this bug in this section.

**What software/processes was used to replicate this issue**
1. [Browser(s) (include the version number(s))]
2. [Operating System(s)]
3. [Which Origami modules were affected (and include the version number)]
4. [Did you build manually or use the build service?]
5. [If you build manually, which version of Origami Build Tools & node were used?]

* The problem started happening recently, it did not happen in the older versions of the module: [Yes/No]
* The problem can be easily reproduced every time and does not happen randomly: [Yes/No]
```

#### Suggesting improvements to Origami

Before opening a feature request, look through all the Open/Closed issues in the repository to see if there is not a similar suggestion to what you would be suggesting to improve Origami.

```
[Short description of the enhancement suggestion]

**Steps which could explain how the improvement would work with Origami**
1.
2.
3.
...

**Current outcome and suggested improvement's outcome**

[Explain the current outcome and the suggested improvement outcome]

**Why would this improvement be more useful than the current version?**

[Explain why the suggested improvement would be better than the current version]

Note: For UI changes, please include screen-shots/animated GIFs
```


### Pull requests

Before committing a pull request, please make sure that it covers the criteria.

- Follows the [Origami best practices](/docs/developer-guide/general-best-practices/).
- Include screenshots/animated gifs wherever possible.


#### Commit messages

- Use present tense when committing i.e. `Add module-name` not `Added module-name`.
- The first line of the commit message to be 72 characters or less.
- Add references to issues or pull requests in the description with a short explanation of the changes proposed in the pull request.
- Explain why you've made a change as well as what the change is.


#### The template for a pull request

```
Fix/Improve #[issue number]

**Changes proposed in this pull request**
1.
2.
3.
...

@[person/team responsible] for reviewing pull request changes.
```

## Creating templates for Issues or Pull Requests in a repository

As this is a GitHub feature, you can find their [documentation](https://help.github.com/articles/helping-people-contribute-to-your-project/) on creating issues/pull requests templates to assist people in contributing to your repository.
