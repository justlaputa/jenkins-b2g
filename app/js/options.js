(function(window, $) {

	function Option() {
		this.jenkins_url = "";
		this.refresh_time = 0;

		this.defaults = {
			jenkins_url: '',
			refresh_time: 5
		};

		if (!window.localStorage['jenkins_url']) {
			this.reset();
		}
	}

	Option.prototype.get = function(key) {
		var value = window.localStorage[key];

		if (key === 'refresh_time') {
			value = parseInt(value);
		}

		return value;
	}

	Option.prototype.set = function(key, value) {
		window.localStorage[key] = value;
	}

	Option.prototype.all = function() {
		return 	{
			jenkins_url: window.localStorage['jenkins_url'],
			refresh_time: window.localStorage['refresh_time']
		}
	};

	Option.prototype.defaults = function() {
		return this.defaults;
	}

	Option.prototype.reset = function() {
		for (var key in this.defaults) {
			window.localStorage[key] = this.defaults[key];
		}
	}

	window.Options = new Option();

	$(document).on('click', '#options-btn', function() {
		eventbus.trigger('switch-section', ['options']);
		$(this).addClass('hide').next().removeClass('hide');
	});

	$(document).on('change', '#options-form input', function() {
		var input = $(this),
		option = {},
		name = input.attr('name'),
		value = input.val();

		window.Options.set(name, value);

		if (input.attr('type') === 'range') {
			input.next().val(value);
		}

		input.parent().find('span').addClass('text-success')
			.text('saved').prepend($('<i>', { 'class' : 'fa fa-check' }));

		eventbus.trigger('reset');
	});

	function loadOptions () {
		var options = window.Options.all();

		$('#options').html(templates['options'](options));
	}

	loadOptions();
} (window, jQuery));
