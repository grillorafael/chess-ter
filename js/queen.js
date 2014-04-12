'use strict';
var Queen = (function(){});
Queen.possibleMovements = function(piecePosition, targetSquare, table) {
  var possibleMovements = [];
  try {
    if(hasMovedLowerRightDiagonally(piecePosition, targetSquare) && !hasLowerRightDiagonalCollision(piecePosition, targetSquare) && TableUtil.validSquare(piecePosition, targetSquare, table)) {
      possibleMovements.push(targetSquare);
    }
    else if(hasMovedLowerLeftDiagonally(piecePosition, targetSquare) && !hasLowerLeftDiagonalCollision(piecePosition, targetSquare) && TableUtil.validSquare(piecePosition, targetSquare, table)) {
      possibleMovements.push(targetSquare);
    }
    else if(hasMovedUpperRightDiagonally(piecePosition, targetSquare) && !hasUpperRightDiagonalCollision(piecePosition, targetSquare) && TableUtil.validSquare(piecePosition, targetSquare, table)) {
      possibleMovements.push(targetSquare);
    }
    else if(hasMovedUpperLeftDiagonally(piecePosition, targetSquare) && !hasUpperLeftDiagonalCollision(piecePosition, targetSquare) && TableUtil.validSquare(piecePosition, targetSquare, table)) {
      possibleMovements.push(targetSquare);
    }
    else if(!hasVerticalCollision(piecePosition, targetSquare) && TableUtil.validSquare(piecePosition, [targetSquare[0], piecePosition[1]], table)) {
      possibleMovements.push([targetSquare[0], piecePosition[1]]);
    }
    else if(!hasHorizontalCollision(piecePosition, targetSquare) && TableUtil.validSquare(piecePosition, [piecePosition[0], targetSquare[1]], table)) {
      possibleMovements.push([piecePosition[0], targetSquare[1]]);
    }
  } catch(e) {}

  return possibleMovements;
};
