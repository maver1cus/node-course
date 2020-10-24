const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');
const HTTP_STATUS_CODE = require('../../utils/http-status-codes');
const wrap = require('../../utils/wrap');
const NotFoundError = require('../../utils/not-found-error');

router.route('/').get(
  wrap(async (req, res) => {
    const boards = await boardService.getAll();
    res.json(boards.map(Board.toResponse));
  })
);

router.route('/:id').get(
  wrap(async (req, res) => {
    const board = await boardService.get(req.params.id);
    if (!board) {
      throw new NotFoundError(`Board with id: ${req.params.id} not found`);
    }
    res.json(Board.toResponse(board));
  })
);

router.route('/').post(
  wrap(async (req, res) => {
    const bord = await boardService.create(req.body);
    res.json(Board.toResponse(bord));
  })
);

router.route('/:id').put(
  wrap(async (req, res) => {
    const board = await boardService.update(req.params.id, req.body);
    res.json(Board.toResponse(board));
  })
);

router.route('/:id').delete(
  wrap(async (req, res) => {
    const board = await boardService.remove(req.params.id);
    if (!board) {
      throw new NotFoundError(`Board with id: ${req.params.boardId} not found`);
    }
    res
      .sendStatus(HTTP_STATUS_CODE.NO_CONTENT)
      .send('The board has been deleted');
  })
);

module.exports = router;
