---
title: Origami Documentation
description: TODO
permalink: /documentation/
---


# {{ page.title }}

<ul>
	{% for doc in site.documentation %}
		<li>
			<a href="{{ doc.url }}">
				{{ doc.title }}
			</a>
		</li>
	{% endfor %}
</ul>
