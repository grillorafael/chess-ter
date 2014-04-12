'use strict';
var Queen = (function(){});
Queen.possibleMovements = function(piecePosition, targetSquare, table) {
  var possibleMovements = [];
  try {
    if(TableUtil.hasMovedLowerRightDiagonally(piecePosition, targetSquare) && !TableUtil.hasLowerRightDiagonalCollision(piecePosition, targetSquare) && TableUtil.validSquare(piecePosition, targetSquare, table)) {
      possibleMovements.push(targetSquare);
    }
    else if(TableUtil.hasMovedLowerLeftDiagonally(piecePosition, targetSquare) && !TableUtil.hasLowerLeftDiagonalCollision(piecePosition, targetSquare) && TableUtil.validSquare(piecePosition, targetSquare, table)) {
      possibleMovements.push(targetSquare);
    }
    else if(TableUtil.hasMovedUpperRightDiagonally(piecePosition, targetSquare) && !TableUtil.hasUpperRightDiagonalCollision(piecePosition, targetSquare) && TableUtil.validSquare(piecePosition, targetSquare, table)) {
      possibleMovements.push(targetSquare);
    }
    else if(TableUtil.hasMovedUpperLeftDiagonally(piecePosition, targetSquare) && !TableUtil.hasUpperLeftDiagonalCollision(piecePosition, targetSquare) && TableUtil.validSquare(piecePosition, targetSquare, table)) {
      possibleMovements.push(targetSquare);
    }
    else if(!TableUtil.hasVerticalCollision(piecePosition, targetSquare) && TableUtil.validSquare(piecePosition, [targetSquare[0], piecePosition[1]], table)) {
      possibleMovements.push([targetSquare[0], piecePosition[1]]);
    }
    else if(!TableUtil.hasHorizontalCollision(piecePosition, targetSquare) && TableUtil.validSquare(piecePosition, [piecePosition[0], targetSquare[1]], table)) {
      possibleMovements.push([piecePosition[0], targetSquare[1]]);
    }
  } catch(e) {}

  return possibleMovements;
};
