function Piece(player) {

  this.player = function () {
    //TODO: Fazer verificação se player é uma instancia da classe player
    return player;
  };

  this.empty = function() {
    return false;
  }
};


Piece.prototype.possibleMovements = function (position, board) {
  var msg = "Piece#possibleMovements: Not yet implemented";
  alert(msg);
  throw msg;
};

Piece.prototype.isEnemyOf = function(pi) {
  return !((pi.player().isBlack() && this.player().isBlack()) || (pi.player().isWhite() && this.player().isWhite()));
};
