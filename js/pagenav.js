/**
 * Add a second navigation menu to quickly navigate to
 * anchors in the page.
 */

$(function() {
	var list = '', lis = [], scrollmargin, scrolltimer, resizetimer;

	// Find heading 2s and build a link list.  Only proceed if there would be more than 1 item in the list
	$('.main h2[id]').each(function() {
		lis.push('<li id="pagenav-'+this.id+'"><a href="#'+this.id+'">'+this.innerText+'</a></li>');
	});
	if (lis.length < 2) return;
	list = '<ul class="nav sidebar" id="pagenav">'+lis.join('')+'</ul>';

	// Insert the new nav list after the existing one
	$('#sitenav').after(list);

	// Turn it into a bootstrap 'affix' component, which will keep it in view as the user scrolls
	$('#pagenav').affix({
		offset: { top: $('#pagenav').offset().top-50 }
	});

	// Determine border tolerance for highlighting nav sections (once immediately, and then on resize)
	calcScrollMargin();

	function calcScrollMargin() {
		scrollmargin = $(window).height() / 5;
	}

	// On scroll, determine which section is in view, and highlight it
	$(document).on('scroll', function() {
		if (scrolltimer) return;
		scrolltimer = setTimeout(function() {
			scrolltimer = null;
			var scrollos = $(document).scrollTop() + scrollmargin;
			var candidate;
			$('.main h2, .main h3, .main h4').each(function() {
				var thisos = $(this).offset().top;
				if (thisos <= scrollos && $('#pagenav-'+this.id).length) {
					candidate = $('#pagenav-'+this.id);
				} else if (thisos > scrollos && candidate) {
					return false;
				}
			});
			if (candidate && !candidate.hasClass('active')) {
				$('#pagenav li').removeClass('active');
				candidate.addClass('active');
			} else if (!candidate) {
				$('#pagenav li').removeClass('active');
			}
		}, 300);
	});

	// On resize, reconsider boundary tolerance for section highlighting
	$(window).on('resize', function() {
		if (resizetimer) return;
		resizetimer = setTimeout(function() {
			resizetimer = null;
			calcScrollMargin();
		}, 1000);
	});
});
