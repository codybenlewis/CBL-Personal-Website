$(document).ready(function() {
  var interval = setInterval(function() {
    var momentNow = moment();
    $('#clock').html(momentNow.format('dddd') + ' ' + momentNow.format('MMMM DD, YYYY') + ' ' + momentNow.format('hh:mm:ss A'));
  }, 100);
});
