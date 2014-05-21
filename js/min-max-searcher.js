'use strict';

function MinMaxSearcher(depthLimit) {
	this.depthLimit = depthLimit;
	this.nodeCount = 0;
	this.bestMove = [];
}

MinMaxSearcher.prototype.getBestMove = function(board) {
	var alpha = Number.NEGATIVE_INFINITY;
	var beta = Number.POSITIVE_INFINITY;

	this.minMaxEval(board, this.depthLimit, alpha, beta);
	return this.bestMove;
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
	var localBestMove = [],
		maximizing = (board.getCurrentPlayerTurn() == board.getMax()),
		bestHeuristic;

		this.nodeCount++;

		if(board.isPlayerInCheckMate(board.getCurrentPlayerTurn()) || depthLeft == 0) {
			return this.diffNumOfPiecesHeuristic(board.getCurrentPlayerTurn(), board);
		}

		if(maximizing) {
			bestHeuristic = alpha;
		}

		else {
			bestHeuristic = beta;
		}

		var children = board.expand(), i;

		for(i=0; i < children.length; i++) {
			var childHeuristic = this.minMaxEval(children[i], depthLeft - 1, alpha, beta);

			if(maximizing && (childHeuristic > bestHeuristic)) {
				alpha = childHeuristic;
				bestHeuristic = alpha;
				localBestMove = children[i].getPreviousMove();
			}

			else if(!maximizing && (childHeuristic < bestHeuristic)) {
				beta = childHeuristic;
				bestHeuristic = beta;
				localBestMove = children[i].getPreviousMove();
			}

			if(alpha >= beta) {
				this.bestMove = localBestMove;
				return bestHeuristic;
			}

			this.bestMove = localBestMove;
			return bestHeuristic;
		}
};
