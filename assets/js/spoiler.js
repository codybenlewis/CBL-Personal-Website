$(document).on('click', '.spoiler', function() {
  $(this).addClass('spoiled');
  $(this).removeAttr('data-tooltip');
});
