const DB = require('../../utils/db');

const TABLE_NAME = 'Boards';

const getAll = async () => DB.getAllEntities(TABLE_NAME);

const get = async id => await DB.getEntity(TABLE_NAME, id);

const create = async board => DB.addEntity(TABLE_NAME, board);

const update = async (id, board) => DB.updateEntity(TABLE_NAME, id, board);

const remove = async id => await DB.removeEntity(TABLE_NAME, id);

module.exports = { getAll, get, create, update, remove };
