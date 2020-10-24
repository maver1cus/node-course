const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuid = require('uuid');

const boardSchema = new Schema({
  title: String,
  _id: { type: String, default: uuid },
  columns: [
    {
      title: String,
      order: { type: Number, default: 0 },
      _id: { type: String, default: uuid }
    }
  ]
});

boardSchema.statics.toResponse = (board = {}) => {
  const { _id, title, columns } = board;
  return {
    id: _id,
    title,
    columns: columns.map(column => ({
      title: column.title,
      order: column.order
    }))
  };
};

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
