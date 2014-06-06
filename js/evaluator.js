'use strict';

function Evaluator()
{
	this.pawnTable = 
	[
		0,  0,  0,  0,  0,  0,  0,  0,
 		50, 50, 50, 50, 50, 50, 50, 50,
 		10, 10, 20, 30, 30, 20, 10, 10,
 		5,  5, 10, 27, 27, 10,  5,  5,
  		0,  0,  0, 25, 25,  0,  0,  0,
  		5, -5,-10,  0,  0,-10, -5,  5,
  		5, 10, 10,-25,-25, 10, 10,  5,
  		0,  0,  0,  0,  0,  0,  0,  0
	];

	this.knightTable = 
	[
		-50,-40,-30,-30,-30,-30,-40,-50,
 		-40,-20,  0,  0,  0,  0,-20,-40,
 		-30,  0, 10, 15, 15, 10,  0,-30,
 		-30,  5, 15, 20, 20, 15,  5,-30,
 		-30,  0, 15, 20, 20, 15,  0,-30,
 		-30,  5, 10, 15, 15, 10,  5,-30,
 		-40,-20,  0,  5,  5,  0,-20,-40,
 		-50,-40,-20,-30,-30,-20,-40,-50,
	];

	this.bishopTable = 
	[
		-20,-10,-10,-10,-10,-10,-10,-20,
 		-10,  0,  0,  0,  0,  0,  0,-10,
 		-10,  0,  5, 10, 10,  5,  0,-10,
 		-10,  5,  5, 10, 10,  5,  5,-10,
 		-10,  0, 10, 10, 10, 10,  0,-10,
 		-10, 10, 10, 10, 10, 10, 10,-10,
 		-10,  5,  0,  0,  0,  0,  5,-10,
 		-20,-10,-40,-10,-10,-40,-10,-20,
	];

	this.kingTable =
	[
		-30, -40, -40, -50, -50, -40, -40, -30,
  		-30, -40, -40, -50, -50, -40, -40, -30,
  		-30, -40, -40, -50, -50, -40, -40, -30,
  		-30, -40, -40, -50, -50, -40, -40, -30,
  		-20, -30, -30, -40, -40, -30, -30, -20,
  		-10, -20, -20, -20, -20, -20, -20, -10,
  		20,  20,   0,   0,   0,   0,  20,  20,
   		20,  30,  10,   0,   0,  10,  30,  20
	];

	this.kingTableEndGamePhase = 
	[
		-50,-40,-30,-20,-20,-30,-40,-50,
 		-30,-20,-10,  0,  0,-10,-20,-30,
 		-30,-10, 20, 30, 30, 20,-10,-30,
 		-30,-10, 30, 40, 40, 30,-10,-30,
 		-30,-10, 30, 40, 40, 30,-10,-30,
 		-30,-10, 20, 30, 30, 20,-10,-30,
 		-30,-30,  0,  0,  0,  0,-30,-30,
 		-50,-30,-30,-30,-30,-30,-30,-50
	];

	this.blackPawnCount = [];
	this.whitePawnCount = [];
}

Evaluator.evaluatePiecescore = function(position, piece, endGamePhase, bp)
{
	if(!position instanceof BoardPosition)
	{
		var msg = "Evaluator#evaluatePiecescore: Invalid position type";
    	alert(msg);
    	throw new Error(msg);
	}

	var index = BoardPosition.getPositionByIndex(position),
		score = 0,
		bishopCount = bp;

	if(piece.player().isBlack())
	{
		index = 63 - position;
	}

	score += piece.getPieceValue();

	if(piece.getCountPossibleMoves() != -1)
	{
		score += piece.getCountPossibleMoves();
	}

	if(piece instanceof Pawn)
	{
		if(index % 8 === 0 || index % 8 === 7)
		{
			score -= 15;
		}

		score += this.pawnTable[index];
	}

	else if(piece instanceof Knight)
	{
		score += this.knightTable[index];

		if(endGamePhase)
		{
			score -= 10;
		}
	}

	else if(piece instanceof Bishop)
	{
		if(endGamePhase)
		{
			score += 10;
		}

		score += this.bishopTable[index];
	}

	/*else if(piece instanceof Tower)
	{

	}*/

	else if(piece instanceof Queen)
	{
		if(piece.moved && !endGamePhase)
		{
			score -=10;
		}
	}

	else if(piece instanceof King)
	{
		if(piece.getCountPossibleMoves() < 2)
		{
			score -= 5;
		}

		if(endGamePhase)
		{
			score += this.kingTableEndGamePhase[index];
		}
		
		else
		{
			score += this.kingTable[index];
		}
	}

	return score;
};

Evaluator.evaluateBoardscore = function(board) 
{
	board.score = 0;
	var blackBishopCount = 0,
		whiteBishopCount = 0,
		knightCount = 0,
		remainingPieces = 0,
		insufficientMaterial = true;

	if(board.isDraw())
	{
		return;
	}

	if(board.playerTurn.isBlack() && board.isPlayerInCheckMate(board.playerTurn))
	{
		board.score = 32767;
		return;
	}

	if(board.playerTurn.isWhite() && board.isPlayerInCheckMate(board.playerTurn))
	{
		board.score = -32767;
		return;
	}

	if(board.playerTurn.isBlack() && board.isPlayerInCheck(board.playerTurn))
	{
		board.score += 75;
		if(board.endGamePhase)
		{
			board.score += 10;
		}
	}

	if(board.playerTurn.isWhite() && board.isPlayerInCheck(board.playerTurn))
	{
		board.score -= 75;
		if(board.endGamePhase)
		{
			board.score -= 10;
		}
	}

	var i, j,
    li = this.board[0].length,
    lj = this.board.length;

  	for(i = 0; i < li; i++) 
  	{
    	for(j = 0; j < lj; j++) 
    	{
      		var currentPosition = BoardPosition.byColumnLineArray([j, i]), currentPositionPiece = this.at(currentPosition);
      		if(!currentPositionPiece.empty()) 
      		{
      			remainingPieces++;
        		
      			if(currentPositionPiece.player().isWhite())
      			{
      				board.score += evaluatePiecescore(currentPosition, currentPositionPiece, board.endGamePhase);
      			}

      			else if(currentPosition.player().isBlack())
      			{
      				board.score -= evaluatePiecescore(currentPosition, currentPositionPiece, board.endGamePhase);
      			}

      			if(currentPositionPiece instanceof Knight)
      			{
      				knightCount++;

      				if(knightCount > 1)
      				{
      					insufficientMaterial = false;
      				}
      			}

      			if((blackBishopCount + whiteBishopCount) > 1)
      			{
      				insufficientMaterial = false;
      			}
      		}	
    	}
  	}

  	if(insufficientMaterial)
  	{
  		board.score = 0;
  		board.insufficientMaterial = true;
  		return;
  	}

  	if(remainingPieces < 10)
  	{
  		board.endGamePhase = true;

  		if(board.playerTurn.isBlack() && board.isPlayerInCheck(board.playerTurn))
  		{
  			board.score += 10;
  		}

  		else if(board.playerTurn.isWhite() && board.isPlayerInCheck(board.playerTurn))
  		{
  			board.score -= 10;
  		}
  	}

  	//Black isolated pawns
	if (blackPawnCount[0] >= 1 && blackPawnCount[1] == 0)
	{
	 	board.score += 12;
	}

	if (blackPawnCount[1] >= 1 && blackPawnCount[0] == 0 && blackPawnCount[2] == 0)
	{
	 	board.score += 14;
	}

	if (blackPawnCount[2] >= 1 && blackPawnCount[1] == 0 && blackPawnCount[3] == 0)
	{
	 	board.score += 16;
	}

	if (blackPawnCount[3] >= 1 && blackPawnCount[2] == 0 && blackPawnCount[4] == 0)
	{
	 	board.score += 20;
	}

	if (blackPawnCount[4] >= 1 && blackPawnCount[3] == 0 && blackPawnCount[5] == 0)
	{
	 	board.score += 20;
	}

	if (blackPawnCount[5] >= 1 && blackPawnCount[4] == 0 && blackPawnCount[6] == 0)
	{
	 	board.score += 16;
	}

	if (blackPawnCount[6] >= 1 && blackPawnCount[5] == 0 && blackPawnCount[7] == 0)
	{
	 	board.score += 14;
	}
	
	if (blackPawnCount[7] >= 1 && blackPawnCount[6] == 0)
	{
	 	board.score += 12;
	}

	//White Isolated Pawns
	if (whitePawnCount[0] >= 1 && whitePawnCount[1] == 0)
	{
	 	board.score -= 12;
	}

	if (whitePawnCount[1] >= 1 && whitePawnCount[0] == 0 && whitePawnCount[2] == 0)
	{
	 	board.score -= 14;
	}

	if (whitePawnCount[2] >= 1 && whitePawnCount[1] == 0 && whitePawnCount[3] == 0)
	{
		board.score -= 16;
	}

	if (whitePawnCount[3] >= 1 && whitePawnCount[2] == 0 && whitePawnCount[4] == 0)
	{
	 	board.score -= 20;
	}

	if (whitePawnCount[4] >= 1 && whitePawnCount[3] == 0 && whitePawnCount[5] == 0)
	{
	 	board.score -= 20;
	}

	if (whitePawnCount[5] >= 1 && whitePawnCount[4] == 0 && whitePawnCount[6] == 0)
	{
	 	board.score -= 16;
	}

	if (whitePawnCount[6] >= 1 && whitePawnCount[5] == 0 && whitePawnCount[7] == 0)
	{
	 	board.score -= 14;
	}
	
	if (whitePawnCount[7] >= 1 && whitePawnCount[6] == 0)
	{
	 	board.score -= 12;
	}

	 //Black Passed Pawns
	if (blackPawnCount[0] >= 1 && whitePawnCount[0] == 0)
	{
	 	board.score -= blackPawnCount[0];
	}

	if (blackPawnCount[1] >= 1 && whitePawnCount[1] == 0)
	{
	 	board.score -= blackPawnCount[1];
	}

	if (blackPawnCount[2] >= 1 && whitePawnCount[2] == 0)
	{
	 	board.score -= blackPawnCount[2];
	}

	if (blackPawnCount[3] >= 1 && whitePawnCount[3] == 0)
	{
	 	board.score -= blackPawnCount[3];
	}

	if (blackPawnCount[4] >= 1 && whitePawnCount[4] == 0)
	{
	 	board.score -= blackPawnCount[4];
	}

	if (blackPawnCount[5] >= 1 && whitePawnCount[5] == 0)
	{
	 	board.score -= blackPawnCount[5];
	}
	if (blackPawnCount[6] >= 1 && whitePawnCount[6] == 0)
	{
	 	board.score -= blackPawnCount[6];
	}

	if (blackPawnCount[7] >= 1 && whitePawnCount[7] == 0)
	{
	 	board.score -= blackPawnCount[7];
	}

	//White Passed Pawns
	if (whitePawnCount[0] >= 1 && blackPawnCount[1] == 0)
	{
	 	board.score += whitePawnCount[0];
	}

	if (whitePawnCount[1] >= 1 && blackPawnCount[1] == 0)
	{
	 	board.score += whitePawnCount[1];
	}

	if (whitePawnCount[2] >= 1 && blackPawnCount[2] == 0)
	{
	 	board.score += whitePawnCount[2];
	}

	if (whitePawnCount[3] >= 1 && blackPawnCount[3] == 0)
	{
	 	board.score += whitePawnCount[3];
	}

	if (whitePawnCount[4] >= 1 && blackPawnCount[4] == 0)
	{
		board.score += whitePawnCount[4];
	}

	if (whitePawnCount[5] >= 1 && blackPawnCount[5] == 0)
	{
	 	board.score += whitePawnCount[5];
	}

	if (whitePawnCount[6] >= 1 && blackPawnCount[6] == 0)
	{
	 	board.score += whitePawnCount[6];
	}

	if (whitePawnCount[7] >= 1 && blackPawnCount[7] == 0)
	{
	 	board.score += whitePawnCount[7];
	}  
};

