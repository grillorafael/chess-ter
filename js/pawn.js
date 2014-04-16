function Pawn(player) {
  Piece.call(this, player);
};

Pawn.prototype = new Piece();
Pawn.prototype.constructor = Pawn;

Pawn.prototype.possibleMovements = function (position, board) {
  if(!(position instanceof BoardPosition)) {
    var msg = "Pawn#possibleMovements: position should be a BoardPosition";
    alert(msg);
    throw Error(msg);
  };

  var possibleMovements = [];

  if(this.player().isWhite()) {
    if(position.line() == 2 && board.at(position.nextLine().nextLine()).empty()) {
      possibleMovements.push(position.nextLine().nextLine());
    }

    if(board.at(position.nextLine()).empty()) {
      possibleMovements.push(position.nextLine());
    }

    // rightup
    var rightUp = board.at(position.nextLine().nextColumn());
    if(!rightUp.empty() && this.isEnemyOf(rightUp)) {
      possibleMovements.push(position.nextLine().nextColumn());
    }

    // lefttup
    var leftUp = board.at(position.nextLine().previousColumn());
    if(!leftUp.empty() && this.isEnemyOf(leftUp)) {
      possibleMovements.push(position.nextLine().previousColumn());
    }
  }
  else {
    if(position.line() == 7 && board.at(position.previousLine().previousLine()).empty()) {
      possibleMovements.push(position.previousLine().previousLine());
    }

    if(board.at(position.previousLine()).empty()) {
      possibleMovements.push(position.previousLine());
    }

    // rightup
    var rightDown = board.at(position.previousLine().nextColumn());
    if(!rightDown.empty() && this.isEnemyOf(rightDown)) {
      possibleMovements.push(position.previousLine().nextColumn());
    }

    // lefttup
    var leftDown = board.at(position.previousLine().previousColumn());
    if(!leftDown.empty() && this.isEnemyOf(leftUp)) {
      possibleMovements.push(position.previousLine().previousColumn());
    }
  }

  return possibleMovements;
};
