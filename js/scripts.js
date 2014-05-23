'use strict';

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
  $('.reinit').click(function () {
    location.reload();
  });
});

function showBoard(show) {
  $('section.select_game')[show ? 'hide' : 'show']();
  $('#main_board')[show ? 'show' : 'hide']();
  $('nav')[show ? 'hide' : 'show']();

  if(show) {
    chess.startGame();
  }
}
