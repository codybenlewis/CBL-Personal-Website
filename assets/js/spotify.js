// $.ajax({
//      url: "http://192.168.0.170/",
//      success: function (data) {
//        console.log(data)
//        alert(data);
//      }
//    });
//

$.getJSON('http://192.168.0.170/spotify/current', function(data){
console.log(data)
});
