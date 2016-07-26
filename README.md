
## Origami

This is the source code for the Origami website. Please visit [http://origami.ft.com/](http://origami.ft.com/) if you're looking for the documentation.


## Running locally

[Jekyll](https://jekyllrb.com/) is used to build this site, and we host it on GitHub pages. Before we can run the site locally, you'll need:

  1. [Node.js](https://nodejs.org)
  2. [Ruby](https://rubylang.org)

Now install all the dependencies required to build the site:

```sh
make install
```

After this, you can start running the site using:

```sh
make serve
```

The locally running website will be viewable here: [`http://localhost:4000/`](http://localhost:4000/).


## Testing

This website is tested with [Pa11y CI](https://github.com/pa11y/ci) using CircleCI. If there are accessibility errors on the website, the build will fail.

If you'd like to run these tests locally, you'll need:

  - [PhantomJS](http://phantomjs.org/) installed
  - [Pa11y CI](https://github.com/pa11y/ci) installed (`npm install -g pa11y-ci`)
  - The site to be running (`make serve`).

You should now be able to run the following to test the site:

```sh
make test
```


## Documentation style guide
This guide is based on https://jacobian.org/writing/great-documentation/. It exists as guidance to help keep our documentation consistent.

### Types of documentation
There are three types of documentation:

1. **Step by step tutorials**: These are the on-ramp for our project. Users should be able to follow one of our step-by-steps and achieve success within 30 minutes. These live in this repo (ft-origami).
1. **Topic guides**: We don't have these yet. They should cover topics in comprehensive detail. They include information that would be too dense for a step-by-step.
1. **Reference**: The Origami Spec is the container for general conventions for Origami components. Each component has it's own reference documentation too, found in its readme, JSdoc and Sassdoc.

### Style
We assume good grammar and proper spelling is already a given so it's not in this list. The Origami Spec is a [normative specification](https://www.w3.org/TR/qaframe-spec/) and follows the conventions of normative specifications. For our other documentation (tutorials, topic guides and readmes) we use a much less formal tone. They should be informative, but breezy and conversational.

1. Be conversational
  - Use contractions: "we're" over "we are"
  - Starting sentences with conjunctions like 'but' or 'so' is allowed
1. Prefer "we" to "I"
  - **good**: "we recommend you do X"
  - **bad**: "I recommend you do X"
1. Use the active voice. If you need help with this one, use [http://www.hemingwayapp.com/](http://www.hemingwayapp.com/)
  - **good**: "we recommend you do X"
  - **bad**: "it is recommended you do X"
1. Omit fluff. Avoid qualifiers like "pretty", "mostly", "probably"
1. Prefer short sentences to long sentences
1. Use British English
  - **good**: organise, favour
  - **bad**: organize, favor
1. Avoid metaphors or turns of phrase that non-native English speakers may not be familiar with
  - **good**: "this site has everything you need to know"
  - **bad**: "this site is a one stop shop for Origami"
1. [Avoid "simply" and other words that trivialise concepts and ideas that might not be trivial](https://css-tricks.com/words-avoid-educational-writing/)
1. Structure documentation for skim readers
  - Code variables go in `back-ticks`
  - Use tables
  - Use asides for extra tidbits
  - Use **strong** and _emphasis_ where appropriate
  - Use lists
  - Break things up with informative headings
1. Always capitalise Origami when referring to the product
1. Never capitalise modules
  - **good**: o-techdocs, o-component
  - **bad**: O-techdocs, O-Techdocs
1. Always capitalise Origami services
  - **good**: the Polyfill Service, the Build Service
  - **bad**: the polyfill service, the build service
