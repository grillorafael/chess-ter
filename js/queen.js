function Queen(player) {
  Piece.call(this, player);
};


Queen.prototype = new Piece();
Queen.prototype.constructor = Queen;


Queen.prototype.possibleMovements = function (position, board) {
  if(position instanceof BoardPosition) {
    var possibleMovements = [];

    /* INÍCIO DOS MOVIMENTOS VERTICAIS E HORIZONTAIS */
     var hasNextLine = true, hasPreviousLine = true, hasNextColumn = true, hasPreviousColumn = true, tmpPosition = position.nextLine(), lastPosition = position;
  while(hasNextLine) {
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
    /* FIM DOS MOVIMENTOS VERTICAIS E HORIZONTAIS */

    /* INÍCIO DOS MOVIMENTOS DIAGONAIS */
    var hasUpperRight = true,
    hasUpperLeft = true,
    hasDownRight = true,
    hasDownLeft = true;
    tmpPosition = position.nextLine().nextColumn();
    lastPosition = position;
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
    tmpPosition = tmpPosition.nextLine().nextColumn();
  }

  tmpPosition = position.nextLine().previousColumn();
  lastPosition = position;
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
    /* FIM DOS MOVIMENTOS DIAGONAIS */

    return possibleMovements;
  }
  else {
    var msg = "Queen#possibleMovements: position should be a BoardPosition";
    alert(msg);
    throw msg;
  }
};
