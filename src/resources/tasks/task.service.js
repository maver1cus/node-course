const taskRepo = require('./task.db.repository');

const getAll = params => taskRepo.getAll(params);

const get = (boardId, id) => taskRepo.get(boardId, id);

const create = task => taskRepo.create(task);

const update = (taskId, task) => taskRepo.update(taskId, task);

const remove = (boardId, taskId) => taskRepo.remove(boardId, taskId);

module.exports = { getAll, get, remove, create, update };
