$(document).ready(function() {
  // alert the value to check if we got it
if (localStorage.getItem('visited') != null) {
  var visited = localStorage.getItem('visited');
  // console.log('visited: ' + visited);
  visited = moment(visited);

  var now = moment().format();

  // console.log(visited.isBefore(now, "hour"));
  $('#intro-first').hide();

} else {
  $('#intro-return').hide();
}


// set the item in localStorage
var timestamp = moment().format();
localStorage.setItem('visited', timestamp);
});
