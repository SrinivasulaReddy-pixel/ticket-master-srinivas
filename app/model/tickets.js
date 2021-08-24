const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ticketSchema = new Schema({
  code: {
    type: String,
    unique:true,
    required: true,
    minlength:4
  },
  customer: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Customer',
  },
  department: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Department',
  },
  employees: [{ type: Schema.Types.ObjectId, required: true, ref: 'Employee' }],
  priority: {
    type: String,
    enum: ['high', 'medium', 'low'],
  },
  message: {
    type: String,
    required: true,
    minlength: 5,
  },
  isResolved: {
    type: Boolean,
    default: false,
  },
});

const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;

