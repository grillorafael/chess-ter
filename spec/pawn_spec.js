describe('Pawn', function(){
  describe('.possibleMovements', function(){
    describe('first movement', function(){
      beforeEach(function(){
        initialTable = [
          ['T', 'N', 'B', 'Q', 'K', 'B', 'N', 'T'],
          ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
          ['t', 'n', 'b', 'q', 'k', 'b', 'n', 't']
        ];
      });

      describe('black pieces', function(){
        it('moves 1 row down', function(){
          var movements = new Pawn(Piece.BLACK, initialTable).possibleMovements([1, 0]);
          expect(movements).toContain([2, 0]);
        });
        it('moves 2 rows down', function(){
          var movements = new Pawn(Piece.BLACK, initialTable).possibleMovements([1, 0]);
          expect(movements).toContain([3, 0]);
        });
      });
      describe('white pieces', function(){
        it('moves 1 row up', function(){
          var movements = new Pawn(Piece.WHITE, initialTable).possibleMovements([6, 0]);
          expect(movements).toContain([5, 0]);
        });
        it('moves 2 rows up', function(){
          var movements = new Pawn(Piece.WHITE, initialTable).possibleMovements([6, 0]);
          expect(movements).toContain([4, 0]);
        });
      });
    });
    describe('mid game movement', function(){
      beforeEach(function(){
        midGameTable = [
          ['T', 'N', 'B', 'Q', 'K', 'B', 'N', 'T'],
          ['', '', '', 'P', 'P', 'P', '', 'P'],
          ['', '', '', '', '', '', '', ''],
          ['P', 'P', 'P', '', '', '', 'P', ''],
          ['', 'p', '', '', '', 'p', '', 'p'],
          ['', '', '', '', '', '', '', ''],
          ['p', '', 'p', 'p', '', 'p', 'p', ''],
          ['t', 'n', 'b', 'q', 'k', 'b', 'n', 't']
        ];
      });
      describe('black pieces', function(){
        describe('empty square', function(){
          it('moves only 1 row down', function(){
            var movements = new Pawn(Piece.BLACK, midGameTable).possibleMovements([3, 2]);
            expect(movements).toContain([4, 2]);
            expect(movements).not.toContain([5, 2]);
          });
        });
        describe('enemy at diagonal', function(){
          it('moves only towards enemy', function(){
            var movements = new Pawn(Piece.BLACK, midGameTable).possibleMovements([3, 6]);
            expect(movements).toContain([4, 5]);
            expect(movements).toContain([4, 7]);
          });
        });
      });
      describe('white pieces', function(){
        describe('empty square', function(){
          it('moves only 1 row up', function(){
            var movements = new Pawn(Piece.WHITE, midGameTable).possibleMovements([4, 5]);
            expect(movements).toContain([3, 5]);
            expect(movements).not.toContain([2, 5]);
          });
        });
        describe('enemy at diagonal', function(){
          it('moves only towards enemy', function(){
            var movements = new Pawn(Piece.WHITE, midGameTable).possibleMovements([4, 1]);
            expect(movements).toContain([3, 0]);
            expect(movements).toContain([3, 2]);
          });
        });
      });
    });
  });
});
