function Chess() {
  _self = this;
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

  unselectPiece = function() {
    _self.selectedPiece.removeClass('selected');
    _self.selectedPiece = null;
  };

  handlePieceClick = function(e) {
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

  handleSquareClick = function(e) {
    var tdPosition = getCellPosition($(this));

    if(_self.selectedPiece != null) {
      var piecePosition = getPiecePosition();
      moveFromTo(piecePosition, tdPosition);
    }
  };

  getPiecePosition = function(piece) {
    if(piece === undefined) {
      piece = _self.selectedPiece;
    }
    var pieceTd = piece.parents('td');
    var piecePosition = getCellPosition(pieceTd);
    return piecePosition;
  };

  getCellPosition = function(cell) {
    var column = cell[0].cellIndex;
    var row = cell[0].parentNode.rowIndex;
    var tdPosition = [row, column];
    return tdPosition;
  };

  moveFromTo = function(from, to) {
    if(!canMoveFromTo(from, to)) return;

    var piece = $('#' + from[0] + '' + from[1]).find('.piece');
    var cell = $('#' + to[0] + '' + to[1]);

    _self.table[to[0]][to[1]] = _self.table[from[0]][from[1]];
    _self.table[from[0]][from[1]] = '';

    cell.html('');
    cell.append(piece);

    unselectPiece();
  };

  canMoveFromTo = function(from, to) {
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

  possibleMovementsFor = function(piecePosition, targetSquare) {
    switch(_self.table[piecePosition[0]][piecePosition[1]].toLowerCase()){
    case 'p':
      return possibleMovementsForPawn(piecePosition);
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
  }

  possibleMovementsForQueen = function(piecePosition, targetSquare)
  {
    var possibleMovements = [];
    try
    {
      if(hasMovedLowerRightDiagonally(piecePosition, targetSquare) && !hasLowerRightDiagonalCollision(piecePosition, targetSquare) 
        && validSquare(piecePosition, targetSquare))
      {
        possibleMovements.push(targetSquare);
      }

      else if(hasMovedLowerLeftDiagonally(piecePosition, targetSquare) && !hasLowerLeftDiagonalCollision(piecePosition, targetSquare) 
        && validSquare(piecePosition, targetSquare))
      {
        possibleMovements.push(targetSquare);
      }

      else if(hasMovedUpperRightDiagonally(piecePosition, targetSquare) && !hasUpperRightDiagonalCollision(piecePosition, targetSquare) 
        && validSquare(piecePosition, targetSquare))
      {
        possibleMovements.push(targetSquare);
      }

      else if(hasMovedUpperLeftDiagonally(piecePosition, targetSquare) && !hasUpperLeftDiagonalCollision(piecePosition, targetSquare) 
        && validSquare(piecePosition, targetSquare))
      {
        possibleMovements.push(targetSquare);
      }

      else if(!hasVerticalCollision(piecePosition, targetSquare) && validSquare(piecePosition, [targetSquare[0], piecePosition[1]]))
      {
        possibleMovements.push([targetSquare[0], piecePosition[1]]);
      }
    
      else if(!hasHorizontalCollision(piecePosition, targetSquare) && validSquare(piecePosition, [piecePosition[0], targetSquare[1]]))
      {
        possibleMovements.push([piecePosition[0], targetSquare[1]]);
      }
    } catch(e) {};

    return possibleMovements;
  };

  possibleMovementsForBishop = function(piecePosition, targetSquare)
  {
    var possibleMovements = [];
    try
    {
      if(hasMovedLowerRightDiagonally(piecePosition, targetSquare) && !hasLowerRightDiagonalCollision(piecePosition, targetSquare) 
        && validSquare(piecePosition, targetSquare))
      {
        possibleMovements.push(targetSquare);
      }

      else if(hasMovedLowerLeftDiagonally(piecePosition, targetSquare) && !hasLowerLeftDiagonalCollision(piecePosition, targetSquare) 
        && validSquare(piecePosition, targetSquare))
      {
        possibleMovements.push(targetSquare);
      }

      else if(hasMovedUpperRightDiagonally(piecePosition, targetSquare) && !hasUpperRightDiagonalCollision(piecePosition, targetSquare) 
        && validSquare(piecePosition, targetSquare))
      {
        possibleMovements.push(targetSquare);
      }

      else if(hasMovedUpperLeftDiagonally(piecePosition, targetSquare) && !hasUpperLeftDiagonalCollision(piecePosition, targetSquare) 
        && validSquare(piecePosition, targetSquare))
      {
        possibleMovements.push(targetSquare);
      }
    } catch(e) {};

    return possibleMovements;
  };

  possibleMovementsForKnight = function(piecePosition)
  {
    var possibleMovements = [];
    try
    {
      if(validSquare(piecePosition, [piecePosition[0] + 2, piecePosition[1] + 1]))
      {
        possibleMovements.push([piecePosition[0] + 2, piecePosition[1] + 1]);
      }
    } catch(e) {};

    try
    {
      if(validSquare(piecePosition, [piecePosition[0] + 2, piecePosition[1] - 1]))
      {
        possibleMovements.push([piecePosition[0] + 2, piecePosition[1] - 1]);
      }
    } catch(e) {};

    try
    {
      if(validSquare(piecePosition, [piecePosition[0] + 1, piecePosition[1] + 2]))
      {
        possibleMovements.push([piecePosition[0] + 1, piecePosition[1] + 2]);
      }
    } catch(e) {};

    try
    {
      if(validSquare(piecePosition, [piecePosition[0] + 1, piecePosition[1] - 2]))
      {
        possibleMovements.push([piecePosition[0] + 1, piecePosition[1] - 2]);
      }
    } catch(e) {};

    try
    {
      if(validSquare(piecePosition, [piecePosition[0] - 2, piecePosition[1] + 1]))
      {
        possibleMovements.push([piecePosition[0] - 2, piecePosition[1] + 1]);
      }
    } catch(e) {};

    try
    {
      if(validSquare(piecePosition, [piecePosition[0] - 2, piecePosition[1] - 1]))
      {
        possibleMovements.push([piecePosition[0] - 2, piecePosition[1] - 1]);
      }
    } catch(e) {};

    try
    {
      if(validSquare(piecePosition, [piecePosition[0] - 1, piecePosition[1] - 2]))
      {
        possibleMovements.push([piecePosition[0] - 1, piecePosition[1] - 2]);
      }
    } catch(e) {};

    try
    {
      if(validSquare(piecePosition, [piecePosition[0] - 1, piecePosition[1] + 2]))
      {
        possibleMovements.push([piecePosition[0] - 1, piecePosition[1] + 2]);
      }
    } catch(e) {};

    return possibleMovements;
  };

  possibleMovementsForTower = function(piecePosition, targetSquare)
  {
    var possibleMovements = [];
    try
    {
      if(!hasVerticalCollision(piecePosition, targetSquare) && validSquare(piecePosition, [targetSquare[0], piecePosition[1]]))
      {
        possibleMovements.push([targetSquare[0], piecePosition[1]]);
      }
    } catch(e) {};

    try
    {
      if(!hasHorizontalCollision(piecePosition, targetSquare) && validSquare(piecePosition, [piecePosition[0], targetSquare[1]]))
      {
        possibleMovements.push([piecePosition[0], targetSquare[1]]);
      }
    } catch(e) {};

    return possibleMovements;
  };

  possibleMovementsForKing = function(piecePosition) {
    var possibleMovements = [];
    try {
      // Down
      if(validSquare(piecePosition, [piecePosition[0] + 1, piecePosition[1]])) {
        possibleMovements.push([piecePosition[0] + 1, piecePosition[1]]);
      }
    }catch (e) {};
    try {
      // Up
      if(validSquare(piecePosition, [piecePosition[0] - 1, piecePosition[1]])) {
        possibleMovements.push([piecePosition[0] - 1, piecePosition[1]]);
      }
    }catch (e) {};

    try {
      // Left
      if(validSquare(piecePosition, [piecePosition[0], piecePosition[1] - 1])) {
        possibleMovements.push([piecePosition[0], piecePosition[1] - 1]);
      }
    }catch (e) {};

    try {
      // Right
      if(validSquare(piecePosition, [piecePosition[0], piecePosition[1] + 1])) {
        possibleMovements.push([piecePosition[0], piecePosition[1] + 1]);
      }
    }catch (e) {};

    try {
      // Upper Right
      if(validSquare(piecePosition, [piecePosition[0] - 1, piecePosition[1] + 1])) {
        possibleMovements.push([piecePosition[0] - 1, piecePosition[1] + 1]);
      }
    }catch (e) {};

    try {
      // Upper Left
      if(validSquare(piecePosition, [piecePosition[0] - 1, piecePosition[1] - 1])) {
        possibleMovements.push([piecePosition[0] - 1, piecePosition[1] - 1]);
      }
    }catch (e) {};

    try {
      // Down Left
      if(validSquare(piecePosition, [piecePosition[0] + 1, piecePosition[1] - 1])) {
        possibleMovements.push([piecePosition[0] + 1, piecePosition[1] - 1]);
      }
    }catch (e) {};

    try {
      // Down Right
      if(validSquare(piecePosition, [piecePosition[0] + 1, piecePosition[1] + 1])) {
        possibleMovements.push([piecePosition[0] + 1, piecePosition[1] + 1]);
      }
    }catch (e) {};

    return possibleMovements;
  };

  possibleMovementsForPawn = function(piecePosition) {
    var piece = _self.table[piecePosition[0]][piecePosition[1]];
    var possibleMovements = [];
    if(piece == piece.toLowerCase()) {
      if(_self.table[piecePosition[0] - 1][piecePosition[1]] == '') {
        possibleMovements.push([piecePosition[0] - 1, piecePosition[1]]);
      }
      if(piecePosition[0] == 6 && _self.table[piecePosition[0] - 2][piecePosition[1]] == '' && possibleMovements.length == 1) {
        possibleMovements.push([piecePosition[0] - 2, piecePosition[1]]);
      }

      try {
        if(_self.table[piecePosition[0] - 1][piecePosition[1] + 1] != '' && _self.table[piecePosition[0] - 1][piecePosition[1] + 1].toUpperCase() == _self.table[piecePosition[0] - 1][piecePosition[1] + 1]) {
          possibleMovements.push([piecePosition[0] - 1, piecePosition[1] + 1]);
        }
      } catch(e) {};

      try {
        if(_self.table[piecePosition[0] - 1][piecePosition[1] - 1] != '' && _self.table[piecePosition[0] - 1][piecePosition[1] - 1].toUpperCase() == _self.table[piecePosition[0] - 1][piecePosition[1] - 1]) {
          possibleMovements.push([piecePosition[0] - 1, piecePosition[1] - 1]);
        }
      }catch (e) {};
    }
    else {
      if(_self.table[piecePosition[0] + 1][piecePosition[1]] == '') {
        possibleMovements.push([piecePosition[0] + 1, piecePosition[1]]);
      }
      if(piecePosition[0] == 1 && _self.table[piecePosition[0] + 2][piecePosition[1]] == '' && possibleMovements.length == 1) {
        possibleMovements.push([piecePosition[0] + 2, piecePosition[1]]);
      }

      try {
        if(_self.table[piecePosition[0] + 1][piecePosition[1] + 1] != '' && _self.table[piecePosition[0] + 1][piecePosition[1] + 1].toLowerCase() == _self.table[piecePosition[0] + 1][piecePosition[1] + 1]) {
          possibleMovements.push([piecePosition[0] + 1, piecePosition[1] + 1]);
        }
      } catch(e) {};

      try {
        if(_self.table[piecePosition[0] + 1][piecePosition[1] - 1] != '' && _self.table[piecePosition[0] + 1][piecePosition[1] - 1].toLowerCase() == _self.table[piecePosition[0] + 1][piecePosition[1] - 1]) {
          possibleMovements.push([piecePosition[0] + 1, piecePosition[1] - 1]);
        }
      }catch (e) {};
    }

    return possibleMovements;
  };

  validSquare = function(piecePosition, squarePosition) {
    return emptyPosition(squarePosition) || !samePieceTypeOf(piecePosition, squarePosition);
  }

  samePieceTypeOf = function(piecePosition, squarePosition) {
    // Returns true if pieces are the same collor
    var pieceUpper = _self.table[piecePosition[0]][piecePosition[1]].toUpperCase() == _self.table[piecePosition[0]][piecePosition[1]];
    var squareUpper = _self.table[squarePosition[0]][squarePosition[1]].toUpperCase() == _self.table[squarePosition[0]][squarePosition[1]];
    return (pieceUpper && squareUpper);
  };

  emptyPosition = function(position) {
    return _self.table[position[0]][position[1]] == '';
  };

  hasHorizontalCollision = function(from, to)
  {
    for(var j=from[1]+1; j<to[1]; j++)
    {
      if(_self.table[from[0]][j] != '')
        return true;
    }

    for(var j=from[1]-1; j>to[1]; j--)
    {
      if(_self.table[from[0]][j] != '')
        return true;
    }

      return false;
  };

  hasVerticalCollision = function(from, to)
  {
    for(var i=from[0]+1; i<to[0]; i++)
    {
      if(_self.table[i][to[1]] != '')
        return true;
    }

    for(var i=from[0]-1; i>to[0]; i--)
    {
      if(_self.table[i][to[1]] != '')
        return true;
    }

    return false;
  };

  hasLowerRightDiagonalCollision = function(from, to)
  {
    var i=from[0]+1;
    var j=from[1]+1;

    while(i<to[0] && j<to[1])
    {
      if(_self.table[i][j] != '')
        return true;
      i++;
      j++;
    }

    return false;
  };

  hasUpperRightDiagonalCollision = function(from, to)
  {
    var i=from[0]-1;
    var j=from[1]+1;

    while(i>to[0] && j<to[1])
    {
      if(_self.table[i][j] != '')
        return true;
      i--;
      j++;
    }

    return false;
  };

  hasLowerLeftDiagonalCollision = function(from, to)
  {
    var i=from[0]+1;
    var j=from[1]-1;

    while(i<to[0] && j>to[1])
    {
      if(_self.table[i][j] != '')
        return true;
      i++;
      j--;
    }

    return false;
  };

  hasUpperLeftDiagonalCollision = function(from, to)
  {
    var i=from[0]-1;
    var j=from[1]-1;

    while(i>to[0] && j>to[1])
    {
      if(_self.table[i][j] != '')
        return true;
      i--;
      j--;
    }

    return false;
  };

  hasMovedLowerRightDiagonally = function(from, to)
  {
    if((Math.abs(from[0] - to[0]) === Math.abs(from[1] - to[1])) && (from[0] - to[0] < 0) && (from[1] - to[1] < 0))
      return true;
    return false;
  };

  hasMovedUpperRightDiagonally = function(from, to)
  {
    if((Math.abs(from[0] - to[0]) === Math.abs(from[1] - to[1])) && (from[0] - to[0] > 0) && (from[1] - to[1] < 0))
      return true;
    return false;
  };

  hasMovedLowerLeftDiagonally = function(from, to)
  {
    if((Math.abs(from[0] - to[0]) === Math.abs(from[1] - to[1])) && (from[0] - to[0] < 0) && (from[1] - to[1] > 0))
      return true;
    return false;
  };

  hasMovedUpperLeftDiagonally = function(from, to)
  {
    if((Math.abs(from[0] - to[0]) === Math.abs(from[1] - to[1])) && (from[0] - to[0] > 0) && (from[1] - to[1] > 0))
      return true;
    return false;
  };

  // Adding event listeners
  $('.piece').click(handlePieceClick);
  $('td').click(handleSquareClick);
};

var chess = new Chess();
