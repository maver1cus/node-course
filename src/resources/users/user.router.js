const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const HTTP_STATUS_CODE = require('../../utils/http-status-codes');
const wrap = require('../../utils/wrap');
const NotFoundError = require('../../utils/not-found-error');

router.route('/').get(
  wrap(async (req, res) => {
    const users = await usersService.getAll();
    res.status(HTTP_STATUS_CODE.OK).json(users.map(User.toResponse));
  })
);

router.route('/:id').get(
  wrap(async (req, res) => {
    const user = await usersService.get(req.params.id);
    if (!user) {
      throw new NotFoundError(`User ${req.params.id} not found`);
    }
    res.status(HTTP_STATUS_CODE.OK).send(User.toResponse(user));
  })
);

router.route('/').post(
  wrap(async (req, res) => {
    const user = await usersService.create(req.body);
    res.status(HTTP_STATUS_CODE.OK).send(User.toResponse(user));
  })
);

router.route('/:id').put(
  wrap(async (req, res) => {
    const user = await usersService.update(req.params.id, req.body);
    if (!user) {
      throw new NotFoundError(`User ${req.params.id} not found`);
    }
    res.status(HTTP_STATUS_CODE.OK).json(User.toResponse(user));
  })
);

router.route('/:id').delete(
  wrap(async (req, res) => {
    const user = await usersService.remove(req.params.id);
    if (!user) {
      throw new NotFoundError(`User ${req.params.id} not found`);
    }
    res.status(HTTP_STATUS_CODE.NO_CONTENT).send('The user has been deleted');
  })
);

module.exports = router;
