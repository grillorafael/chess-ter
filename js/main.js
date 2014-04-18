'use strict';

var Chess = (function (player1, player2) {

  this.player1 = player1;
  this.player2 = player2;

  var game = new Board(player1, player2);

  this.getGame = function() {
    return game;
  }

  var _this = this, selectedPiece = null, table = [
    ['T', 'N', 'B', 'Q', 'K', 'B', 'N', 'T'],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    ['t', 'n', 'b', 'q', 'k', 'b', 'n', 't']
  ];

  var unselectPiece = function() {
    selectedPiece.removeClass('selected');
    selectedPiece = null;
  };

  var handlePieceClick = function(e) {
    // it selects a piece
    if(selectedPiece == null) {
      $(this).addClass('selected');
      selectedPiece = $(this);
    }
    // it unselects a piece
    else if($(this).is(selectedPiece)) {
      $(this).removeClass('selected');
      selectedPiece = null;
    }
    // it selected another piece
    else if(TableUtil.samePieceTypeOf(getPiecePosition($(this)), getPiecePosition(selectedPiece), table)) {
      selectedPiece.removeClass('selected');
      selectedPiece = $(this);
      $(this).addClass('selected');
    }
    // it moves towards another piece
    else {
      moveFromTo(getPiecePosition(selectedPiece), getCellPosition($(this).parents('td')));
    }

    return false;
  };

  var handleSquareClick = function(e) {
    var tdPosition = getCellPosition($(this));

    if(selectedPiece != null) {
      var piecePosition = getPiecePosition();
      moveFromTo(piecePosition, tdPosition);
    }
  };

  var getPiecePosition = function(piece) {
    if(piece === undefined) {
      piece = selectedPiece;
    }
    var pieceTd = piece.parents('td');
    var piecePosition = getCellPosition(pieceTd);
    return piecePosition;
  };

  var getCellPosition = function(cell) {
    var column = cell[0].cellIndex;
    var row = cell[0].parentNode.rowIndex;
    var tdPosition = [row, column];
    return tdPosition;
  };

  var moveFromTo = function(from, to) {
    if(!canMoveFromTo(from, to)) {
      return;
    }

    var piece = $('#' + from[0] + '' + from[1]).find('.piece');
    var cell = $('#' + to[0] + '' + to[1]);

    table[to[0]][to[1]] = table[from[0]][from[1]];
    table[from[0]][from[1]] = '';

    cell.html('');
    cell.append(piece);

    unselectPiece();
  };

  var canMoveFromTo = function(from, to) {
    var possibleMovements = possibleMovementsFor(from, to);
    var totalMovements = possibleMovements.length;
    for(var i = 0; i < totalMovements; i++) {
      var actualMovement = possibleMovements[i];
      if(actualMovement[0] == to[0] && actualMovement[1] == to[1]) {
        return true;
      }
    }
    return false;
  };

  var possibleMovementsFor = function(piecePosition, targetSquare) {
    switch(table[piecePosition[0]][piecePosition[1]].toLowerCase()){
    case 'p':
      return Pawn.possibleMovements(piecePosition, table);
    case 'k':
      return King.possibleMovements(piecePosition, table);
    case 'n':
      return Knight.possibleMovements(piecePosition, table);
    case 't':
      return Tower.possibleMovements(piecePosition, targetSquare, table);
    case 'b':
      return Bishop.possibleMovements(piecePosition, table);
    case 'q':
      return Queen.possibleMovements(piecePosition, targetSquare, table);
    }
  };

  // Adding event listeners
  $('.piece').click(handlePieceClick);
  $('td').click(handleSquareClick);
});

var chess = new Chess(new Player(Player.WHITE), new Player(Player.BLACK));
var a  = chess.getGame();