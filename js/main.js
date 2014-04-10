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

  _self.unselectPiece = function() {
    _self.selectedPiece.removeClass('selected');
    _self.selectedPiece = null;
  };

  _self.handlePieceClick = function(e) {
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
      _self.moveFromTo(_self.getPiecePosition(_self.selectedPiece), _self.getCellPosition($(this).parents('td')));
    }

    return false;
  };

  _self.handleSquareClick = function(e) {
    var tdPosition = _self.getCellPosition($(this));

    if(_self.selectedPiece != null) {
      var piecePosition = _self.getPiecePosition();
      _self.moveFromTo(piecePosition, tdPosition);
    }
  };

  _self.getPiecePosition = function(piece) {
    if(piece === undefined) {
      piece = _self.selectedPiece;
    }
    var pieceTd = piece.parents('td');
    var piecePosition = _self.getCellPosition(pieceTd);
    return piecePosition;
  };

  _self.getCellPosition = function(cell) {
    var column = cell[0].cellIndex;
    var row = cell[0].parentNode.rowIndex;
    var tdPosition = [row, column];
    return tdPosition;
  };

  _self.moveFromTo = function(from, to) {
    if(!_self.canMoveFromTo(from, to)) return;

    var piece = $('#' + from[0] + '' + from[1]).find('.piece');
    var cell = $('#' + to[0] + '' + to[1]);

    _self.table[to[0]][to[1]] = _self.table[from[0]][from[1]];
    _self.table[from[0]][from[1]] = '';

    cell.html('');
    cell.append(piece);

    _self.unselectPiece();
  };

  _self.canMoveFromTo = function(from, to) {
    var possibleMovements = _self.possibleMovementsFor(from);
    var totalMovements = possibleMovements.length;
    for(var i = 0; i < totalMovements; i++) {
      var actualMovement = possibleMovements[i];
      if(actualMovement[0] == to[0] && actualMovement[1] == to[1]) {
        return true;
      }
    }
    return false;
  };

  _self.possibleMovementsFor = function(piecePosition) {
    switch(_self.table[piecePosition[0]][piecePosition[1]].toLowerCase()){
    case 'p':
      return _self.possibleMovementsForPawn(piecePosition);
    }
  }

  _self.possibleMovementsForPawn = function(piecePosition) {
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

  // Adding event listeners
  $('.piece').click(_self.handlePieceClick);
  $('td').click(_self.handleSquareClick);
};

var chess = new Chess();
