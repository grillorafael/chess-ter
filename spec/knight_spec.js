describe('Knight', function(){
  var board, blackPlayer, whitePlayer, blackKnight, whiteKnight;
  beforeEach(function()
  {
    blackPlayer = new Player(Player.BLACK);
    whitePlayer = new Player(Player.WHITE);

    blackKnight = new Knight(blackPlayer);
    whiteKnight = new Knight(whitePlayer);
  });

  describe('.possibleMovements', function(){
    it('should return 2 movements if in start position', function() {
      board = new Board(whitePlayer, blackPlayer, 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');

      var movements = whiteKnight.possibleMovements(new BoardPosition('b1'), board);
      var expected = [
        new BoardPosition('a3'),
        new BoardPosition('c3')
      ];

      compareMovementsAndExpected(movements, expected);
    });
  });

  function compareMovementsAndExpected(movements, expected) {
    expect(movements.length).toEqual(expected.length);
    for (var i = 0, l = expected.length; i < l; i++) {
      expect(movements).toContain(expected[i])
    }
  }
});
