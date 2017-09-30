// main javascript

var Carousel = {
	init: function() {
		this.setVars();
		this.setEvents();
		this.setTemplateVars();
	},
	onThumbClick: function(e) {
		// only execute if target is thumb
		if (e.target !== this.thumbContainer) {
			var thumbId = e.target.getAttribute('data-thumb-id');
	  	window.location = this.url + '?id=' + thumbId;
		}
	},
	onPrevClick: function() {
		var left = this.thumbContainer.offsetLeft;
		if (left < 0) {
			this.thumbContainer.style.marginLeft = left+320;
		}
	},
	onNextClick: function() {
		var left = this.thumbContainer.offsetLeft;
		if (left > -640) {
			this.thumbContainer.style.marginLeft = left-320;
		}
	},
	setEvents: function() {
		this.nextButton.addEventListener('click', this.onNextClick.bind(this));
		this.prevButton.addEventListener('click', this.onPrevClick.bind(this));
		this.thumbContainer.addEventListener('click', this.onThumbClick.bind(this));
	},
	setTemplateVars: function() {
		// fill in template
		this.showArt.src = this.show.product_image_url;
		this.showEpisodes.innerHTML = this.show.episodes;
		this.showTitle.innerHTML = this.show.title;
		document.getElementById(this.thumbNum).innerHTML = this.show.id;
		// set active state for thumb
		document.getElementById(this.thumb).style.backgroundColor = '#000';
		// shift to display correct set of thumbs
		function findThumbs(n) {
			if (n > 4 && n <= 8) {
				return 320;
			}
			else if (n > 8) {
				return 640;
			}
			else {
				return 0;
			}
		};
		this.thumbContainer.style.marginLeft = -findThumbs(this.urlParam);
	},
	setVars: function() {
		// 'get' the data (pseudo network call...)
		this.data = JSON.parse(JSON.stringify(shows));
		// get show id from url
		var urlParam = new URLSearchParams(window.location.search).get('id');
		// default to first show if dne or is out of bounds
		this.urlParam = (urlParam && urlParam > 0 && urlParam <= 10) ? urlParam : 1;
		// the rest of the vars
		this.url = window.location.pathname;
		this.showIndex = this.urlParam - 1;
		this.show = this.data[this.showIndex];
		this.thumb = "thumb-" + this.show.id;
		this.thumbNum = "thumb-num-" + this.show.id;
		this.nextButton = document.getElementById("next");
		this.prevButton = document.getElementById("prev");
		this.thumbContainer = document.getElementById("show-thumbs");
		this.showArt = document.getElementById("show-art");
		this.showEpisodes = document.getElementById("show-episodes");
		this.showTitle = document.getElementById("show-title");
	}
};

Carousel.init();
