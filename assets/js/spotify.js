// Start and then manually refresh content to keep things fresh
$(document).ready(getSpotify);
window.setInterval(getSpotify, 10000);

//keep track of the last song played globally
var trackStored;

function getSpotify() {

  $('#marquee').bind('beforeStarting', function() {
    //code you want to execute before starting the animations
    console.log('test');
  });

  $.getJSON('https://api.codybenlewis.com/spotify/current', function(data) {

    if (data.current != null) {

      //view return data
      console.log(data);

      // don't do anything else if the song hasn't changed
      if (trackStored == data.current.track) {
        console.log(trackStored, track)
        return;
      }

      //update track
      trackStored = data.current.track;

      //build and then inject HTML content.
      //This is more complex than the one below due to the flashing live image
      var live = "<div id='live-container'><img id='live' src='/assets/images/live.png'></div>";
      var intro = "<div id='marquee-container'><div id='marquee'>I'm currently listening to ";
      var track = "<a href='" + data.current.track_link + "'>" + data.current.track + "</a> ";
      var artist = "by <a href='" + data.current.artist_link + "'>" + data.current.artist;
      var outro = "</a> on Spotify.</div><div id='overlay'></div></div>";
      $("#spotify").html(live + intro + track + artist + outro);


      //decide whether or not the final sentence size requires a marquee and apply if necessary
      //SimpleMarquee has it's own version of this but has bugs with dynamic content width changes
      //edited line 179 in jquery.simplemarquee.js to help eliminate error cases
      songWidth = $('#marquee').width() + $('#live-container').width();
      if (songWidth >= $('#spotify').width() * .95) {
        makeMarquee();
      }

    } else {
      $.getJSON('https://api.codybenlewis.com/spotify/recent', function(data) {

        //view return data
        console.log(data);

        // don't do anything else if the song hasn't changed
        if (trackStored == data.recent[0].track) {
          return;
        }

        //update track
        trackStored = data.recent[0].track;

        //build and then inject HTML content
        var intro = "<div id='marquee-container'><div id='marquee'><div id='fade'></div> I was just listening to ";
        var track = '<a href="' + data.recent[0].track_link + '">' + data.recent[0].track + "</a> ";
        var artist = "by <a href='" + data.recent[0].artist_link + "'>" + data.recent[0].artist;
        var outro = "</a> on Spotify, but nothing's playing now.</div><div id='overlay'></div></div>";
        $("#spotify").html(fade + intro + track + artist + outro);

        songWidth = $('#marquee').width();
        if (songWidth >= $('#spotify').width() * .95) {
          makeMarquee();
        }
      });
    }
  });
}


function makeMarquee() {

  var delay = 3000


  $('#marquee').simplemarquee({
    speed: 50,
    cycles: Infinity,
    space: 100,
    delayBetweenCycles: delay,
    handleHover: false,
  });



  //runs when txt starts scrolling for the first time.
  setTimeout(function() {
    $("#overlay").addClass('leftRightFade');
  }, delay);


  // //runs when txt finishes scrolling
  // $("#marquee").bind("cycle", function() {
  //   $("#overlay").removeClass('leftRightFade');
  // });

  var animationDuration = $('.simplemarquee-wrapper').css("animation-duration");
  animationDuration = parseFloat(animationDuration.substring(0, 5)) * 1000;
  console.log(animationDuration);
  //runs right before txt finishes scrolling
  setTimeout(function() {
    $("#overlay").removeClass('leftRightFade');
    console.log('NOW');
  }, animationDuration * 1.5);


  //runs when txt starts scrolling again after a cycle
  $("#marquee").bind("cycle", function() {
    setTimeout(function() {
      $("#overlay").addClass('leftRightFade');
    }, delay);
  });
}
