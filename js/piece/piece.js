function Piece(player) {

  this.player = function () {
    //TODO: Fazer verificação se player é uma instancia da classe player
    return player;
  };
};


Piece.prototype.possibleMovements = function (position) {
  var msg = "Piece#possibleMovements: Not yet implemented";
  alert(msg);
  throw msg;
};
