const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardService.getAll();
  res.json(boards);
});

router.route('/:id').get(async (req, res) => {
  const board = await boardService.get(req.params.id);
  res.status(200).send(board);
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
  const board = boardService.remove(req.params.id);
  res.status(200).send(board);
});

module.exports = router;
