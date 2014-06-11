'use strict';

function NegaMax(depthLimit) {
	this.depthLimit = depthLimit;
}

NegaMax.prototype.getBestMove = function(board, cb) {
	var beg = new Date();
	var i = 0,
		boards = board.expand(),
		l = boards.length,
		bestValue = Number.NEGATIVE_INFINITY,
		bestValueIndex = null;

	var color = -1;
	if(board.playerTurn.isWhite()) {
		color = 1;
	}

	for(;i < l; i++) {
		var value = -this.negamax(boards[i], this.depthLimit - 1,  Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, -color);

		if(value >= bestValue) {
			bestValue = value;
			bestValueIndex = i;
		}
	}

	var end = new Date();
	var diff = end - beg;
	console.log("Time: " + (diff / 1000));
	console.log("Depth: " + this.depthLimit);

	cb(boards[bestValueIndex].getPreviousMove());
};

NegaMax.prototype.orderBoards = function(boards, color) {
	for(var i = 0, l = boards.length; i < l; i++) {
		boards[i].value = Evaluator.evaluateBoardscore(boards[i]);
	}

	boards.sort(function(a, b){ return a.value - b.value });

	return boards;
};

NegaMax.prototype.negamax = function(board, depth, alfa, beta, player) {
	if(depth == 0 || board.isPlayerInCheckMate(board.playerTurn)) {
		return player * Evaluator.evaluateBoardscore(board);
	}

	var bestValue =  Number.NEGATIVE_INFINITY;
	var boards = board.expand();

	for(var i = 0, l = boards.length; i < l; i++) {
		var value = -this.negamax(boards[i], depth - 1, - beta, - alfa, - player);
		bestValue = Math.max(bestValue, value);
		alfa = Math.max(alfa, value);
		if(alfa >= beta) {
			break;
		}
	}

	return bestValue;
};
