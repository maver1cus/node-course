const User = require('../resources/users/user.model');
const Board = require('../resources/board/board.model');
const Task = require('../resources/tasks/task.model');

const DB = {
  Users: [],
  Boards: [],
  Tasks: []
};

const initDB = () => {
  for (let i = 0; i < 3; i++) {
    DB.Users.push(new User());
  }
  const board = new Board();
  DB.Boards.push(board);
  DB.Tasks.push(
    new Task({ boardId: board.id }),
    new Task({ boardId: board.id })
  );
};

const getAllEntities = tableName => {
  return DB[tableName];
};

const getEntity = (tableName, id) => {
  return DB[tableName].find(entity => entity.id === id);
};

const removeEntity = (tableName, id) => {
  const entity = getEntity(tableName, id);
  if (entity) {
    const index = DB[tableName].indexOf(entity);
    DB[tableName].splice(index, 1);
    if (tableName === 'Users') {
      DB.Tasks.forEach(task => {
        task.userId = task.userId === id ? null : task.userId;
      });
    }
    if (tableName === 'Boards') {
      DB.Tasks.filter(task => task.boardId === id).forEach(task =>
        removeEntity('Tasks', task.id)
      );
    }
  }
  return entity;
};

const addEntity = (tableName, entity) => {
  DB[tableName].push(entity);

  return getEntity(tableName, entity.id);
};

const updateEntity = (tableName, id, entity) => {
  const oldEntity = getEntity(tableName, id);
  if (oldEntity) {
    const index = DB[tableName].indexOf(oldEntity);
    DB[tableName][index] = { ...entity };
  }

  return getEntity(tableName, id);
};

initDB();

module.exports = {
  getAllEntities,
  getEntity,
  removeEntity,
  addEntity,
  updateEntity
};
