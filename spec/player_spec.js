describe('Player | PlayerIA', function() {
  describe('#isHuman', function() {
    it('returns true if not a IA player', function() {
      var player = new Player(Player.WHITE);
      expect(player.isHuman()).toBe(true);
    });

    it('returns false if player is IA', function() {
      var player = new PlayerIA(Player.WHITE);
      expect(player.isHuman()).toBe(false);
    });
  });

  describe('#getNextMove', function() {
    it('returns the next movement base on player boards', function() {
      var playerWhite = new PlayerIA(Player.WHITE);
      var playerBlack = new Player(Player.BLACK);

      var board = new Board(playerWhite, playerBlack);

      var callback = jasmine.createSpy('callback');
      playerWhite.getNextMove(callback);

      expect(callback).toHaveBeenCalledWith([new BoardPosition('g1'), new BoardPosition('f3')]);
    });
  });
});
