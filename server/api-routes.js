// Initialize express router
let router = require("express").Router();

// Set default API response
router.get("/", function(req, res) {
  res.json({
    status: "API Its Working",
    message: "Welcome to RESTHub crafted with love!"
  });
});

// Import controllerc
var OrderController = require("./OrderController");
var ProductController = require("./ProductController");
var Authentication = require("./Auth");

// routes
router
  .route("/orders")
  .get(OrderController.index)
  .post(OrderController.new);

router
  .route("/orders/:order_id")
  .get(OrderController.view)
  .patch(OrderController.update)
  .put(OrderController.update)
  .delete(OrderController.delete);

router
  .route("/products")
  .get(ProductController.index)
  .post(ProductController.new);

router
  .route("/products/:product_id")
  .get(ProductController.view)
  .patch(ProductController.update)
  .put(ProductController.update)
  .delete(ProductController.delete);

router.route("/auth").get(Authentication.initialAuth);

// Export API routes
module.exports = router;
