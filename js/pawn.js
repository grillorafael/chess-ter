'use strict';
var Pawn = (function(){});
Pawn.possibleMovements = function(piecePosition, table) {
  var piece = table[piecePosition[0]][piecePosition[1]];
  var possibleMovements = [];
  if(piece == piece.toLowerCase()) {
    if(TableUtil.emptyPosition([piecePosition[0] - 1, piecePosition[1]], table)) {
      possibleMovements.push([piecePosition[0] - 1, piecePosition[1]]);
    }
    if(piecePosition[0] == 6 && TableUtil.emptyPosition([piecePosition[0] - 2, piecePosition[1]], table)) {
      possibleMovements.push([piecePosition[0] - 2, piecePosition[1]]);
    }

    try {
      if(!TableUtil.emptyPosition([piecePosition[0] - 1, piecePosition[1] + 1], table) && !TableUtil.samePieceTypeOf(piecePosition, [piecePosition[0] - 1, piecePosition[1] + 1], table)) {
        possibleMovements.push([piecePosition[0] - 1, piecePosition[1] + 1]);
      }
    } catch(e) {}

    try {
      if(!TableUtil.emptyPosition([piecePosition[0] - 1, piecePosition[1] - 1], table) && !TableUtil.samePieceTypeOf(piecePosition, [piecePosition[0] - 1, piecePosition[1] - 1], table)) {
        possibleMovements.push([piecePosition[0] - 1, piecePosition[1] - 1]);
      }
    }catch(e) {}
  }
  else {
    if(TableUtil.emptyPosition([piecePosition[0] + 1, piecePosition[1]], table)) {
      possibleMovements.push([piecePosition[0] + 1, piecePosition[1]]);
    }
    if(piecePosition[0] == 1 && TableUtil.emptyPosition([piecePosition[0] + 2, piecePosition[1]], table)) {
      possibleMovements.push([piecePosition[0] + 2, piecePosition[1]]);
    }

    try {
      if(!TableUtil.emptyPosition([piecePosition[0] + 1, piecePosition[1] + 1], table) && !TableUtil.samePieceTypeOf(piecePosition, [piecePosition[0] + 1, piecePosition[1] + 1], table)) {
        possibleMovements.push([piecePosition[0] + 1, piecePosition[1] + 1]);
      }
    } catch(e) {}

    try {
      if(!TableUtil.emptyPosition([piecePosition[0] + 1, piecePosition[1] - 1], table) && !TableUtil.samePieceTypeOf(piecePosition, [piecePosition[0] + 1, piecePosition[1] - 1], table)) {
        possibleMovements.push([piecePosition[0] + 1, piecePosition[1] - 1]);
      }
    }catch(e) {}
  }

  return possibleMovements;
};
