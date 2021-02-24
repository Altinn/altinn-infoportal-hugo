(function () {
    angular.module('feedbackModule', []);

    $(function () {

        $.connection.hub.logging = true;
        $.connection.hub.start().done(function () {
            console.log("start");
            $.event.trigger({
                type: "HubConnected",
                message: "[Feedback Module] The hub is now connected...",
                time: new Date()
            });
        });
    });

    $.connection.hub.error(function (err) {
        console.log('[Feedback Module] Error: ' + err);
    });

    angular.module('feedbackModule').value('feedbackService', $.connection.feedbackHub);
}());