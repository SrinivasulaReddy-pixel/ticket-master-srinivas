const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creating schema
const departmentSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
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
const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
