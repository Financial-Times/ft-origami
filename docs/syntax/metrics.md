---
layout: default
title: Metrics format
section: Syntax
permalink: /docs/syntax/metrics/
---

# Metrics format

All Origami web services are required to expose multiple `/metrics` endpoints (one for each version, and one at the root) to publish metrics on the current state of the system.  The response give at this URL must be a JSON document conforming to the following format.

## Format

<table class='table'>
<tr>
	<th>Property</th>
	<th>Type</th>
	<th>Description</th>
</tr><tr>
	<td><code>{</code></td>
	<td></td>
	<td></td>
</tr><tr>
	<td>&nbsp;&nbsp;<code>schemaVersion</code></td>
	<td>number*</td>
	<td>Set to 1.</td>
</tr><tr>
	<td>&nbsp;&nbsp;<code>metrics&nbsp;{</code></td>
	<td>array*</td>
	<td>A list of metrics</td>
</tr><tr>
	<td>&nbsp;&nbsp;&nbsp;&nbsp;<code><em>metricname</em>&nbsp;{</code></td>
	<td>object*</td>
	<td>An object representing a single metric.  The object's key is the name of the metric, and may be defined by the service.</td>
</tr><tr>
	<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<code>type</code></td>
	<td>string*</td>
	<td>
		The type of value.  One of:
		<ul>
		<li><code>counter</code>: The value is a number representing a count, eg number of running processes, items in a queue, bytes of disk space remaining, seconds since last new content, etc.</li>
		<li><code>boolean</code>: The value is a simple boolean true/false, eg whether the service can connect to its database.</li>
		<li><code>movingaverage</code>: The value is an average of a set of multiple values over a period of time, eg the response time of a depended-upon service.</li>
		</ul>
	</td>
</tr><tr>
	<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<code>val</code></td>
	<td><em>varies</em>*</td>
	<td>
		The current value of the metric.  In the case of counter metrics, a number.  In the case of boolean metrics, a boolean.  Should not be present for movingaverage metrics.
	</td>
</tr><tr>
	<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<code>units</code></td>
	<td><em>string</em>*</td>
	<td>Count only.  Plural name of the unit of measurement in which val is expressed.  Common values should be 'seconds', 'bytes', 'items', 'processes'.  Prefer base level orders of magnitude (ie. express time in seconds, not milliseconds, and data size in bytes, not megabytes)</td>
</tr><tr>
	<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<code>period</code></td>
	<td><em>number</em>*</td>
	<td>Movingaverage only.  Number of seconds over which the moving average is computed.</td>
</tr><tr>
	<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<code>mean</code></td>
	<td><em>number</em>*</td>
	<td>Movingaverage only.  Mean of all values that fall within the period.</td>
</tr><tr>
	<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<code>min</code></td>
	<td><em>number</em>*</td>
	<td>Movingaverage only.  Smallest value that falls within the period.</td>
</tr><tr>
	<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<code>max</code></td>
	<td><em>number</em>*</td>
	<td>Movingaverage only.  Largest value that falls within the period.</td>
</tr><tr>
	<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<code>stddev</code></td>
	<td><em>number</em>*</td>
	<td>Movingaverage only.  Standard deviation of all values that fall within the period</td>
</tr><tr>
	<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<code>lastUpdated</code></td>
	<td><em>string</em>*</td>
	<td>The time at which the data was last updated (which may be the current time if data is computed on demand, but allows for slow-sunning metrics to be cached).  Date in ISO8601 format.</td>
</tr><tr>
	<td>&nbsp;&nbsp;&nbsp;&nbsp;<code>},</code></td>
	<td></td>
	<td></td>
</tr><tr>
	<td>&nbsp;&nbsp;&nbsp;&nbsp;<code>{ ... }</code></td>
	<td></td>
	<td>Repeat for additional metrics</td>
</tr><tr>
	<td>&nbsp;&nbsp;<code>}</code></td>
	<td></td>
	<td></td>
</tr><tr>
	<td><code>}</code></td>
	<td></td>
	<td></td>
</tr>
</table>

## Example

<?prettify linenums=1?>
	{
	  "schemaVersion": 1,
	  "metrics": {
	     "queueLength": {"type": "counter", "count": 74, "lastUpdated":"2013-08-15T09:34:00Z"},
	     "workerProcessCount": {"type":"counter", "count":4, "lastUpdated":"2013-08-15T09:34:00Z"},
	     "memcacheConnected": {"type":"boolean", "val":true, "lastUpdated":"2013-08-15T09:34:00Z"},
	     "twitterReachable": {"type":"boolean", "val":true, "lastUpdated":"2013-08-15T09:34:00Z"},
	     "twitterRespTime": {"type":"average", "period":60, "mean":3.65, "min":0.8, "max":7.65, "stddev":0.45, "lastUpdated":"2013-08-15T09:34:00Z"}
	   }
	}
