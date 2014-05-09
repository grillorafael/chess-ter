'use strict';

function Bishop(player) {
  Piece.call(this, player);
}

Bishop.prototype = new Piece();
Bishop.prototype.constructor = Bishop;

Bishop.prototype.possibleMovements = function (position, board) {
  if(!(position instanceof BoardPosition)) {
    var msg = "Bishop#possibleMovements: position should be a BoardPosition";
    alert(msg);
    throw new Error(msg);
  }

  var hasUpperRight = true,
    hasUpperLeft = true,
    hasDownRight = true,
    hasDownLeft = true,
    possibleMovements = [],
    tmpPosition,
    lastPosition;

  if(position.nextLine() && position.nextLine().nextColumn()) {
    tmpPosition = position.nextLine().nextColumn();
    lastPosition = position;
  }
  else {
    hasUpperRight = false;
  }

  while(hasUpperRight) {
    if(tmpPosition == lastPosition) {
      hasUpperRight = false;
    }
    else if(board.at(tmpPosition).empty()) {
      possibleMovements.push(tmpPosition);
    }
    else {
      if(this.isEnemyOf(board.at(tmpPosition))) {
        possibleMovements.push(tmpPosition);
      }
      hasUpperRight = false;
    }

    lastPosition = tmpPosition;
    if(!tmpPosition.nextLine() || !tmpPosition.nextLine().nextColumn()) {
      break;
    }
    tmpPosition = tmpPosition.nextLine().nextColumn();
  }

  if(position.nextLine() && position.nextLine().previousColumn()) {
    tmpPosition = position.nextLine().previousColumn();
    lastPosition = position;
  }
  else {
    hasUpperLeft = false;
  }

  while(hasUpperLeft) {
    if(tmpPosition == lastPosition) {
      hasUpperLeft = false;
    }
    else if(board.at(tmpPosition).empty()) {
      possibleMovements.push(tmpPosition);
    }
    else {
      if(this.isEnemyOf(board.at(tmpPosition))) {
        possibleMovements.push(tmpPosition);
      }
      hasUpperLeft = false;
    }

    lastPosition = tmpPosition;
    if(!tmpPosition.nextLine() || !tmpPosition.nextLine().previousColumn()) {
      break;
    }
    tmpPosition = tmpPosition.nextLine().previousColumn();
  }

  if(position.previousLine() && position.previousLine().nextColumn()) {
    tmpPosition = position.previousLine().nextColumn();
    lastPosition = position;
  }
  else {
    hasDownRight = false;
  }

  while(hasDownRight) {
    if(tmpPosition == lastPosition) {
      hasDownRight = false;
    }
    else if(board.at(tmpPosition).empty()) {
      possibleMovements.push(tmpPosition);
    }
    else {
      if(this.isEnemyOf(board.at(tmpPosition))) {
        possibleMovements.push(tmpPosition);
      }
      hasDownRight = false;
    }

    lastPosition = tmpPosition;
    if(!tmpPosition.previousLine() || !tmpPosition.previousLine().nextColumn()) {
      break;
    }
    tmpPosition = tmpPosition.previousLine().nextColumn();
  }

  if(position.previousLine() && position.previousLine().previousColumn()) {
    tmpPosition = position.previousLine().previousColumn();
    lastPosition = position;
  }
  else {
    hasDownLeft = false;
  }

  while(hasDownLeft) {
    if(tmpPosition == lastPosition) {
      hasDownLeft = false;
    }
    else if(board.at(tmpPosition).empty()) {
      possibleMovements.push(tmpPosition);
    }
    else {
      if(this.isEnemyOf(board.at(tmpPosition))) {
        possibleMovements.push(tmpPosition);
      }
      hasDownLeft = false;
    }

    lastPosition = tmpPosition;
    if(!tmpPosition.previousLine() || !tmpPosition.previousLine().previousColumn()) {
      break;
    }
    tmpPosition = tmpPosition.previousLine().previousColumn();
  }

  return possibleMovements;
};
