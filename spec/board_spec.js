describe('BoardPosition', function () {
  var position = null;
  beforeEach(function () {
    position = new BoardPosition();
  });

  describe('A board position', function () {
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