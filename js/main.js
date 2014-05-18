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
	  var from = game.at(selectedPiecePosition);
	  var to = game.at(tdPosition);
	  if((game.countMoves < game.countLimits) && game.moveFromTo(selectedPiecePosition, tdPosition)) {
		uimoveFromTo(selectedPiecePosition, tdPosition, beforeBoard);
		game.countMoves ++; 
		if((!to.empty() && !to.isEnemyOf(from)) || (from instanceof Pawn))
		{
			console.log(game.countMoves);
			game.countMoves = 0;
		}
		if(game.countMoves === game.countLimits)
			$('#drawAlert').fadeIn("slow");		
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

    if(game.isPlayerInCheckMate(game.playerTurn)) {
      var player = !game.playerTurn.isWhite() ? 'Branco' : 'Preto';
      $(".piece").unbind("click", handlePieceClick);
      addTextLog('O jogador ' + player + ' ganhou');
    }
    else if(game.isPlayerInCheck(game.playerTurn)) {
      var player = game.playerTurn.isWhite() ? 'Branco' : 'Preto';
      addTextLog('O jogador ' + player + ' está em cheque');
    }
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

var chess = new Chess(new Player(Player.WHITE), new Player(Player.BLACK));
var a  = chess.getGame();
