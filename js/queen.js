function Queen(player) {
  Piece.call(this, player);
};


Queen.prototype = new Queen();
Queen.prototype.constructor = Queen;


Queen.prototype.possibleMovements = function (position) {
  if(position instanceof BoardPosition) {
    var possibleMovements = [];

    return possibleMovements;
  }
  else {
    var msg = "Queen#possibleMovements: position should be a BoardPosition";
    alert(msg);
    throw msg;
  }
};
