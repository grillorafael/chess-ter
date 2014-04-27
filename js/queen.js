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
    if(!tmpPosition) {
      break;
    }
    if(tmpPosition.sameAs(lastPosition)) {
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

    if(tmpPosition.sameAs(lastPosition)) {
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

    if(tmpPosition.sameAs(lastPosition)) {
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

    if(tmpPosition.sameAs(lastPosition)) {
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

  if(position.nextLine() && position.nextLine().nextColumn()) {
    tmpPosition = position.nextLine().nextColumn();
  }
  else {
    hasUpperRight = false;
  }
  lastPosition = position;
  while(hasUpperRight) {
    if(tmpPosition.sameAs(lastPosition)) {
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
  }
  else {
    hasUpperLeft = false;
  }
  lastPosition = position;
  while(hasUpperLeft) {
    if(tmpPosition.sameAs(lastPosition)) {
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
  }
  else {
    hasDownRight = false;
  }
  lastPosition = position;
  while(hasDownRight) {
    if(tmpPosition.sameAs(lastPosition)) {
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
  }
  else {
    hasDownLeft = false;
  }
  lastPosition = position;
  while(hasDownLeft) {
    if(tmpPosition.sameAs(lastPosition)) {
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
    /* FIM DOS MOVIMENTOS DIAGONAIS */

    return possibleMovements;
  }
  else {
    var msg = "Queen#possibleMovements: position should be a BoardPosition";
    alert(msg);
    throw msg;
  }
};
