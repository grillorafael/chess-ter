function BoardPosition(position) {
  //TODO: Tornar privado e validar
  if(position !== undefined && position.length == 2) {
    this.column = this.setColumn(position.charAt(0));
    this.line = this.setLine(parseInt(position.charAt(1)));
  }
}

BoardPosition.prototype.setLine = function (val) {
  if ((!((typeof val).toLowerCase() == 'number') || isNaN(val)) || (val < 1 || val > 8)) {
    throw Error("BoardPosition#setLine: Linha inválida");
  }
  this.line = val;
}

BoardPosition.prototype.setColumn = function (val) {
  if (!((typeof val).toLowerCase() == 'string') || (val < 'a' || val > 'h')) {
    throw Error("BoardPosition#setColumn: Coluna inválida");
  }
  this.column = val;
};


function Board(fen) {
  if(fen == undefined) {
    fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
  }
  this.board = [];
  this.buildBoard(fen);
};

Board.prototype.buildBoard = function(fen) {
  this.board = [];

  if(!this.validate_fen(fen).valid) {
    var msg = "Board#buildBoard: invalid fen";
    alert(msg);
    throw msg;
  }

  var lines = fen.split('/');
  for(var i = 0, l = lines.length; i < l; i++) {
    var tokens = lines[i], currentLine = [];
    for(var j = 0, lt = tokens.length; j < lt; j++) {
      var token = tokens.charAt(j);
      if(Board.fen_map.hasOwnProperty(token)) {
        currentLine.push(Board.fen_map[token]());
      }
      else {
        for(var empty = 0, total = parseInt(token); empty < total; empty++) {
          currentLine.push(null);
        }
      }
    }
    this.board.push(currentLine);
  }
};

Board.prototype.validate_fen = function(fen) {
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
    var sum_fields = 0;
    var previous_was_number = false;

    for (var k = 0; k < rows[i].length; k++) {
      if (!isNaN(rows[i][k])) {
        if (previous_was_number) {
          return {valid: false, error_number: 8, error: errors[8]};
        }
        sum_fields += parseInt(rows[i][k], 10);
        previous_was_number = true;
      } else {
        if (!/^[prnbqkPRNBQK]$/.test(rows[i][k])) {
          return {valid: false, error_number: 9, error: errors[9]};
        }
        sum_fields += 1;
        previous_was_number = false;
      }
    }
    if (sum_fields !== 8) {
      return {valid: false, error_number: 10, error: errors[10]};
    }
  }

  /* everything's okay! */
  return {valid: true, error_number: 0, error: errors[0]};
};

Board.fen_map = {
  'r': function() {
    return new Tower(new Player(Piece.BLACK));
  },
  'n': function() {
    return new Knight(new Player(Piece.BLACK));
  },
  'b': function() {
    return new Bishop(new Player(Piece.BLACK));
  },
  'q': function() {
    return new Queen(new Player(Piece.BLACK));
  },
  'k': function() {
    return new King(new Player(Piece.BLACK));
  },
  'p': function() {
    return new Pawn(new Player(Piece.BLACK));
  },
  'R': function() {
    return new Tower(new Player(Piece.WHITE));
  },
  'N': function() {
    return new Knight(new Player(Piece.WHITE));
  },
  'B': function() {
    return new Bishop(new Player(Piece.WHITE));
  },
  'Q': function() {
    return new Queen(new Player(Piece.WHITE));
  },
  'K': function() {
    return new King(new Player(Piece.WHITE));
  },
  'P': function() {
    return new Pawn(new Player(Piece.WHITE));
  }
};
