'use strict';
var Bishop = (function(){});
Bishop.possibleMovements = function(piecePosition, targetSquare, table) {
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
  } catch(e) {}

  return possibleMovements;
};
