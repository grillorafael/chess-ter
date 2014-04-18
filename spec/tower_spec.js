describe('Tower', function(){
  var board, blackPlayer, whitePlayer, blackTower, whiteTower;
  beforeEach(function(){
    blackPlayer = new Player(Player.BLACK);
    whitePlayer = new Player(Player.WHITE);

    blackTower = new Tower(blackPlayer);
    whiteTower = new Tower(whitePlayer);
  });

  describe('.possibleMovements', function(){
    it('moves to a upper line until find a enemy', function(){
      board = new Board(whitePlayer, blackPlayer, 'rnbqkbnr/pppppppp/8/8/8/8/1PPPPPPP/RNBQKBNR');
      var movements = whiteTower.possibleMovements(new BoardPosition('a1'), board);
      var expected = [
        new BoardPosition('a2'),
        new BoardPosition('a3'),
        new BoardPosition('a4'),
        new BoardPosition('a5'),
        new BoardPosition('a6'),
        new BoardPosition('a7')
      ];

      compareMovementsAndExpected(movements, expected);
    });

    it('moves to a previous line until find a enemy', function(){
      board = new Board(whitePlayer, blackPlayer, 'rnbqkbnr/1ppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
      var movements = blackTower.possibleMovements(new BoardPosition('a8'), board);
      var expected = [
        new BoardPosition('a7'),
        new BoardPosition('a6'),
        new BoardPosition('a5'),
        new BoardPosition('a4'),
        new BoardPosition('a3'),
        new BoardPosition('a2')
      ];

      compareMovementsAndExpected(movements, expected);
    });

    it('moves to right column until find a enemy', function(){
      board = new Board(whitePlayer, blackPlayer, '1nbqkbnr/pppppppp/r7/8/8/8/PPPPPPPP/RNBQKBNR');
      var movements = blackTower.possibleMovements(new BoardPosition('a6'), board);
      var expected = [
        new BoardPosition('b6'),
        new BoardPosition('c6'),
        new BoardPosition('d6'),
        new BoardPosition('e6'),
        new BoardPosition('f6'),
        new BoardPosition('g6'),
        new BoardPosition('h6'),
        new BoardPosition('a5'),
        new BoardPosition('a4'),
        new BoardPosition('a3'),
        new BoardPosition('a2')
      ];

      compareMovementsAndExpected(movements, expected);
    });

    it('moves to left column until find a enemy', function(){
      board = new Board(whitePlayer, blackPlayer, 'rnbqkbn1/pppppppp/7r/8/8/8/PPPPPPPP/RNBQKBNR');
      var movements = blackTower.possibleMovements(new BoardPosition('h6'), board);
      var expected = [
        new BoardPosition('a6'),
        new BoardPosition('b6'),
        new BoardPosition('c6'),
        new BoardPosition('d6'),
        new BoardPosition('e6'),
        new BoardPosition('f6'),
        new BoardPosition('g6'),
        new BoardPosition('h5'),
        new BoardPosition('h4'),
        new BoardPosition('h3'),
        new BoardPosition('h2')
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
