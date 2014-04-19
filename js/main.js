'use strict';

var Chess = (function (player1, player2) {

  this.player1 = player1;
  this.player2 = player2;
  var _this = this,
    selectedPiece = null,
    game = new Board(player1, player2);

  this.getGame = function() {
    return game;
  }

  var unselectPiece = function() {
    selectedPiece.removeClass('selected');
    selectedPiece = null;
  };

  var handlePieceClick = function(e) {
    var clickedPosition = getPiecePosition($(this)),
      selectedPiecePosition = selectedPiece != null ? getPiecePosition() : null;


    if(selectedPiece == null) {
      $(this).addClass('selected');
      selectedPiece = $(this);
    }
    else if($(selectedPiece).is($(this))) {
      $(this).removeClass('selected');
      selectedPiece = null;
    }
    else if(!game.at(clickedPosition).isEnemyOf(game.at(selectedPiecePosition))) {
      selectedPiece.removeClass('selected');
      selectedPiece = $(this);
      $(this).addClass('selected');
    }
    else {
      if(game.moveFromTo(selectedPiecePosition, clickedPosition)) {
        uimoveFromTo(selectedPiecePosition, clickedPosition);
      }
    }

    return false;
  };

  var handleSquareClick = function(e) {
    var tdPosition = getCellPosition($(this));
    if(selectedPiece != null) {
      var selectedPiecePosition = getPiecePosition();
      if(game.moveFromTo(selectedPiecePosition, tdPosition)) {
        uimoveFromTo(selectedPiecePosition, tdPosition);
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

  var getCellPosition = function(cell) {
    return new BoardPosition(cell.attr('id'));
  };

  var uimoveFromTo = function(from, to) {
    var piece = $('#' + from.prettyPrint()).find('.piece');
    var cell = $('#' + to.prettyPrint());
    cell.html('');
    cell.append(piece);
    unselectPiece();
  };

  // Adding event listeners
  $('.piece').click(handlePieceClick);
  $('td').click(handleSquareClick);
});

var chess = new Chess(new Player(Player.WHITE), new Player(Player.BLACK));
var a  = chess.getGame();
