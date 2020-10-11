const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardService.getAll();
  res.json(boards);
});

router.route('/:id').get(async (req, res) => {
  const board = await boardService.get(req.params.id);
  if (board) {
    res.status(200).send(board);
  } else {
    res.sendStatus(404);
  }
});

router.route('/').post(async (req, res) => {
  const bord = await boardService.create(Board.fromRequest(req.body));
  res.status(200).send(bord);
});

router.route('/:id').put(async (req, res) => {
  const board = await boardService.update(
    req.params.id,
    Board.fromRequest(req.body)
  );
  res.status(200).send(board);
});

router.route('/:id').delete(async (req, res) => {
  const board = await boardService.remove(req.params.id);
  if (board) {
    res.status(200).send(board);
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
