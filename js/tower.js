function Tower(player) {
  Piece.call(this, player);
};


Tower.prototype = new Tower();
Tower.prototype.constructor = Tower;


Tower.prototype.possibleMovements = function (position) {
  if(position instanceof BoardPosition) {
    var possibleMovements = [];

    return possibleMovements;
  }
  else {
    var msg = "Tower#possibleMovements: position should be a BoardPosition";
    alert(msg);
    throw msg;
  }
};
