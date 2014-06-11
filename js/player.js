'use strict';
function Player(_color) {

  var color = function () {
    return _color;
  };

  this.isBlack = function () {
    return color() == 'black';
  };

  this.isWhite = function () {
    return !this.isBlack();
  };
}

Player.prototype.isHuman = function() {
  return true;
};

Player.prototype.sameAs = function(p) {
  return this.isWhite() == p.isWhite();
};

Player.BLACK = 'black';
Player.WHITE = 'white';


function PlayerIA(_color) {
  Player.call(this, _color);
}

PlayerIA.prototype = new Player();
PlayerIA.prototype.constructor = PlayerIA;

PlayerIA.prototype.isHuman = function() {
  return false;
};

PlayerIA.prototype.getNextMove = function(cb) {
  // var minInterations = 1,
  //   maxInterations = 2;
  //
  // var depth = Math.ceil(minInterations + (1 - (this.board.getNumPieces() / Board.TOTAL_PIECES)) * maxInterations);

  var searcher = new NegaMax(2);
  searcher.getBestMove(this.board, function(movement) {
    cb(movement);
  });
};
