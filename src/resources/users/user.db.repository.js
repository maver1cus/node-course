const User = require('./user.model');

const getAll = async () => await User.find({});

const get = async id => await User.findById(id);

const create = async user => await User.create(user);

const update = async (id, user) =>
  await User.findOneAndUpdate({ _id: id }, user);

const remove = async id => User.findOneAndRemove({ _id: id });

module.exports = { getAll, create, get, update, remove };
