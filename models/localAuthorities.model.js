const { Schema, model, SchemaTypes } = require('mongoose');

const localAuthoritiesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  telephone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  link: String,
});

module.exports = model('LocalAuthorities', localAuthoritiesSchema);
