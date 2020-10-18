const DB = require('../../utils/db');
const NotFoundError = require('../../utils/not-found-error');

const TABLE_NAME = 'Boards';

const getAll = async () => DB.getAllEntities(TABLE_NAME);

const get = async id => {
  const board = await DB.getEntity(TABLE_NAME, id);

  if (!board) {
    throw new NotFoundError();
  }

  return board;
};

const create = async board => DB.addEntity(TABLE_NAME, board);

const update = async (id, board) => {
  const updateBoard = DB.updateEntity(TABLE_NAME, id, board);

  if (!updateBoard) {
    throw new NotFoundError();
  }

  return updateBoard;
};

const remove = async id => {
  const board = await DB.removeEntity(TABLE_NAME, id);

  if (!board) {
    throw new NotFoundError();
  }
};

module.exports = { getAll, get, create, update, remove };
