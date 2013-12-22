(function(window, $) {
    var jenkins = null
        timer = null;

    function refresh() {
        console.log('start to request data');

        eventbus.trigger('refresh');

        jenkins.getJobs(function(err, data) {
            if (err) {
                console.log('fali to fetch remote data');

                eventbus.trigger('error', [err]);
            } else {
                console.log('got data from remote: ', data);

                eventbus.trigger('jobs', [data]);
            }
        });
    }

    function start() {

        if (timer !== null) {
            clearInterval(timer);
            timer = null;
        }

        if (Options.get('jenkins_url') === '') {
            return;
        }

        jenkins = new Jenkins(Options.get('jenkins_url'));

        timer = setInterval(refresh, Options.get('refresh_time') * 60000);

        refresh();
    }

    eventbus.on('reset', function() {
        start();
    });

    start();

} (window, jQuery) );
