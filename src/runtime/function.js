const { exec } = require('./exec');

/**
 * Entry point for Cloud Function
 *
 * @param req
 * @param res
 */
exports.subprocess = (req, res) => {
  const { type } = req.query || {};
  const duration = exec(type);

  res.status(200).json({ duration });
};
