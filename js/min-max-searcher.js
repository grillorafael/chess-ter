'use strict';

function MinMaxSearcher(depthLimit) {
	this.depthLimit = depthLimit;
	this.nodeCount = 0;
	this.bestMove = [];
}

MinMaxSearcher.prototype.getBestMove = function(board, cb) {
	var alpha = Number.NEGATIVE_INFINITY;
	var beta = Number.POSITIVE_INFINITY;

	cb(this.minMaxEval(board, this.depthLimit, alpha, beta));
};

MinMaxSearcher.prototype.diffNumOfPiecesHeuristic = function(player, board) {
	var i, j,
		li = board.board[0].length,
		lj = board.board.length,
		numOfCurrentPlayerPieces = 0,
		numOfAdversaryPlayerPieces = 0;

	for(i=0; i<li; i++) {
		for(j=0; j<lj; j++) {
			var currentPosition = BoardPosition.byColumnLineArray([j, i]), currentPositionPiece = board.at(currentPosition);
			if(!currentPositionPiece.empty() && !currentPositionPiece.isEnemyOfPlayer(player)) {
				numOfCurrentPlayerPieces++;
			}
			else if(!currentPositionPiece.empty() && currentPositionPiece.isEnemyOfPlayer(player)) {
				numOfAdversaryPlayerPieces++;
			}
		}
	}

	return numOfCurrentPlayerPieces - numOfAdversaryPlayerPieces;
};


MinMaxSearcher.prototype.minMaxEval = function(board, depthLeft, alpha, beta) {
	var beg = new Date();
	var possibleBoards = board.expand(),
		bestMovementValue = Number.NEGATIVE_INFINITY,
		bestMovementIndex = null;

	for(var i = 0, l = possibleBoards.length; i < l; i++) {
		var currentMovementValue = this.minMaxValue(possibleBoards[i], depthLeft - 1, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, 'min');
		if(currentMovementValue >= bestMovementValue) {
      bestMovementValue = currentMovementValue;
      bestMovementIndex = i;
    }
	}
	var end = new Date();
	var diff = end - beg;
  console.log("Time: " + (diff / 1000));
  console.log("Depth: " + depthLeft);

	return possibleBoards[bestMovementIndex].getPreviousMove();
};

MinMaxSearcher.prototype.minMaxValue = function(board, depthLeft, alfa, beta, mode) {
	if(mode == 'min') {
		if(board.isPlayerInCheckMate(board.playerTurn)) {
			return Number.NEGATIVE_INFINITY;
		}
		else if(depthLeft == 0) {
			return this.diffNumOfPiecesHeuristic(board.playerTurn, board);
		}

		var possibleBoards = board.expand(), v = Number.POSITIVE_INFINITY;
		for(var i = 0, l = possibleBoards.length; i < l; i++) {
			v = Math.min(v, this.minMaxValue(possibleBoards[i], depthLeft - 1, alfa, beta, 'max'));
			if(v <= alfa) {
				return v;
			}

			beta = Math.min(beta, v);
		}

		return v;
	}
	else {
		if(board.isPlayerInCheckMate(board.playerTurn)) {
			return Number.NEGATIVE_INFINITY;
		}
		else if(depthLeft == 0) {
			return this.diffNumOfPiecesHeuristic(board.playerTurn, board);
		}

		var possibleBoards = board.expand(), v = Number.NEGATIVE_INFINITY;
		for(var i = 0, l = possibleBoards.length; i < l; i++) {
			v = Math.max(v, this.minMaxValue(possibleBoards[i], depthLeft - 1, alfa, beta, 'min'));
			if(v >= beta) {
				return v;
			}

			alfa = Math.max(alfa, v);
		}

		return v;
	}
};

// MinMaxSearcher.prototype.minMaxEval = function(board, depthLeft, alpha, beta) {
// 	var localBestMove = [],
// 		maximizing = (board.getCurrentPlayerTurn() == board.getMax()),
// 		bestHeuristic;
//
// 		this.nodeCount++;
//
// 		if(board.isPlayerInCheckMate(board.getCurrentPlayerTurn()) || depthLeft == 0) {
// 			return this.diffNumOfPiecesHeuristic(board.getCurrentPlayerTurn(), board);
// 		}
//
// 		if(maximizing) {
// 			bestHeuristic = alpha;
// 		}
//
// 		else {
// 			bestHeuristic = beta;
// 		}
//
// 		var children = board.expand(), i;
//
// 		for(i=0; i < children.length; i++) {
// 			var childHeuristic = this.minMaxEval(children[i], depthLeft - 1, alpha, beta);
//
// 			if(maximizing && (childHeuristic > bestHeuristic)) {
// 				alpha = childHeuristic;
// 				bestHeuristic = alpha;
// 				localBestMove = children[i].getPreviousMove();
// 			}
//
// 			else if(!maximizing && (childHeuristic < bestHeuristic)) {
// 				beta = childHeuristic;
// 				bestHeuristic = beta;
// 				localBestMove = children[i].getPreviousMove();
// 			}
//
// 			if(alpha >= beta) {
// 				this.bestMove = localBestMove;
// 				return bestHeuristic;
// 			}
//
// 			this.bestMove = localBestMove;
// 			return bestHeuristic;
// 		}
// };
