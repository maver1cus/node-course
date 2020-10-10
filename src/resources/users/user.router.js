const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.get(req.params.id);
  res.status(200).send(User.toResponse(user));
});

router.route('/').post(async (req, res) => {
  const user = await usersService.create(User.fromRequest(req.body));
  res.status(200).send(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const user = await usersService.update(
    req.params.id,
    User.fromRequest({
      id: req.params.id,
      name: req.body.name,
      login: req.body.login,
      password: req.body.password
    })
  );
  res.status(200).send(User.toResponse(user));
});

router.route('/:id').delete(async (req, res) => {
  const user = usersService.remove(req.params.id);
  res.status(200).send(User.toResponse(user));
});

module.exports = router;
