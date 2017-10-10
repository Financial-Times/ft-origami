document.addEventListener("DOMContentLoaded", function(event) {
	var searchBox = document.querySelector('.searchbox');
	searchBox.className += " hidden";

	var searchButton = document.querySelector('.searchbutton');
	searchButton.addEventListener('click', function(event){
		var searchBox = document.querySelector('.searchbox');
		classList = searchBox.className

		if (classList.includes("hidden")) {
			searchBox.className = (classList.replace("hidden", ''));
			searchBox.querySelector("input[type='text']").focus();
		} else {
			searchBox.className += " hidden";
		}
	});
});
