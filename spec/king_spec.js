describe('King', function(){
  var board, blackPlayer, whitePlayer, blackKing, whiteKing;
  beforeEach(function() {
    blackPlayer = new Player(Player.BLACK);
    whitePlayer = new Player(Player.WHITE);

    blackKing = new King(blackPlayer);
    whiteKing = new King(whitePlayer);
  });

  describe('.possibleMovements', function() {
    it('should move right if only right available', function() {
      board = new Board(whitePlayer, blackPlayer, 'rnbqkbnr/pppppppp/8/8/8/6PB/PPPPPP1P/RNBQK1NR');

      var movements = whiteKing.possibleMovements(new BoardPosition('e1'), board);
      var expected = [
        new BoardPosition('f1')
      ];

      compareMovementsAndExpected(movements, expected);
    });

    describe('roque', function() {
      it('should be able to do a roque with left tower', function() {
        board = new Board(whitePlayer, blackPlayer, 'rnbqkbnr/pppppppp/8/8/8/1NBQ4/PPPPPPPP/R3KBNR');
        var movements = whiteKing.possibleMovements(new BoardPosition('e1'), board);
        var expected = [
          new BoardPosition('a1'),
          new BoardPosition('d1'),
        ];
        compareMovementsAndExpected(movements, expected);
      });

      it('should be able to do a roque with right tower', function() {
        board = new Board(whitePlayer, blackPlayer, 'rnbqkbnr/pppppppp/8/8/8/1NBQ4/PPPPPPPP/RNBQK2R');
        var movements = whiteKing.possibleMovements(new BoardPosition('e1'), board);
        var expected = [
          new BoardPosition('h1'),
          new BoardPosition('f1')
        ];
        compareMovementsAndExpected(movements, expected);
      });
    });
  });

  function compareMovementsAndExpected(movements, expected) {
    expect(movements.length).toEqual(expected.length);
    for (var i = 0, l = expected.length; i < l; i++) {
      expect(movements).toContain(expected[i])
    }
  }
});
