# GitHub Guidelines

`Editor note: This is the first draft of the GitHub guidelines for Origami.`


## How to contribute to Origami

Firstly, thank you for deciding to contribute to Origami! Please find the guidelines for creating issues or pull requests listed below.


### Issues

The first steps to undertake before creating an issue of any type on the repository is to search through the repository's Open/Closed issues to see whenever there's a ticket that replicates the same issue you are having and if there is a fix in progress or has been fixed. If there is no same issue that you are experiencing, then open a new ticket on the affected repository.

#### Reporting bugs

Found a bug with Origami? Fill out the template below before submitting an Issue ticket. Due to a recent new addition to GitHub, the template can be included automatically when an issue is opened.

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

* The problem started happening recently, it did not happen in the older versions of Origami: [Yes/No]
* The problem can be easily reproduced every time and does not happen randomly: [Yes/No]
```

#### Suggesting improvements to Origami

Before opening an issue ticket which is for enhancement purposes, look through all the Open/Closed issues in the repository to see if there is not a similar suggestion to what you would be suggesting to improve Origami.

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

Note: You can include screenshots/animated gifs if you think it will help the cause for the suggested improvement.
```


### Pull requests

Before committing a pull request, please make sure that it covers the criteria.

- Follows the [Origami best practices](/docs/developer-guide/general-best-practices/).
- Include screenshots/animated gifs wherever possible.


#### Commit messages

- Use present tense when committing i.e. `Add module-name` not `Added module-name`.
- The first line of the commit message to be 72 characters or less.
- Add references to issues or pull requests in the description with a short explanation of the changes proposed in the pull request.


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

With the new addition made by GitHub recently, each repository can have its own issues/pull request template which can be tailored in a specific way. To add those to a repository, you need to undergo the following steps below:

1. Navigate to the main page of the repository on GitHub, and click on New File above the file list.
2. There are two options where the template for either issues or pull requests can live in the repository. It can be placed in the hidden folder `.github` or in the root of the repository.
3. To make your template public in the repository, add it to the root of the repository. If you want to make it private, make sure it is located inside the hidden folder `./github`.

The specific names to use for the issues/pull request templates are:

- ISSUE_TEMPLATE
- PULL_REQUEST_TEMPLATE

Note: The template names are not case-sensitive, and can be used with either .md or .txt file extensions.
