/*globals google*/

'use strict';

(function() {

	//github repos from http://registry.origami.ft.com/components, doesn't include components in stash
	// AB: could use GH API to discover repos
	// const repos = ['n-video'];
	const repos = ['o-grid', 'o-footer', 'n-notification', 'o-overlay', 'o-comment-ui', 'o-autoinit', 'o-errors', 'o-techdocs', 'o-tracking', 'o-ads', 'o-comment-api', 'o-expander', 'o-buttons', 'o-share', 'o-colors', 'o-element-visibility', 'o-comments', 'o-fonts', 'o-ft-icons', 'o-viewport', 'o-chat', 'o-business-card', 'o-header', 'o-labels', 'o-table', 'o-aside-panel', 'o-gallery', 'o-promobox', 'o-quote', 'o-forms', 'o-typography', 'o-hoverable', 'o-tabs', 'o-tweet', 'o-big-number', 'o-comment-utilities', 'o-assets', 'o-layers', 'o-squishy-list', 'o-date', 'o-useragent', 'o-dom', 'o-cookies', 'origami-build-tools', 'polyfill-service'];
	const contributions = [];
	const period = 12;
	let since = new Date();
	since.setMonth(since.getMonth() - period);
	since.setHours(0,0,0,0);
	since = since.toISOString();
	const perPage = 100;
	const message = document.getElementById('token-message');

	function getUrl(type, repo, page, token) {
		return 'https://api.github.com/repos/Financial-Times/' + repo + '/' + type + '?state=all&per_page=' + perPage + '&access_token=' + token + '&since=' + since + '&page=' + (page || 1);
	}

	function addContribution(date, user, category) {
		const entry = {};
		entry.date = date.substring(0, 10);
		entry.user = user;
		entry.issues = 0;
		entry.comments = 0;
		entry.commits = 0;
		entry[category] += 1;

		contributions.push(entry);
	}

	function getContributionsByDay(array) {
		const contribByDate = {};
		array.forEach(function(contrib) {
			if (contrib.date in contribByDate === false) {
				contribByDate[contrib.date] = {contrib: 0, uniqueContrib: 0, users: []};
			}
			contribByDate[contrib.date].contrib += contrib.commits + contrib.issues + contrib.comments;
			if (contribByDate[contrib.date].users.indexOf(contrib.user) === -1) {
				contribByDate[contrib.date].users.push(contrib.user);
			}
			
		});
		return contribByDate;
	}

	function getDatesBetweenDates(start, end) {
		const dates = [];
		while(start < end) {
			const dateString = new Date(start).toISOString().substring(0,10);
			dates.push(dateString);
			start.setDate(start.getDate() + 1);
		}
		return dates;
	}

	function drawTable(users) {
		let rows = ``;
		const leaderboard = document.querySelector('#contrib-leaderboard tbody');
		users.forEach(function(user, index) {
			//todo: hide zeros
			rows += `<tr>
						<td>${index + 1}</td>
						<th scope="row">${user.username}</th>
						<td class="right-align">${(user.commits > 0) ? user.commits : ''}</td>
						<td class="right-align">${(user.issues > 0) ? user.issues : ''}</td>
						<td class="right-align">${(user.comments > 0) ? user.comments : ''}</td>
						<td class="right-align">${user.total}</td>
					</tr>`;
		});
		rows += `</table>`;

		leaderboard.innerHTML = rows;
	}

	function drawChart(chartData) {
		const avgPoints = 7;
		const data = new google.visualization.DataTable();
		data.addColumn('date', 'Date');
		data.addColumn('number', 'Contributions');
		data.addColumn('number', 'Unique contributors');

		chartData = chartData.sort(function(a,b) {
			return (a[0] > b[0]) ? 1 : -1;
		}).map(function(entry) { 
			return [new Date(entry[0]), entry[1], entry[2]];
		}).map(function(row, rowidx, data) {
			if (rowidx < (avgPoints - 1)) return false;
			return row.map(function(val, colidx) {
				if (colidx === 0) return val;

				// Replace column value with an average of the {avgPoints} 
				// previous data points for that column
				return data.slice(rowidx - avgPoints, rowidx).reduce(function(acc, _row) {
					// console.log(row[0], _row[0], colidx, _row[colidx]);
					return acc + _row[colidx];
				}, 0) / avgPoints;
			});

		}).filter(function(row) {
			return (row !== false);
		})

		data.addRows(chartData);
		
		const options = {
			hAxis: {
				title: 'Date'
			},
			vAxis: {
				title: 'Contributions'
			},
			tooltip: {
				trigger: 'none'
			},
			width: 800,
			height: 400
		};

		const chart = new google.visualization.LineChart(document.getElementById('chart_div'));
		chart.draw(data, options);
	}

	function fetchJSON(url) {
		return fetch(url).then(function(response) {
			return response.status === 200 ? response.json() : null;
		});
	}

	function loadData(type) {
		return Promise.all(repos.map(function(repo) {
			return new Promise(function(resolve) {
				let page = 1;
				const token = document.querySelector('#access-token').value;

				function makeRequest(url) {
					fetchJSON(url).then(function(response) {
						if (response === null) {
							message.innerHTML = '<p>Error getting stats. You may have an invalid token.</p>';
							return;
						} 
						response.forEach(function(item) {
							if (type === 'issues' && 'user' in item && 'created_at' in item) {
								addContribution(item.created_at, item.user.login, 'issues');
							} else if (type === 'issues/comments' && 'user' in item && 'created_at' in item) {
								addContribution(item.created_at, item.user.login, 'comments');
							} else if (type === 'commits' && 'author' in item && 'commit' in item) {
								if (item.author !== null) {
									addContribution(item.commit.author.date, item.author.login, 'commits');
								} else {
									addContribution(item.commit.author.date, item.commit.author.email, 'commits');
								}
							}
						});

						if (response.length === perPage) {
							makeRequest(getUrl(type, repo, ++page, token));
						} else {
							resolve();
						}

					});
				}

				if (token !== '') {
					makeRequest(getUrl(type, repo, 1, token));
				} else {
					message.innerHTML = '<p>Please enter your access token</p>'
				}
				
			});
		}));
	}

	function init() {
		Promise.all([
			loadData('issues'),
			loadData('issues/comments'),
			loadData('commits')
		])
		.then(function() {
			const contrib = contributions;
			const map = {};
			contrib.forEach(function(item) {
				const key = item.date + '|' + item.user;
				if (key in map === false) {
					map[key] = {commits: 0, issues: 0, comments: 0}
				}
				map[key].commits += item.commits;
				map[key].issues += item.issues;
				map[key].comments += item.comments;
			});

			const keys = Object.keys(map);
			const selectedPeriod = document.getElementById('select-leaderboard-period');

			function displayPeriod() {
				const formattedArray = keys.map(function(key) {
					const split = key.split('|');
					return {
						date: split[0],
						user: split[1],
						commits: map[key].commits,
						issues: map[key].issues,
						comments: map[key].comments,
					}
				}).filter(function(el) {
					const now = new Date();
					const entryDate = new Date(el.date);
					let cutOffDate;
					now.setUTCHours(0,0,0,0);

					if (selectedPeriod.value === '1-week') {
						const week = 7;
						cutOffDate = now.setUTCDate(now.getUTCDate() - week);
					} else {
						now.setUTCMonth(now.getUTCMonth() - parseInt(selectedPeriod.value));
						cutOffDate = now;
					}

					if (entryDate.getTime() > cutOffDate) {
						return true;
					} else {
						return false;
					}
				});

				// Get a list of days within the last year so we don't have sparse data
				// map the key of dates which have data into this list
				const contributionsByDay = getContributionsByDay(formattedArray);
				const today = new Date();
				const cutOffDate = new Date();
				// lastYear.setUTCFullYear(lastYear.getUTCFullYear() - 1);

				if (selectedPeriod.value === '1-week') {
					const week = 7;
					cutOffDate.setUTCDate(cutOffDate.getUTCDate() - week);
				} else {
					cutOffDate.setUTCMonth(cutOffDate.getUTCMonth() - parseInt(selectedPeriod.value));
				}

				let days = getDatesBetweenDates(cutOffDate, today);

				days = days.map(function(day) {
					return contributionsByDay[day] ? 
						[day, contributionsByDay[day].contrib, contributionsByDay[day].users.length] : 
						[day, 0, 0]
					;
				});

				drawChart(days);


				// format data to draw the table
				// An  {username, date, issues, comments, commits, total}
				const aggregate = {};
				formattedArray.forEach(function(item) {
					if (item.user in aggregate === false) {
						aggregate[item.user] = {commits: 0, issues: 0, comments: 0}
					}
					aggregate[item.user].commits += item.commits;
					aggregate[item.user].issues += item.issues;
					aggregate[item.user].comments += item.comments;
				});

				let users = Object.keys(aggregate);
				users = users.map(function(user, index) {
					return {
						username: user,
						date: aggregate[users[index]].date,
						issues: aggregate[users[index]].issues,
						comments: aggregate[users[index]].comments,
						commits: aggregate[users[index]].commits,
						total: aggregate[users[index]].issues + aggregate[users[index]].comments + aggregate[users[index]].commits
					}
				}).sort(function(a, b) {
					if (a.total < b.total) {
						return 1;
					} else if (a.total > b.total) {
						return -1;
					} else {
						return 0;
					}
				});

				drawTable(users);
			}

			selectedPeriod.addEventListener('change', function() {
				displayPeriod();
			});
			displayPeriod();

			message.innerHTML = '';

		}).catch(function(e) {
			console.log(e);
		});
	}

	// initialise chart before doing github requests
	google.load('visualization', '1', {packages: ['corechart', 'line']});
	google.setOnLoadCallback(function() {
		const goButton = document.querySelector('#get-contrib-stats');
		goButton.addEventListener('click', init);
	});

	

}());