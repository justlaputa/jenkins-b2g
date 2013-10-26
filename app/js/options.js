(function(window, $) {
    var Options = function() {
        this.jenkins_url = 'https://builds.apache.org/';
        this.refresh_time = 1000000;
    };


    window.Options = new Options();
} (window, jQuery));
