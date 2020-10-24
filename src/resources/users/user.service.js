const usersRepo = require('./user.db.repository');
const taskService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();

const get = id => usersRepo.get(id);

const create = user => usersRepo.create(user);

const update = (id, user) => usersRepo.update(id, user);

const remove = async id => {
  const usersTasks = await taskService.getAll({ userId: id });
  usersTasks.forEach(task => taskService.update(task._id, { userId: null }));

  return usersRepo.remove(id);
};

module.exports = { getAll, create, get, update, remove };
