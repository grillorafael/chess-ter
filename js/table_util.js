'use strict';
var TableUtil = function() {};

TableUtil.emptyPosition = function(position, table) {
  return table[position[0]][position[1]] === '';
};

TableUtil.samePieceTypeOf = function(piecePosition, squarePosition, table) {
  var pieceUpper = table[piecePosition[0]][piecePosition[1]].toUpperCase() == table[piecePosition[0]][piecePosition[1]];
  var squareUpper = table[squarePosition[0]][squarePosition[1]].toUpperCase() == table[squarePosition[0]][squarePosition[1]];
  return (pieceUpper && squareUpper);
};

TableUtil.validSquare = function(piecePosition, squarePosition, table) {
  return TableUtil.emptyPosition(squarePosition, table) || !TableUtil.samePieceTypeOf(piecePosition, squarePosition, table);
};
