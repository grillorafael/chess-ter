'use strict';

$(function () {
  $("#start-pvp-game").click(function () {
    showBoard(true);
    window.chess = new Chess(new Player(Player.WHITE), new Player(Player.BLACK));
    chess.startGame();
  });
  $("#start-pve-game").click(function () {
    showBoard(true);
    window.chess = new Chess(new Player(Player.WHITE), new PlayerIA(Player.BLACK));
    chess.startGame();

  });
  $("#start-eve-game").click(function () {
    showBoard(true);
    window.chess = new Chess(new PlayerIA(Player.WHITE), new PlayerIA(Player.BLACK));
    chess.startGame();
  });
  $('.reinit').click(function () {
    location.reload();
  });
  $('.draw').click(function () {
    $('#drawAlert').fadeIn("slow");
  });
});

function showBoard(show) {
  $('section.select_game')[show ? 'hide' : 'show']();
  $('#main_board')[show ? 'show' : 'hide']();
  $('nav')[show ? 'hide' : 'show']();
}
