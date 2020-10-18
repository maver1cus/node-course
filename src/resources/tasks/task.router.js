const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const taskService = require('./task.service');
const HTTP_STATUS_CODE = require('../../utils/http-status-codes');
const wrap = require('../../utils/wrap');

router.route('/').get(
  wrap(async (req, res) => {
    const tasks = await taskService.getAll(req.params.boardId);
    await res.status(HTTP_STATUS_CODE.OK).send(tasks);
  })
);

router.route('/:id').get(
  wrap(async (req, res) => {
    const task = await taskService.get(req.params.boardId, req.params.id);
    await res.status(HTTP_STATUS_CODE.OK).send(task);
  })
);

router.route('/:id').delete(
  wrap(async (req, res) => {
    await taskService.remove(req.params.boardId, req.params.id);
    await res.sendStatus(HTTP_STATUS_CODE.NO_CONTENT);
  })
);

router.route('/').post(
  wrap(async (req, res) => {
    const task = await taskService.create(
      Task.fromRequest({ ...req.body, boardId: req.params.boardId })
    );
    await res.status(HTTP_STATUS_CODE.OK).send(task);
  })
);

router.route('/:id').put(
  wrap(async (req, res) => {
    const task = await taskService.update(
      Task.fromRequest({
        ...req.body,
        id: req.params.id,
        boardId: req.params.boardId
      })
    );
    await res.status(HTTP_STATUS_CODE.OK).send(task);
  })
);

module.exports = router;
