
$(document).ready(function() {
  filter();
});

// use Data attribute to filter posts
// https://stackoverflow.com/questions/22699072/using-data-attribute-as-a-selector-to-filter-elements
function filter() {
  var filter = GetURLParameter('filter');
  if (filter != null)  {
    var elems = $('.project-item[data-hashtags*="'+ filter +'"]');
    if (elems.length > 0) {
      $('.project-item').not(elems).hide();
      elems.show();
      $('#filter-title').html("#" + filter + ' ');
      }
    }
}

// Get data attribute from URL
// https://stackoverflow.com/questions/19491336/get-url-parameter-jquery-or-how-to-get-query-string-values-in-js
function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}
