'use strict';
var Bishop = (function(){});
Bishop.possibleMovements = function(piecePosition, targetSquare, table) {
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
  } catch(e) {}

  return possibleMovements;
};
