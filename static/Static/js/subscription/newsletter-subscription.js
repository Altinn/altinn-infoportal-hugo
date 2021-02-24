$(document).ready(function () {
  var $form = $("form[id=subscribtion]");

  var $emailInput = $form.find("input[id=text-input-epost]");
  var $subscribeButton = $form.find("button[id=a-js-subscribtion-submit]");
  var $undoButton = $form.find("a[class=a-js-undo]");
  var $subscriptionTypeInput = $form.find("input[id=subscription-type]");

  var $subscribe = function ($undo) {

    var $email = $emailInput.val();
    var $lang = $("html").attr('lang');
    var $type = $subscriptionTypeInput.val();

    if (!$email)
      return;

    var $url = "/" + $lang + "/subscribe/" + $email + "/" + $type + "/" + $undo;

    $.post($url);
  }

  $subscribeButton.click(function () {
    $subscribe(false);
  });

  $undoButton.click(function () {
    $subscribe(true);
  });
});