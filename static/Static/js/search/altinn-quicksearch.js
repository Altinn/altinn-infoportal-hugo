$(document).ready(function () {
    var $enterKey = 13;

    var $search = function ($q, $isFooter) {
        var $query = $q.trim();

        if (!$query) return;

        $query = encodeURIComponent($query);

        var $searchContext = $("input[name=search-context]").val();
        var $baseUrl = $isFooter
            ? $("input[name=search-page-url-footer]").val()
            : $("input[name=search-page-url-body]").val();

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
    $("input[name=search-input-field-mob]").keypress($checkKeyPressForSearch);
    $("input[name=search-input-field-footer]").keypress($checkKeyPressForSearchFooter);

    $("button[name=search-button]").click(function () {
        $search($("input[name=search-input-field]").val(), false);
    });

    $("button[name=search-button-mob]").click(function () {
        $search($("input[name=search-input-field-mob]").val(), false);
    });

    $("button[name=search-button-footer]").click(function () {
        $search($("input[name=search-input-field-footer]").val(), true);
    });
});