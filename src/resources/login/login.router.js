const router = require('express').Router();
const loginService = require('./login.service');
const wrap = require('../../utils/wrap');

router.route('/').post(
  wrap(async (req, res) => {
    const { login, password } = req.body;
    const token = await loginService.getToken({ login, password });
    res.json({ token });
  })
);

module.exports = router;
