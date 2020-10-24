const wrap = cb => (req, res, next) => {
  return Promise.resolve(cb(req, res, next)).catch(next);
};

module.exports = wrap;
