(function(window, $) {
    var jenkins = null
        timer = null;


    function refresh() {
        console.log('start to request data');

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
        jenkins = new Jenkins(Options.jenkins_url);

        timer = setInterval(refresh, Options.refresh_time);

        refresh();
    }

    start();

} (window, jQuery) );
