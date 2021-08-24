const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')

//creating schema
const employeeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
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
    maxlength: 10,
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: 'Department',
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

//creating model
const Employee = mongoose.model('Employee', employeeSchema)

module.exports = Employee