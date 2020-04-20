$(document).ready(function() {
  filter();
});

// Use data attribute to filter posts
// https://stackoverflow.com/questions/22699072/using-data-attribute-as-a-selector-to-filter-elements
function filter() {
  var filter = GetURLParameter('filter');
  if (filter != null) {

    // get everything with a hashtag
    var elems = $('[data-hashtags]');

    // set a match counters to 0 and hide everything
    var matches = 0;
    var projectMatches = 0;
    var noteMatches = 0;

    $('.project-item').hide();
    $('.project-index-item').hide();
    $('.note-item').hide();

    // for every element with hashtags, get the hashtags, split them into a separate
    // array and check each one for a match
    for (var i = 0; i < elems.length; i++) {
      var dataHashtags = $(elems[i]).attr('data-hashtags');
      var hashtags = dataHashtags.split(" ");
      for (var j = 0; j < hashtags.length; j++) {

        // upon a successful match, show that item and increment the proper match counters
        if (hashtags[j].toLowerCase() == filter.toLowerCase()) {
          $(elems[i]).show();


          if ($(elems[i]).hasClass('project-item') || $(elems[i]).hasClass('project-index-item')) {
            //increment project counter
            projectMatches++;
          } else if ($(elems[i]).hasClass('note-item')) {
            //increment note counter
            noteMatches++;
          }
          matches++;
        }
      }
    }


    if (matches < 1) {
      $('#filter').html("I don't have anything with #" + filter);
      $('#project-filter').hide();
      $('#note-filter').hide();
    } else {

      $('.filter-title').html("#" + filter + ' ');

      if (projectMatches < 1) {
        $('#project-filter').hide();
      }

      if (noteMatches < 1) {
        $('#note-filter').hide();
      }
    }
  } else {
    //if no filter was used, hide everything and tell
    $('#project-filter').html('You need to put a filter in the url.');
    $('#filter-instructions').css("display", "block");
    $('.project-item').hide();
    $('.project-index-item').hide();
    $('#note-filter').hide();
    $('.note-item').hide();
  }
}

// Get filter attribute from URL
// https://stackoverflow.com/questions/19491336/get-url-parameter-jquery-or-how-to-get-query-string-values-in-js
function GetURLParameter(sParam) {
  var sPageURL = window.location.search.substring(1);
  var sURLVariables = sPageURL.split('&');
  for (var i = 0; i < sURLVariables.length; i++) {
    var sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] == sParam) {
      return sParameterName[1];
    }
  }
}
