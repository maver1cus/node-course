const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');
const HTTP_STATUS_CODE = require('../../utils/http-status-codes');
const wrap = require('../../utils/wrap');

router.route('/').get(
  wrap(async (req, res) => {
    const boards = await boardService.getAll();
    await res.status(HTTP_STATUS_CODE.OK).json(boards);
  })
);

router.route('/:id').get(
  wrap(async (req, res) => {
    const board = await boardService.get(req.params.id);
    res.status(HTTP_STATUS_CODE.OK).send(board);
  })
);

router.route('/').post(
  wrap(async (req, res) => {
    const bord = await boardService.create(Board.fromRequest(req.body));
    res.status(HTTP_STATUS_CODE.OK).send(bord);
  })
);

router.route('/:id').put(
  wrap(async (req, res) => {
    const board = await boardService.update(
      req.params.id,
      Board.fromRequest(req.body)
    );
    await res.status(HTTP_STATUS_CODE.OK).send(board);
  })
);

router.route('/:id').delete(
  wrap(async (req, res) => {
    await boardService.remove(req.params.id);
    await res.sendStatus(HTTP_STATUS_CODE.NO_CONTENT);
  })
);

module.exports = router;
