const loginRepo = require('./login.db.repository');
const jwt = require('jsonwebtoken');

const getToken = async user => {
  const data = await loginRepo.validate(user);
  const expiration = '1h';
  const signature = process.env.JWT_SECRET_KEY;
  return await jwt.sign(data, signature, {
    expiresIn: expiration
  });
};
module.exports = { getToken };
