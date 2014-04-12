'use strict';
var King = (function(){});
King.possibleMovements = function(piecePosition, table) {
  var possibleMovements = [];
  try {
    // Down
    if(TableUtil.validSquare(piecePosition, [piecePosition[0] + 1, piecePosition[1]], table)) {
      possibleMovements.push([piecePosition[0] + 1, piecePosition[1]]);
    }
  }catch(e) {}
  try {
    // Up
    if(TableUtil.validSquare(piecePosition, [piecePosition[0] - 1, piecePosition[1]], table)) {
      possibleMovements.push([piecePosition[0] - 1, piecePosition[1]]);
    }
  }catch(e) {}

  try {
    // Left
    if(TableUtil.validSquare(piecePosition, [piecePosition[0], piecePosition[1] - 1], table)) {
      possibleMovements.push([piecePosition[0], piecePosition[1] - 1]);
    }
  }catch(e) {}

  try {
    // Right
    if(TableUtil.validSquare(piecePosition, [piecePosition[0], piecePosition[1] + 1], table)) {
      possibleMovements.push([piecePosition[0], piecePosition[1] + 1]);
    }
  }catch(e) {}

  try {
    // Upper Right
    if(TableUtil.validSquare(piecePosition, [piecePosition[0] - 1, piecePosition[1] + 1], table)) {
      possibleMovements.push([piecePosition[0] - 1, piecePosition[1] + 1]);
    }
  }catch(e) {}

  try {
    // Upper Left
    if(TableUtil.validSquare(piecePosition, [piecePosition[0] - 1, piecePosition[1] - 1], table)) {
      possibleMovements.push([piecePosition[0] - 1, piecePosition[1] - 1]);
    }
  }catch(e) {}

  try {
    // Down Left
    if(TableUtil.validSquare(piecePosition, [piecePosition[0] + 1, piecePosition[1] - 1], table)) {
      possibleMovements.push([piecePosition[0] + 1, piecePosition[1] - 1]);
    }
  }catch(e) {}

  try {
    // Down Right
    if(TableUtil.validSquare(piecePosition, [piecePosition[0] + 1, piecePosition[1] + 1], table)) {
      possibleMovements.push([piecePosition[0] + 1, piecePosition[1] + 1]);
    }
  }catch(e) {}

  return possibleMovements;
};
