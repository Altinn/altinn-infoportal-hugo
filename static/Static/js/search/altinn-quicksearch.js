﻿$(document).ready(function () {
    var $enterKey = 13;

    var $search = function ($q, $isFooter) {
        var $query = $q.trim();

        if (!$query) return;

        $query = encodeURIComponent($query);

        var $searchContext = $("input[name=search-context]").val();
        // var $baseUrl = $isFooter
        //     ? $("input[name=search-page-url-footer]").val()
        //     : $("input[name=search-page-url-body]").val();
        var $baseUrl = "/sok"

        var $url = $baseUrl + "?q=" + $query;

        if ($searchContext) {
            $url += "&context=" + $searchContext.trim();
        }

        window.location.href = $url;
    };

    var $checkKeyPressForSearch = function($key) {
      if ($key.which === $enterKey) {
            $search($(this).val(), false);
        }
    };

    var $checkKeyPressForSearchFooter = function ($key) {
        if ($key.which === $enterKey) {
            $search($(this).val(), true);
        }
    };

    $("input[name=search-input-field]").keypress($checkKeyPressForSearch);

    $("button[name=search-button]").click(function () {
        var ID = $(this).attr('id');
        $search($("input[id=input-"+ID+"]").val(), false);
    });
});