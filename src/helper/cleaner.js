const Sandbox = require("../model/sandbox.js");

const cleaner = async () => {
  const WEEK_IN_MS = 604800000;
  const expiry = Date.now() - WEEK_IN_MS;

  await Sandbox.deleteMany({ creationDate: { $lte: expiry } });
};

module.exports = cleaner;
