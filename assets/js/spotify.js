function getSpotify() {
  $.getJSON('https://api.codybenlewis.com/spotify/current', function(data) {
    if (data.current != null) {
      // we have data
      console.log(data);
      var live = '<img id="live" src="/assets/images/live.png">';
      var intro = "I'm currently listening to ";
      var track = '<a href="' + data.current.track_link + '">' + data.current.track + '</a> ';
      var artist = 'by <a href="' + data.current.artist_link + '">' + data.current.artist;
      var outro = '</a> on Spotify. Like, right now.';
      $(spotify).html(live + intro + track + artist + outro);
    } else {
      $.getJSON('https://api.codybenlewis.com/spotify/recent', function(data) {
        console.log(data);
        var intro = 'I was just listening to ';
        var track = '<a href="' + data.recent[0].track_link + '">' + data.recent[0].track + '</a> ';
        var artist = 'by <a href="' + data.recent[0].artist_link + '">' + data.recent[0].artist;
        var outro = "</a> on Spotify, but nothing's playing now.";
        $(spotify).html(intro + track + artist + outro);
      });
    }
  });
}

$( document ).ready(getSpotify);

window.setInterval(getSpotify, 30000);
