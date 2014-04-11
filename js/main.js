'use strict';

function Chess() {
  var _self = this;
  _self.selectedPiece = null;
  _self.table = [
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
    _self.selectedPiece.removeClass('selected');
    _self.selectedPiece = null;
  };

  var handlePieceClick = function(e) {
    // it selects a piece
    if(_self.selectedPiece == null) {
      $(this).addClass('selected');
      _self.selectedPiece = $(this);
    }
    // it unselects a piece
    else if($(this).is(_self.selectedPiece)) {
      $(this).removeClass('selected');
      _self.selectedPiece = null;
    }
    // it moves towards another piece
    else {
      moveFromTo(getPiecePosition(_self.selectedPiece), getCellPosition($(this).parents('td')));
    }

    return false;
  };

  var handleSquareClick = function(e) {
    var tdPosition = getCellPosition($(this));

    if(_self.selectedPiece != null) {
      var piecePosition = getPiecePosition();
      moveFromTo(piecePosition, tdPosition);
    }
  };

  var getPiecePosition = function(piece) {
    if(piece === undefined) {
      piece = _self.selectedPiece;
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

    _self.table[to[0]][to[1]] = _self.table[from[0]][from[1]];
    _self.table[from[0]][from[1]] = '';

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
    switch(_self.table[piecePosition[0]][piecePosition[1]].toLowerCase()){
    case 'p':
      return Pawn.possibleMovements(piecePosition, _self.table);
    case 'k':
      return possibleMovementsForKing(piecePosition);
    case 'n':
      return possibleMovementsForKnight(piecePosition);
    case 't':
      return possibleMovementsForTower(piecePosition, targetSquare);
    case 'b':
      return possibleMovementsForBishop(piecePosition, targetSquare);
    case 'q':
      return possibleMovementsForQueen(piecePosition, targetSquare);
    }
  };

  var possibleMovementsForQueen = function(piecePosition, targetSquare) {
    var possibleMovements = [];
    try {
      if(hasMovedLowerRightDiagonally(piecePosition, targetSquare) && !hasLowerRightDiagonalCollision(piecePosition, targetSquare) && TableUtil.validSquare(piecePosition, targetSquare, _self.table)) {
        possibleMovements.push(targetSquare);
      }
      else if(hasMovedLowerLeftDiagonally(piecePosition, targetSquare) && !hasLowerLeftDiagonalCollision(piecePosition, targetSquare) && TableUtil.validSquare(piecePosition, targetSquare, _self.table)) {
        possibleMovements.push(targetSquare);
      }
      else if(hasMovedUpperRightDiagonally(piecePosition, targetSquare) && !hasUpperRightDiagonalCollision(piecePosition, targetSquare) && TableUtil.validSquare(piecePosition, targetSquare, _self.table)) {
        possibleMovements.push(targetSquare);
      }
      else if(hasMovedUpperLeftDiagonally(piecePosition, targetSquare) && !hasUpperLeftDiagonalCollision(piecePosition, targetSquare) && TableUtil.validSquare(piecePosition, targetSquare, _self.table)) {
        possibleMovements.push(targetSquare);
      }
      else if(!hasVerticalCollision(piecePosition, targetSquare) && TableUtil.validSquare(piecePosition, [targetSquare[0], piecePosition[1]], _self.table)) {
        possibleMovements.push([targetSquare[0], piecePosition[1]]);
      }
      else if(!hasHorizontalCollision(piecePosition, targetSquare) && TableUtil.validSquare(piecePosition, [piecePosition[0], targetSquare[1]], _self.table)) {
        possibleMovements.push([piecePosition[0], targetSquare[1]]);
      }
    } catch(e) {}

    return possibleMovements;
  };

  var possibleMovementsForBishop = function(piecePosition, targetSquare) {
    var possibleMovements = [];
    try {
      if(hasMovedLowerRightDiagonally(piecePosition, targetSquare) && !hasLowerRightDiagonalCollision(piecePosition, targetSquare) && TableUtil.validSquare(piecePosition, targetSquare, _self.table)) {
        possibleMovements.push(targetSquare);
      }
      else if(hasMovedLowerLeftDiagonally(piecePosition, targetSquare) && !hasLowerLeftDiagonalCollision(piecePosition, targetSquare) && TableUtil.validSquare(piecePosition, targetSquare, _self.table)) {
        possibleMovements.push(targetSquare);
      }
      else if(hasMovedUpperRightDiagonally(piecePosition, targetSquare) && !hasUpperRightDiagonalCollision(piecePosition, targetSquare) && TableUtil.validSquare(piecePosition, targetSquare, _self.table)) {
        possibleMovements.push(targetSquare);
      }
      else if(hasMovedUpperLeftDiagonally(piecePosition, targetSquare) && !hasUpperLeftDiagonalCollision(piecePosition, targetSquare) && TableUtil.validSquare(piecePosition, targetSquare, _self.table)) {
        possibleMovements.push(targetSquare);
      }
    } catch(e) {}

    return possibleMovements;
  };

  var possibleMovementsForKnight = function(piecePosition) {
    var possibleMovements = [];
    try {
      if(TableUtil.validSquare(piecePosition, [piecePosition[0] + 2, piecePosition[1] + 1], _self.table)) {
        possibleMovements.push([piecePosition[0] + 2, piecePosition[1] + 1]);
      }
    } catch(e) {}

    try {
      if(TableUtil.validSquare(piecePosition, [piecePosition[0] + 2, piecePosition[1] - 1], _self.table)) {
        possibleMovements.push([piecePosition[0] + 2, piecePosition[1] - 1]);
      }
    } catch(e) {}

    try {
      if(TableUtil.validSquare(piecePosition, [piecePosition[0] + 1, piecePosition[1] + 2], _self.table)) {
        possibleMovements.push([piecePosition[0] + 1, piecePosition[1] + 2]);
      }
    } catch(e) {}

    try {
      if(TableUtil.validSquare(piecePosition, [piecePosition[0] + 1, piecePosition[1] - 2], _self.table)) {
        possibleMovements.push([piecePosition[0] + 1, piecePosition[1] - 2]);
      }
    } catch(e) {}

    try {
      if(TableUtil.validSquare(piecePosition, [piecePosition[0] - 2, piecePosition[1] + 1], _self.table)) {
        possibleMovements.push([piecePosition[0] - 2, piecePosition[1] + 1]);
      }
    } catch(e) {}

    try {
      if(TableUtil.validSquare(piecePosition, [piecePosition[0] - 2, piecePosition[1] - 1], _self.table)) {
        possibleMovements.push([piecePosition[0] - 2, piecePosition[1] - 1]);
      }
    } catch(e) {}

    try {
      if(TableUtil.validSquare(piecePosition, [piecePosition[0] - 1, piecePosition[1] - 2], _self.table)) {
        possibleMovements.push([piecePosition[0] - 1, piecePosition[1] - 2]);
      }
    } catch(e) {}

    try {
      if(TableUtil.validSquare(piecePosition, [piecePosition[0] - 1, piecePosition[1] + 2], _self.table)) {
        possibleMovements.push([piecePosition[0] - 1, piecePosition[1] + 2]);
      }
    } catch(e) {}

    return possibleMovements;
  };

  var possibleMovementsForTower = function(piecePosition, targetSquare) {
    var possibleMovements = [];
    try {
      if(!hasVerticalCollision(piecePosition, targetSquare) && TableUtil.validSquare(piecePosition, [targetSquare[0], piecePosition[1]], _self.table)) {
        possibleMovements.push([targetSquare[0], piecePosition[1]]);
      }
    } catch(e) {}

    try {
      if(!hasHorizontalCollision(piecePosition, targetSquare) && TableUtil.validSquare(piecePosition, [piecePosition[0], targetSquare[1]], _self.table)) {
        possibleMovements.push([piecePosition[0], targetSquare[1]]);
      }
    } catch(e) {}

    return possibleMovements;
  };

  var possibleMovementsForKing = function(piecePosition) {
    var possibleMovements = [];
    try {
      // Down
      if(TableUtil.validSquare(piecePosition, [piecePosition[0] + 1, piecePosition[1]], _self.table)) {
        possibleMovements.push([piecePosition[0] + 1, piecePosition[1]]);
      }
    }catch(e) {}
    try {
      // Up
      if(TableUtil.validSquare(piecePosition, [piecePosition[0] - 1, piecePosition[1]], _self.table)) {
        possibleMovements.push([piecePosition[0] - 1, piecePosition[1]]);
      }
    }catch(e) {}

    try {
      // Left
      if(TableUtil.validSquare(piecePosition, [piecePosition[0], piecePosition[1] - 1], _self.table)) {
        possibleMovements.push([piecePosition[0], piecePosition[1] - 1]);
      }
    }catch(e) {}

    try {
      // Right
      if(TableUtil.validSquare(piecePosition, [piecePosition[0], piecePosition[1] + 1], _self.table)) {
        possibleMovements.push([piecePosition[0], piecePosition[1] + 1]);
      }
    }catch(e) {}

    try {
      // Upper Right
      if(TableUtil.validSquare(piecePosition, [piecePosition[0] - 1, piecePosition[1] + 1], _self.table)) {
        possibleMovements.push([piecePosition[0] - 1, piecePosition[1] + 1]);
      }
    }catch(e) {}

    try {
      // Upper Left
      if(TableUtil.validSquare(piecePosition, [piecePosition[0] - 1, piecePosition[1] - 1], _self.table)) {
        possibleMovements.push([piecePosition[0] - 1, piecePosition[1] - 1]);
      }
    }catch(e) {}

    try {
      // Down Left
      if(TableUtil.validSquare(piecePosition, [piecePosition[0] + 1, piecePosition[1] - 1], _self.table)) {
        possibleMovements.push([piecePosition[0] + 1, piecePosition[1] - 1]);
      }
    }catch(e) {}

    try {
      // Down Right
      if(TableUtil.validSquare(piecePosition, [piecePosition[0] + 1, piecePosition[1] + 1], _self.table)) {
        possibleMovements.push([piecePosition[0] + 1, piecePosition[1] + 1]);
      }
    }catch(e) {}

    return possibleMovements;
  };

  var possibleMovementsForPawn = function(piecePosition) {
    var piece = _self.table[piecePosition[0]][piecePosition[1]];
    var possibleMovements = [];
    if(piece == piece.toLowerCase()) {
      if(_self.table[piecePosition[0] - 1][piecePosition[1]] === '') {
        possibleMovements.push([piecePosition[0] - 1, piecePosition[1]]);
      }
      if(piecePosition[0] == 6 && _self.table[piecePosition[0] - 2][piecePosition[1]] === '' && possibleMovements.length == 1) {
        possibleMovements.push([piecePosition[0] - 2, piecePosition[1]]);
      }

      try {
        if(_self.table[piecePosition[0] - 1][piecePosition[1] + 1] !== '' && _self.table[piecePosition[0] - 1][piecePosition[1] + 1].toUpperCase() == _self.table[piecePosition[0] - 1][piecePosition[1] + 1]) {
          possibleMovements.push([piecePosition[0] - 1, piecePosition[1] + 1]);
        }
      } catch(e) {}

      try {
        if(_self.table[piecePosition[0] - 1][piecePosition[1] - 1] !== '' && _self.table[piecePosition[0] - 1][piecePosition[1] - 1].toUpperCase() == _self.table[piecePosition[0] - 1][piecePosition[1] - 1]) {
          possibleMovements.push([piecePosition[0] - 1, piecePosition[1] - 1]);
        }
      }catch(e) {}
    }
    else {
      if(_self.table[piecePosition[0] + 1][piecePosition[1]] === '') {
        possibleMovements.push([piecePosition[0] + 1, piecePosition[1]]);
      }
      if(piecePosition[0] == 1 && _self.table[piecePosition[0] + 2][piecePosition[1]] === '' && possibleMovements.length == 1) {
        possibleMovements.push([piecePosition[0] + 2, piecePosition[1]]);
      }

      try {
        if(_self.table[piecePosition[0] + 1][piecePosition[1] + 1] !== '' && _self.table[piecePosition[0] + 1][piecePosition[1] + 1].toLowerCase() == _self.table[piecePosition[0] + 1][piecePosition[1] + 1]) {
          possibleMovements.push([piecePosition[0] + 1, piecePosition[1] + 1]);
        }
      } catch(e) {}

      try {
        if(_self.table[piecePosition[0] + 1][piecePosition[1] - 1] !== '' && _self.table[piecePosition[0] + 1][piecePosition[1] - 1].toLowerCase() == _self.table[piecePosition[0] + 1][piecePosition[1] - 1]) {
          possibleMovements.push([piecePosition[0] + 1, piecePosition[1] - 1]);
        }
      }catch(e) {}
    }

    return possibleMovements;
  };

  var hasHorizontalCollision = function(from, to) {
    for(var j=from[1]+1; j<to[1]; j++) {
      if(_self.table[from[0]][j] !== '') {
        return true;
      }
    }

    for(var j=from[1]-1; j>to[1]; j--) {
      if(_self.table[from[0]][j] !== '') {
        return true;
      }
    }
    return false;
  };

  var hasVerticalCollision = function(from, to) {
    for(var i=from[0]+1; i<to[0]; i++) {
      if(_self.table[i][to[1]] !== '') {
        return true;
      }
    }

    for(var i=from[0]-1; i>to[0]; i--) {
      if(_self.table[i][to[1]] !== '') {
        return true;
      }
    }
    return false;
  };

  var hasLowerRightDiagonalCollision = function(from, to) {
    var i = from[0]+1;
    var j = from[1]+1;

    while(i<to[0] && j<to[1]) {
      if(_self.table[i][j] !== '') {
        return true;
      }
      i++;
      j++;
    }

    return false;
  };

  var hasUpperRightDiagonalCollision = function(from, to) {
    var i = from[0]-1;
    var j = from[1]+1;

    while(i>to[0] && j<to[1]) {
      if(_self.table[i][j] !== '') {
        return true;
      }
      i--;
      j++;
    }

    return false;
  };

  var hasLowerLeftDiagonalCollision = function(from, to) {
    var i = from[0]+1;
    var j = from[1]-1;

    while(i<to[0] && j>to[1]) {
      if(_self.table[i][j] !== '') {
        return true;
      }
      i++;
      j--;
    }

    return false;
  };

  var hasUpperLeftDiagonalCollision = function(from, to) {
    var i = from[0]-1;
    var j = from[1]-1;

    while(i>to[0] && j>to[1]) {
      if(_self.table[i][j] !== '') {
        return true;
      }
      i--;
      j--;
    }

    return false;
  };

  var hasMovedLowerRightDiagonally = function(from, to) {
    if((Math.abs(from[0] - to[0]) === Math.abs(from[1] - to[1])) && (from[0] - to[0] < 0) && (from[1] - to[1] < 0)) {
      return true;
    }
    return false;
  };

  var hasMovedUpperRightDiagonally = function(from, to) {
    if((Math.abs(from[0] - to[0]) === Math.abs(from[1] - to[1])) && (from[0] - to[0] > 0) && (from[1] - to[1] < 0)) {
      return true;
    }
    return false;
  };

  var hasMovedLowerLeftDiagonally = function(from, to) {
    if((Math.abs(from[0] - to[0]) === Math.abs(from[1] - to[1])) && (from[0] - to[0] < 0) && (from[1] - to[1] > 0)) {
      return true;
    }
    return false;
  };

  var hasMovedUpperLeftDiagonally = function(from, to) {
    if((Math.abs(from[0] - to[0]) === Math.abs(from[1] - to[1])) && (from[0] - to[0] > 0) && (from[1] - to[1] > 0)) {
      return true;
    }
    return false;
  };

  // Adding event listeners
  $('.piece').click(handlePieceClick);
  $('td').click(handleSquareClick);
}

var chess = new Chess();
