function Board(playerWhite, playerBlack, fen) {
  fen = fen || Board.initialFen;

  this.blackTowerOrKingMoved = false;
  this.whiteTowerOrKingMoved = false;

  this.board = [];
  this.playerWhite = playerWhite;
  this.playerBlack = playerBlack;

  this.playerTurn = playerWhite;

  this.buildBoard(fen);
};

Board.prototype.switchTurn = function() {
  this.playerTurn = this.playerTurn.isWhite() ? this.playerBlack : this.playerWhite;
};

Board.prototype.isTurnOfPiecePosition = function(position) {
  return this.at(position).player().sameAs(this.playerTurn);
};

Board.prototype.hasHorizontalCollision = function(from, to) {
  if(from.column() > to.column()) {
    while(!from.previousColumn().sameAs(to)) {
      from = from.previousColumn();
      if(!this.at(from).empty()) {
        return true;
      }
    }
  }
  else {
    while(!from.nextColumn().sameAs(to)) {
      from = from.nextColumn();
      if(!this.at(from).empty()) {
        return true;
      }
    }
  }

  return false;
}

Board.prototype.kingPositionOf = function(player) {
  var i, j, li = this.board[0].length, lj = this.board.length;
  for(i = 0; i < li; i++) {
    for(j = 0; j < lj; j++) {
      var currentPosition = new BoardPosition(BoardPosition.getColumnByNumber(j) + (i + 1)),
        currentPositionPiece = this.at(currentPosition);
      if(!currentPositionPiece.empty() && currentPositionPiece.player().sameAs(player) && (currentPositionPiece instanceof King)) {
        return currentPosition;
      }
    }
  }
};

Board.prototype.isPositionVulnerable = function(position) {
  var player = this.at(position).player(),
    i,
    j,
    li = this.board[0].length,
    lj = this.board.length;

  for(i = 0; i < li; i++) {
    for(j = 0; j < lj; j++) {
      var currentPosition = BoardPosition.byColumnLineArray([j, i]), currentPositionPiece = this.at(currentPosition);
      if(!currentPositionPiece.empty() && currentPositionPiece.isEnemyOfPlayer(player)) {
        var possibleMovements = currentPositionPiece.possibleMovements(currentPosition, this, true);
        if(position.in(possibleMovements)) {
          return true;
        }
      }
    }
  }

  return false;
};

Board.prototype.isPlayerInCheck = function(player) {
  var kingPosition = this.kingPositionOf(player);
  return this.isPositionVulnerable(kingPosition);
};

Board.prototype.canPlayerRoque = function(player) {
  return !(player.isWhite() ? this.whiteTowerOrKingMoved : this.blackTowerOrKingMoved);
}

Board.prototype.moveFromTo = function(fromPosition , toPosition) {
  if (!(fromPosition instanceof BoardPosition) || !(toPosition instanceof BoardPosition)) {
    var msg = "Board#moveFromTo: Invalid position";
    alert(msg);
    throw Error(msg);
  }

  var from = this.at(fromPosition);
  var to = this.at(toPosition);

  if(!from.empty() && toPosition.in(from.possibleMovements(fromPosition, this))) {

    if((from instanceof Tower) || (from instanceof King)) {
      if(from.player().isWhite()) {
        this.whiteTowerOrKingMoved = true;
      }
      else {
        this.blackTowerOrKingMoved = true;
      }
    }

    if((!to.empty() && !to.isEnemyOf(from))) {
      this.setPosition(fromPosition, to);
      this.setPosition(toPosition, Board.EMPTY);

      if(toPosition.column() > fromPosition.column()) {
        this.setPosition(fromPosition.nextColumn().nextColumn(), from);
      }
      else {
        this.setPosition(fromPosition.previousColumn().previousColumn(), from);
      }
    }
    else {
      this.setPosition(fromPosition, Board.EMPTY);
      this.setPosition(toPosition, from);
    }
    this.switchTurn();
    return true;
  }

  return false;
};

Board.prototype.setPosition = function(position, value) {
  if (!(position instanceof BoardPosition)) {
    var msg = "Board#setPosition: Invalid position";
    alert(msg);
    throw Error(msg);
  }

  this.board[Math.abs(7 - (position.line() - 1))][position.getColumnNumber()] = value;
};

Board.prototype.at = function (position) {
  if (!(position instanceof BoardPosition)) {
    var msg = "Board#at: Invalid position";
    alert(msg);
    throw Error(msg);
  }
  return this.board[Math.abs(7 - (position.line() - 1))][position.getColumnNumber()];
};

Board.prototype.buildBoard = function (fen) {
  this.board = [];

  if (!this.validateFen(fen).valid) {
    var msg = "Board#buildBoard: invalid fen";
    alert(msg);
    throw msg;
  }

  var lines = fen.split('/');

  for (var i = 0, l = lines.length; i < l; i++) {
    var tokens = lines[i], currentLine = [];
    for (var j = 0, lt = tokens.length; j < lt; j++) {
      var token = tokens.charAt(j);
      var piece = this.getPositionFromToken(token);
      if ($.isArray(piece)) {
        for (var k = 0, lp = piece.length; k < lp; k++) {
          currentLine.push(piece[k]);
        }
      }
      else {
        currentLine.push(piece);
      }

    }
    this.board.push(currentLine);
  }
};

Board.prototype.getPositionFromToken = function (token) {
  if (Board.fenMap.hasOwnProperty(token)) {
    var player = ((token == token.toLowerCase()) ? this.playerBlack : this.playerWhite);
    return Board.fenMap[token](player);
  }
  else {
    var position = [];
    for (var empty = 0, total = parseInt(token); empty < total; empty++) {
      position.push(Board.EMPTY);
    }
    return position;
  }
};

Board.prototype.validateFen = function (fen) {
  var errors = {
    7: '1st field (piece positions) does not contain 8 \'/\'-delimited rows.',
    8: '1st field (piece positions) is invalid [consecutive numbers].',
    9: '1st field (piece positions) is invalid [invalid piece].',
    10: '1st field (piece positions) is invalid [row too large].',
  };
  var tokens = fen.split(/\s+/);

  /* 7th criterion: 1st field contains 8 rows? */
  var rows = tokens[0].split('/');
  if (rows.length !== 8) {
    return {valid: false, error_number: 7, error: errors[7]};
  }

  /* 8th criterion: every row is valid? */
  for (var i = 0; i < rows.length; i++) {
    /* check for right sum of fields AND not two numbers in succession */
    var sumFields = 0;
    var previousWasNumber = false;

    for (var k = 0; k < rows[i].length; k++) {
      if (!isNaN(rows[i][k])) {
        if (previousWasNumber) {
          return {valid: false, error_number: 8, error: errors[8]};
        }
        sumFields += parseInt(rows[i][k], 10);
        previousWasNumber = true;
      } else {
        if (!/^[prnbqkPRNBQK]$/.test(rows[i][k])) {
          return {valid: false, error_number: 9, error: errors[9]};
        }
        sumFields += 1;
        previousWasNumber = false;
      }
    }
    if (sumFields !== 8) {
      return {valid: false, error_number: 10, error: errors[10]};
    }
  }

  /* everything's okay! */
  return {valid: true, error_number: 0, error: errors[0]};
};

Board.EMPTY = {empty : function(){return true}};
Board.initialFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
Board.fenMap = {
  'r': function (player) {
    return new Tower(player);
  },
  'n': function (player) {
    return new Knight(player);
  },
  'b': function (player) {
    return new Bishop(player);
  },
  'q': function (player) {
    return new Queen(player);
  },
  'k': function (player) {
    return new King(player);
  },
  'p': function (player) {
    return new Pawn(player);
  },
  'R': function (player) {
    return new Tower(player);
  },
  'N': function (player) {
    return new Knight(player);
  },
  'B': function (player) {
    return new Bishop(player);
  },
  'Q': function (player) {
    return new Queen(player);
  },
  'K': function (player) {
    return new King(player);
  },
  'P': function (player) {
    return new Pawn(player);
  }
};
//
