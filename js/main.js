function Chess() {
  console.log('Starting Chess...');
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
  console.log('table', _self.table);

  _self.unselectPiece = function() {
    console.log('unselectPiece');
    _self.selectedPiece.removeClass('selected');
    _self.selectedPiece = null;
  };

  _self.handlePieceClick = function(e) {
    console.log('handlePieceClick');

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
    console.log('handleSquareClick');
    var tdPosition = _self.getCellPosition($(this));

    if(_self.selectedPiece != null) {
      var piecePosition = _self.getPiecePosition();
      _self.moveFromTo(piecePosition, tdPosition);
    }
  };

  _self.getPiecePosition = function(piece) {
    console.log('getPiecePosition');
    if(piece === undefined) {
      piece = _self.selectedPiece;
    }
    var pieceTd = piece.parents('td');
    var piecePosition = _self.getCellPosition(pieceTd);
    console.log('piece position', piecePosition);
    return piecePosition;
  };

  _self.getCellPosition = function(cell) {
    console.log('getCellPosition');
    var column = cell[0].cellIndex;
    var row = cell[0].parentNode.rowIndex;
    var tdPosition = [row, column];
    console.log('cell position', tdPosition);
    return tdPosition;
  };

  _self.moveFromTo = function(from, to) {
    console.log('moveFromTo');
    var piece = $('#' + from[0] + '' + from[1]).find('.piece');
    var cell = $('#' + to[0] + '' + to[1]);
    console.log('moving', piece);
    console.log('to', cell);

    _self.table[to[0]][to[1]] = _self.table[from[0]][from[1]];
    _self.table[from[0]][from[1]] = '';

    cell.html('');
    cell.append(piece);

    _self.unselectPiece();

    console.log('new table', _self.table);
  };

  // Adding event listeners
  $('.piece').click(_self.handlePieceClick);
  $('td').click(_self.handleSquareClick);
};

var chess = new Chess();
