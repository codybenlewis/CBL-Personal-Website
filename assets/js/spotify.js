// Start and then manually refresh content to keep things fresh
$(document).ready(getSpotify);
window.setInterval(getSpotify, 30000);

//keep track of the last song played globally
var trackStored;

function getSpotify() {

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
      var intro = "<div id='marquee'> I'm currently listening to ";
      var track = "<a href='" + data.current.track_link + "'>" + data.current.track + "</a> ";
      var artist = "by <a href='" + data.current.artist_link + "'>" + data.current.artist;
      var outro = "</a> on Spotify.</div>";
      $("#spotify").html(live + intro + track + artist + outro);

      //decide whether or not the final sentence size requires a marquee and apply if necessary
      songWidth = $('#marquee').width() + $('#live-container').width();
      if (songWidth >= $('#spotify').width() * .95) {
        makeMarquee(songWidth);
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
        var intro = "<div id='marquee'> I was just listening to ";
        var track = '<a href="' + data.recent[0].track_link + '">' + data.recent[0].track + "</a> ";
        var artist = "by <a href='" + data.recent[0].artist_link + "'>" + data.recent[0].artist;
        var outro = "</a> on Spotify, but nothing's playing now.</div>";
        $("#spotify").html(intro + track + artist + outro);

        //decide whether or not the final sentence size requires a marquee and apply if necessary
        songWidth = $('#marquee').width();
        if (songWidth >= $('#spotify').width() * .95) {
          makeMarquee();
        }
      });
    }
  });
}

function makeMarquee() {
  $('#marquee').marquee({
    startVisible: true,
    duration: 15000,
    delayBeforeStart: 3000,
    duplicated: true,
    gap: 200,
    //allowCss3Support must be false for pauseOnCycle to work properly.
    //See issues on Github https://github.com/aamirafridi/jQuery.Marquee/issues
    allowCss3Support: false,
    pauseOnCycle: true,
  });
}
