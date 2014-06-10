'use strict';

function Pawn(player) {
  Piece.call(this, player);
}

Pawn.prototype = new Piece();
Pawn.prototype.constructor = Pawn;

Pawn.prototype.getPieceValue = function () {
  return 100;
};

Pawn.prototype.getCountPossibleMoves = function() {
  return this._countPossibleMoves;
};

Pawn.prototype.possibleMovements = function (position, board) {
  if(!(position instanceof BoardPosition)) {
    var msg = "Pawn#possibleMovements: position should be a BoardPosition";
    alert(msg);
    throw new Error(msg);
  }

  var possibleMovements = [];
  if(this.player().isWhite()) {
    if(position.line() == 2 && board.at(position.nextLine()).empty() && board.at(position.nextLine().nextLine()).empty()) {
      possibleMovements.push(position.nextLine().nextLine());
    }

    if(position.nextLine() && board.at(position.nextLine()).empty()) {
      possibleMovements.push(position.nextLine());
    }

    // rightup
    if(position.nextLine() && position.nextLine().nextColumn()) {
      var rightUp = board.at(position.nextLine().nextColumn());
      if(!rightUp.empty() && this.isEnemyOf(rightUp)) {
        possibleMovements.push(position.nextLine().nextColumn());
      }
    }

    // lefttup
    if(position.nextLine() && position.nextLine().previousColumn()) {
      var leftUp = board.at(position.nextLine().previousColumn());
      if(!leftUp.empty() && this.isEnemyOf(leftUp)) {
        possibleMovements.push(position.nextLine().previousColumn());
      }
    }
  }
  else {
    if(position.line() == 7 && board.at(position.previousLine()).empty() && board.at(position.previousLine().previousLine()).empty()) {
      possibleMovements.push(position.previousLine().previousLine());
    }

    if(position.previousLine() && board.at(position.previousLine()).empty()) {
      possibleMovements.push(position.previousLine());
    }

    // rightdown
    if(position.previousLine() && position.previousLine().nextColumn()) {
      var rightDown = board.at(position.previousLine().nextColumn());
      if(!rightDown.empty() && this.isEnemyOf(rightDown)) {
        possibleMovements.push(position.previousLine().nextColumn());
      }
    }

    // lefttdown
    if(position.previousLine() && position.previousLine().previousColumn()) {
      var leftDown = board.at(position.previousLine().previousColumn());
      if(!leftDown.empty() && this.isEnemyOf(leftDown)) {
        possibleMovements.push(position.previousLine().previousColumn());
      }
    }
  }

  this._countPossibleMoves = possibleMovements.length;
  return possibleMovements;
};
