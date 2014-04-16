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
