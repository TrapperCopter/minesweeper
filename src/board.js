export class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows,numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  get playerBoard() {
    return this._playerBoard;
  }

  flipTile(rowIndex, columnIndex) {
    if (this._playerBoard[rowIndex][columnIndex] !== ' ' ) {
      console.log('This tile has already been flipped!');
      return;
    }
    else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
      this._playerBoard[rowIndex][columnIndex] = 'B';
    }
    else {
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
    }
    this.numberOfTiles--;
  }
  // the lesson wanted us to remove the arrow function, so I thought we had to do it this way
  /*  getNumberOfNeighborBombs(rowIndex, columnIndex) {
      const neighborOffsets = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1]
      ];
      const numberOfRows = this._bombBoard.length;
      const numberOfColumns = this._bombBoard[0].length;

      let numberOfBombs = 0;

      neighborOffsets.forEach(offset => {
        const neighborRowIndex = rowIndex + offset[0];
        const neighborColumnIndex = columnIndex + offset[1];
        if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows &&
            neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
          if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
            numberOfBombs++;
          }
        }
      });
      return numberOfBombs;
    }
  */
  getNumberOfNeighborBombs(rowIndex, columnIndex) {
 const neighborOffsets = [
   [-1, -1],
   [-1, 0],
   [-1, 1],
   [0, -1],
   [0, 1],
   [1, -1],
   [1, 0],
   [1, 1]
 ];
 const numberOfRows = this._bombBoard.length;
 const numberOfColumns = this._bombBoard[0].length;

 let numberOfBombs = 0;
 neighborOffsets.forEach(offset => {
   const neighborRowIndex = rowIndex + offset[0];
   const neighborColumnIndex = columnIndex + offset[1];
   if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows &&
       neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
     if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
       numberOfBombs++;
     }
   }
 });
 return numberOfBombs;
}

hasSafeTiles() {
  return this._numberOfTiles != this._numberOfBombs;
  }

print() {
    console.log(this.playerBoard.map(row => row.join(' | ')).join('\n'));
  }

    static generatePlayerBoard(numberOfRows, numberOfColumns) {
          let board = [];
          for (let r = 0; r < numberOfRows; r++ ) {
            let row = [];
            for (let c = 0; c < numberOfColumns; c++ ) {
              row.push(' ');
            }
            board.push(row);
          }
          return board;
        }



        static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
              const board = [];
              for (let r = 0; r < numberOfRows; r++) {
                let row = [];
                for (let c = 0; c < numberOfColumns; c++ ) {
                  row.push(null);
                }
                board.push(row);
              }
              let numberOfBombsPlaced = 0;

              while (numberOfBombsPlaced <= numberOfBombs) {
                let randomRowIndex = Math.floor(Math.random() * numberOfRows);
               //console.log( randomRowIndex);
                let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
               // console.log( randomColumnIndex);
                if (board[randomRowIndex][randomColumnIndex] !== 'B') {
                  board [randomRowIndex] [randomColumnIndex] = 'B';
                  numberOfBombsPlaced++;
                }
              }
              return board;
            }
        }
