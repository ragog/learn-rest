const cleaner = require('../helper/cleaner.js')
const Sandbox = require ('../model/sandbox.js')

const preExec = async function (req, res, next) {

    if ((req.url === '/') || (req.url === '/favicon.ico')){ 
        next();
        return;
    }
  
    cleaner()
  
    const authHeader = req.headers.authorization
    let token
  
    if (authHeader.startsWith("Bearer ")){
        token = authHeader.replace('Bearer ', '');
        await Sandbox.find({ apikey: token }).countDocuments((error, count) => {
        if (count === 0){
            res.status(401).send()
        } else {
            next();
        }
        });
    } else {
        res.status(401).send()
    }
}

module.exports = preExec;