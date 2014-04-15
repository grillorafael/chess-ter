function Bishop(player) {
  Piece.call(this, player);
};


Bishop.prototype = new Bishop();
Bishop.prototype.constructor = Bishop;


Bishop.prototype.possibleMovements = function (position) {
  if(position instanceof BoardPosition) {
    var possibleMovements = [];

    return possibleMovements;
  }
  else {
    var msg = "Bishop#possibleMovements: position should be a BoardPosition";
    alert(msg);
    throw msg;
  }
};
