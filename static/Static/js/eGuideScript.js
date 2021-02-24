$('#modal').on('show.bs.modal', function (e) {

    var eGuideId = $(this).find(".modal-content-eguide").data("eguideid");
    var storeUrl = $(this).find(".modal-content-eguide").data("endpoint");

    var keys = [];
    var prefix = 'eGuide.' + eGuideId + '.question'

    // Find localstorage keys starting with prefix
    for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).substring(0, prefix.length) == prefix) {
            keys.push(localStorage.key(i));
        }
    }

    // Iterate over keys and remove the items by key
    for (var i = 0; i < keys.length; i++) {
        localStorage.removeItem(keys[i]);
    }

    // If storeUrl is set, send empty array to clear
    if (storeUrl !== undefined && storeUrl !== "") {
        var answers = [];
        $.post(storeUrl, { eGuideId: eGuideId, jsonData: JSON.stringify(answers) });
    }
});

$('#modal').on('loaded.altinn.modal', function (e) {

    $(this).find(".modal-content-eguide form").submit(function (e) {
        e.preventDefault();
    })

    $(this).find(".modal-content-eguide input[type='radio']").change(function () {


        var form = $(this).closest("form")[0];
        var button = $(this).closest(".a-modal-body").find("button.a-btn")
        if (!form.checkValidity()) {
            button.attr("disabled", true);
        } else {
            button.removeAttr("disabled");
        }

        if ($(this).is(':checked')) {

            // Store selection
            var questionId = $(this).closest("fieldset").data("questionid");
            var eGuideId = $(this).closest(".modal-content-eguide").data("eguideid");

            if (eGuideId === undefined || eGuideId === '')
                eGuideId = "0";

            var answer = $(this).val();
            var key = 'eGuide.' + eGuideId + '.question' + questionId;
            localStorage.setItem(key, answer);

            // Find url and button
            var url = $(this).data("url");
            if (url !== undefined && url !== "") {
                // Set button data url to radio button url
                $(button).data("url", url);
            }

            // Send all values to store
            var storeUrl = $(this).closest(".modal-content-eguide").data("endpoint");
            if (storeUrl !== undefined && storeUrl !== "")
            {
                var answers = [];

                for (var i = 0, len = localStorage.length; i < len; i++) {
                    var key = localStorage.key(i);
                    var value = localStorage[key];
                    if (key.indexOf("eGuide." + eGuideId) >= 0) {
                        var questionId = key.substring(("eGuide." + eGuideId + ".question").length);
                        answers.push({
                            key: questionId,
                            value: value
                        });
                    }
                }

                $.post(storeUrl, { eGuideId: eGuideId, jsonData: JSON.stringify(answers) });
            }
        }
    });
});