'use strict';
var Tower = (function(){});
Tower.possibleMovements = function(piecePosition, targetSquare, table) {
  var possibleMovements = [];
  try {
    if(!TableUtil.hasVerticalCollision(piecePosition, targetSquare) && TableUtil.validSquare(piecePosition, [targetSquare[0], piecePosition[1]], table)) {
      possibleMovements.push([targetSquare[0], piecePosition[1]]);
    }
  } catch(e) {}

  try {
    if(!TableUtil.hasHorizontalCollision(piecePosition, targetSquare) && TableUtil.validSquare(piecePosition, [piecePosition[0], targetSquare[1]], table)) {
      possibleMovements.push([piecePosition[0], targetSquare[1]]);
    }
  } catch(e) {}

  return possibleMovements;
};
