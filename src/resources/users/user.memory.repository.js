const DB = require('../../utils/db');

const TABLE_NAME = 'Users';

const getAll = async () => {
  return DB.getAllEntities(TABLE_NAME);
};

const get = async id => await DB.getEntity(TABLE_NAME, id);

const create = async user => DB.addEntity(TABLE_NAME, user);

const update = async (id, user) => DB.updateEntity(TABLE_NAME, id, user);

const remove = async id => DB.removeEntity(TABLE_NAME, id);

module.exports = { getAll, get, create, update, remove };
