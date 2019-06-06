var mongoose = require("mongoose");

// Setup schema
var productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    enum: ["food", "drink"]
  }
});

// Export model
var Product = (module.exports = mongoose.model("product", productSchema));

module.exports.get = function(callback, limit) {
  Product.find(callback).limit(limit);
};
