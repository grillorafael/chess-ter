describe('Board', function() {
  describe('#moveFromTo', function() {
    it('moves a piece from a position to another', function() {
      var board, blackPlayer, whitePlayer, blackPawn, whitePawn;
      blackPlayer = new Player(Player.BLACK);
      whitePlayer = new Player(Player.WHITE);

      blackPawn = new Pawn(blackPlayer);
      whitePawn = new Pawn(whitePlayer);

      board = new Board(whitePlayer, blackPlayer);

      board.moveFromTo(new BoardPosition('a2'), new BoardPosition('a3'));

      expect(board.at(new BoardPosition('a2')).empty()).toBeTruthy();
      expect(board.at(new BoardPosition('a3')).empty()).toBeFalsy();
    });
    describe('roque', function() {
      describe('white piece', function() {
        it('does roque with left tower', function() {
          var board, blackPlayer, whitePlayer, blackKing, whiteKing;
          blackPlayer = new Player(Player.BLACK);
          whitePlayer = new Player(Player.WHITE);

          blackKing = new King(blackPlayer);
          whiteKing = new King(whitePlayer);

          board = new Board(whitePlayer, blackPlayer, 'rnbqkbnr/pppppppp/8/8/8/1NBQ4/PPPPPPPP/R3KBNR');

          board.moveFromTo(new BoardPosition('e1'), new BoardPosition('a1'));
          expect(board.at(new BoardPosition('a1')).empty()).toBeTruthy();
          expect(board.at(new BoardPosition('c1')).empty()).toBeFalsy();
          expect(board.at(new BoardPosition('e1')).empty()).toBeFalsy();
        });
      });
      describe('black piece', function() {

      });
    });
  });

  describe('#', function() {
    it('returns true if player is in check mate', function() {
      var blackPlayer = new Player(Player.BLACK);
      var whitePlayer = new Player(Player.WHITE);

      var board = new Board(whitePlayer, blackPlayer, '4K3/8/3rqr2/8/8/8/8/4k3');
      board.playerTurn = whitePlayer;

      expect(board.isPlayerInCheckMate(whitePlayer)).toBe(true);
    });

    it('returns false if player is in not check mate', function() {
      var blackPlayer = new Player(Player.BLACK);
      var whitePlayer = new Player(Player.WHITE);

      var board = new Board(whitePlayer, blackPlayer, '4K3/4q3/8/8/8/8/8/4k3');
      board.playerTurn = whitePlayer;

      expect(board.isPlayerInCheckMate(whitePlayer)).toBe(false);
    });
  });

  describe('#getPreviousMove', function() {
    it('returns the previous movement done by the board', function() {
      var blackPlayer = new Player(Player.BLACK);
      var whitePlayer = new Player(Player.WHITE);

      var board = new Board(whitePlayer, blackPlayer);

      board.moveFromTo(new BoardPosition('a2'), new BoardPosition('a3'));

      expect(board.getPreviousMove()).toEqual([new BoardPosition('a2'), new BoardPosition('a3')]);
    });

    it('returns null if there is no previous movement', function() {
      var blackPlayer = new Player(Player.BLACK);
      var whitePlayer = new Player(Player.WHITE);

      var board = new Board(whitePlayer, blackPlayer);
      expect(board.getPreviousMove()).toEqual([]);
    });
  });

  describe('#staleMate', function() {
    it('returns true if theres a stalemate', function() {
      var blackPlayer = new Player(Player.BLACK);
      var whitePlayer = new Player(Player.WHITE);

      var board = new Board(whitePlayer, blackPlayer, '8/6b1/8/8/8/n7/PP6/K7');
      board.blackKingMoved = true;
      board.whiteKingMoved = true;

      expect(board.staleMate(whitePlayer)).toBe(true);
    });

    it('returns true if theres not a stalemate', function() {
      var blackPlayer = new Player(Player.BLACK);
      var whitePlayer = new Player(Player.WHITE);

      var board = new Board(whitePlayer, blackPlayer);

      expect(board.staleMate(whitePlayer)).toBe(false);
    });
  });

  describe('#getNumPieces', function() {
    it('returns the total number of pieces in game', function() {
      blackPlayer = new Player(Player.BLACK);
      whitePlayer = new Player(Player.WHITE);

      board = new Board(whitePlayer, blackPlayer);
      expect(board.getNumPieces()).toEqual(32);

      board = new Board(whitePlayer, blackPlayer, 'rnbqkbnr/pppppppp/8/8/8/1NBQ4/PPPPPPPP/4KBNR');
      expect(board.getNumPieces()).toEqual(31);
    });
  });
});

describe('BoardPosition', function () {
  var position;
  beforeEach(function () {
    position = new BoardPosition('a1');
  });

  describe('A board position', function () {
    describe("#constructor", function(){
      it("should not allow empty params", function(){
        expect(function(){
          new BoardPosition();
        }).toThrow(Error("BoardPosition#new: position valid"));
      });
    });
    describe("#nextLine", function(){
      it("should return a new BoardPosition with next line", function(){
        expect(position.nextLine()).toEqual(new BoardPosition('a2'));
      });
      it("should be able to stack", function(){
        expect(position.nextLine().nextLine()).toEqual(new BoardPosition('a3'));
      });
    });
    describe("#nextColumn", function(){
      it("should return a new BoardPosition with next column", function(){
        expect(position.nextColumn()).toEqual(new BoardPosition('b1'));
      });
      it("should be able to stack", function(){
        expect(position.nextColumn().nextColumn()).toEqual(new BoardPosition('c1'));
      });
    });

    describe("#previousLine", function(){
      it("should return a new BoardPosition with next line", function(){
        expect(new BoardPosition('b4').previousLine()).toEqual(new BoardPosition('b3'));
      });
      it("should be able to stack", function(){
        expect(new BoardPosition('b4').previousLine().previousLine()).toEqual(new BoardPosition('b2'));
      });
    });
    describe("#nextColumn", function(){
      it("should return a new BoardPosition with next column", function(){
        expect(position.nextColumn()).toEqual(new BoardPosition('b1'));
      });
      it("should be able to stack", function(){
        expect(position.nextColumn().nextColumn()).toEqual(new BoardPosition('c1'));
      });
    });

    describe("#byArray", function(){
      it('should return a new board position based on [j, i]', function(){
        expect(BoardPosition.byColumnLineArray([0,0])).toEqual(new BoardPosition('a8'));
        expect(BoardPosition.byColumnLineArray([1,1])).toEqual(new BoardPosition('b7'));
        expect(BoardPosition.byColumnLineArray([7,7])).toEqual(new BoardPosition('h1'));
      });
    });

    describe("#setLine", function () {
      it("should allow line 1", function () {
        expect(function () {
          position.setLine(1)
        }).not.toThrow(Error);
      });
      it("should allow line 4", function () {
        expect(function () {
          position.setLine(4)
        }).not.toThrow(Error);
      });
      it("should allow line 8", function () {
        expect(function () {
          position.setLine(8)
        }).not.toThrow(Error);
      });
      it("should not allow line 0", function () {
        expect(function () {
          position.setLine(0)
        }).toThrow(Error("BoardPosition#setLine: Linha inválida"));
      });
      it("should not allow line 9", function () {
        expect(function () {
          position.setLine(9)
        }).toThrow(Error("BoardPosition#setLine: Linha inválida"));
      });
      it("should not allow NULL", function () {
        expect(function () {
          position.setLine(null)
        }).toThrow(Error("BoardPosition#setLine: Linha inválida"));
      });
      it("should not allow objects", function () {
        expect(function () {
          position.setLine({})
        }).toThrow(Error("BoardPosition#setLine: Linha inválida"));
      });
      it("should not allow strings", function () {
        expect(function () {
          position.setLine('s')
        }).toThrow(Error("BoardPosition#setLine: Linha inválida"));
      });
    });

    describe("#setColumn", function () {
      it("should allow column 'a'", function () {
        expect(function () {
          position.setColumn('a')
        }).not.toThrow(Error);
      });
      it("should allow column 'd'", function () {
        expect(function () {
          position.setColumn('d')
        }).not.toThrow(Error);
      });
      it("should allow column 'h'", function () {
        expect(function () {
          position.setColumn('h')
        }).not.toThrow(Error);
      });
      it("should not allow column '`'", function () {
        expect(function () {
          position.setColumn('`')
        }).toThrow(Error("BoardPosition#setColumn: Coluna inválida"));
      });
      it("should not allow column 'i'", function () {
        expect(function () {
          position.setColumn('i')
        }).toThrow(Error("BoardPosition#setColumn: Coluna inválida"));
      });
      it("should not allow NULL", function () {
        expect(function () {
          position.setColumn(null)
        }).toThrow(Error("BoardPosition#setColumn: Coluna inválida"));
      });
      it("should not allow objects", function () {
        expect(function () {
          position.setColumn({})
        }).toThrow(Error("BoardPosition#setColumn: Coluna inválida"));
      });
      it("should not allow strings", function () {
        expect(function () {
          position.setColumn('s')
        }).toThrow(Error("BoardPosition#setColumn: Coluna inválida"));
      });
    })
  });

});
