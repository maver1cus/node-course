const Board = require('./board.model');

const getAll = async () => Board.find({});

const get = async id => Board.findOne({ _id: id });

const create = async board => Board.create(board);

const update = async (id, board) =>
  await Board.findOneAndUpdate({ _id: id }, board);

const remove = async boardId => Board.findOneAndRemove({ _id: boardId });

module.exports = { getAll, get, create, update, remove };
