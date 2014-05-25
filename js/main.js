'use strict';

var Chess = (function (player1, player2) {

  this.player1 = player1;
  this.player2 = player2;
  var _this = this,
    selectedPiece = null,
    game = new Board(player1, player2);

  this.startGame = function() {
    if(!this.player1.isHuman()) {
      IAMove();
    }
  };

  this.getGame = function() {
    return game;
  };

  var unselectPiece = function() {
    if(selectedPiece) {
      selectedPiece.removeClass('selected');
      selectedPiece = null;
    }
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
      var from = game.at(selectedPiecePosition);
      var to = game.at(tdPosition);
      if((game.countMoves < game.countLimits) && game.moveFromTo(selectedPiecePosition, tdPosition)) {
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
    if(game.playerBlack.isHuman() && game.playerWhite.isHuman()) {
      if(game.playerTurn.isBlack()) {
        $('#board').addClass('inverse');
        $('#currentTurn').removeClass('white');
      }
      else {
        $('#board').removeClass('inverse');
        $('#currentTurn').addClass('white');
      }
    }

    var IAWillMove = true;
    if(game.isPlayerInCheckMate(game.playerTurn)) {
      IAWillMove = false;
      var player = !game.playerTurn.isWhite() ? 'Branco' : 'Preto';
      $(".piece").unbind("click", handlePieceClick);
      addTextLog('O jogador ' + player + ' ganhou');
    }
    else if(game.isPlayerInCheck(game.playerTurn)) {
      var player = game.playerTurn.isWhite() ? 'Branco' : 'Preto';
      addTextLog('O jogador ' + player + ' está em cheque');
    }
    else if(game.isDraw()) {
      IAWillMove = false;
      addTextLog('O jogo empatou');
    }

    if(IAWillMove && !game.getCurrentPlayerTurn().isHuman()) {
      IAMove();
    }
  };

  var IAMove = function() {
    addTextLog('IA Pensando....');
    setTimeout(function(){
      game.getCurrentPlayerTurn().getNextMove(function(movement){
        var beforeBoard = jQuery.extend(true, {}, game);
        if(game.moveFromTo(movement[0], movement[1])) {
          uimoveFromTo(movement[0], movement[1], beforeBoard);
        }
      });
    }, 200);
  };

  var getCellPosition = function(cell) {
    return new BoardPosition(cell.attr('id'));
  };

  var addTextLog = function(text) {
    $('#game-info').prepend('<li>' + text + '</li>');
  };

  var addToLog = function(pieceClasses, from, to) {
    pieceClasses = pieceClasses.replace('piece', "");
    pieceClasses = pieceClasses.replace('selected', "");
    var text = "De: " + from + " Para: " + to;
    addTextLog('<li><span class="log-piece ' + pieceClasses + '"></span>' + text + '</li>');
  };

  var uimoveFromTo = function(fromPosition, toPosition, beforeBoard) {
    var from = beforeBoard.at(fromPosition);
    var to = beforeBoard.at(toPosition);

    var fromContent = $('#' + fromPosition.prettyPrint()).find('.piece');
    var toContent = $('#' + toPosition.prettyPrint()).find('.piece');

    $('#' + fromPosition.prettyPrint()).html('');
    $('#' + toPosition.prettyPrint()).html('');

    if((!to.empty() && !to.isEnemyOf(from))) {
      addToLog(toContent.attr('class'), toPosition.prettyPrint(), fromPosition.prettyPrint());

      $('#' + fromPosition.prettyPrint()).append(toContent);
      $('#' + toPosition.prettyPrint()).html('');

      if(toPosition.column() > fromPosition.column()) {
        addToLog(fromContent.attr('class'), fromPosition.prettyPrint(), fromPosition.nextColumn().nextColumn().prettyPrint());
        $('#' + fromPosition.nextColumn().nextColumn().prettyPrint()).append(fromContent);
      }
      else {
        addToLog(fromContent.attr('class'), fromPosition.prettyPrint(), fromPosition.previousColumn().previousColumn().prettyPrint());
        $('#' + fromPosition.previousColumn().previousColumn().prettyPrint()).append(fromContent);
      }
    }
    else {
      if((from instanceof Pawn)) {
        if((from.player().isWhite() && toPosition.isTopLine()) || (!from.player().isWhite() && toPosition.isBottomLine())) {
          if(from.player().isWhite()) {
            fromContent.removeClass('white-pawn').addClass('white-queen');
          }
          else {
            fromContent.removeClass('black-pawn').addClass('black-queen');
          }
        }
      }
      addToLog(fromContent.attr('class'), fromPosition.prettyPrint(), toPosition.prettyPrint());
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