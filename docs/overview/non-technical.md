---
layout: default
title: Non-technical explainer
section: Overview
permalink: /docs/overview/non-technical/
site_section: about-origami
---

# Non-technical introduction

Origami is the new way of building websites at the FT.  It's time for something new, to speed up development and enable us to produce higher quality digital products more consistently.

Contents:

1. [Problems we're solving](#the-problems-were-solving)
	* [Repeating work](#repeating-work-again-again-again)
	* [Impenetrable systems](#impenetrable-systems-create-huge-barriers-to-new-developers)
	* [Unable to let go and move on](#unable-to-let-go-and-move-on)
	* [Experts needed everywhere](#experts-needed-everywhere)
	* [Square pegs and round holes](#square-pegs-and-round-holes)

2. [The Origami way](#the-origami-way)

## The problems we're solving

For FT to thrive as a digital organisation, we need to solve some serious technology problems.  They thwart our attempts to do innovative work.  They suck up development resources and leave us with nothing to move forward with.  They threaten to leave us constantly fighting to keep up with our competition.

* Despite having limited technology resources, **we do the same work multiple times**, like slideshows, which have had to be implemented repeatedly on many websites
* The way pages are assembled, and how they function is esoteric. This makes is very difficult for 3rd parties, or even other business units, to make sense of work already completed and make use of it.  It leads to inconsistency, bloated software and brand divergence.
* Services or features on which other bits of our technology depend are forced to live **long beyond their useful life**, such as the many elements of the classic stack.
* **Every project requires elite skills** in numerous areas, placing a huge bottleneck on the engineers that have those skills - skills like ads integration and access control.
* When different systems built by different teams try to integrate with one another, **hugely embarassing problems** on the scale of the pictured style issue *can* occur, and sometimes do.


![The Business blog lacking core styles]({{site.baseurl}}/img/brokenblog.png)


### Repeating work... again, again, again

<p class="lead">Over the years, FT has evolved from having digital represent a tiny fraction of a huge print operation to having it in the centre of the business.  Along the way we've created or acquired over <acronym title="Measured by number of domain names owned by the FT"><b>six hundred websites</b></acronym> and <b>eight hundred <code><em>something</em>.ft.com</code> sites</b>.  Every time we build a new website, we repeat work done before, and we waste time and money.</p>

There are lots of examples of this kind of thing.  While www.ft.com has always been the 'core product' and generally received changes in design first, other sites that are 'FT style' take time to convert over.  The full cost of redesigning anything on the site is often vastly underestimated, because it ultimately includes the cost of bringing all websites that share that style into line with the new standard (a process that often takes *years* to complete).

With the **FT Web App**, we've discovered a whole new way of repeating work.  markets.ft.com already offers all the markets data features we want to offer readers, and yet FT Labs built a new version of Markets Data within the web app, because the version made by MarkIT is not responsively designed and so doesn't work on phones and tablets.  We did the same with **FT Clippings**.

![Markets data, twice]({{site.baseurl}}/img/marketsdata-twice.jpg)

With **Fast FT**, we wanted to avoid building two versions of the same thing, so we built a single product that could be included in both the web app *and* ft.com pages, using a bodge to enable it to 'hijack' a page that belongs to another site.  This saved some effort, but now means that every single Fast FT post shares the same URL and is invisible to Google.

<aside><h4>How to solve it</h4>Where features or elements of design are used in multiple websites, we need to build them to be usable in all those cases, and portable between them, rather than always building features solely in the context of one product.  These components should not be seen as an intrinsic part of <em>any</em> product, but instead as part of the <b>new digital FT</b>.</aside>

### Impenetrable systems create huge barriers to new developers

At the moment a 'new' developer, whether 3rd party or internal, looking to create a branded FT.com product has a lot of work to do. They will need to deconstruct a current page and/or wade through large amounts of code just to find out how to layout a page and style some consistent UI components. It is also likely to consume the time, potentially large amounts of it, of developers who are familiar with the codebase. This prevents them getting on with their own new product development.

<aside><h4>How to solve it</h4>Anything we build should be consistently documented with esoteric terminology defined in a glossary. Our brand guidelines and how they relate to Origami should form a part of the overall documentation effort. There should be little or no reason for a 'new' developer to communicate directly with the maintainers of the Origami components or the design team.</aside>

### Unable to let go and move on

Right now, given the way in which products have historically been (and to some extent still are) built in isolation by separated teams (and often by outside agencies), it's actually hard to know where a particular style or feature has been copied and might still exist.  Equally, low level foundations need to be kept around for years even though they've been superseded, simply because we don't know what might be using them.

<p class="lead">In 2006, when Assanka started working with the FT, their team was told to ignore an old cookie called <code>FT_User</code>, which would soon be removed.  <em>Twelve years later</em> that cookie was still being served, even as plans were being made to retire its successor.</p>

Having to keep old stuff running is (like a ship dragging an anchor) a major handicap on the ability of the FT to adopt new, modern practices.

<aside><h4>How to solve it</h4>Have a plan for retiring a service before it even goes live.  Require product teams and BAs to account for the cost of keeping up with evolving platform services when determining the cost of a project.  Have the technology advertise its own demise clearly to all who use it.</aside>

### Experts needed everywhere

It used to be that building websites was pretty easy.  Now, the difference in expertise from a beginner to an advanced web developer is huge.  It's rare for expert web developers to know the entire web platform, instead, people begin to specialise.  To have a modern website that looks good and has all the fancy features we've come to expect, expensive expert engineers are needed.  We can't afford to do this for every project.

Imagine if everyone had to build their own car.  By yourself you might manage a go-cart.  An expert could build a Jaguar.  But if an expert designed all the bits, got them mass produced and published detailed instructions, you could build a Jaguar too.

<aside><h4>How to solve it</h4>Let the experts make components which wrap up their cleverness in packages which are then far easier for developers with less specialised skills to put together.</aside>

### Square pegs and round holes

We often need one service to integrate with another, but too often we don't recognise this in advance and plan for it.  This means that when the integration is done it's a patch job that attempts to fit a square peg into a round hole.

<p class="lead">The paywall works perfectly for what it as designed for, but it was only designed to protect pages on www.ft.com.  Putting an article not on ft.com behind the pay wall requires a process of multiple redirects, loading of 'fake' pages, hidden frames, and use of ancient, long obsolete templates.</p>

![Paywall on blogs.ft.com]({{site.baseurl}}/img/barrier.png)

That we can put pages on (for example) blogs.ft.com behind the paywall at all is a testament to the ingenuity of the technology team and our ability over the years to bash together existing solutions that have been designed to be one shape into another shape entirely, as business requirements change.  However, if we had considered that the access service was a component of 'the digital FT', not a part of the www.ft.com product, it might have been designed very differently.

Another great example of this is the 'wrappers' - page templates produced as a byproduct of the www.ft.com page building process, and offered to third parties as a 'starting point' from which they can build FT-style products for us.  These have been found to be almost impossible for third parties to use effectively, because the template is too specific to the needs to ft.com.  Sure, it's great if you want to make a page that looks exactly like an FT.com article.  But if we wanted to do that, we'd just publish an article on ft.com!  The reason we're asking the third party to build a product for us is likely to be because it needs to do something ft.com doesn't do, so generally on day one of the project, the third party is already faced with fighting styles and layout rules that they don't want.

The most catastrophic consequence of this happens when the wrapper template is updated and the third party pulls a new copy of it, and then finds that their work is no longer compatible with the wrapper, and bad visual effects result from this.  In reaction to exactly this problem, FT Labs stopped updating wrappers, finding that it was more reliable to simply stick with one they knew worked, even if it was getting progressively more out of date.  This unfortunately caused an even worse problem - ultimately some of the files the wrapper depended on were removed from the web, and the site broke anyway (see pic at the top of this overview).

<aside><h4>How to solve it</h4>Let those who are responsible for a product website serve the entire website.  Give them self-contained components with well defined boundaries that they can incorporate into their products in a way that won't interfere with anything else on the page.  Set well documented standards for these components so product developers know what they're dealing with.</aside>

## The Origami way

<p class="lead">It's time for a completely new approach, using modern tools.</p>

The web has grown up, and discovered concepts that have been around in all other kinds of software engineering for years.  By using those long-established principles we can bring robustness and scale to our web engineering.

We've published a set of [principles]({{site.baseurl}}/docs/overview/principles) that will guide the development of a new generation of components to gradually replace what we have today.  Here's the FT.com homepage, and how it might be divided into components:

![Components on a page]({{site.baseurl}}/img/componentspage.png)

![Components on a page]({{site.baseurl}}/img/componentspage2.png)

You can see from this illustration just how much work we can shift away from product development into component development, which means we can **build products much faster** and with components we already know to be good, **high quality and well tested**.

Some components are completely static content (yellow above), like the search box.  It might do some snazzy things like autosuggest, but it doesn't need to be populated with any dynamic content by the developer.  For these, all the HTML (content), CSS (style) and JavaScript (behaviour) can be downloaded from a module component and incorporated into the developer's page.

Others are JavaScript modules (green), which add some additional content or behaviour to the page once it's done loading, like ads, tracking or the cookie notice.  These might require the developer to point out where to put stuff in the page by dropping in a marker, but that should be as simple as possible so the developer doesn't have to learn much about how it works - something like `<div data-ft-module="ad" data-ad-section="alphaville"></div>`.  This empty container would spring to life when the module kicked in to do its thing.  Keeping the page clear of secondary component content like ads also makes the pages easier for search engines like Google to consume and index.

Some parts of the page are dynamic (purple), and change all the time, like the skyline or nav bar, and which still aren't part of the product we're trying to build.  So to incorporate these quickly into our product, the developer can load the content from a web service that will be provided to supply always-up-to-date data, and can also load the styles and behaviours from an accompanying module.  Again the amount of work the developer needs to do to incorporate these should be absolutely minimal.

Obviously at least some part of the page's content is being generated by the product itself (after all we must be building it for some reason!), but here components can also help.  The developer can draw in modules that contain only styles, with no associated content (light red) so they can write the content themselves and then have the existing, standardised styles applied to it.  We know that these work in all browsers, conform to our design rules, and look good, so using them gives us a way of building robust sites super fast.

Inevitably products will also have a need to create their own content and style it themselves with no help from components at all (dark red).  On the portion of the FT homepage included above, the only example of that is the brand, which is fairly unique to the FT homepage so has no reason to be componentised.  It would be up to the product developer to deal with these bits on their own, but the important thing here is that none of the components they've pulled in will interfere with what they are able to do on the parts of the page where they choose to go it alone.

## Moving forwards

We don't have to switch all at once, but every time we adopt a component, we can immediately discard some legacy technology and gradually components will be everywhere.  As sites are updated or new sites are commissioned, consider whether significant parts of the product can be replaced with components.  As these products age, it then becomes possible to upgrade components selectively, and relatively easily.  We might decide that all sites get tracking code updates automatically, for example, but that changes to the page layout grid (which would be more expensive for products to adapt to) would only be applied to the most current sites, leaving others to continue to work safely on a frozen set of resources.  Because each site is in control of which components it uses and which *versions* of those components it loads, no changes made on one site, or to one component, can unintentionally affect any other.
