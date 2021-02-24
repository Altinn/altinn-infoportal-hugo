(function () {
    var app = angular.module('feedbackSummaryModule', []);

    $(function () {

        $.connection.hub.logging = true;
        $.connection.hub.start().done(function () {
            $(document).trigger("HubConnected");
        });
    });

    $.connection.hub.error(function (err) {
        console.log('[Feedback Summary Module] Error: ' + err);
    });
    console.log($.connection);
    angular.module('feedbackSummaryModule').value('feedbackService', $.connection.feedbackHub);

    app.filter('getByIdAndLanguage', function () {
        return function (input, id, lang) {
            var i = 0, len = input.length;
            for (; i < len; i++) {
                if (input[i].ContentGuid == id && input[i].Language == lang) {
                    return input[i];
                }
            }
            return null;
        }
    });

}());