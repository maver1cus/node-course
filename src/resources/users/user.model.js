const mongoose = require('mongoose');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;
const SALT_WORK_FACTOR = 10;

function save(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) return next(error);
      user.password = hash;
      next();
    });
  });
}

function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
}

const userSchema = new Schema({
  name: String,
  login: String,
  password: String,
  _id: { type: String, default: uuid }
});

userSchema.pre('save', save);

userSchema.methods.comparePassword = comparePassword;

userSchema.statics.toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};

const User = mongoose.model('users', userSchema);

module.exports = User;
