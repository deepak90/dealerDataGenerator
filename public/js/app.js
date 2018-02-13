$(".delete-item").on("click", function() {
  var $nameText = $(this)
    .parents(".btn-group")
    .siblings(".name-item")
    .text();
  $("#deleteModal")
    .find(".modal-name-item")
    .html($nameText);
});
