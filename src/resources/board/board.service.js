const tasksService = require('../tasks/task.service');
const boardsRepo = require('./board.db.repository');

const getAll = () => boardsRepo.getAll();

const get = id => boardsRepo.get(id);

const create = board => boardsRepo.create(board);

const update = (id, board) => boardsRepo.update(id, board);

const remove = async boardId => {
  const tasks = await tasksService.getAll({ boardId });
  tasks.forEach(({ _id }) => tasksService.remove(boardId, _id));
  return boardsRepo.remove(boardId);
};

module.exports = { getAll, get, create, update, remove };
