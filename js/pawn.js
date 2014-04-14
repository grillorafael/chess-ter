function Piece(_tp, _table) {
  this.color = _tp;
  this.table = _table;

  Piece.prototype.possibleMovements = function(piecePosition) {
    throw "Not yet implemented";
  };
};
Piece.BLACK = 'b';
Piece.WHITE = 'w';

function Pawn(_tp, _table) {
  Piece.call(this, _tp, _table);
  Pawn.prototype.possibleMovements = function(piecePosition) {
    var piece = this.table[piecePosition[0]][piecePosition[1]];
    var possibleMovements = [];
    if(this.color == Piece.WHITE) {
      if(TableUtil.emptyPosition([piecePosition[0] - 1, piecePosition[1]], this.table)) {
        possibleMovements.push([piecePosition[0] - 1, piecePosition[1]]);
      }
      if(piecePosition[0] == 6 && TableUtil.emptyPosition([piecePosition[0] - 2, piecePosition[1]], this.table)) {
        possibleMovements.push([piecePosition[0] - 2, piecePosition[1]]);
      }

      try {
        if(!TableUtil.emptyPosition([piecePosition[0] - 1, piecePosition[1] + 1], this.table) && !TableUtil.samePieceTypeOf(piecePosition, [piecePosition[0] - 1, piecePosition[1] + 1], this.table)) {
          possibleMovements.push([piecePosition[0] - 1, piecePosition[1] + 1]);
        }
      } catch(e) {}

      try {
        if(!TableUtil.emptyPosition([piecePosition[0] - 1, piecePosition[1] - 1], this.table) && !TableUtil.samePieceTypeOf(piecePosition, [piecePosition[0] - 1, piecePosition[1] - 1], this.table)) {
          possibleMovements.push([piecePosition[0] - 1, piecePosition[1] - 1]);
        }
      }catch(e) {}
    }
    else {
      if(TableUtil.emptyPosition([piecePosition[0] + 1, piecePosition[1]], this.table)) {
        possibleMovements.push([piecePosition[0] + 1, piecePosition[1]]);
      }
      if(piecePosition[0] == 1 && TableUtil.emptyPosition([piecePosition[0] + 2, piecePosition[1]], this.table)) {
        possibleMovements.push([piecePosition[0] + 2, piecePosition[1]]);
      }

      try {
        if(!TableUtil.emptyPosition([piecePosition[0] + 1, piecePosition[1] + 1], this.table) && !TableUtil.samePieceTypeOf(piecePosition, [piecePosition[0] + 1, piecePosition[1] + 1], this.table)) {
          possibleMovements.push([piecePosition[0] + 1, piecePosition[1] + 1]);
        }
      } catch(e) {}

      try {
        if(!TableUtil.emptyPosition([piecePosition[0] + 1, piecePosition[1] - 1], this.table) && !TableUtil.samePieceTypeOf(piecePosition, [piecePosition[0] + 1, piecePosition[1] - 1], this.table)) {
          possibleMovements.push([piecePosition[0] + 1, piecePosition[1] - 1]);
        }
      }catch(e) {}
    }

    return possibleMovements;
  };
};
