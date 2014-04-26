function BoardPosition(position) {
  if(!(position && position.length == 2)) {
    var msg = "BoardPosition#new: position valid";
    alert(msg);
    throw Error(msg);
  };

  this.setColumn(position.charAt(0));
  this.setLine(parseInt(position.charAt(1)));
}

BoardPosition.prototype.sameAs = function(bp) {
  return JSON.stringify(this) == JSON.stringify(bp);
};

BoardPosition.prototype.in = function(list) {
  var listMap = _(list).map(function(el){ return JSON.stringify(el); }),
    jsonThis = JSON.stringify(this);
  return _.indexOf(listMap, jsonThis) != -1;
};

BoardPosition.prototype.prettyPrint = function() {
  return this.column() + this.line();
};

BoardPosition.prototype.column = function() {
  return this._column;
};

BoardPosition.prototype.line = function() {
  return this._line;
};

BoardPosition.prototype.getColumnNumber = function() {
  var base = "a".charCodeAt(0);
  return this.column().charCodeAt(0) - base;
};

BoardPosition.getColumnByNumber = function(val) {
  return String.fromCharCode("a".charCodeAt(0) + val);
};

BoardPosition.prototype.isBottomLine = function() {
  return this.line() == 1;
};

BoardPosition.prototype.isTopLine = function() {
  return this.line() == 8;
};

BoardPosition.prototype.isLeftColumn = function() {
  return this.column() == 'a';
};

BoardPosition.prototype.isRightColumn = function() {
  return this.column() == 'h';
};

BoardPosition.prototype.previousLine = function() {
  if(this.isBottomLine()) {
    return false;
  }
  var nextLine = this.line() - 1;
  return new BoardPosition(this.column() + "" + nextLine);
}

BoardPosition.prototype.nextLine = function() {
  if(this.isTopLine()) {
    return false;
  }
  var nextLine = this.line() + 1;
  return new BoardPosition(this.column() + "" + nextLine);
}

BoardPosition.prototype.previousColumn = function() {
  if(this.isLeftColumn()) {
    return false;
  }
  var nextColumn = this.column().charCodeAt(0) - 1;
  return new BoardPosition(String.fromCharCode(nextColumn) + "" + this.line());
}

BoardPosition.prototype.nextColumn = function() {
  if(this.isRightColumn()) {
    return false;
  }
  var nextColumn = this.column().charCodeAt(0) + 1;
  return new BoardPosition(String.fromCharCode(nextColumn) + "" + this.line());
}

BoardPosition.prototype.setLine = function (val) {
  if ((!((typeof val).toLowerCase() == 'number') || isNaN(val)) || (val < 1 || val > 8)) {
    throw Error("BoardPosition#setLine: Linha inválida");
  }
  this._line = val;
}

BoardPosition.prototype.setColumn = function (val) {
  if (!((typeof val).toLowerCase() == 'string') || (val < 'a' || val > 'h')) {
    throw Error("BoardPosition#setColumn: Coluna inválida");
  }
  this._column = val;
};
