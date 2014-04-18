describe('Pawn', function () {
  describe('.possibleMovements', function () {
    var whitePlayer, blackPlayer, whitePawn, blackPawn, board;
    beforeEach(function () {
      whitePlayer = new Player('white');
      blackPlayer = new Player('black');

      whitePawn = new Pawn(whitePlayer);
      blackPawn = new Pawn(blackPlayer);
    });
    describe('first movement of game and pawn', function () {
      beforeEach(function () {
        board = new Board(whitePlayer, blackPlayer);
      });
      describe('black pieces', function () {
        it("should return 2 movements if not on edges", function () {
          var movements = blackPawn.possibleMovements(new BoardPosition('d7'), board);
          var expected = [new BoardPosition('d6'), new BoardPosition('d5')]

          compareMovementsAndExpected(movements, expected);
        });
        it("should return 2 movements if on left edge", function () {
          var movements = blackPawn.possibleMovements(new BoardPosition('a7'), board);
          var expected = [new BoardPosition('a6'), new BoardPosition('a5')]

          compareMovementsAndExpected(movements, expected);
        });
        it("should return 2 movements if on right edge", function () {
          var movements = blackPawn.possibleMovements(new BoardPosition('h7'), board);
          var expected = [new BoardPosition('h6'), new BoardPosition('h5')]

          compareMovementsAndExpected(movements, expected);
        });
      });
      describe('white pieces', function () {
        it("should return 2 movements if not on edges", function () {
          var movements = whitePawn.possibleMovements(new BoardPosition('d2'), board);
          var expected = [new BoardPosition('d3'), new BoardPosition('d4')]

          compareMovementsAndExpected(movements, expected);
        });
        it("should return 2 movements if on left edge", function () {
          var movements = whitePawn.possibleMovements(new BoardPosition('a2'), board);
          var expected = [new BoardPosition('a3'), new BoardPosition('a4')]

          compareMovementsAndExpected(movements, expected);

        });
        it("should return 2 movements if on right edge", function () {
          var movements = whitePawn.possibleMovements(new BoardPosition('h2'), board);
          var expected = [new BoardPosition('h3'), new BoardPosition('h4')]

          compareMovementsAndExpected(movements, expected);
        });
      });
    });

    describe('subsequent movements of pawn whithout enemy', function () {
      beforeEach(function () {
        board = new Board(whitePlayer, blackPlayer);
      });

      describe('black pieces', function () {
        it("should return 1 movement if not on edges", function () {
          var movements = blackPawn.possibleMovements(new BoardPosition('d6'), board);
          var expected = [new BoardPosition('d5')]

          compareMovementsAndExpected(movements, expected);
        });
        it("should return 1 movement if on left edge", function () {
          var movements = blackPawn.possibleMovements(new BoardPosition('a6'), board);
          var expected = [new BoardPosition('a5')]

          compareMovementsAndExpected(movements, expected);
        });
        it("should return 1 movement if on right edge", function () {
          var movements = blackPawn.possibleMovements(new BoardPosition('h6'), board);
          var expected = [new BoardPosition('h5')]

          compareMovementsAndExpected(movements, expected);
        });
      });
      describe('white pieces', function () {
        it("should return 1 movement if not on edges", function () {
          var movements = whitePawn.possibleMovements(new BoardPosition('d3'), board);
          var expected = [new BoardPosition('d4')]

          compareMovementsAndExpected(movements, expected);
        });
        it("should return 1 movement if on left edge", function () {
          var movements = whitePawn.possibleMovements(new BoardPosition('a3'), board);
          var expected = [new BoardPosition('a4')]

          compareMovementsAndExpected(movements, expected);

        });
        it("should return 1 movement1 if on right edge", function () {
          var movements = whitePawn.possibleMovements(new BoardPosition('h3'), board);
          var expected = [new BoardPosition('h4')]

          compareMovementsAndExpected(movements, expected);
        });
      });
    });

    describe('subsequent movements of pawn with enemy', function () {
      describe('black pieces', function () {

        it("should return 3 movements if not on edges and enemy on both sides", function () {
          board = new Board(whitePlayer, blackPlayer, 'rnbqkbnr/ppp1pp2/3p2pp/1PP1PPP1/8/8/P2P1PP1/RNBQKBNR');
          var movements = blackPawn.possibleMovements(new BoardPosition('d6'), board);
          var expected = [new BoardPosition('c5'), new BoardPosition('d5'), new BoardPosition('e5')]

          compareMovementsAndExpected(movements, expected);
        });

        it("should return 2 movements if not on edges and enemy on left side", function () {
          board = new Board(whitePlayer, blackPlayer, 'rnbqkbnr/ppp1pppp/3p4/2P5/8/8/PP1PPPPP/RNBQKBNR');
          var movements = blackPawn.possibleMovements(new BoardPosition('d6'), board);
          var expected = [new BoardPosition('c5'), new BoardPosition('d5')]
          compareMovementsAndExpected(movements, expected);
        });

        it("should return 2 movements if not on edges and enemy on right side", function () {
          board = new Board(whitePlayer, blackPlayer, 'rnbqkbnr/ppp1pppp/3p4/4P3/8/8/PPPP1PPP/RNBQKBNR');
          var movements = blackPawn.possibleMovements(new BoardPosition('d6'), board);
          var expected = [new BoardPosition('d5'), new BoardPosition('e5')]

          compareMovementsAndExpected(movements, expected);
        });

        it("should return 2 movements if on left edges and enemy on right side", function () {
          board = new Board(whitePlayer, blackPlayer, 'rnbqkbnr/ppp1pp2/3p2pp/1PP1PPP1/8/8/P2P1PP1/RNBQKBNR');
          var movements = blackPawn.possibleMovements(new BoardPosition('a6'), board);
          var expected = [new BoardPosition('a5'), new BoardPosition('b5')]

          compareMovementsAndExpected(movements, expected);
        });

        it("should return 2 movements if on right edges and enemy on left side", function () {
          board = new Board(whitePlayer, blackPlayer, 'rnbqkbnr/ppp1pp2/3p2pp/1PP1PPP1/8/8/P2P1PP1/RNBQKBNR');
          var movements = blackPawn.possibleMovements(new BoardPosition('h6'), board);
          var expected = [new BoardPosition('g5'), new BoardPosition('h5')]

          compareMovementsAndExpected(movements, expected);
        });

      });

      describe('white pieces', function () {
        it("should return 3 movements if not on edges and enemy on both sides", function () {
          board = new Board(whitePlayer, blackPlayer, 'rnbqkbnr/p1p1pppp/8/8/2p1p3/3P4/PPP1PPPP/RNBQKBNR');
          var movements = whitePawn.possibleMovements(new BoardPosition('d3'), board);
          var expected = [new BoardPosition('c4'), new BoardPosition('d4'), new BoardPosition('e4')]

          compareMovementsAndExpected(movements, expected);
        });

        it("should return 2 movements if not on edges and enemy on left side", function () {
          board = new Board(whitePlayer, blackPlayer, 'rnbqkbnr/p1pppppp/8/8/2p5/3P4/PPP1PPPP/RNBQKBNR');
          var movements = whitePawn.possibleMovements(new BoardPosition('d3'), board);
          var expected = [new BoardPosition('c4'), new BoardPosition('d4')]
          compareMovementsAndExpected(movements, expected);
        });

        it("should return 2 movements if not on edges and enemy on right side", function () {
          board = new Board(whitePlayer, blackPlayer, 'rnbqkbnr/ppp1pppp/8/8/4p3/3P4/PPP1PPPP/RNBQKBNR');
          var movements = whitePawn.possibleMovements(new BoardPosition('d3'), board);
          var expected = [new BoardPosition('d4'), new BoardPosition('e4')]

          compareMovementsAndExpected(movements, expected);
        });

        it("should return 2 movements if on left edges and enemy on right side", function () {
          board = new Board(whitePlayer, blackPlayer, 'rnbqkbnr/p1pppppp/8/8/1p6/P7/1PPPPPPP/RNBQKBNR');
          var movements = whitePawn.possibleMovements(new BoardPosition('a3'), board);
          var expected = [new BoardPosition('a4'), new BoardPosition('b4')]

          compareMovementsAndExpected(movements, expected);
        });

        it("should return 2 movements if on right edges and enemy on left side", function () {
          board = new Board(whitePlayer, blackPlayer, 'rnbqkbnr/p1pppp1p/8/8/1p4p1/P6P/1PPPPPP1/RNBQKBNR');
          var movements = whitePawn.possibleMovements(new BoardPosition('h3'), board);
          var expected = [new BoardPosition('g4'), new BoardPosition('h4')]

          compareMovementsAndExpected(movements, expected);
        });

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
