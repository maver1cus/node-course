const DB = require('../../utils/db');
const NotFoundError = require('../../utils/not-found-error');

const TABLE_NAME = 'Users';

const getAll = async () => {
  return DB.getAllEntities(TABLE_NAME);
};

const get = async id => {
  const user = await DB.getEntity(TABLE_NAME, id);
  if (!user) {
    throw new NotFoundError(`User with ID: ${id} not found`);
  }

  return user;
};

const create = async user => DB.addEntity(TABLE_NAME, user);

const update = async (id, user) => {
  const updateUser = DB.updateEntity(TABLE_NAME, id, user);
  if (!updateUser) {
    throw new NotFoundError(`User with ID: ${id} not found`);
  }
  return updateUser;
};

const remove = async id => {
  const user = DB.removeEntity(TABLE_NAME, id);
  if (!user) {
    throw new NotFoundError(`User with ID: ${id} not found`);
  }
  return user;
};

module.exports = { getAll, get, create, update, remove };
