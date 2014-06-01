'use strict';

function Tower(player) {
  Piece.call(this, player);
}

Tower.prototype = new Piece();
Tower.prototype.constructor = Tower;

Tower.prototype.getPieceValue = function () {
  return 500;
};

Tower.prototype.getCountPossibleMoves = function() {
  return _countPossibleMoves;
};

Tower.prototype.possibleMovements = function (position, board) {
  if(!(position instanceof BoardPosition)) {
    var msg = "Tower#possibleMovements: position should be a BoardPosition";
    alert(msg);
    throw new Error(msg);
  }

  var hasNextLine = true, hasPreviousLine = true, hasNextColumn = true, hasPreviousColumn = true, tmpPosition = position.nextLine(), possibleMovements = [], lastPosition = position;
  while(hasNextLine) {
    if(!tmpPosition) {
      break;
    }

    if(tmpPosition == lastPosition) {
      hasNextLine = false;
    }
    else if(board.at(tmpPosition).empty()) {
      possibleMovements.push(tmpPosition);
    }
    else {
      if(this.isEnemyOf(board.at(tmpPosition))) {
        possibleMovements.push(tmpPosition);
      }
      hasNextLine = false;
    }

    lastPosition = tmpPosition;
    tmpPosition = tmpPosition.nextLine();
  }

  tmpPosition = position.previousLine();
  lastPosition = position;
  while(hasPreviousLine) {
    if(!tmpPosition) {
      break;
    }

    if(tmpPosition == lastPosition) {
      hasPreviousLine = false;
    }
    else if(board.at(tmpPosition).empty()) {
      possibleMovements.push(tmpPosition);
    }
    else {
      if(this.isEnemyOf(board.at(tmpPosition))) {
        possibleMovements.push(tmpPosition);
      }
      hasPreviousLine = false;
    }

    lastPosition = tmpPosition;
    tmpPosition = tmpPosition.previousLine();
  }

  tmpPosition = position.nextColumn();
  lastPosition = position;
  while(hasNextColumn) {
    if(!tmpPosition) {
      break;
    }

    if(tmpPosition == lastPosition) {
      hasNextColumn = false;
    }
    else if(board.at(tmpPosition).empty()) {
      possibleMovements.push(tmpPosition);
    }
    else {
      if(this.isEnemyOf(board.at(tmpPosition))) {
        possibleMovements.push(tmpPosition);
      }
      hasNextColumn = false;
    }

    lastPosition = tmpPosition;
    tmpPosition = tmpPosition.nextColumn();
  }


  tmpPosition = position.previousColumn();
  lastPosition = position;
  while(hasPreviousColumn) {
    if(!tmpPosition) {
      break;
    }
    if(tmpPosition == lastPosition) {
      hasPreviousColumn = false;
    }
    else if(board.at(tmpPosition).empty()) {
      possibleMovements.push(tmpPosition);
    }
    else {
      if(this.isEnemyOf(board.at(tmpPosition))) {
        possibleMovements.push(tmpPosition);
      }
      hasPreviousColumn = false;
    }

    lastPosition = tmpPosition;
    tmpPosition = tmpPosition.previousColumn();
  }


  this._countPossibleMoves = possibleMovements.length;
  return possibleMovements;
};
