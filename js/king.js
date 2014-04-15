function King(player) {
  Piece.call(this, player);
};


King.prototype = new King();
King.prototype.constructor = King;


King.prototype.possibleMovements = function (position) {
  if(position instanceof BoardPosition) {
    var possibleMovements = [];

    return possibleMovements;
  }
  else {
    var msg = "King#possibleMovements: position should be a BoardPosition";
    alert(msg);
    throw msg;
  }
};
