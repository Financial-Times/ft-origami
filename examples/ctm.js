(function() {
	if (Modernizr.classlist && Modernizr.queryselector && Modernizr.localstorage && Modernizr.eventlistener) {
		var j = document.createElement('script');
		j.type = 'text/javascript';
		j.async = true;
		j.src = '/resources/javascript/bundle.js';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(j, s);
		document.documentElement.className += ' o--js';
	} else {
		var i, content, repl, ns = document.getElementsByTagName("noscript");
		for (var i=0, s=ns.length; i<s; i++) {
			content = ns[i].textContent || ns[i].innerText;
			if (content && /\borigami\b/.test(ns[i].className)) {
				repl = document.createElement('div');
				repl.className = 'noscript';
				repl.innerHTML = content;
				ns[i].parentNode.insertBefore(repl, ns[i]);
				ns[i].parentNode.removeChild(ns[i]);
			}
		}
	}
})();