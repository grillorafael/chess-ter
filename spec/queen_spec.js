describe('Queen', function(){
  var board, blackPlayer, whitePlayer, blackQueen, whiteQueen;
  beforeEach(function() {
    blackPlayer = new Player(Player.BLACK);
    whitePlayer = new Player(Player.WHITE);

    blackQueen = new Queen(blackPlayer);
    whiteQueen = new Queen(whitePlayer);
  });

  describe('.possibleMovements', function() {
    it('moves diagonally upper right, upper left and upper  until finds an enemy or board end', function() {
      board = new Board(whitePlayer, blackPlayer, 'rnbqkbnr/1ppppppp/p7/8/8/8/PPPPQPPP/RNBPKBNR');
      var movements = whiteQueen.possibleMovements(new BoardPosition('e2'), board);
      var expected = [
        new BoardPosition('f3'),
        new BoardPosition('g4'),
        new BoardPosition('h5'),
        new BoardPosition('d3'),
        new BoardPosition('c4'),
        new BoardPosition('b5'),
        new BoardPosition('a6'),
        new BoardPosition('e3'),
        new BoardPosition('e4'),
        new BoardPosition('e5'),
        new BoardPosition('e6'),
        new BoardPosition('e7'),
      ];

      compareMovementsAndExpected(movements, expected);
    });

    it('moves diagonally upper left until finds an enemy', function() {
      // board = new Board(whitePlayer, blackPlayer, 'rnbqkbnr/p1pppppp/8/1p6/8/5P2/PPP1BPPP/RNBQ1KNR');
      // var movements = whiteBishop.possibleMovements(new BoardPosition('e2'), board);
      // var expected =
      // [
      //   new BoardPosition('d3'),
      //   new BoardPosition('c4'),
      //   new BoardPosition('b5')
      // ];
      //
      // compareMovementsAndExpected(movements, expected);
    });

    it('moves diagonally down right until finds an enemy', function() {
      // board = new Board(whitePlayer, blackPlayer, 'rnq1kbnr/pp1bpppp/2p5/8/6P1/8/PPPPPP1P/RNBQKBNR');
      // var movements = blackBishop.possibleMovements(new BoardPosition('d7'), board);
      // var expected = [
      //   new BoardPosition('e6'),
      //   new BoardPosition('f5'),
      //   new BoardPosition('g4')
      // ];
      //
      // compareMovementsAndExpected(movements, expected);
    });

    it('moves diagonally down left until finds an enemy', function() {
      // board = new Board(whitePlayer, blackPlayer, 'rnbq1knr/ppppb1pp/5p2/8/1P6/8/P1PPPPPP/RNBQKBNR');
      // var movements = blackBishop.possibleMovements(new BoardPosition('e7'), board);
      // var expected = [
      //   new BoardPosition('d6'),
      //   new BoardPosition('c5'),
      //   new BoardPosition('b4')
      // ];
      //
      // compareMovementsAndExpected(movements, expected);
    });
  });

  function compareMovementsAndExpected(movements, expected) {
    expect(movements.length).toEqual(expected.length);

    for (var i = 0, l = expected.length; i < l; i++) {
      expect(movements).toContain(expected[i])
    }
  }
});
