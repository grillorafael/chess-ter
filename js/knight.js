'use strict';
var Knight = (function(){});
Knight.possibleMovements = function(piecePosition, table) {
  var possibleMovements = [];
  try {
    if(TableUtil.validSquare(piecePosition, [piecePosition[0] + 2, piecePosition[1] + 1], table)) {
      possibleMovements.push([piecePosition[0] + 2, piecePosition[1] + 1]);
    }
  } catch(e) {}

  try {
    if(TableUtil.validSquare(piecePosition, [piecePosition[0] + 2, piecePosition[1] - 1], table)) {
      possibleMovements.push([piecePosition[0] + 2, piecePosition[1] - 1]);
    }
  } catch(e) {}

  try {
    if(TableUtil.validSquare(piecePosition, [piecePosition[0] + 1, piecePosition[1] + 2], table)) {
      possibleMovements.push([piecePosition[0] + 1, piecePosition[1] + 2]);
    }
  } catch(e) {}

  try {
    if(TableUtil.validSquare(piecePosition, [piecePosition[0] + 1, piecePosition[1] - 2], table)) {
      possibleMovements.push([piecePosition[0] + 1, piecePosition[1] - 2]);
    }
  } catch(e) {}

  try {
    if(TableUtil.validSquare(piecePosition, [piecePosition[0] - 2, piecePosition[1] + 1], table)) {
      possibleMovements.push([piecePosition[0] - 2, piecePosition[1] + 1]);
    }
  } catch(e) {}

  try {
    if(TableUtil.validSquare(piecePosition, [piecePosition[0] - 2, piecePosition[1] - 1], table)) {
      possibleMovements.push([piecePosition[0] - 2, piecePosition[1] - 1]);
    }
  } catch(e) {}

  try {
    if(TableUtil.validSquare(piecePosition, [piecePosition[0] - 1, piecePosition[1] - 2], table)) {
      possibleMovements.push([piecePosition[0] - 1, piecePosition[1] - 2]);
    }
  } catch(e) {}

  try {
    if(TableUtil.validSquare(piecePosition, [piecePosition[0] - 1, piecePosition[1] + 2], table)) {
      possibleMovements.push([piecePosition[0] - 1, piecePosition[1] + 2]);
    }
  } catch(e) {}

  return possibleMovements;
};
