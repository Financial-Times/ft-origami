// Example Cuts the mustard test.  Place this at the end of your HTML file, before the </body>

// A closure keeps the code isolated from any other JavaScript running on the page
(function() {

	// First, test for things that are required by the Origami modules in your bundle, and which you do not plan to polyfill.
	if (Modernizr.queryselector) {

		// Now, test for things you plan to polyfill, and load the polyfills
		Modernizr.load([
		{
			test : Modernizr.fontface,
			nope : ['font-face-polyfill.js', 'font-face-polyfill.css']
		},
		{
			test : Modernizr.websockets,
			nope : 'websockets-polyfill.js',

			// This is run after everything in this group has downloaded
			// and executed, as well everything in all previous groups
			complete : function() {

				// Now all polyfills have loaded, you can load your main JavaScript bundle
				Modernizr.load('/resources/javascript/bundle.js');
			}
		}
	} else {

		// Since the CTM test failed, put the page into no-js mode by adding a 'no-js' class and removing the 'js' class
		document.documentElement.className += ' no-js';
		document.documentElement.className = document.documentElement.className.replace(/\bjs\b/, '');
	}
})();
