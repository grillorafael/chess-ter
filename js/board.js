function BoardPosition(position) {
  //TODO: Tornar privado e validar
  this.column = this.setColumn(position.charAt(0));
  this.line = this.setLine(position.charAt(1));
}

BoardPosition.prototype.setLine = function (val) {
  if ((!((typeof val).toLowerCase() == 'number') || isNaN(val)) || (val < 1 || val > 8)) {
    throw Error("BoardPosition#setLine: Linha inválida")
  }
  this.line = val;

}

BoardPosition.prototype.setColumn = function (val) {
  if (!((typeof val).toLowerCase() == 'string') || (val < 'a' || val > 'h')) {
    throw Error("BoardPosition#setColumn: Coluna inválida")
  }
  this.column = val;
}


function Board() {

}