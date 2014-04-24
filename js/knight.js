function Knight(player) {
  Piece.call(this, player);
};


Knight.prototype = new Piece();
Knight.prototype.constructor = Knight;


Knight.prototype.possibleMovements = function (position, board) {
  if(position instanceof BoardPosition) {
    var possibleMovements = [];

    var twoUpOneRight = board.at(position.nextLine().nextLine().nextColumn());
    if(twoUpOneRight.empty() || this.isEnemyOf(twoUpOneRight))
    {
      possibleMovements.push(position.nextLine().nextLine().nextColumn());
    }

    var twoUpOneLeft = board.at(position.nextLine().nextLine().previousColumn());
    if(twoUpOneLeft.empty() || this.isEnemyOf(twoUpOneLeft))
    {
      possibleMovements.push(position.nextLine().nextLine().previousColumn());
    }

    var oneUpTwoLeft = board.at(position.nextLine().previousColumn().previousColumn());
    if(oneUpTwoLeft.empty() || this.isEnemyOf(oneUpTwoLeft))
    {
      possibleMovements.push(position.nextLine().previousColumn().previousColumn());
    }

    var oneUpTwoRight = board.at(position.nextLine().nextColumn().nextColumn());
    if(oneUpTwoRight.empty() || this.isEnemyOf(oneUpTwoRight))
    {
      possibleMovements.push(position.nextLine().nextColumn().nextColumn());
    }

    var twoDownOneRight = board.at(position.previousLine().previousLine().nextColumn());
    if(twoDownOneRight.empty() || this.isEnemyOf(twoDownOneRight))
    {
      possibleMovements.push(position.previousLine().previousLine().nextColumn());
    }

    var twoDownOneLeft = board.at(position.previousLine().previousLine().previousColumn());
    if(twoDownOneLeft.empty() || this.isEnemyOf(twoDownOneLeft))
    {
      possibleMovements.push(position.previousLine().previousLine().previousColumn());
    }

    var oneDownTwoRight = board.at(position.previousLine().nextColumn().nextColumn());
    if(oneDownTwoRight.empty() || this.isEnemyOf(oneDownTwoRight))
    {
      possibleMovements.push(position.previousLine().nextColumn().nextColumn());
    }

    var oneDownTwoLeft = board.at(position.previousLine().previousColumn().previousColumn());
    if(oneDownTwoLeft.empty() || this.isEnemyOf(oneDownTwoLeft))
    {
      possibleMovements.push(position.previousLine().previousColumn().previousColumn());
    }

    return possibleMovements;
  }
  else {
    var msg = "Knight#possibleMovements: position should be a BoardPosition";
    alert(msg);
    throw msg;
  }
};
