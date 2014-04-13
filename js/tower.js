'use strict';
var Tower = (function(){});
Tower.possibleMovements = function(piecePosition, targetSquare, table) {
  var possibleMovements = [];
  
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

  return possibleMovements;
};
