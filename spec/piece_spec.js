describe('Piece', function(){
  var blackPiece, whitePiece, otherWhitePiece, otherBlackPiece;
  beforeEach(function(){
    blackPiece = new Piece(new Player(Player.BLACK));
    otherBlackPiece = new Piece(new Player(Player.BLACK));

    whitePiece = new Piece(new Player(Player.WHITE));
    otherWhitePiece = new Piece(new Player(Player.WHITE));
  });

  describe('#isEnemyOf', function(){
    it("should return true if players are from different colors", function(){
      expect(blackPiece.isEnemyOf(whitePiece)).toBeTruthy();
    });
    it("should return false if players are from same colors", function(){
      expect(blackPiece.isEnemyOf(otherBlackPiece)).toBeFalsy();
      expect(whitePiece.isEnemyOf(otherWhitePiece)).toBeFalsy();
    });
  });
});
