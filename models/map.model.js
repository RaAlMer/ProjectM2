const { Schema, model, SchemaTypes } = require('mongoose');
const mapSchema = new Schema({
  xy: [Number],
});

module.exports = model('Map', mapSchema);
