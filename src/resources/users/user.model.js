const mongoose = require('mongoose');
const uuid = require('uuid');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  login: String,
  password: String,
  _id: { type: String, default: uuid }
});

userSchema.statics.toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};
const User = mongoose.model('users', userSchema);

module.exports = User;
