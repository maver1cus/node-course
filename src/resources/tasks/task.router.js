const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const taskService = require('./task.service');
const HTTP_STATUS_CODE = require('../../utils/http-status-codes');
const wrap = require('../../utils/wrap');
const NotFoundError = require('../../utils/not-found-error');

router.route('/').get(
  wrap(async (req, res) => {
    const tasks = await taskService.getAll({ boardId: req.params.boardId });
    res.status(HTTP_STATUS_CODE.OK).json(tasks.map(Task.toResponse));
  })
);

router.route('/:id').get(
  wrap(async (req, res) => {
    const task = await taskService.get(req.params.boardId, req.params.id);
    if (!task) {
      throw new NotFoundError(`Task ${req.params.taskId} not found`);
    }
    res.json(Task.toResponse(task));
  })
);

router.route('/').post(
  wrap(async (req, res) => {
    const task = await taskService.create({
      ...req.body,
      boardId: req.params.boardId
    });
    res.json(Task.toResponse(task));
  })
);

router.route('/:id').put(
  wrap(async (req, res) => {
    const task = await taskService.update(req.params.id, {
      ...req.body,
      boardId: req.params.boardId
    });
    res.json(Task.toResponse(task));
  })
);

router.route('/:id').delete(
  wrap(async (req, res) => {
    const task = await taskService.remove(req.params.boardId, req.params.id);
    if (!task) {
      throw new NotFoundError(`Task with id: ${req.params.taskId} not found`);
    }
    res
      .status(HTTP_STATUS_CODE.NO_CONTENT)
      .send(`Task with id: ${req.params.taskId} has been deleted`);
  })
);

module.exports = router;
