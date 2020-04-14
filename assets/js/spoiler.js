$(document).on('click', '.spoiler', function() {
  // $(this).removeClass('spoiler');
  $(this).addClass('spoiled');
  $(this).removeAttr('data-tooltip');
});
