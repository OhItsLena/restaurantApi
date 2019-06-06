var mongoose = require("mongoose");

// Setup schema
var listProductSchema = mongoose.Schema(
  {
    pid: mongoose.Schema.Types.ObjectId,
    quant: Number
  },
  { _id: false }
);

var orderSchema = mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now
  },
  guest: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  products: [listProductSchema]
});

// Export model
var Contact = (module.exports = mongoose.model("order", orderSchema));

module.exports.get = function(callback, limit) {
  Contact.find(callback).limit(limit);
};
