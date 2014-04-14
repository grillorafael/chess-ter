'use strict';
var Bishop = (function(){});
Bishop.possibleMovements = function(piecePosition, table) {
  var possibleMovements = [];

  var tmpPosition = piecePosition;
  var hasValidRightUpPositions = true;
  while(hasValidRightUpPositions) {
    var newPosition = [tmpPosition[0] - 1, tmpPosition[1] + 1];
    try {
      if(TableUtil.validSquare(tmpPosition, newPosition, table)) {
        possibleMovements.push(newPosition);
      }
      else {
        hasValidRightUpPositions = false;
      }
    } catch(e) { hasValidRightUpPositions = false; }
    tmpPosition = newPosition;
  }

  tmpPosition = piecePosition;
  var hasValidRightDownPositions = true;
  while(hasValidRightDownPositions) {
    var newPosition = [tmpPosition[0] + 1, tmpPosition[1] + 1];
    try {
      if(TableUtil.validSquare(piecePosition, newPosition, table)) {
        possibleMovements.push(newPosition);
      }
      else {
        hasValidRightDownPositions = false;
      }
    } catch(e) { hasValidRightDownPositions = false; }
    tmpPosition = newPosition;
  }

  tmpPosition = piecePosition;
  var hasValidLeftDownPositions = true;
  while(hasValidLeftDownPositions) {
    var newPosition = [tmpPosition[0] + 1, tmpPosition[1] - 1];
    try {
      if(TableUtil.validSquare(piecePosition, newPosition, table)) {
        possibleMovements.push(newPosition);
      }
      else {
        hasValidLeftDownPositions = false;
      }
    } catch(e) { hasValidLeftDownPositions = false; }
    tmpPosition = newPosition;
  }

  tmpPosition = piecePosition;
  var hasValidLeftUpPositions = true;
  while(hasValidLeftUpPositions) {
    var newPosition = [tmpPosition[0] - 1, tmpPosition[1] - 1];
    try {
      if(TableUtil.validSquare(piecePosition, newPosition, table)) {
        possibleMovements.push(newPosition);
      }
      else {
        hasValidLeftUpPositions = false;
      }
    } catch(e) { hasValidLeftUpPositions = false; }
    tmpPosition = newPosition;
  }

  return possibleMovements;
};
