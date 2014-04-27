describe('King', function(){
  var board, blackPlayer, whitePlayer, blackKing, whiteKing;
  beforeEach(function()
  {
    blackPlayer = new Player(Player.BLACK);
    whitePlayer = new Player(Player.WHITE);

    blackKing = new King(blackPlayer);
    whiteKing = new King(whitePlayer);
  });

  describe('.possibleMovements', function(){
    it('it should move right if only right available', function() {
      board = new Board(whitePlayer, blackPlayer, 'rnbqkbnr/pppppppp/8/8/8/6PB/PPPPPP1P/RNBQK1NR');

      var movements = whiteKing.possibleMovements(new BoardPosition('e1'), board);
      var expected = [
        new BoardPosition('f1')
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
