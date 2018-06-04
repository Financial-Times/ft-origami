---
title: Origami Specification
description: TODO
permalink: /specification/
---


# {{ page.title }}

<ul>
	{% for doc in site.specification %}
		<li>
			<a href="{{ doc.url }}">
				{{ doc.title }}
			</a>
		</li>
	{% endfor %}
</ul>
