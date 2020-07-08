const { exec } = require('./exec');

/**
 * Entry point for Cloud Function
 *
 * @param req
 * @param res
 */
exports.subprocess = (req, res) => {
  const { generate = false } = req.query || {};

  const duration = exec(generate);

  res.status(200).json({ duration });
};
