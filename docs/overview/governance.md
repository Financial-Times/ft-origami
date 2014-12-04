---
layout: default
title: Governance and policy
section: Overview
permalink: /docs/overview/governance/
---

# Governance and policy

The Origami team maintains this site and specification, components and component tools.  It is currently led by Andrew Betts.

## Strategic vision

Everything Origami does is in line with our vision which is twofold: create a unified style for FT websites, and make building websites faster.

### Create a unified style and experience for FT websites

Users find it easier to use our websites if they share a consistent brand identity.  This doesn't mean they all have to stick rigidly to a template or even that there is even on single element that they all have to share.  It's more about establishing a strong consistency of design ethos across sites, so that it's easier to make things match, and when there's no good reason for things to differ, they do match.

More consistent presentation of our brand also helps to support the values and principles that the brand stands for, such as quality and accuracy.

### Make development of websites faster

It's often tempting when building websites to start from a blank canvas, but doing that often leads to solving problems that have already been solved.  And if you have more problems to solve you can't spend as much time on each one.  We should be working with reusable, always-improving solutions that can be shared by everyone, whether that be tools, conventions, components or anything else.

## Objectives

In pursuit of the vision above, we aim to ensure that:

* Updates can be made in one place, but take effect everywhere that they apply
* There is a single source of truth for each element of visual style
* All front end developers have access to a set of good, shared conventions for naming and structuring solutions
* There is a single build pattern for shared UI components
* Tools exist to allow developers to use shared components easily


## Activities

* Identify and prioritise use cases for reusable components (by proactively predicting a need, by discovering requirements in active projects, or by taking explicit requests from product developers)
* Maintain a standard specification for the creation of modules and services, and documentation on how to use them
* Build reusable components, in the form of code modules and web services
* Support and maintain components (both modules and services)
* Encourage other teams to create components where appropriate
* Audit components created by other teams to ensure conformance with the Origami spec
* Provide training to help people outside of Origami (e.g. the design team) to maintain their own Origami components
* Provide tools and services to ensure Origami components can be used with the absolute minimum of training and admin.
* Liaise with other front end developers across all technology projects, to maintain a comprehensive awareness of all front end development activity that is taking place (by following programme updates, attending other projects' standups or scheduling brief meetings to get briefed on new front end work that's being proposed or done)
* Develop tools to make it as easy as possible to adhere to the conventions (without compulsion to use those tools)


## Spec standards

In Origami specification documents, the words **MUST**, **MUST NOT**, **SHOULD**, **SHOULD NOT**, and **MAY** have the meaning given to them in [RFC 2119](http://www.ietf.org/rfc/rfc2119.txt).

## Spec change process

On issues affecting the Origami spec, the team will also consult the Origami advisory group, and take their views into account when making spec changes.

If a spec change is proposed by the spec editor, they will normally create a pull request.  If no objections are received (via pull request comments) within three business days, the change will be merged.  Once an important change is merged, the advisory group will be notified again so that they can keep their programmes up to date with the latest state of the standard, and promote its adoption and use.  All non-trivial changes will be recorded in a chagelog that is part of the specification.

Changes to the spec may also be proposed by anyone via a pull request.  These will be reviewed by the spec editor and if approved, submitted to the advisory group.

The spec editor may choose to skip advisory group approval at their discretion, but should do so only for things that are highly likely to be uncontested.

## Advisory group

The Origami advisory group comprises senior front end developers from across FT technology.  Advisory group members are responsible for:

* subscribing to the `front-end-web` mailing list
* subscribing to Origami spec changes via GitHub
* passing comment on proposed spec changes on behalf of their project or programme group
* passing on their team's feedback and requests to the Origami group
* ensuring that Origami standards are adhered to in their project as far as possible

Current members:

* Rhys Evans (ft.com)
* Luke Kavanagh (Interactive graphics)
* Stuart Turner (Advertising)
* Matt Andrews (Next FT)
* James Nicholls (Membership)
* TBC (Specialist titles)
* TBC (Web app)
