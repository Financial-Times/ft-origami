$(function() {
	var list = '', lis = [], scrollmargin, scrolltimer, resizetimer;
	$('.main h2[id]').each(function() {
		lis.push('<li id="pagenav-'+this.id+'"><a href="#'+this.id+'">'+this.innerText+'</a></li>');
	});
	if (lis.length < 2) return;

	list = '<ul class="nav sidebar" id="pagenav">'+lis.join('')+'</ul>';
	$('#sitenav').after(list);

	$('#pagenav').affix({
		offset: { top: $('#pagenav').offset().top-50 }
	});

	calcScrollMargin();


	function calcScrollMargin() {
		scrollmargin = $(window).height() / 5;
	}

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

	$(window).on('resize', function() {
		if (resizetimer) return;
		resizetimer = setTimeout(function() {
			resizetimer = null;
			calcScrollMargin();
		}, 1000);
	});
});
