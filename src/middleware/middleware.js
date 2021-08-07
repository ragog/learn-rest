const cleaner = require("../helper/cleaner.js");
const Sandbox = require("../model/sandbox.js");

const preExec = async function (req, res, next) {
  console.log(`Request received: ${req.method} ${req.url}`);

  // if ((req.url == '/')
  // || (req.url === '/favicon.ico')
  // || (req.url.includes('.css')
  // || (req.url.includes('.js')))){
  //     next();
  //     return;
  // }

  cleaner();

  const authHeader = req.headers.authorization;
  let token;

  if (!authHeader) {
    console.log("Received unathenticated request - ignoring");
    res.status(401).send();
    return;
  }

  if (authHeader.startsWith("Bearer ")) {
    token = authHeader.replace("Bearer ", "");
    await Sandbox.find({ apikey: token }).countDocuments((error, count) => {
      if (count === 0) {
        res.status(401).send();
      } else {
        next();
      }
    });
  } else {
    res.status(401).send();
  }
};

module.exports = preExec;
