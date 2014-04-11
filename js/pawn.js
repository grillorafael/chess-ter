'use strict';
var Pawn = (function(){});
Pawn.possibleMovements = function(piecePosition, table) {
  var piece = table[piecePosition[0]][piecePosition[1]];
  var possibleMovements = [];
  if(piece == piece.toLowerCase()) {
    if(table[piecePosition[0] - 1][piecePosition[1]] === '') {
      possibleMovements.push([piecePosition[0] - 1, piecePosition[1]]);
    }
    if(piecePosition[0] == 6 && table[piecePosition[0] - 2][piecePosition[1]] === '' && possibleMovements.length == 1) {
      possibleMovements.push([piecePosition[0] - 2, piecePosition[1]]);
    }

    try {
      if(table[piecePosition[0] - 1][piecePosition[1] + 1] !== '' && table[piecePosition[0] - 1][piecePosition[1] + 1].toUpperCase() == table[piecePosition[0] - 1][piecePosition[1] + 1]) {
        possibleMovements.push([piecePosition[0] - 1, piecePosition[1] + 1]);
      }
    } catch(e) {}

    try {
      if(table[piecePosition[0] - 1][piecePosition[1] - 1] !== '' && table[piecePosition[0] - 1][piecePosition[1] - 1].toUpperCase() == table[piecePosition[0] - 1][piecePosition[1] - 1]) {
        possibleMovements.push([piecePosition[0] - 1, piecePosition[1] - 1]);
      }
    }catch(e) {}
  }
  else {
    if(table[piecePosition[0] + 1][piecePosition[1]] === '') {
      possibleMovements.push([piecePosition[0] + 1, piecePosition[1]]);
    }
    if(piecePosition[0] == 1 && table[piecePosition[0] + 2][piecePosition[1]] === '' && possibleMovements.length == 1) {
      possibleMovements.push([piecePosition[0] + 2, piecePosition[1]]);
    }

    try {
      if(table[piecePosition[0] + 1][piecePosition[1] + 1] !== '' && table[piecePosition[0] + 1][piecePosition[1] + 1].toLowerCase() == table[piecePosition[0] + 1][piecePosition[1] + 1]) {
        possibleMovements.push([piecePosition[0] + 1, piecePosition[1] + 1]);
      }
    } catch(e) {}

    try {
      if(table[piecePosition[0] + 1][piecePosition[1] - 1] !== '' && table[piecePosition[0] + 1][piecePosition[1] - 1].toLowerCase() == table[piecePosition[0] + 1][piecePosition[1] - 1]) {
        possibleMovements.push([piecePosition[0] + 1, piecePosition[1] - 1]);
      }
    }catch(e) {}
  }

  return possibleMovements;
};
