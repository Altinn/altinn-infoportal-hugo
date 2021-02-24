angular.module('feedbackSummaryModule').controller("feedbackSummaryController", ['$scope', '$filter', 'feedbackService', function ($scope, $filter, feedbackService) {

    $scope.SelectedRow = null;
    $scope.FeedbackSummary = {};

    feedbackService.client.getFeedbackSummary = function onGetFeedbackSummary(obj) {
        $scope.FeedbackSummary = obj;
        $scope.$apply();
    };

    $scope.doGetFeedbackSummary = function () {
        feedbackService.server.getFeedbackSummary();
    };

    feedbackService.client.updateFeedbackSummary = function onUpdateFeedbackSummary(obj) {
        $scope.FeedbackSummary = obj;
        $scope.$apply();
    };

    $scope.doUpdateFeedbackSummary = function (contentGuid, language) {
        feedbackService.server.updateFeedbackSummary(contentGuid, language);
    };


    $scope.doSelectRow = function (contentGuid, language) {

        var found = $filter('getByIdAndLanguage')($scope.FeedbackSummary, contentGuid, language);
        if (found != null) {
            //found.Name = "Hello World!";
            $scope.SelectedRow = found;
        }

        //feedbackService.server.updateFeedbackSummary(contentGuid, language);
    };

    $scope.hubConnected = function () {
        $scope.doGetFeedbackSummary();
    };

    function run() {
        //$scope.ContentGuid = $scope.pageid;
        //$scope.Language = $scope.language;
        //$scope.UserId = $scope.userid;
    }

    //$scope.$watch('pageid', run, true);
    //$scope.$watch('language', run, true);
    //$scope.$watch('userid', run, true);

    $(document).on("HubConnected", $scope.hubConnected);
}]);