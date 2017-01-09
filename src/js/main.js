var $ = jQuery.noConflict();
var EA = function() {
	var page = {
		window : $(window),
		html   : $('html'),
		body   : $('body'),
		page   : $('.page'),
		main   : $('.main'),
		header : $('.header'),
		footer : $('.footer')
	};

	function ready(){
		page.html.addClass('ready');
	}

	function load(){
		$(window).load(function() {
			page.html.addClass("load");
		});
	}

	function hasJs(){
		page.html.removeClass('no-js').addClass('has-js');
	}

	function run(){
		console.log("run");
	}

	return {
		init: function() {
			hasJs(),
			ready(),
			load();

			run();
		}
	};
}();

var EApp = function(){
	this.example = function(param){
		var def;
		arguments.length ? def = param : def = 1;
		return def;
	}

	this.init = function(){
		_self = this;
		(function(arg){
			console.log(_self.example(arg));
		})(100);
	}
}

var GetEApp = new EApp();

$(document).ready(function() {
	EA.init();
	GetEApp.init();
});