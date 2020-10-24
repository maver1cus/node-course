const Task = require('./task.model');

const getAll = async params => Task.find(params);

const get = async (boardId, taskId) => Task.findOne({ boardId, _id: taskId });

const create = async task => Task.create(task);

const update = async (taskId, task) =>
  Task.findOneAndUpdate({ _id: taskId }, task);

const remove = async (boardId, taskId) =>
  Task.findOneAndRemove({ boardId, _id: taskId });

module.exports = { create, getAll, get, remove, update };
