const User = require('../users/user.model');
const bcrypt = require('bcrypt');
const ForbiddenError = require('../../utils/forbidden-error');

const validate = async ({ login, password }) => {
  const user = await User.findOne({ login });
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new ForbiddenError('Forbidden, invalid login or password');
  }
  return { login, _id: user._id };
};

module.exports = { validate };
