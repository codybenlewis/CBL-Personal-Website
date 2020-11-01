$(document).ready(function() {
$('#intro-spacer').hide();

// Set the the most recent visit in localStorage always
var recentTimestamp = moment().format();
localStorage.setItem('recent-visit', recentTimestamp);

if (localStorage.getItem('first-visit') != null) {
  // A return visit
  var visited = localStorage.getItem('first-visit');
  // console.log('visited: ' + visited);
  visited = moment(visited);

  var now = moment();

  var difference = now.diff(visited, 'hours')
  console.log(difference);

  if (difference >= 1) {
    $('#intro-return').show();
  } else {
    $('#intro-first').show();
    rainConfetti();
  }

} else {
  // The first visit
  // set the the first visit in localStorage if nothing existed
  var firstTimestamp = moment().format();
  localStorage.setItem('first-visit', firstTimestamp);
  $('#intro-first').show();
  rainConfetti();
  }
});


function rainConfetti() {

  setTimeout(function() {
    let scrollHeight = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
  );

    var confettiSettings = {"height":scrollHeight, "max":100, "respawn":false, "start_from_edge":true, "clock": 50, "rotate": true};
    var confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();
  }, 1500);
};


//homepage project colors for America Duck, stringandloop, Quick, Draw!, Server, and Today
//"colors":[[246,26,19],[0,169,137],[255,199,0],[0,113,207],[97,91,148]]

// Confetti.js Json config output
// {"target":"confetti-holder","max":"100","size":"1","animate":true,"props":["circle","square","triangle","line"],"colors":[[165,104,246],[230,61,135],[0,199,228],[253,214,126]],"clock":"25","rotate":true,"width":"1436","height":"757","start_from_edge":false,"respawn":false}
