const mongoose = require('mongoose');
const { Schema } = mongoose;

const RequestSchema = new Schema({
    businessId: String,
    employeeId: String,
    status: {
      accepted: {
        type: Number,
        default: 0,
      },
      pending: {
        type: Number,
        default: 0,
      },
      rejected: {
        type: Number,
        default: 0,
      },
    },
  }, {
    timestamps: true,
  });

module.exports = mongoose.model('request', RequestSchema)