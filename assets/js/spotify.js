// Start spotify
// If spotify breaks support will ask people to let me knom
$(document).ready(function() {
getSpotify();
support();
});

//Manually refresh content every 60 seconds to keep things fresh
window.setInterval(getSpotify, 60000);

$(window).resize(function () {
  makeMarquee();
});

//keep track of the last song played globally
var trackStored;


function getSpotify() {

  $.getJSON('https://api.codybenlewis.com/spotify/current', function(data) {

    //check if theres's data
    if (data.current != null) {

      //isolate just the song data to cut down some language and log something readable
      data = data.current

      //view return data
      console.log(data);

      // don't do anything else if the song hasn't changed
      if (trackStored == data.track) {
        return;
      }

      //update track stored for comparison
      trackStored = data.track;

      //build and then inject HTML content.
      var sentence = "<div id='live-container'> \
                        <img id='live' src='/assets/images/live.png'> \
                      </div> \
                      <div id='marquee-container'> \
                        <div id='marquee'> \
                          <span> \
                            I'm currently listening to \
                            <a href='" + data.track_link + "'target='_blank'> " + data.track + "</a> by \
                            <a href = '" + data.artist_link + "'target='_blank'> " + data.artist + "</a> \
                            on Spotify. \
                          <span> \
                        </div> \
                        <div id='left-fade'> \
                        </div> \
                        <div id='right-fade'> \
                        </div> \
                      </div>";

      $("#spotify").html(sentence);

      if ( $( "#spotify-data" ).length ) {
        $("#spotify-data").html(" <a href='" + data.track_link + "'target='_blank'> " + data.track + "</a> by <a href = '" + data.artist_link + "'target='_blank'> " + data.artist + "</a>");
      }

      makeMarquee();

    } else {

      $.getJSON('https://api.codybenlewis.com/spotify/recent', function(data) {

        //isolate just thr first song
        data = data.recent[0]

        //isolate just the song data to cut down some language and log something readable
        console.log(data);

        // don't do anything else if the song hasn't changed
        if (trackStored == data.track) {
          return;
        }

        //update track
        trackStored = data.track;

        var sentence = "<div id='marquee-container'> \
                          <div id='marquee'> \
                            <span> \
                              I was just listening to  \
                              <a href='" + data.track_link + "' target='_blank'>" + data.track + "</a> by \
                              <a href = '" + data.artist_link + "' target='_blank'> " + data.artist + "</a> \
                              on Spotify. \
                            </span> \
                          </div> \
                          <div id='left-fade'> \
                          </div> \
                          <div id='right-fade'> \
                          </div> \
                        </div>";

        $("#spotify").html(sentence);

        if ( $( "#spotify-data" ).length ) {
          $("#spotify-data").html(" <a href='" + data.track_link + "'target='_blank'> " + data.track + "</a> by <a href = '" + data.artist_link + "'target='_blank'> " + data.artist + "</a>");
        }

        makeMarquee();

      });
    }
  });
}

// via https://github.com/IndigoUnited/jquery.simplemarquee
function makeMarquee() {

  var delay = 3000

  $('#marquee').simplemarquee({
    speed: 50,
    cycles: Infinity,
    space: 100,
    delayBetweenCycles: delay,
    handleHover: false,
  });

  if ($('#marquee').hasClass('has-enough-space')) {
    $("#right-fade").css('opacity', '0');
    $("#left-fade").css('opacity', '0');
  } else {
    $("#right-fade").css('opacity', '1');
    $("#left-fade").css('opacity', '1');
  }
}

//update the support span with a message for help. If data loads successfully this
//the support span is overwritten so this function won't matter ¯\_(ツ)_/¯
function support() {
  setTimeout(function(){
    $("#support").html("If you see this message <a href='mailto:cblewisnj@gmail.com?subject=Something might be broken'>please tell me</a>");
  }, 10000);
}
