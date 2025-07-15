function requestLogger(req, res, next) {
  // For demonstration, log to a property instead of console.log
  req.logged = `${req.method} ${req.path}`;
  next();
}

module.exports = requestLogger;
