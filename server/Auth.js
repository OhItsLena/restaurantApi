//Authentication
let basicAuth = require("basic-auth");
User = require("./UserModel");

exports.initialAuth = function(req, res, next) {
  var user = basicAuth(req);
  if (!user || !user.name || !user.pass) {
    res.set("WWW-Authenticate", "Basic realm=Authorization Required");
    res.sendStatus(401);
    return;
  }

  User.findOne({ name: user.name }, function(err, u) {
    if (err) res.sendStatus(401);
    if (user.name === u.name && user.pass === u.password) {
      res.json({
        data: u
      });
    } else {
      res.set("WWW-Authenticate", "Basic realm=Authorization Required");
      res.sendStatus(401);
      return;
    }
  });
};

exports.auth = function(req, res, next) {
  var user = basicAuth(req);
  if (!user || !user.name || !user.pass) {
    res.set("WWW-Authenticate", "Basic realm=Authorization Required");
    res.sendStatus(401);
    return;
  }

  User.findOne({ name: user.name }, function(err, u) {
    if (err) res.sendStatus(401);
    if (user.name === u.name && user.pass === u.password) {
      next();
    } else {
      res.set("WWW-Authenticate", "Basic realm=Authorization Required");
      res.sendStatus(401);
      return;
    }
  });
};
