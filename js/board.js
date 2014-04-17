function BoardPosition(position) {
  if(!(position && position.length == 2)) {
    var msg = "BoardPosition#new: position valid";
    alert(msg);
    throw Error(msg);
  };

  this.setColumn(position.charAt(0));
  this.setLine(parseInt(position.charAt(1)));
}

BoardPosition.prototype.prettyPrint = function() {
  return this.column() + this.line();
};

BoardPosition.prototype.column = function() {
  return this._column;
};

BoardPosition.prototype.line = function() {
  return this._line;
};

BoardPosition.prototype.getColumnNumber = function() {
  var base = "a".charCodeAt(0);
  return this.column().charCodeAt(0) - base;
};

BoardPosition.prototype.isBottomLine = function() {
  return this.line() == 1;
};

BoardPosition.prototype.isTopLine = function() {
  return this.line() == 8;
};

BoardPosition.prototype.isLeftColumn = function() {
  return this.column() == 'a';
};

BoardPosition.prototype.isRightColumn = function() {
  return this.column() == 'h';
};

BoardPosition.prototype.previousLine = function() {
  if(this.isBottomLine()) {
    return this;
  }
  var nextLine = this.line() - 1;
  return new BoardPosition(this.column() + "" + nextLine);
}

BoardPosition.prototype.nextLine = function() {
  if(this.isTopLine()) {
    return this;
  }
  var nextLine = this.line() + 1;
  return new BoardPosition(this.column() + "" + nextLine);
}

BoardPosition.prototype.previousColumn = function() {
  if(this.isLeftColumn()) {
    return this;
  }
  var nextColumn = this.column().charCodeAt(0) - 1;
  return new BoardPosition(String.fromCharCode(nextColumn) + "" + this.line());
}

BoardPosition.prototype.nextColumn = function() {
  if(this.isRightColumn()) {
    return this;
  }
  var nextColumn = this.column().charCodeAt(0) + 1;
  return new BoardPosition(String.fromCharCode(nextColumn) + "" + this.line());
}

BoardPosition.prototype.setLine = function (val) {
  if ((!((typeof val).toLowerCase() == 'number') || isNaN(val)) || (val < 1 || val > 8)) {
    throw Error("BoardPosition#setLine: Linha inválida");
  }
  this._line = val;
}

BoardPosition.prototype.setColumn = function (val) {
  if (!((typeof val).toLowerCase() == 'string') || (val < 'a' || val > 'h')) {
    throw Error("BoardPosition#setColumn: Coluna inválida");
  }
  this._column = val;
};


function Board(fen) {
  fen = fen || Board.initialFen;

  this.board = [];
  this.buildBoard(fen);
};

Board.prototype.at = function(position) {
  if(!(position instanceof BoardPosition)) {
    var msg = "Board#at: Invalid position";
    alert(msg);
    throw Error(msg);
  }
  return this.board[Math.abs(7 - (position.line() - 1))][position.getColumnNumber()];
};

Board.prototype.buildBoard = function(fen) {
  this.board = [];

  if(!this.validateFen(fen).valid) {
    var msg = "Board#buildBoard: invalid fen";
    alert(msg);
    throw msg;
  }

  var lines = fen.split('/');
  for(var i = 0, l = lines.length; i < l; i++) {
    var tokens = lines[i], currentLine = [];
    for(var j = 0, lt = tokens.length; j < lt; j++) {
      var token = tokens.charAt(j);
      if(Board.fenMap.hasOwnProperty(token)) {
        currentLine.push(Board.fenMap[token]());
      }
      else {
        for(var empty = 0, total = parseInt(token); empty < total; empty++) {
          currentLine.push( { empty: function(){ return true; } } );
        }
      }
    }
    this.board.push(currentLine);
  }
};

Board.prototype.validateFen = function(fen) {
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

Board.initialFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
Board.fenMap = {
  'r': function() {
    return new Tower(new Player(Player.BLACK));
  },
  'n': function() {
    return new Knight(new Player(Player.BLACK));
  },
  'b': function() {
    return new Bishop(new Player(Player.BLACK));
  },
  'q': function() {
    return new Queen(new Player(Player.BLACK));
  },
  'k': function() {
    return new King(new Player(Player.BLACK));
  },
  'p': function() {
    return new Pawn(new Player(Player.BLACK));
  },
  'R': function() {
    return new Tower(new Player(Player.WHITE));
  },
  'N': function() {
    return new Knight(new Player(Player.WHITE));
  },
  'B': function() {
    return new Bishop(new Player(Player.WHITE));
  },
  'Q': function() {
    return new Queen(new Player(Player.WHITE));
  },
  'K': function() {
    return new King(new Player(Player.WHITE));
  },
  'P': function() {
    return new Pawn(new Player(Player.WHITE));
  }
};
