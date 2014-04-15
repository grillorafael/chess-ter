function Knight(player) {
  Piece.call(this, player);
};


Knight.prototype = new Knight();
Knight.prototype.constructor = Knight;


Knight.prototype.possibleMovements = function (position) {
  if(position instanceof BoardPosition) {
    var possibleMovements = [];

    return possibleMovements;
  }
  else {
    var msg = "Knight#possibleMovements: position should be a BoardPosition";
    alert(msg);
    throw msg;
  }
};
