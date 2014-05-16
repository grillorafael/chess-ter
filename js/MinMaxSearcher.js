'use strict';

function MinMaxSearcher(depthLimit) {
	this.depthLimit = depthLimit;
	this.nodeCount = 0;
	this.bestMove = [];
}

MinMaxSearcher.prototype.eval = function(board) {
	var alpha = Number.POSITIVE_INFINITY;
	var beta = Number.NEGATIVE_INFINITY;
	return MinMaxEval(board, this.depthLimit, alpha, beta);
};

MinMaxSearcher.prototype.getBestMove = function() {
	return this.bestMove;
};

MinMaxSearcher.prototype.getNodeCount = function() {
	return this.nodeCount;
};

MinMaxSearcher.prototype.minMaxEval = function(board, depthLeft, alpha, beta) {
	var localBestMove = [],
		maximizing = (board.getCurrentPlayerTurn() == board.getMax()),
		bestHeuristic;

		this.nodeCount++;

		if(board.isPlayerInCheckMate(board.getCurrentPlayerTurn()) || depthLeft == 0) {
			return board.diffNumOfPiecesHeuristic(board.getCurrentPlayerTurn());
		}

		if(maximizing) {
			bestHeuristic = alpha;
		}

		else {
			bestHeuristic = beta;
		}

		var children = board.expand(), i;

		for(i=0; i<children.length; i++) {
			var childHeuristic = minMaxEval(children[i], depthLeft - 1, alpha, beta);

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
				bestMove = localBestMove;
				return bestHeuristic;
			}

			bestMove = localBestMove;
			return bestHeuristic;
		}
};