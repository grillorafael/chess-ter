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

Evaluator.evaluatePieceScore = function(position, piece, endGamePhase, bp)
{
	if(!position instanceof BoardPosition)
	{
		var msg = "Evaluator#evaluatePieceScore: Invalid position type";
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

	else if(piece instanceof Tower)
	{

	}

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

Evaluator.evaluateBoardScore = function(board) 
{
	board.score = 0;

	if(board.isDraw() || board.staleMate())
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

	
};

