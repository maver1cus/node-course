const DB = require('../../utils/db');
const TABLE_NAME = 'Tasks';

const getAll = async boardId => {
  return DB.getAllEntities(TABLE_NAME).filter(task => task.boardId === boardId);
};

const get = async (boardId, id) => {
  const task = await DB.getEntity(TABLE_NAME, id);

  if (!task || task.boardId !== boardId) {
    return [];
  }

  return task;
};

const remove = async (boardId, id) => await DB.removeEntity(TABLE_NAME, id);

const create = async task => {
  return DB.addEntity(TABLE_NAME, task);
};

const update = async task => {
  await get(task.boardId, task.id);
  return DB.updateEntity(TABLE_NAME, task.id, task);
};

module.exports = { getAll, get, remove, create, update };
