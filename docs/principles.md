---
layout: default
title: Principles
permalink: /docs/principles/
---

# Principles of Origami

This front end strategy commits us to the following principles:

### 1. Everything governed by standards

We'll prioritise generic use cases over popular use cases, and popular use cases over special cases.

### 2. No special cases

No single product or project will affect the way a component is built. No product is more or less important than any other, and we will require something to have real reuse potential and be genuinely generic in order to allow something to become a component.   This avoids creating components with unintentional product bias or maintaining components that we don't need.  This should not stop projects from having a decoupled architecture, but if there aren't enough currently known use cases to create a component, it should not be considered to be one.

### 3. Ease of use

It will be possible for a developer to use any of our components with no more than ten minutes work and they will not require any help or support from us to do so.  We will not require developers to build or compile components if they don't want to, and commit to supplying them as ready-to-use as possible by providing a [build service]({{site.baseurl}}/docs/build-service/).  Our interfaces will follow consistent patterns so that knowing how to use one of our components means a developer will know how to use all of our components.  Learning is expensive, unnecessary learning is waste.

### 4. No opinion on how you should build your application

We do not care how a developer chooses to write their application, and we will not, through our component design, force them to change their own development practices, nor will we give them libraries or modules to run on their product application's backend.

### 5. No unexpected change

Nothing we provide will change unexpectedly.  We will allow developers to remain in control of delivery and upgrading of their own sites so as to avoid or minimise unpredictable behaviour.

### 6. Complete transparency

Everything we make will be completely transparent, so developers can see how it works and not have to second guess what we're doing. We will communicate readily and be receptive to questions.

### 7. Safe encapsulation

Our components will be fully encapsulated (if possible) or namespaced (if not) and will not interfere with one another. They will be good citizens of the page.

### 8. No unnecessary dependencies

We will minimise dependencies on other systems, whether we own them or not.  The fewer dependencies, the more reliable the solution, and the faster we can ship it.

### 9. Encouragement and evangelism

We'll make it insanely easy to do things the standard way, regardless of your technology stack, we'll help you do it, and we'll inform and educate throughout the business to advocate using our components so we get maximum value out of them.  If you want to do something in a non-standard way, we won't get in your way, but we will not help either.

### 10. Better for users

Our components will improve the overall experience for our end users, by making their experience predictable, cohesive and performant. These principles aim to establish a template for a better workflow that helps developers to help users.
