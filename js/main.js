var Chess;

Chess = (function() {
  function Chess() {
    this.table = [
      ['T', 'N', 'B', 'Q', 'K', 'B', 'N', 'T'],
      ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
      ['t', 'n', 'b', 'q', 'k', 'b', 'n', 't']
    ];
  }

  return Chess;

})();


var chess = new Chess();
