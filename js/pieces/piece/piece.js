'use strict';

function Piece(player) {
  this._player = player;
}

Piece.prototype.player = function() {
  return this._player;
};

Piece.prototype.empty = function() {
  return false;
};

Piece.prototype.possibleMovements = function (position, board) {
  var msg = "Piece#possibleMovements: Not yet implemented";
  alert(msg);
  throw new Error(msg);
};

Piece.prototype.sameAs = function(pi) {
  return !this.isEnemyOf(pi);
};

Piece.prototype.isEnemyOf = function(pi) {
  if(!(pi instanceof Piece)) {
    var msg = "Piece#isEnemyOf: parameter should be a piece";
    alert(msg);
    throw new Error(msg);
  }

  return this.player().isWhite() != pi.player().isWhite();
};

Piece.prototype.isEnemyOfPlayer = function(pl) {
  return this.player().isWhite() != pl.isWhite();
};
