'use strict';
var Queen = (function(){});
Queen.possibleMovements = function(piecePosition, targetSquare, table) {
  var possibleMovements = [];
  
  /* INÍCIO DOS POSSÍVEIS MOVIMENTOS HORIZONTAIS E VERTICAIS */
  var tmpPosition = piecePosition;
  var hasValidDownVerticalPositions = true;
  while(hasValidDownVerticalPositions)
  {
    var newPostion = [tmpPosition[0] + 1, tmpPosition[1]];
    try
    {
      if(TableUtil.validSquare(tmpPosition, newPostion, table)) 
      {
        possibleMovements.push(newPostion);
      }

      else
      { 
        hasValidDownVerticalPositions = false;
      }

      tmpPosition = newPostion;
    } catch(e) {hasValidDownVerticalPositions = false};
  }

  tmpPosition = piecePosition;
  var hasValidUpVerticalPositions = true;
  while(hasValidUpVerticalPositions)
  {
    var newPostion = [tmpPosition[0] - 1, tmpPosition[1]];
    try
    {
      if(TableUtil.validSquare(tmpPosition, newPostion, table)) 
      {
        possibleMovements.push(newPostion);
      }

      else
      { 
        hasValidUpVerticalPositions = false;
      }

      tmpPosition = newPostion;
    } catch(e) {hasValidUpVerticalPositions = false};
  }

  tmpPosition = piecePosition;
  var hasValidHorizontalRightPositions = true;
  while(hasValidHorizontalRightPositions)
  {
    var newPostion = [tmpPosition[0], tmpPosition[1] + 1];
    try
    {
      if(TableUtil.validSquare(tmpPosition, newPostion, table)) 
      {
        possibleMovements.push(newPostion);
      }

      else
      { 
        hasValidHorizontalRightPositions = false;
      }

      tmpPosition = newPostion;
    } catch(e) {hasValidHorizontalRightPositions = false};
  }

  tmpPosition = piecePosition;
  var hasValidHorizontalLeftPositions = true;
  while(hasValidHorizontalLeftPositions)
  {
    var newPostion = [tmpPosition[0], tmpPosition[1] - 1];
    try
    {
      if(TableUtil.validSquare(tmpPosition, newPostion, table)) 
      {
        possibleMovements.push(newPostion);
      }

      else
      { 
        hasValidHorizontalLeftPositions = false;
      }

      tmpPosition = newPostion;
    } catch(e) {hasValidHorizontalLeftPositions = false};
  }
/* FIM DOS POSSÍVEIS MOVIMENTOS HORIZONTAIS E VERTICAIS */

/* INÍCIO DOS POSSÍVEIS MOVIMENTOS DIAGONAIS */
  tmpPosition = piecePosition;
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
/* FIM DOS POSSÍVEIS MOVIMENTOS DIAGONAIS */
  return possibleMovements;
};
