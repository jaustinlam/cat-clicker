// JavaScript File
var clicks = 0;
$('#cat-img').on('click', function(e){
  clicks += 1;
  $('#score').text(clicks);
});

