function Chess() {
  _self = this;
  _self.selectedPiece = null;
  _self.table = [
    ['T', 'N', 'B', 'Q', 'K', 'B', 'N', 'T'],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    ['t', 'n', 'b', 'q', 'k', 'b', 'n', 't']
  ];

  _self.unselectPiece = function() {
    _self.selectedPiece.removeClass('selected');
    _self.selectedPiece = null;
  };

  _self.handlePieceClick = function(e) {
    if(_self.selectedPiece == null) {
      $(this).addClass('selected');
      _self.selectedPiece = $(this);
    }
    else if($(this).is(_self.selectedPiece)) {
      $(this).removeClass('selected');
      _self.selectedPiece = null;
    }

    return false;
  };

  _self.handleSquareClick = function(e) {
    if(_self.selectedPiece != null) {
      $(this).html('');
      $(this).append(_self.selectedPiece);
      _self.unselectPiece();
    }
  };

  $('.piece').click(_self.handlePieceClick);
  $('td').click(_self.handleSquareClick);
};

var chess = new Chess();
