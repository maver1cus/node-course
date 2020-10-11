const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const taskService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasks = await taskService.getAll(req.params.boardId);
  if (tasks.length !== 0) {
    res.status(200).send(tasks);
  } else {
    res.sendStatus(404);
  }
});

router.route('/:id').get(async (req, res) => {
  const task = await taskService.get(req.params.boardId, req.params.id);
  if (task.length !== 0) {
    res.status(200).send(task);
  } else {
    res.sendStatus(404);
  }
});

router.route('/:id').delete(async (req, res) => {
  const task = await taskService.remove(req.params.boardId, req.params.id);
  if (task) {
    res.status(200).send(task);
  } else {
    res.sendStatus(404);
  }
});

router.route('/').post(async (req, res) => {
  const task = await taskService.create(
    Task.fromRequest({ ...req.body, boardId: req.params.boardId })
  );
  res.status(200).send(task);
});

router.route('/:id').put(async (req, res) => {
  const task = await taskService.update(
    Task.fromRequest({
      ...req.body,
      id: req.params.id,
      boardId: req.params.boardId
    })
  );
  res.status(200).send(task);
});

module.exports = router;
