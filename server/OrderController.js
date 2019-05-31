// Import contact model
Order = require('./OrderModel');

// Handle index actions
exports.index = function (req, res) {
    Order.get(function (err, orders) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Orders retrieved successfully",
            data: orders
        });
    });
};

// Handle create contact actions
exports.new = function (req, res) {
    var order = new Order();
    order.guest = req.body.guest;
    order.products = req.body.products;

// save the contact and check for errors
    order.save(function (err) {
        if (err)
             res.json(err);

        res.json({
            message: 'New order created!',
            data: order
        });
    });
};

// Handle view contact info
exports.view = function (req, res) {
    Order.findById(req.params.order_id, function (err, order) {
        if (err)
            res.send(err);
        res.json({
            message: 'Order details loading..',
            data: order
        });
    });
};

// Handle update contact info
exports.update = function (req, res) {

Order.findById(req.params.order_id, function (err, order) {
    if (err)
        res.send(err);

    order.products = req.body.products;

// save the contact and check for errors
        order.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Order Info updated',
                data: order
            });
        });
    });
};

// Handle delete contact
exports.delete = function (req, res) {
    Order.remove({
        _id: req.params.order_id
    }, function (err, order) {
        if (err)
            res.send(err);

        res.json({
            status: "success",
            message: 'Order deleted'
        });
    });
};