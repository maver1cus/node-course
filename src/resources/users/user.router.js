const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const HTTP_STATUS_CODE = require('../../utils/http-status-codes');
const wrap = require('../../utils/wrap');

router.route('/').get(
  wrap(async (req, res) => {
    const users = await usersService.getAll();
    await res.status(HTTP_STATUS_CODE.OK).json(users.map(User.toResponse));
  })
);

router.route('/:id').get(
  wrap(async (req, res) => {
    const user = await usersService.get(req.params.id);
    res.status(HTTP_STATUS_CODE.OK).send(User.toResponse(user));
  })
);

router.route('/').post(
  wrap(async (req, res) => {
    const user = await usersService.create(User.fromRequest(req.body));
    res.status(HTTP_STATUS_CODE.OK).send(User.toResponse(user));
  })
);

router.route('/:id').put(
  wrap(async (req, res) => {
    const user = await usersService.update(
      req.params.id,
      User.fromRequest({
        id: req.params.id,
        name: req.body.name,
        login: req.body.login,
        password: req.body.password
      })
    );
    res.status(HTTP_STATUS_CODE.OK).send(User.toResponse(user));
  })
);

router.route('/:id').delete(
  wrap(async (req, res) => {
    await usersService.remove(req.params.id);
    await res.sendStatus(HTTP_STATUS_CODE.NO_CONTENT);
  })
);

module.exports = router;
