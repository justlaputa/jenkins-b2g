(function(window, $) {
    var query = {
        jobs: 'api/json?tree=jobs[color,name,url]'
    };

    function Jenkins(url) {
        this.url = url;
    }

    Jenkins.prototype.setUrl = function(url) {
        this.url = url;
    };

    //async function for getting all jenkins job data
    //callback(err, data)
    Jenkins.prototype.getJobs = function(callback) {

        $.ajax({url: this.url + query.jobs, dataType: 'json'}).done(function(data) {

            console.log('get jenkins data: ', data);

            if (callback) {
                callback(null, data);
            }

        }).fail(function() {

            console.log('request for jobs fails');

            if (callback) {
                callback('error', null);
            }
        });
    };

    window.Jenkins = Jenkins;

} (window, jQuery) );
