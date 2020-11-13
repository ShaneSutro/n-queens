/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

/*    previous working solution based on mathematics     */

// window.findNRooksSolution = function(n) {
//   // create new chessboard
//   var solution = new Board({'n': n});
//   //iterate through rows
//   for (var i = 0; i < solution.rows().length; i++) {
//     solution.togglePiece(i, i);
//   }

//   solution.n = n;

//   console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
//   return solution.rows();
// };

window.findNRooksSolution = function(n) {
  var solutionBoard = new Board({'n': n });
  var finalSolution = [];

  var rookFinder = function(row) {
    if (row === n) {
      finalSolution = solutionBoard.rows().slice();
      return;
    }
    //iterate through each column in the row
    for (var col = 0; col < n; col++) {
      solutionBoard.togglePiece(row, col);
      if (!solutionBoard.hasAnyRooksConflicts()) {
        rookFinder(row + 1);
      }
      if (finalSolution.length > 0) {
        return;
      }
      solutionBoard.togglePiece(row, col);
    }
    return;
  };
  rookFinder(0);

  console.log(finalSolution);
  return finalSolution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  var solutionBoard = new Board({'n': n });

  var queenSolver = function(row) {
    //base case - if row === n and we can successfully place a piece without creating an error
    if (row === n) {
      //found a solution = solution ++
      solutionCount++;
      return;
    }
    //iterate through each column in the row
    for (var col = 0; col < n; col++) {
      solutionBoard.togglePiece(row, col);
      if (!solutionBoard.hasAnyRooksConflicts()) {
        queenSolver(row + 1);
      }
      solutionBoard.togglePiece(row, col);
    }
    return;
  };
  queenSolver(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other

/*      previous working solution based on mathematics        */

// window.findNQueensSolution = function(n) {
//   var solution = new Board({'n': n});
//   // solution.n = n;

//   if (n < 4) {
//     if (n === 1) {
//       solution.togglePiece(0, 0);
//     }
//     return solution.rows();
//   }
//   var evens = [];
//   var odds = [];
//   //cannot have working solution if n === 0, 1, 2, 3
//   for (var i = 0; i <= n; i++) {
//     if (i % 2 === 0 && i !== 0) {
//       evens.push(i);
//     } else if (i !== 0) {
//       odds.push(i);
//     }
//   }
//   //get remainder of n % 6
//   var remainder = n % 6;
//   if (remainder === 2) {
//     console.log(odds);
//     odds[0] = 3;
//     odds[1] = 1;
//     odds.splice(2, 1);
//     odds.push(5);
//     console.log(odds);
//   } else if (remainder === 3) {
//     console.log(evens, odds);
//     evens.splice(0, 1);
//     evens.push(2);
//     odds.splice(0, 2);
//     odds.push(1, 3);
//     console.log(evens, odds);
//   }
//   evens = evens.concat(odds);
//   for (var j = 0; j < n; j++) {
//     solution.togglePiece(evens[j] - 1, j);
//   }

//   console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
//   return solution.rows();
// };

window.findNQueensSolution = function(n) {
  var solutionBoard = new Board({'n': n });
  var finalSolution = [];

  if (n < 4) {
    if (n === 1) {
      solutionBoard.togglePiece(0, 0);
    }
    return solutionBoard.rows();
  }

  var queenFinder = function(row) {
    if (row === n) {
      finalSolution = solutionBoard.rows().slice();
      return;
    }
    //iterate through each column in the row
    for (var col = 0; col < n; col++) {
      solutionBoard.togglePiece(row, col);
      if (!solutionBoard.hasAnyQueensConflicts()) {
        queenFinder(row + 1);
      }
      if (finalSolution.length > 0) {
        return;
      }
      solutionBoard.togglePiece(row, col);
    }
    return;
  };
  queenFinder(0);

  console.log(finalSolution);
  return finalSolution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var solutionBoard = new Board({'n': n });

  var queenSolver = function(row) {
    //base case - if row === n and we can successfully place a piece without creating an error
    if (row === n) {
      //found a solution = solution ++
      solutionCount++;
      return;
    }
    //iterate through each column in the row
    for (var col = 0; col < n; col++) {
      solutionBoard.togglePiece(row, col);
      if (!solutionBoard.hasAnyQueensConflicts()) {
        queenSolver(row + 1);
      }
      solutionBoard.togglePiece(row, col);
    }
    return;
  };
  queenSolver(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

