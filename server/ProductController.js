// Import product model
Product = require('./ProductModel');

// Handle index actions
exports.index = function (req, res) {
    Product.get(function (err, products) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Products retrieved successfully",
            data: products
        });
    });
};

// Handle create product actions
exports.new = function (req, res) {
    var product = new Product();
    product.name = req.body.name;
    product.price = req.body.price;
    product.category = req.body.category;

// save the contact and check for errors
    product.save(function (err) {
        if (err)
             res.json(err);

        res.json({
            message: 'New product created!',
            data: product
        });
    });
};

// Handle view product info
exports.view = function (req, res) {
    Product.findById(req.params.product_id, function (err, product) {
        if (err)
            res.send(err);
        res.json({
            message: 'Product details loading..',
            data: product
        });
    });
};

// Handle update contact info
exports.update = function (req, res) {

Product.findById(req.params.product_id, function (err, product) {
    if (err)
        res.send(err);

    product.name = req.body.name;
    product.price = req.body.price;
    product.category = req.body.category;

// save the contact and check for errors
        product.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Order Info updated',
                data: product
            });
        });
    });
};

// Handle delete contact
exports.delete = function (req, res) {
    Product.remove({
        _id: req.params.product_id
    }, function (err, product) {
        if (err)
            res.send(err);

        res.json({
            status: "success",
            message: 'Product deleted'
        });
    });
};