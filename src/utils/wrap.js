const wrap = cb => (req, res, next) => cb(req, res, next).catch(next);

module.exports = wrap;
