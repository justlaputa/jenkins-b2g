(function(window, $) {
	var options = {};

	function loadOptions () {
		options = {
			jenkins_url: 'https://builds.apache.org/',
			refresh_time: 5
		};

		$('#options').html(templates['options'](options));
	}

	function saveOptions(new_options) {
		$.extend(options, new_options);
	}

	$(document).on('click', '#options-btn', function() {
		eventbus.trigger('switch-section', ['options']);
		$(this).addClass('hide').next().removeClass('hide');
	});

	$(document).on('change', '#options-form input', function() {
		var input = $(this),
		option = {},
		name = input.attr('name'),
		value = input.val();

		option[name] = value;

		saveOptions(option);

		if (input.attr('type') === 'range') {
			input.next().val(value);
		}

		input.parent().find('span').addClass('text-success')
			.text('saved').prepend($('<i>', { 'class' : 'fa fa-check' }));

		eventbus.trigger('reset');
	});

	loadOptions();

	window.Options =  options;
} (window, jQuery));
