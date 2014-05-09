'use strict';

var Chess = (function (player1, player2) {

  this.player1 = player1;
  this.player2 = player2;
  var _this = this,
    selectedPiece = null,
    game = new Board(player1, player2);

  this.getGame = function() {
    return game;
  };

  var unselectPiece = function() {
    selectedPiece.removeClass('selected');
    selectedPiece = null;
  };

  var handlePieceClick = function(e) {
    var clickedPosition = getPiecePosition($(this)),
      selectedPiecePosition = selectedPiece != null ? getPiecePosition() : null;

    if(selectedPiece == null) {
      if(game.isTurnOfPiecePosition(clickedPosition)) {
        $(this).addClass('selected');
        selectedPiece = $(this);
      }
      else {
        return false;
      }
    }
    else if($(selectedPiece).is($(this))) {
      $(this).removeClass('selected');
      selectedPiece = null;
    }
    else {
      var beforeBoard = jQuery.extend(true, {}, game);
      if(game.moveFromTo(selectedPiecePosition, clickedPosition)) {
        uimoveFromTo(selectedPiecePosition, clickedPosition, beforeBoard);
      }
    }

    return false;
  };

  var handleSquareClick = function(e) {
    var tdPosition = getCellPosition($(this));
    if(selectedPiece != null) {
      var selectedPiecePosition = getPiecePosition();
      var beforeBoard = jQuery.extend(true, {}, game);
      if(game.moveFromTo(selectedPiecePosition, tdPosition)) {
        uimoveFromTo(selectedPiecePosition, tdPosition, beforeBoard);
      }
    }
  };

  var getPiecePosition = function(piece) {
    if(!piece) {
      piece = selectedPiece;
    }
    var pieceTd = piece.parents('td');
    var piecePosition = getCellPosition(pieceTd);
    return piecePosition;
  };

  var refreshTurn = function() {
    if(game.playerTurn.isBlack()) {
      $('#board').addClass('inverse');
      $('#currentTurn').removeClass('white');
    }
    else {
      $('#board').removeClass('inverse');
      $('#currentTurn').addClass('white');
    }
  };

  var getCellPosition = function(cell) {
    return new BoardPosition(cell.attr('id'));
  };

  var uimoveFromTo = function(fromPosition, toPosition, beforeBoard) {
    var from = beforeBoard.at(fromPosition);
    var to = beforeBoard.at(toPosition);

    var fromContent = $('#' + fromPosition.prettyPrint()).find('.piece');
    var toContent = $('#' + toPosition.prettyPrint()).find('.piece');

    $('#' + fromPosition.prettyPrint()).html('');
    $('#' + toPosition.prettyPrint()).html('');

    if((!to.empty() && !to.isEnemyOf(from))) {
      $('#' + fromPosition.prettyPrint()).append(toContent);
      $('#' + toPosition.prettyPrint()).html('');

      if(toPosition.column() > fromPosition.column()) {
        $('#' + fromPosition.nextColumn().nextColumn().prettyPrint()).append(fromContent);
      }
      else {
        $('#' + fromPosition.previousColumn().previousColumn().prettyPrint()).append(fromContent);
      }
    }
    else {
      $('#' + toPosition.prettyPrint()).append(fromContent);
    }

    $(".piece").unbind("click", handlePieceClick);
    $('.piece').click(handlePieceClick);
    unselectPiece();
    refreshTurn();
  };

  // Adding event listeners
  $('.piece').click(handlePieceClick);
  $('td').click(handleSquareClick);
});

var chess = new Chess(new Player(Player.WHITE), new Player(Player.BLACK));
var a  = chess.getGame();
