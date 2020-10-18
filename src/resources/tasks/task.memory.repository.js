const DB = require('../../utils/db');
const NotFoundError = require('../../utils/not-found-error');

const TABLE_NAME = 'Tasks';

const getAll = async boardId => {
  const tasks = DB.getAllEntities(TABLE_NAME).filter(
    task => task.boardId === boardId
  );
  if (tasks.length === 0) {
    throw new NotFoundError();
  }
  return tasks;
};

const get = async (boardId, id) => {
  const task = await DB.getEntity(TABLE_NAME, id);

  if (!task || task.boardId !== boardId) {
    throw new NotFoundError();
  }

  return task;
};

const remove = async (boardId, id) => {
  const task = await DB.removeEntity(TABLE_NAME, id);
  if (!task) {
    throw new NotFoundError();
  }
};

const create = async task => {
  return DB.addEntity(TABLE_NAME, task);
};

const update = async task => {
  await get(task.boardId, task.id);
  return DB.updateEntity(TABLE_NAME, task.id, task);
};

module.exports = { getAll, get, remove, create, update };
