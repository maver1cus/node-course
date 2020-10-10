const uuid = require('uuid');

class Board {
  constructor({
    id = uuid(),
    title = 'Title',
    columns = { id: null, title: '0', order: 0 }
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
  static getBoard(board) {
    return new Board(board);
  }
}

module.exports = Board;
