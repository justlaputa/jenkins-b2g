/** json job status color:
 * "aborted"
 * "aborted_anime"
 * "blue"
 * "blue_anime"
 * "disabled"
 * "grey"
 * "red"
 * "red_anime"
 * "yellow"
 * "yellow_anime"
 */

 $(function(window, $) {

    var color_map = {
        'aborted': {
            status: 'aborted',
            type: 'muted'
        },
        'blue': {
            status: 'succeed',
            type: 'success'
        },
        'disabled': {
            status: 'disabled',
            type: 'inverse'
        },
        'grey': {
            status: 'pending',
            type: 'info'
        },
        'red': {
            status: 'failed',
            type: 'danger'
        },
        'yellow': {
            status: 'unstable',
            type: 'warning'
        },
        'notbuilt': {
            status: 'aborted',
            type: 'muted'
        }
    },

    refreshTimerId = null;

    function processData(data) {
        data.counts = {
            'total': 0,
            'aborted': 0,
            'succeed': 0,
            'disabled': 0,
            'pending': 0,
            'failed': 0,
            'unstable': 0,
            'in_progress': 0
        };

        data['jobs'].forEach(function(job) {

            if (job.color.search(/_anime$/) !== -1) {
                data.counts.in_progress++;
                job.in_progress = true;
                job.color = job.color.replace('_anime', '');
            }

            job.color_type = color_map[job.color].type;
            job.status = color_map[job.color].status;

            data.counts[job.status]++;
            data.counts.total++;
        });

    }

    function switchSection(section) {
        $('section').addClass('hide');
        $('#' + section + '-section').removeClass('hide');
    }

    function showJobsInStatus(status) {
        var jobs = $('.job');

        if (status === 'all') {
            jobs.removeClass('hide');
        } else {
            jobs.addClass('hide').filter('.' + status).removeClass('hide');
        }
    }

    function showLoadingSpin(show) {
        $('#loading-spin').toggleClass('hide', show === false);
    }

    function showJobList(show) {
        $('#jobs-toolbar').toggleClass('hide', show === false);
        $('#job-list').toggleClass('hide', show === false);
    }

    function renderJenkinsJobs(data) {
        $('#job-list').html(templates['joblist'](data));
        $('#jobs-toolbar').html(templates['jobstoolbar'](data.counts));
    }

    function showLoadingJenkinsFail() {
        $('#job-list').text('fail to load');
    }

    function showRefreshLoading(show) {
        $('#refresh-btn span.timer').toggleClass('hide', show);
        $('#refresh-btn span.loading').toggleClass('hide', !show);
        $('#refresh-btn i').toggleClass('fa-spin', show);
    }

    function setRefreshTime(time) {
        $('#refresh-btn span.timer').text(time);
    }

    function resetTimer(time) {
        if (refreshTimerId) {
            clearInterval(refreshTimerId);
        }

        function updateTime() {
            var min = 0,
            sec = 0;

            time--;

            min = Math.floor(time / 60);
            sec = time % 60;

            if (time <=0) {
                showRefreshLoading(true);    
            } else {
                setRefreshTime(min + ':' + sec, false);
            }
        }

        updateTime();

        refreshTimerId = setInterval(updateTime, 1000);
    }

    $(document).on('click', '#jobs-toolbar .filter label', function() {
        var status = $(this).attr('title');

        showJobsInStatus(status);
    });

    $(document).on('click', '#job-list table td.name span', function() {
    });

    $(document).on('click', '#show-jobs-btn', function() {
        switchSection('jobs');
        $(this).addClass('hide').prev().removeClass('hide');
    });

    $(document).on('click', '#refresh-btn', function(e) {
        e.preventDefault();
        e.stopPropagation();

        eventbus.trigger('reset');
    });

    function showJenkinsJobs(data) {
        console.log(data);
        processData(data);

        showLoadingSpin(false);
        showJobList();

        renderJenkinsJobs(data);
    }

    eventbus.on('refresh', function() {
        showRefreshLoading(true);
        resetTimer(Options.get('refresh_time') * 60);
    });

    eventbus.on('switch-section', function(data) {
        switchSection(data);
    });

    eventbus.on('jobs', function(data) {
        showRefreshLoading(false);
        showJenkinsJobs(data);
    });

    if (Options.get('jenkins_url') !== '') {
        resetTimer(Options.get('refresh_time') * 60);
    } else {
        $('#show-jobs-btn').removeClass('hide');
        $('#options-btn').addClass('hide');
        switchSection('options');
    }
} (window, jQuery));
