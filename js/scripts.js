$(function () {
  $("#start-pvp-game").click(function () {
    showBoard(true);
  });
  $("#start-pve-game").click(function () {
    showBoard(true);
  });
  $("#start-eve-game").click(function () {
    showBoard(true);
  });
});



function showBoard(show) {
  $('section.select_game')[show ? 'hide' : 'show']()
  $('#main_board')[show ? 'show' : 'hide']()
}