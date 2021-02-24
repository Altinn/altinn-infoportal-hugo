angular.module('feedbackModule').controller("feedbackController", ['$scope', 'feedbackService', function ($scope, feedbackService) {

    $scope.showButtons = true;
    $scope.showTextbox = false;
    $scope.showFeedbackReceived = false;

    $scope.PageName = '';
    $scope.PageUrl = '';
    $scope.FeedbackType = 0;
    $scope.Comment = '';

    feedbackService.client.getFeedback = function onGetFeedback(obj) {
        $scope.PageName = obj.PageName;
        $scope.PageUrl = obj.PageUrl;
        $scope.FeedbackType = obj.FeedbackType;
        $scope.Comment = obj.Comment;
        $scope.$apply();
    };

    $scope.doAddFeedback = function () {
        feedbackService.server.addFeedback($scope.PageName, $scope.PageUrl, $scope.FeedbackType, $scope.Comment);
    };

    $scope.hubConnected = function () {
    };

    $scope.doYesButtonClick = function () {

        $scope.FeedbackType = 1;

        $scope.showTextbox = false;
        $scope.doAddFeedback();

        setTimeout(function () {
            $scope.showButtons = false;
            $scope.showFeedbackReceived = true;
            $scope.$apply();
        }, 1000);
    };

    $scope.doNoButtonClick = function () {

        $scope.FeedbackType = 2;
        $scope.showButtons = true;
        $scope.showTextbox = true;
        $scope.showFeedbackReceived = false;
    };

    $scope.doSendButtonClick = function () {

        $scope.showButtons = false;
        $scope.showTextbox = false;
        $scope.showFeedbackReceived = true;
        $scope.doAddFeedback();
    };

    function run() {
        $scope.PageName = $scope.pageName;
        $scope.PageUrl = $scope.pageUrl;
    }

    $scope.$watch('pageName', run, true);
    $scope.$watch('pageUrl', run, true);

    $(document).on("HubConnected", $scope.hubConnected);
}]);