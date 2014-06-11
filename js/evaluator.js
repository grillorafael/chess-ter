'use strict';

function Evaluator() {

}

Evaluator.pawnTable = [
  0, 0, 0, 0, 0, 0, 0, 0,
  50, 50, 50, 50, 50, 50, 50, 50,
  10, 10, 20, 30, 30, 20, 10, 10,
  5, 5, 10, 27, 27, 10, 5, 5,
  0, 0, 0, 25, 25, 0, 0, 0,
  5, -5, -10, 0, 0, -10, -5, 5,
  5, 10, 10, -25, -25, 10, 10, 5,
  0, 0, 0, 0, 0, 0, 0, 0
];

Evaluator.knightTable = [-50, -40, -30, -30, -30, -30, -40, -50, -40, -20, 0, 0,
  0, 0, -20, -40, -30, 0, 10, 15, 15, 10, 0, -30, -30, 5, 15, 20, 20, 15, 5, -
  30, -30, 0, 15, 20, 20, 15, 0, -30, -30, 5, 10, 15, 15, 10, 5, -30, -40, -20,
  0, 5, 5, 0, -20, -40, -50, -40, -20, -30, -30, -20, -40, -50,
];

Evaluator.bishopTable = [-20, -10, -10, -10, -10, -10, -10, -20, -10, 0, 0, 0,
  0, 0, 0, -10, -10, 0, 5, 10, 10, 5, 0, -10, -10, 5, 5, 10, 10, 5, 5, -10, -10,
  0, 10, 10, 10, 10, 0, -10, -10, 10, 10, 10, 10, 10, 10, -10, -10, 5, 0, 0, 0,
  0, 5, -10, -20, -10, -40, -10, -10, -40, -10, -20,
];

Evaluator.kingTable = [-30, -40, -40, -50, -50, -40, -40, -30, -30, -40, -40, -
  50, -50, -40, -40, -30, -30, -40, -40, -50, -50, -40, -40, -30, -30, -40, -40, -
  50, -50, -40, -40, -30, -20, -30, -30, -40, -40, -30, -30, -20, -10, -20, -20, -
  20, -20, -20, -20, -10,
  20, 20, 0, 0, 0, 0, 20, 20,
  20, 30, 10, 0, 0, 10, 30, 20
];

Evaluator.kingTableEndGamePhase = [-50, -40, -30, -20, -20, -30, -40, -50, -30, -
  20, -10, 0, 0, -10, -20, -30, -30, -10, 20, 30, 30, 20, -10, -30, -30, -10,
  30, 40, 40, 30, -10, -30, -30, -10, 30, 40, 40, 30, -10, -30, -30, -10, 20,
  30, 30, 20, -10, -30, -30, -30, 0, 0, 0, 0, -30, -30, -50, -30, -30, -30, -30, -
  30, -30, -50
];

Evaluator.blackPawnCount = [];
Evaluator.whitePawnCount = [];

Evaluator.evaluatePiecescore = function(position, piece, endGamePhase, castled, bishopCount, insufficientMaterial) {
  if (!position instanceof BoardPosition) {
    var msg = "Evaluator#evaluatePiecescore: Invalid position type";
    alert(msg);
    throw new Error(msg);
  }

  var index = BoardPosition.getPositionByIndex(position),
    score = 0;

  if (piece.player().isBlack()) {
    index = 63 - index;
  }

  score += piece.getPieceValue();

  if (piece.getCountPossibleMoves() != -1) {
    score += piece.getCountPossibleMoves();
  }

  if (piece instanceof Pawn) {
    if (index % 8 === 0 || index % 8 === 7) {
      score -= 15;
    }
    score += Evaluator.pawnTable[index];
  } else if (piece instanceof Knight) {
    score += Evaluator.knightTable[index];

    if (endGamePhase) {
      score -= 10;
    }
  } else if (piece instanceof Bishop) {
    bishopCount.val++;
    if (bishopCount.val >= 2) {
      score += 10;
    }
    if (endGamePhase) {
      score += 10;
    }

    score += Evaluator.bishopTable[index];
  } else if (piece instanceof Tower) {
    insufficientMaterial.val = false;
    if (piece.moved && !castled) {
      score -= 10;
    }
  } else if (piece instanceof Queen) {
    insufficientMaterial.val = false;
    if (piece.moved && !endGamePhase) {
      score -= 10;
    }
  } else if (piece instanceof King) {
    if (piece.getCountPossibleMoves() < 2) {
      score -= 5;
    }

    if (endGamePhase) {
      score += Evaluator.kingTableEndGamePhase[index];
    } else {
      score += Evaluator.kingTable[index];
    }

    if (piece.moved && !castled) {
      score -= 30;
    }
  }

  return score;
};

Evaluator.evaluateBoardscore = function(board) {
  var  knightCount = 0,
    remainingPieces = 0,
    score = 0,
    insufficientMaterial = { val: true },
    whiteBishopCount = { val: 0 },
    blackBishopCount = { val: 0 };


  if (board.isDraw()) {
    return 0;
  }

  if (board.playerTurn.isBlack() && board.isPlayerInCheckMate(board.playerTurn)) {
    return 32767;
  }

  if (board.playerTurn.isWhite() && board.isPlayerInCheckMate(board.playerTurn)) {
    return -32767;
  }

  if (board.playerTurn.isBlack() && board.isPlayerInCheck(board.playerTurn)) {
    score += 75;
    if (board.endGamePhase) {
      score += 10;
    }
  }

  if (board.playerTurn.isWhite() && board.isPlayerInCheck(board.playerTurn)) {
    score -= 75;
    if (board.endGamePhase) {
      score -= 10;
    }
  }

  if (board.whiteCastled) {
    score += 40;
  }

  if (board.blackCastled) {
    score -= 40;
  }

  var i, j,
    li = board.board[0].length,
    lj = board.board.length;

  for (i = 0; i < li; i++) {
    for (j = 0; j < lj; j++) {
      var currentPosition = BoardPosition.byColumnLineArray([j, i]),
        currentPositionPiece = board.at(currentPosition);
      if (!currentPositionPiece.empty()) {
        remainingPieces++;

        if (currentPositionPiece.player().isWhite()) {
          score += Evaluator.evaluatePiecescore(currentPosition,
            currentPositionPiece, board.endGamePhase, board.whiteCastled, whiteBishopCount, insufficientMaterial);
        } else if (currentPositionPiece.player().isBlack()) {
          score -= Evaluator.evaluatePiecescore(currentPosition,
            currentPositionPiece, board.endGamePhase, board.blackCastled, blackBishopCount, insufficientMaterial);
        }

        if (currentPositionPiece instanceof Knight) {
          knightCount++;

          if (knightCount > 1) {
            insufficientMaterial.val = false;
          }
        }

        if ((blackBishopCount.val + whiteBishopCount.val) > 1) {
          insufficientMaterial.val = false;
        }
      }
    }
  }

  if (insufficientMaterial.val) {
    board.insufficientMaterial = true;
    return 0;
  }

  if (remainingPieces < 10) {
    board.endGamePhase = true;

    if (board.playerTurn.isBlack() && board.isPlayerInCheck(board.playerTurn)) {
      score += 10;
    } else if (board.playerTurn.isWhite() && board.isPlayerInCheck(board.playerTurn)) {
      score -= 10;
    }
  }

  //Black isolated pawns
  if (Evaluator.blackPawnCount[0] >= 1 && Evaluator.blackPawnCount[1] == 0) {
    score += 12;
  }

  if (Evaluator.blackPawnCount[1] >= 1 && Evaluator.blackPawnCount[0] == 0 &&
    Evaluator.blackPawnCount[2] == 0) {
    score += 14;
  }

  if (Evaluator.blackPawnCount[2] >= 1 && Evaluator.blackPawnCount[1] == 0 &&
    Evaluator.blackPawnCount[3] == 0) {
    score += 16;
  }

  if (Evaluator.blackPawnCount[3] >= 1 && Evaluator.blackPawnCount[2] == 0 &&
    Evaluator.blackPawnCount[4] == 0) {
    score += 20;
  }

  if (Evaluator.blackPawnCount[4] >= 1 && Evaluator.blackPawnCount[3] == 0 &&
    Evaluator.blackPawnCount[5] == 0) {
    score += 20;
  }

  if (Evaluator.blackPawnCount[5] >= 1 && Evaluator.blackPawnCount[4] == 0 &&
    Evaluator.blackPawnCount[6] == 0) {
    score += 16;
  }

  if (Evaluator.blackPawnCount[6] >= 1 && Evaluator.blackPawnCount[5] == 0 &&
    Evaluator.blackPawnCount[7] == 0) {
    score += 14;
  }

  if (Evaluator.blackPawnCount[7] >= 1 && Evaluator.blackPawnCount[6] == 0) {
    score += 12;
  }

  //White Isolated Pawns
  if (Evaluator.whitePawnCount[0] >= 1 && Evaluator.whitePawnCount[1] == 0) {
    score -= 12;
  }

  if (Evaluator.whitePawnCount[1] >= 1 && Evaluator.whitePawnCount[0] == 0 &&
    Evaluator.whitePawnCount[2] == 0) {
    score -= 14;
  }

  if (Evaluator.whitePawnCount[2] >= 1 && Evaluator.whitePawnCount[1] == 0 &&
    Evaluator.whitePawnCount[3] == 0) {
    score -= 16;
  }

  if (Evaluator.whitePawnCount[3] >= 1 && Evaluator.whitePawnCount[2] == 0 &&
    Evaluator.whitePawnCount[4] == 0) {
    score -= 20;
  }

  if (Evaluator.whitePawnCount[4] >= 1 && Evaluator.whitePawnCount[3] == 0 &&
    Evaluator.whitePawnCount[5] == 0) {
    score -= 20;
  }

  if (Evaluator.whitePawnCount[5] >= 1 && Evaluator.whitePawnCount[4] == 0 &&
    Evaluator.whitePawnCount[6] == 0) {
    score -= 16;
  }

  if (Evaluator.whitePawnCount[6] >= 1 && Evaluator.whitePawnCount[5] == 0 &&
    Evaluator.whitePawnCount[7] == 0) {
    score -= 14;
  }

  if (Evaluator.whitePawnCount[7] >= 1 && Evaluator.whitePawnCount[6] == 0) {
    score -= 12;
  }

  //Black Passed Pawns
  if (Evaluator.blackPawnCount[0] >= 1 && Evaluator.blackPawnCount[0] == 0) {
    score -= Evaluator.blackPawnCount[0];
  }

  if (Evaluator.blackPawnCount[1] >= 1 && Evaluator.blackPawnCount[1] == 0) {
    score -= Evaluator.blackPawnCount[1];
  }

  if (Evaluator.blackPawnCount[2] >= 1 && Evaluator.blackPawnCount[2] == 0) {
    score -= Evaluator.blackPawnCount[2];
  }

  if (Evaluator.blackPawnCount[3] >= 1 && Evaluator.blackPawnCount[3] == 0) {
    score -= Evaluator.blackPawnCount[3];
  }

  if (Evaluator.blackPawnCount[4] >= 1 && Evaluator.blackPawnCount[4] == 0) {
    score -= Evaluator.blackPawnCount[4];
  }

  if (Evaluator.blackPawnCount[5] >= 1 && Evaluator.blackPawnCount[5] == 0) {
    score -= Evaluator.blackPawnCount[5];
  }
  if (Evaluator.blackPawnCount[6] >= 1 && Evaluator.blackPawnCount[6] == 0) {
    score -= Evaluator.blackPawnCount[6];
  }

  if (Evaluator.blackPawnCount[7] >= 1 && Evaluator.blackPawnCount[7] == 0) {
    score -= Evaluator.blackPawnCount[7];
  }

  //White Passed Pawns
  if (Evaluator.whitePawnCount[0] >= 1 && Evaluator.whitePawnCount[1] == 0) {
    score += Evaluator.whitePawnCount[0];
  }

  if (Evaluator.whitePawnCount[1] >= 1 && Evaluator.whitePawnCount[1] == 0) {
    score += Evaluator.whitePawnCount[1];
  }

  if (Evaluator.whitePawnCount[2] >= 1 && Evaluator.whitePawnCount[2] == 0) {
    score += Evaluator.whitePawnCount[2];
  }

  if (Evaluator.whitePawnCount[3] >= 1 && Evaluator.whitePawnCount[3] == 0) {
    score += Evaluator.whitePawnCount[3];
  }

  if (Evaluator.whitePawnCount[4] >= 1 && Evaluator.whitePawnCount[4] == 0) {
    score += Evaluator.whitePawnCount[4];
  }

  if (Evaluator.whitePawnCount[5] >= 1 && Evaluator.whitePawnCount[5] == 0) {
    score += Evaluator.whitePawnCount[5];
  }

  if (Evaluator.whitePawnCount[6] >= 1 && Evaluator.whitePawnCount[6] == 0) {
    score += Evaluator.whitePawnCount[6];
  }

  if (Evaluator.whitePawnCount[7] >= 1 && Evaluator.whitePawnCount[7] == 0) {
    score += Evaluator.whitePawnCount[7];
  }


  return score;
};
