---
layout: default
title: Contributor stats
section: Overview
permalink: /docs/overview/contributor-stats/
---

<link rel="stylesheet" href="//build.origami.ft.com/bundles/css?modules=o-forms@1.0.3,o-buttons@^3.0.0" />

# Contributor stats

<div id="token-message" class="o-forms-message o-forms-message--error">
</div>
<div class="o-forms-group">
	<label class="o-forms-label" for="access-token">GitHub Access Token (Requires public repo scope)</label>
	<input id="access-token" class="o-forms-text" type="text" />
</div>

<div class="o-forms-group">
	<label class="o-forms-label" for="contrib-leaderboard__period">Filter period</label>
	<select name="" class="o-forms-select" id="select-leaderboard-period">
		<option value="12">1 Year</option>
		<option value="6">6 Months</option>
		<option value="3">3 Months</option>
		<option value="1">1 Month</option>
		<!-- <option value="1-week">1 Week</option> -->
	</select>
</div>

<div class="o-forms-group">
	<button class="o-buttons o-buttons--standout o-buttons--big" type="submit" id="get-contrib-stats">Go</button>
</div>

<h2>Contributions over time</h2>
<div id="chart_div"></div>

<h2>Contributor leaderboard</h2>
<table id="contrib-leaderboard">
	<thead>
		<tr>
			<th>Position</th>
			<th>User</th>
			<th>Commits</th>
			<th>Issues</th>
			<th>Comments</th>
			<th>Total</th>
		</tr>
	</thead>
	<tbody>
	</tbody>
</table>

<script type="text/javascript" src="https://www.google.com/jsapi"></script>
<script src="/js/contrib-stats.js"></script>