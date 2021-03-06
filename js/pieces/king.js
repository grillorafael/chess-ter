'use strict';

function King(player) {
  Piece.call(this, player);
}

King.prototype = new Piece();
King.prototype.constructor = King;

King.prototype.getPieceValue = function () {
  return 32767;
};

King.prototype.getCountPossibleMoves = function() {
  return this._countPossibleMoves;
};

King.prototype.possibleMovements = function (position, board, calculatingCastle) {
  if(arguments.length == 2) {
    calculatingCastle = false;
  }

  if(position instanceof BoardPosition) {
    var possibleMovements = [], currentPlayer = this.player();

    if(position.nextLine()) {
      var up = board.at(position.nextLine());
      if(up.empty() || this.isEnemyOf(up)) {
        possibleMovements.push(position.nextLine());
      }
    }

    if(position.previousLine()) {
      var down = board.at(position.previousLine());
      if(down.empty() || this.isEnemyOf(down)) {
        possibleMovements.push(position.previousLine());
      }
    }

    if(position.nextColumn()) {
      var right = board.at(position.nextColumn());
      if(right.empty() || this.isEnemyOf(right)) {
        possibleMovements.push(position.nextColumn());
      }
    }

    if(position.previousColumn()) {
      var left = board.at(position.previousColumn());
      if(left.empty() || this.isEnemyOf(left)) {
        possibleMovements.push(position.previousColumn());
      }
    }

    if(position.nextLine() && position.nextLine().nextColumn()) {
      var rightUp = board.at(position.nextLine().nextColumn());
      if(rightUp.empty() || this.isEnemyOf(rightUp)) {
        possibleMovements.push(position.nextLine().nextColumn());
      }
    }

    if(position.nextLine() && position.nextLine().previousColumn()) {
      var leftUp = board.at(position.nextLine().previousColumn());
      if(leftUp.empty() || this.isEnemyOf(leftUp)) {
        possibleMovements.push(position.nextLine().previousColumn());
      }
    }

    if(position.previousLine() && position.previousLine().nextColumn()) {
      var rightDown = board.at(position.previousLine().nextColumn());
      if(rightDown.empty() || this.isEnemyOf(rightDown)) {
        possibleMovements.push(position.previousLine().nextColumn());
      }
    }

    if(position.previousLine() && position.previousLine().previousColumn()) {
      var leftDown = board.at(position.previousLine().previousColumn());
      if(leftDown.empty() || this.isEnemyOf(leftDown)) {
        possibleMovements.push(position.previousLine().previousColumn());
      }
    }


    if(!calculatingCastle && board.canPlayerCastle(currentPlayer) && !board.isPlayerInCheck(currentPlayer)) {
      if(this.player().isWhite()) {
        if(!board.isPositionVulnerable(new BoardPosition('a1')) && !board.isLeftWhiteTowerMoved() && !board.hasHorizontalCollision(position, new BoardPosition('a1'))) {
          possibleMovements.push(new BoardPosition('a1'));
        }

        if(!board.isPositionVulnerable(new BoardPosition('h1')) && !board.isRightWhiteTowerMoved() && !board.hasHorizontalCollision(position, new BoardPosition('h1'))) {
          possibleMovements.push(new BoardPosition('h1'));
        }
      }
      else if(this.player().isBlack()) {
        if(!board.isPositionVulnerable(new BoardPosition('a8')) && !board.isRightBlackTowerMoved() && !board.hasHorizontalCollision(position, new BoardPosition('a8'))) {
          possibleMovements.push(new BoardPosition('a8'));
        }
        if(!board.isPositionVulnerable(new BoardPosition('h8')) && !board.isLeftBlackTowerMoved() && !board.hasHorizontalCollision(position, new BoardPosition('h8'))) {
          possibleMovements.push(new BoardPosition('h8'));
        }
      }
    }

    this._countPossibleMoves = possibleMovements.length;
    return possibleMovements;
  }
  else {
    var msg = "King#possibleMovements: position should be a BoardPosition";
    alert(msg);
    throw msg;
  }
};
