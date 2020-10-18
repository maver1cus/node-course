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

  const boardTwo = new Board();
  DB.Boards.push(boardTwo);
  DB.Tasks.push(
    new Task({ boardId: boardTwo.id }),
    new Task({ boardId: boardTwo.id })
  );
};

const getAllEntities = tableName => DB[tableName].filter(entity => entity);

const getEntity = (tableName, id) => {
  const entities = DB[tableName]
    .filter(entity => entity)
    .filter(entity => entity.id === id);
  if (entities.length > 1) {
    console.error(
      `The DB data is damaged. Table: ${tableName}. Entity ID: ${id}`
    );
    throw Error('The DB data is wrong!');
  }

  return entities[0];
};

const removeEntity = (tableName, id) => {
  const entity = getEntity(tableName, id);
  if (entity) {
    if (tableName === 'Users') {
      DB.Tasks.forEach(task => {
        task.userId = task.userId === id ? null : task.userId;
      });
    }
    if (tableName === 'Boards') {
      DB.Tasks.filter(task => task && task.boardId === id).forEach(task => {
        const index = DB.Tasks.indexOf(task);
        DB.Tasks.splice(index, 1);
      });
    }
    const index = DB[tableName].indexOf(entity);

    DB[tableName].splice(index, 1);
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
