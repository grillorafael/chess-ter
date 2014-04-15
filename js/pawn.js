function Pawn(player) {
  Piece.call(this, player);
};


Pawn.prototype = new Pawn();
Pawn.prototype.constructor = Pawn;


Pawn.prototype.possibleMovements = function (position) {
  if(position instanceof BoardPosition) {
    var possibleMovements = [];

    return possibleMovements;
  }
  else {
    var msg = "Pawn#possibleMovements: position should be a BoardPosition";
    alert(msg);
    throw msg;
  }
};
