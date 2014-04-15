function Pawn(player) {
  Piece.call(this, player);
};


Pawn.prototype = new Pawn();
Pawn.prototype.constructor = Pawn;


Pawn.prototype.possibleMovements = function (position) {

  //TODO: Fazer verificação se position é uma instancia da classe BoardPosition



  var piece = this.table[position[0]][position[1]];
  var possibleMovements = [];
  if (this.color == Piece.WHITE) {
    if (TableUtil.emptyPosition([position[0] - 1, position[1]], this.table)) {
      possibleMovements.push([position[0] - 1, position[1]]);
    }
    if (position[0] == 6 && TableUtil.emptyPosition([position[0] - 2, position[1]], this.table)) {
      possibleMovements.push([position[0] - 2, position[1]]);
    }

    try {
      if (!TableUtil.emptyPosition([position[0] - 1, position[1] + 1], this.table) && !TableUtil.samePieceTypeOf(position, [position[0] - 1, position[1] + 1], this.table)) {
        possibleMovements.push([position[0] - 1, position[1] + 1]);
      }
    } catch (e) {
    }

    try {
      if (!TableUtil.emptyPosition([position[0] - 1, position[1] - 1], this.table) && !TableUtil.samePieceTypeOf(position, [position[0] - 1, position[1] - 1], this.table)) {
        possibleMovements.push([position[0] - 1, position[1] - 1]);
      }
    } catch (e) {
    }
  }
  else {
    if (TableUtil.emptyPosition([position[0] + 1, position[1]], this.table)) {
      possibleMovements.push([position[0] + 1, position[1]]);
    }
    if (position[0] == 1 && TableUtil.emptyPosition([position[0] + 2, position[1]], this.table)) {
      possibleMovements.push([position[0] + 2, position[1]]);
    }

    try {
      if (!TableUtil.emptyPosition([position[0] + 1, position[1] + 1], this.table) && !TableUtil.samePieceTypeOf(position, [position[0] + 1, position[1] + 1], this.table)) {
        possibleMovements.push([position[0] + 1, position[1] + 1]);
      }
    } catch (e) {
    }

    try {
      if (!TableUtil.emptyPosition([position[0] + 1, position[1] - 1], this.table) && !TableUtil.samePieceTypeOf(position, [position[0] + 1, position[1] - 1], this.table)) {
        possibleMovements.push([position[0] + 1, position[1] - 1]);
      }
    } catch (e) {
    }
  }

  return possibleMovements;
};

