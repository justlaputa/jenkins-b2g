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

        var xhr = new window.XMLHttpRequest({
            mozSystem: true
        });

        xhr.open('GET', this.url + query.jobs, true);
        xhr.responseType = 'json';

        xhr.onload = function(e) {
            var err = null;

            if (xhr.status === 200 || xhr.status === 400 || xhr.status === 0) {
                console.log('xhr success');
            } else {
                err = 'error';
                console.log('xhr failed: ', xhr.status);
            }

            if (callback && typeof callback === 'function') {
                setTimeout(function() {
                    callback(err, xhr.response);
                }, 0);
            }
        };

        xhr.ontimeout = function(e) {
            console.log('xhr timeout to get jobs');
        };

        xhr.onerror = function(e) {
            console.log('xhr error: ', e);
        };

        xhr.send();
    };

    window.Jenkins = Jenkins;

} (window, jQuery) );
