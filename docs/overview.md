---
layout: default
title: Overview
permalink: /docs/overview/
---

# Introduction to Origami

Origami is the new proposed way of building websites at the FT.  It's time for something new, to speed up development and enable us to produce higher quality digital products more consistently.

Contents:

1. [Problems we're solving](#the_problems_were_solving)
2. [The Origami way](#the_origami_way)

## The problems we're solving

For FT to thrive as a digital organisation, we need to solve some serious technology problems.  They thwart our attempts to do innovative work.  They suck up development resources and leave us with nothing to move forward with.  They threaten to leave us constantly fighting to keep up with our competition.

* Despite having limited technology resources, **we do the same work multiple times**, like updating the design of the FT navigation bar which has to be done separately on dozens of websites
* Services or features on which other bits of our technology depend are forced to live **long beyond their useful life**, such as cookies that we still send despite their having being technically retired *seven years ago*.
* **Every project requires elite skills** in numerous areas, placing a huge bottleneck on the engineers that have those skills - skills like ads integration and access control.
* When different systems built by different teams try to integrate with one another, **hugely embarassing problems** on the scale of the pictured style issue *can* occur, and sometimes do.

![The Business blog lacking core styles]({{site.baseurl}}/img/brokenblog.png)


### Repeating work.. again, again, again

<p class='lead'>Over the years, FT has evolved from having digital represent a tiny fraction of a huge print operation to having it in the centre of the business.  Along the way we've created or acquired over <acronym title='Measured by number of domain names owned by the FT'><b>six hundred websites</b></acronym> and <b>eight hundred <code><em>something</em>.ft.com</code> sites</b>.  Every time we build a new website, we repeat work done before, and we waste time and money.</p>

There are lots of examples of this kind of thing.  While www.ft.com has always been the 'core product' and generally received changes in design first, other sites that are 'FT style' take time to convert over.  The full cost of redesigning anything on the site is often vastly underestimated, becuase it should by rights include the cost of bringing all websites that share that style into line with the new standard (a process that often takes *years* to complete).

With the **FT Web App**, we've discovered a whole new way of repeating work.  markets.ft.com already offers all the markets data features we want to offer readers, and yet FT Labs built a new version of Markets Data within the web app, because the version made by MarkIT is not responsively designed and so doesn't work on phones and tablets.  We did the same with **FT Clippings**.

![Markets data, twice]({{site.baseurl}}/img/marketsdata-twice.jpg)

With **Fast FT**, we wanted to avoid building two versions of the same thing, so we built a single product that could be included in both the web app *and* ft.com pages, using a bodge to enable it to 'hijack' a page that belongs to another site.  This saved some effort, but now means that every single Fast FT post shares the same URL and is invisible to Google.

This type of repetition is caused by having two digital channels (the web app and ft.com), one of which doesn't really work for desktop users, and one of which doesn't really work for mobile users.  The web app is globally recognised as a gold standard in touch based user experience, but that doesn't mean that every single FT service needs to be replicated within it in order to work for mobile users.

<div class='well'><h4>How to solve it</h4>Where features or elements of design are used in multiple websites, we need to build them to be usable in all those cases, and portable between them, rather than always building features solely in the context of one product.  These components should not be seen as an intrinsic part of <em>any</em> product, but instead as part of the <b>new digital FT</b>.</div>

### Unable to let go and move on

Right now, given the way in which products have historically been (and to some extent still are) built in isolation by separated teams (and often by outside agencies), it's actually hard to know where a particular style or feature has been copied and might still exist.  Equally, low level foundations need to be kept around for years even though they've been superceded, simply because we don't know what might be using them.

<p class='lead'>In 2006, when Assanka started working with the FT, their team was told to ignore an old cookie called <code>FT_User</code>, which would soon be removed.  <em>Seven years later</em>, that cookie <b>is still being served today</b>, even as plans are being made to retire its successor.</p>

Having to keep old stuff running is (like a ship dragging an anchor) a major handicap on the ability of the FT to adopt new, modern practices.

<div class='well'><h4>How to solve it</h4>Have a plan for retiring a service before it even goes live.  Require product teams and BAs to account for the cost of keeping up with evolving platform services when determining the cost of a project.  Have the technology advertise its own demise clearly to all who use it.</div>

### Experts needed everywhere

It used to be that building websites was pretty easy.  Now, the difference in expertise from a beginner to an advanced web developer is huge.  It's rare for expert web developers to know the entire web platform, instead, people begin to specialise.  To have a modern website that looks good and has all the fancy features we've come to expect, expensive expert engineers are needed.  We can't afford to do this for every project.

<p class='lead'>TODO: Choose a good example</p>

Imagine if every time you wanted to go to the shops, you had to build a car.  By yourself you might manage a go-cart.  An expert could build a Jaguar.  But if an expert designed all the bits, got them mas produced and published detailed instructions, you could build a Jaguar too.

<div class='well'><h4>How to solve it</h4>Let the experts make components which wrap up their cleverness in packages which are then far easier for developers with less specialised skills to put together.</div>

### Square pegs and round holes

We often need one service to integrate with another, but too often we don't recognise this in advance and plan for it.  This means that when the integration is done it's a patch job that attempts to fit a square peg into a round hole.

<p class='lead'>The paywall works perfectly for what it as designed for, but it wasn't designed to protect pages not on www.ft.com.  Putting an article not on ft.com behind the pay wall requires a process of multiple redirects, loading of 'fake' pages, hidden frames, and use of ancient, long obsolete templates.</p>

![Paywall on blogs.ft.com]({{site.baseurl}}/img/barrier.png)

That we can put pages on (for example) blogs.ft.com behind the paywall at all is a testament to the ingenuity of the technology team and our ability over the years to bash existing solutions that have been designed to be one shape into another shape entirely, as business requirements change.  However, if we had considered that the access service was a component of 'the digital FT', not a part of the www.ft.com product, it might have been designed very differently.

Another great example of this is the 'wrappers' - page templates produced as a byproduct of the www.ft.com page building process, and offered to third parties as a 'starting point' from which they can build FT-style products for us.  These have been found to be almost impossible for third parties to use effectively, because the template is too specific to the needs to ft.com.  Sure, it's great if you want to make a page that looks exactly like an FT.com article.  But if we wanted to do that, we'd just publish an article on ft.com!  The reason we're asking the third party to build a product for us is likely to be because it needs to do something ft.com doesn't do, so generally on day one of the project, the third party is already faced with fighting styles and layout rules that they don't want.

The most catestrophic consequence of this happens when the wrapper template is updated and the third party pulls a new copy of it, and then finds that their work is no longer compatible with the wrapper, and bad visual effects result from this.  In reaction to exactly this problem, FT Labs stopped updating wrappers, finding that it was more reliable to simply stick with one they knew worked, even if it was getting progressively more out of date.  This unfortunately caused an even worse problem - ultimately some of the files the wrapper depended on were removed from the web, and the site broke anyway (see pic at the top of this overview).

<div class='well'><h4>How to solve it</h4>Let those who are responsible for a product website serve the entire website.  Give them self-contained components with well defined boundaries that they can incorporate into their products in a way that won't interfere with anything else on the page.  Set well documented standards for these components so product developers know what they're dealing with.</div>

## The Origami way

<p class='lead'>It's time for a completely new approach, using modern tools.</p>

The web has grown up, and discovered concepts that have been around in all other kinds of software engineering for years.

We've published a set of [principles]({{site.baseurl}}/docs/principles) that will guide the development of a new generation of components to gradually replace what we have today.  The

* deprecated websites should be left in 'managed decline' on older versions of dependencies (BBC does this with their old news pages for example).
