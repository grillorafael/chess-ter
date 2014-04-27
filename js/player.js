function Player(_color) {

  var color = function () {
    //TODO: Verificar validacao  de cores
    return _color;
  };

  this.isBlack = function () {
    return color() == 'black';
  };

  this.isWhite = function () {
    return !this.isBlack();
  }
};

Player.prototype.sameAs = function(p) {
  return this.isWhite() == p.isWhite();
}

Player.BLACK = 'black';
Player.WHITE = 'white';
