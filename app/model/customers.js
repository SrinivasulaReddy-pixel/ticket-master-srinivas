const mongoose = require('mongoose')
const validator = require('validator')

//schema
const Schema = mongoose.Schema
const customerSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 2
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return validator.isEmail(value);
      },
      message: function () {
        return 'invalid email format';
      },
    },
  },
  mobile: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 10
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

//model
const Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer