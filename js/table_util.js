'use strict';
var TableUtil = function() {};

TableUtil.emptyPosition = function(position, table) {
  return table[position[0]][position[1]] === '';
};

TableUtil.samePieceTypeOf = function(piecePosition, squarePosition, table) {
  var pieceIsLowerCase = /[a-z]/.test(table[piecePosition[0]][piecePosition[1]]);
  var squareIsLowerCase = /[a-z]/.test(table[squarePosition[0]][squarePosition[1]]);
  return (pieceIsLowerCase && squareIsLowerCase);
};

TableUtil.validSquare = function(piecePosition, squarePosition, table) {
  return TableUtil.emptyPosition(squarePosition, table) || !TableUtil.samePieceTypeOf(piecePosition, squarePosition, table);
};


TableUtil.hasHorizontalCollision = function(from, to, table) {
  for(var j=from[1]+1; j<to[1]; j++) {
    if(table[from[0]][j] !== '') {
      return true;
    }
  }

  for(var j=from[1]-1; j>to[1]; j--) {
    if(table[from[0]][j] !== '') {
      return true;
    }
  }
  return false;
};

TableUtil.hasVerticalCollision = function(from, to, table) {
  for(var i=from[0]+1; i<to[0]; i++) {
    if(table[i][to[1]] !== '') {
      return true;
    }
  }

  for(var i=from[0]-1; i>to[0]; i--) {
    if(table[i][to[1]] !== '') {
      return true;
    }
  }
  return false;
};

TableUtil.hasLowerRightDiagonalCollision = function(from, to, table) {
  var i = from[0]+1;
  var j = from[1]+1;

  while(i<to[0] && j<to[1]) {
    if(table[i][j] !== '') {
      return true;
    }
    i++;
    j++;
  }

  return false;
};

TableUtil.hasUpperRightDiagonalCollision = function(from, to, table) {
  var i = from[0]-1;
  var j = from[1]+1;

  while(i>to[0] && j<to[1]) {
    if(table[i][j] !== '') {
      return true;
    }
    i--;
    j++;
  }

  return false;
};

TableUtil.hasLowerLeftDiagonalCollision = function(from, to, table) {
  var i = from[0]+1;
  var j = from[1]-1;

  while(i<to[0] && j>to[1]) {
    if(table[i][j] !== '') {
      return true;
    }
    i++;
    j--;
  }

  return false;
};

TableUtil.hasUpperLeftDiagonalCollision = function(from, to, table) {
  var i = from[0]-1;
  var j = from[1]-1;

  while(i>to[0] && j>to[1]) {
    if(table[i][j] !== '') {
      return true;
    }
    i--;
    j--;
  }

  return false;
};

TableUtil.hasMovedLowerRightDiagonally = function(from, to, table) {
  if((Math.abs(from[0] - to[0]) === Math.abs(from[1] - to[1])) && (from[0] - to[0] < 0) && (from[1] - to[1] < 0)) {
    return true;
  }
  return false;
};

TableUtil.hasMovedUpperRightDiagonally = function(from, to, table) {
  if((Math.abs(from[0] - to[0]) === Math.abs(from[1] - to[1])) && (from[0] - to[0] > 0) && (from[1] - to[1] < 0)) {
    return true;
  }
  return false;
};

TableUtil.hasMovedLowerLeftDiagonally = function(from, to, table) {
  if((Math.abs(from[0] - to[0]) === Math.abs(from[1] - to[1])) && (from[0] - to[0] < 0) && (from[1] - to[1] > 0)) {
    return true;
  }
  return false;
};

TableUtil.hasMovedUpperLeftDiagonally = function(from, to, table) {
  if((Math.abs(from[0] - to[0]) === Math.abs(from[1] - to[1])) && (from[0] - to[0] > 0) && (from[1] - to[1] > 0)) {
    return true;
  }
  return false;
};
