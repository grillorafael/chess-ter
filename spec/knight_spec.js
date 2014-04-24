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
    it('should return 2 movements if in start position', function()
    {
      board = new Board('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
    });
  });
});
