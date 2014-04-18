function Bishop(player) {
  Piece.call(this, player);
};


Bishop.prototype = new Piece();
Bishop.prototype.constructor = Bishop;

Bishop.prototype.possibleMovements = function (position, board) {
  if(!(position instanceof BoardPosition)) {
    var msg = "Bishop#possibleMovements: position should be a BoardPosition";
    alert(msg);
    throw Error(msg);
  };

  var hasUperRight = true, hasUperLeft = true, hasDownRight = true, hasDownLeft = true, tmpPosition = position.nextLine().nextColumn(), possibleMovements = [], lastPosition = position;
  while(hasUperRight) {
    if(tmpPosition == lastPosition) {
      hasUperRight = false;
    }
    else if(board.at(tmpPosition).empty()) {
      possibleMovements.push(tmpPosition);
    }
    else {
      if(this.isEnemyOf(board.at(tmpPosition))) {
        possibleMovements.push(tmpPosition);
      }
      hasUperRight = false;
    }

    lastPosition = tmpPosition;
    tmpPosition = tmpPosition.nextLine().nextColumn();
  }

  tmpPosition = position.nextLine().previousColumn();
  lastPosition = position;
  while(hasUperLeft) {
    if(tmpPosition == lastPosition) {
      hasUperLeft = false;
    }
    else if(board.at(tmpPosition).empty()) {
      possibleMovements.push(tmpPosition);
    }
    else {
      if(this.isEnemyOf(board.at(tmpPosition))) {
        possibleMovements.push(tmpPosition);
      }
      hasUperLeft = false;
    }

    lastPosition = tmpPosition;
    tmpPosition = tmpPosition.nextLine().previousColumn();
  }

  tmpPosition = position.previousLine().nextColumn();
  lastPosition = position;
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
    tmpPosition = tmpPosition.previousLine().nextColumn();
  }


  tmpPosition = position.previousLine().previousColumn();
  lastPosition = position;
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
    tmpPosition = tmpPosition.previousLine().previousColumn();
  }



  return possibleMovements;
};
