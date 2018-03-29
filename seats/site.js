/*Seats */
$('html').removeClass('nojs').addClass('js');

// Add the .fx class after a short delay to avoid triggering any animations on DOM loads
var loadFX = function() {
  $('html').addClass('fx');
}
setTimeout(loadFX, 500);

// Focus inner inputs when li is clicked/tapped

$('.seat input,label').on('click', function(e) {
  var selected = [];
  var total = 0;
  $(this).toggleClass('selected');
  $('.selected','.rows').each(function(){
    var seat = $(this).attr('for');
    // Add the current seat in the set to the `selected` array
    selected.push(seat);
  });
  console.log(selected.length);
  $('#summary').empty();
  $('#summary').append(selected.join(","));
  $('#money').empty();
  $('#money').append('$' + selected.length * 12);
  e.preventDefault();
});
