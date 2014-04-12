describe('TableUtil', function(){
  var table;
  beforeEach(function(){
    table = [
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

  describe('.emptyPosition', function(){
    describe('empty space', function(){
      it('returns true', function(){
        expect(TableUtil.emptyPosition([3, 3], table)).toBe(true);
      });
    });
    describe('not empty space', function(){
      it('returns true', function(){
        expect(TableUtil.emptyPosition([0, 0], table)).toBe(false);
      });
    });
  });

  describe('.samePieceTypeOf', function(){
    describe('same color', function(){
      it('returns true', function(){
        expect(TableUtil.samePieceTypeOf([0,0], [0,1], table)).toBe(true);
      });
    });
    describe('different color', function(){
      it('returns false', function(){
        expect(TableUtil.samePieceTypeOf([0,0], [7,0], table)).toBe(false);
      });
    });
  });

  describe('.validSquare', function(){
    describe('square is valid', function(){
      it('returns true', function(){
        expect(TableUtil.validSquare([7,0], [0,0], table)).toBe(true);
      });
    });
    describe('square is invalid', function(){
      it('returns true', function(){
        expect(TableUtil.validSquare([0,0], [1,0], table)).toBe(false);
      });
    });
  });
});
